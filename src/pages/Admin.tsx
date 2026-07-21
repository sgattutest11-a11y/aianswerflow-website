import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type SessionUser = {
  id: string
  email: string
  role: 'user' | 'admin'
  name?: string
}

type AdminUser = {
  id: string
  email: string
  name: string
  avatar: string
  authProvider: string
  role: 'user' | 'admin'
  createdAt: string | null
  trialSecondsRemaining: number
  purchasedSecondsRemaining: number
  totalSecondsRemaining: number
  hasActiveSession: boolean
  activeSessionStartedAt: string | null
  activeSession: {
    startedAt: string | null
    lastHeartbeatAt: string | null
    consumedSeconds: number
    source: string
  } | null
}

type AdminTransaction = {
  id: string
  userId: string | null
  user: {
    id: string
    email: string
    name: string
  } | null
  type: string
  amount: number
  description: string
  metadata: Record<string, unknown>
  timestamp: string | null
}

type LoginResponse = {
  token: string
  user: SessionUser
}

type MeResponse = {
  user: SessionUser
}

type UsersResponse = {
  users: AdminUser[]
}

type UserDetailResponse = {
  user: AdminUser
  transactions: AdminTransaction[]
}

type TransactionsResponse = {
  transactions: AdminTransaction[]
}

const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || 'https://api.aianswerflow.com/api').replace(/\/+$/, '')
const ADMIN_TOKEN_KEY = 'answerflow_admin_token'
const GOOGLE_USER_PARAM = 'user'
const ADMIN_ROUTE_PATH = '/adminshivagattu'

function formatDate(value: string | null) {
  if (!value) return 'Not available'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'Not available'
  return parsed.toLocaleString()
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds || 0))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

function formatSignedDuration(seconds: number) {
  const prefix = seconds > 0 ? '+' : seconds < 0 ? '-' : ''
  return `${prefix}${formatDuration(Math.abs(seconds))}`
}

async function requestJson<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = typeof data?.message === 'string' ? data.message : 'Request failed'
    throw new Error(message)
  }
  return data as T
}

function decodeGoogleUserParam(encodedUser: string) {
  try {
    const normalized = encodedUser.replace(/-/g, '+').replace(/_/g, '/');
    const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
    const decoded = window.atob(`${normalized}${padding}`);
    return JSON.parse(decoded) as SessionUser;
  } catch (error) {
    return null;
  }
}

export function Admin() {
  const [token, setToken] = useState(() => window.localStorage.getItem(ADMIN_TOKEN_KEY) || '')
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(token))
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeOnly, setActiveOnly] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [selectedTransactions, setSelectedTransactions] = useState<AdminTransaction[]>([])
  const [recentTransactions, setRecentTransactions] = useState<AdminTransaction[]>([])
  const [listError, setListError] = useState('')
  const [detailError, setDetailError] = useState('')

  const clearSession = useCallback((message = '') => {
    const cleanUrl = `${window.location.origin}${ADMIN_ROUTE_PATH}`
    window.history.replaceState({}, '', cleanUrl)
    window.localStorage.removeItem(ADMIN_TOKEN_KEY)
    setToken('')
    setSessionUser(null)
    setUsers([])
    setSelectedUserId('')
    setSelectedUser(null)
    setSelectedTransactions([])
    setRecentTransactions([])
    setAuthError(message)
  }, [])

  const fetchSession = useCallback(async (activeToken: string) => {
    const data = await requestJson<MeResponse>('/user/me', { method: 'GET' }, activeToken)
    if (data.user.role !== 'admin') {
      throw new Error('This account is not an admin. Add it to ADMIN_EMAILS or promote it in the database.')
    }
    return data.user
  }, [])

  useEffect(() => {
    const currentUrl = new URL(window.location.href)
    const authErrorParam = currentUrl.searchParams.get('error')
    const tokenParam = currentUrl.searchParams.get('token')
    const encodedUser = currentUrl.searchParams.get(GOOGLE_USER_PARAM)

    if (!authErrorParam && !tokenParam && !encodedUser) {
      return
    }

    const cleanUrl = `${window.location.origin}${ADMIN_ROUTE_PATH}`
    window.history.replaceState({}, '', cleanUrl)

    if (authErrorParam) {
      setAuthError(authErrorParam)
      return
    }

    if (!tokenParam || !encodedUser) {
      setAuthError('Google sign-in did not return a complete admin session.')
      return
    }

    const parsedUser = decodeGoogleUserParam(encodedUser)
    if (!parsedUser) {
      setAuthError('Google sign-in returned an unreadable user payload.')
      return
    }

    if (parsedUser.role !== 'admin') {
      setAuthError('This Google account is not an admin. Add it to ADMIN_EMAILS or promote it in the database.')
      return
    }

    window.localStorage.setItem(ADMIN_TOKEN_KEY, tokenParam)
    setToken(tokenParam)
    setSessionUser(parsedUser)
    setAuthError('')
  }, [])

  useEffect(() => {
    if (!token) {
      setIsCheckingSession(false)
      return
    }

    let cancelled = false

    async function validateSession() {
      setIsCheckingSession(true)
      try {
        const user = await fetchSession(token)
        if (!cancelled) {
          setSessionUser(user)
          setAuthError('')
        }
      } catch (error) {
        if (!cancelled) {
          clearSession(error instanceof Error ? error.message : 'Admin session expired')
        }
      } finally {
        if (!cancelled) {
          setIsCheckingSession(false)
        }
      }
    }

    validateSession()

    return () => {
      cancelled = true
    }
  }, [clearSession, fetchSession, token])

  const loadUsers = useCallback(async () => {
    if (!token || !sessionUser) return []

    const params = new URLSearchParams()
    params.set('limit', '200')
    if (searchQuery) {
      params.set('search', searchQuery)
    }
    if (activeOnly) {
      params.set('activeOnly', 'true')
    }

    const data = await requestJson<UsersResponse>(`/admin/users?${params.toString()}`, { method: 'GET' }, token)
    setUsers(data.users)
    setSelectedUserId((previousSelectedUserId) => {
      if (previousSelectedUserId && data.users.some((user) => user.id === previousSelectedUserId)) {
        return previousSelectedUserId
      }
      return data.users[0]?.id || ''
    })
    return data.users
  }, [activeOnly, searchQuery, sessionUser, token])

  const loadRecentTransactions = useCallback(async () => {
    if (!token || !sessionUser) return
    const data = await requestJson<TransactionsResponse>('/admin/transactions?limit=20', { method: 'GET' }, token)
    setRecentTransactions(data.transactions)
  }, [sessionUser, token])

  const refreshDashboard = useCallback(async () => {
    if (!token || !sessionUser) return

    setIsRefreshing(true)
    setListError('')

    try {
      await Promise.all([loadUsers(), loadRecentTransactions()])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to refresh admin data'
      if (message === 'Invalid token') {
        clearSession('Admin session expired. Please sign in again.')
      } else {
        setListError(message)
      }
    } finally {
      setIsRefreshing(false)
    }
  }, [clearSession, loadRecentTransactions, loadUsers, sessionUser, token])

  useEffect(() => {
    if (!sessionUser) return
    refreshDashboard()
  }, [refreshDashboard, sessionUser])

  useEffect(() => {
    if (!token || !sessionUser || !selectedUserId) {
      setSelectedUser(null)
      setSelectedTransactions([])
      return
    }

    let cancelled = false

    async function loadUserDetails() {
      setDetailError('')
      try {
        const data = await requestJson<UserDetailResponse>(
          `/admin/users/${selectedUserId}?transactionLimit=50`,
          { method: 'GET' },
          token
        )
        if (!cancelled) {
          setSelectedUser(data.user)
          setSelectedTransactions(data.transactions)
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : 'Failed to load user details'
          if (message === 'Invalid token') {
            clearSession('Admin session expired. Please sign in again.')
          } else {
            setDetailError(message)
          }
        }
      }
    }

    loadUserDetails()

    return () => {
      cancelled = true
    }
  }, [clearSession, selectedUserId, sessionUser, token])

  const stats = useMemo(() => {
    const totalUsers = users.length
    const activeUsers = users.filter((user) => user.hasActiveSession).length
    const adminUsers = users.filter((user) => user.role === 'admin').length
    const totalRemainingSeconds = users.reduce((sum, user) => sum + user.totalSecondsRemaining, 0)

    return {
      totalUsers,
      activeUsers,
      adminUsers,
      totalRemainingSeconds
    }
  }, [users])

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmittingLogin(true)
    setAuthError('')

    try {
      const data = await requestJson<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      })

      if (data.user.role !== 'admin') {
        throw new Error('This account is not an admin. Add it to ADMIN_EMAILS or promote it in the database.')
      }

      window.localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
      setToken(data.token)
      setSessionUser(data.user)
      setPassword('')
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Sign in failed')
    } finally {
      setIsSubmittingLogin(false)
    }
  }

  function handleGoogleSignin() {
    const redirectUri = `${window.location.origin}${ADMIN_ROUTE_PATH}`
    const startUrl = new URL(`${API_BASE_URL}/auth/google/start`)
    startUrl.searchParams.set('redirect_uri', redirectUri)
    window.location.href = startUrl.toString()
  }

  if (isCheckingSession) {
    return (
      <section className="admin-shell">
        <div className="container">
          <div className="admin-auth card">
            <p className="eyebrow">Admin</p>
            <h1>Checking admin session</h1>
            <p>Validating your access to the AnswerFlow admin console.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!sessionUser) {
    return (
      <section className="admin-shell">
        <div className="container admin-auth-layout">
          <div className="admin-auth-copy">
            <p className="eyebrow">Admin</p>
            <h1>AnswerFlow admin console</h1>
            <p>
              Sign in with a local account that has the admin role. The dashboard lets you inspect
              users, active sessions, remaining time, and transaction history.
            </p>
          </div>

          <form className="admin-auth card" onSubmit={handleLoginSubmit}>
            <label className="admin-field">
              <span>Email</span>
              <input
                className="admin-input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                required
              />
            </label>

            <label className="admin-field">
              <span>Password</span>
              <input
                className="admin-input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                required
              />
            </label>

            {authError ? <p className="admin-message admin-message--error">{authError}</p> : null}

            <button className="button button--primary admin-submit" type="submit" disabled={isSubmittingLogin}>
              {isSubmittingLogin ? 'Signing in...' : 'Sign in'}
            </button>

            <button className="button button--secondary admin-submit" type="button" onClick={handleGoogleSignin}>
              Continue with Google
            </button>

            <p className="admin-hint">
              If the account signs in successfully but is not recognized as admin, add its email to
              `ADMIN_EMAILS` on the server or set the user&apos;s `role` to `admin` in MongoDB.
            </p>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-shell">
      <div className="container admin-dashboard">
        <div className="admin-topbar card">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>AnswerFlow users</h1>
            <p>
              Signed in as {sessionUser.email}. Inspect balances, live sessions, and recent
              purchases or usage.
            </p>
          </div>

          <div className="admin-actions">
            <button className="button button--secondary" type="button" onClick={() => void refreshDashboard()}>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button className="button button--ghost" type="button" onClick={() => clearSession()}>
              Sign out
            </button>
          </div>
        </div>

        <div className="admin-stats">
          <article className="admin-stat card">
            <span>Total users</span>
            <strong>{stats.totalUsers}</strong>
          </article>
          <article className="admin-stat card">
            <span>Active sessions</span>
            <strong>{stats.activeUsers}</strong>
          </article>
          <article className="admin-stat card">
            <span>Admin accounts</span>
            <strong>{stats.adminUsers}</strong>
          </article>
          <article className="admin-stat card">
            <span>Total time left</span>
            <strong>{formatDuration(stats.totalRemainingSeconds)}</strong>
          </article>
        </div>

        <div className="admin-panels">
          <div className="admin-panel card">
            <div className="admin-panel__header">
              <div>
                <h2>Users</h2>
                <p>Search by email or name and filter down to active sessions.</p>
              </div>
            </div>

            <div className="admin-filterbar">
              <input
                className="admin-input"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search users"
              />
              <button
                className="button button--secondary"
                type="button"
                onClick={() => setSearchQuery(searchInput.trim())}
              >
                Search
              </button>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={activeOnly}
                  onChange={(event) => setActiveOnly(event.target.checked)}
                />
                <span>Active only</span>
              </label>
            </div>

            {listError ? <p className="admin-message admin-message--error">{listError}</p> : null}

            <div className="admin-user-list">
              {users.length === 0 ? (
                <p className="admin-empty">No users matched the current filters.</p>
              ) : (
                users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    className={`admin-user-row${selectedUserId === user.id ? ' is-selected' : ''}`}
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <div>
                      <strong>{user.name || user.email}</strong>
                      <span>{user.email}</span>
                    </div>
                    <div className="admin-user-row__meta">
                      <span className={`admin-badge${user.hasActiveSession ? ' admin-badge--success' : ''}`}>
                        {user.hasActiveSession ? 'Active' : user.role}
                      </span>
                      <span>{formatDuration(user.totalSecondsRemaining)}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="admin-panel card">
            <div className="admin-panel__header">
              <div>
                <h2>User details</h2>
                <p>Inspect current session state, remaining time, and recent activity.</p>
              </div>
            </div>

            {detailError ? <p className="admin-message admin-message--error">{detailError}</p> : null}

            {!selectedUser ? (
              <p className="admin-empty">Select a user to view account details.</p>
            ) : (
              <div className="admin-detail">
                <div className="admin-detail__grid">
                  <div className="admin-detail-card">
                    <span>Email</span>
                    <strong>{selectedUser.email}</strong>
                  </div>
                  <div className="admin-detail-card">
                    <span>Provider</span>
                    <strong>{selectedUser.authProvider}</strong>
                  </div>
                  <div className="admin-detail-card">
                    <span>Role</span>
                    <strong>{selectedUser.role}</strong>
                  </div>
                  <div className="admin-detail-card">
                    <span>Joined</span>
                    <strong>{formatDate(selectedUser.createdAt)}</strong>
                  </div>
                  <div className="admin-detail-card">
                    <span>Trial time</span>
                    <strong>{formatDuration(selectedUser.trialSecondsRemaining)}</strong>
                  </div>
                  <div className="admin-detail-card">
                    <span>Purchased time</span>
                    <strong>{formatDuration(selectedUser.purchasedSecondsRemaining)}</strong>
                  </div>
                </div>

                <div className="admin-session card">
                  <div className="admin-session__header">
                    <h3>Session state</h3>
                    <span className={`admin-badge${selectedUser.hasActiveSession ? ' admin-badge--success' : ''}`}>
                      {selectedUser.hasActiveSession ? 'Active session' : 'Inactive'}
                    </span>
                  </div>

                  <div className="admin-session__grid">
                    <div>
                      <span>Started</span>
                      <strong>{formatDate(selectedUser.activeSession?.startedAt || null)}</strong>
                    </div>
                    <div>
                      <span>Last heartbeat</span>
                      <strong>{formatDate(selectedUser.activeSession?.lastHeartbeatAt || null)}</strong>
                    </div>
                    <div>
                      <span>Consumed</span>
                      <strong>{formatDuration(selectedUser.activeSession?.consumedSeconds || 0)}</strong>
                    </div>
                    <div>
                      <span>Source</span>
                      <strong>{selectedUser.activeSession?.source || 'Not available'}</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="admin-subheading">Recent transactions</h3>
                  <div className="admin-transaction-list">
                    {selectedTransactions.length === 0 ? (
                      <p className="admin-empty">No transactions found for this user yet.</p>
                    ) : (
                      selectedTransactions.map((transaction) => (
                        <article key={transaction.id} className="admin-transaction-row">
                          <div>
                            <strong>{transaction.description || transaction.type}</strong>
                            <span>{formatDate(transaction.timestamp)}</span>
                          </div>
                          <div className="admin-transaction-row__meta">
                            <span>{transaction.type}</span>
                            <strong>{formatSignedDuration(transaction.amount)}</strong>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="admin-panel card">
          <div className="admin-panel__header">
            <div>
              <h2>Recent activity</h2>
              <p>Latest purchases and session usage across all accounts.</p>
            </div>
          </div>

          <div className="admin-transaction-list">
            {recentTransactions.length === 0 ? (
              <p className="admin-empty">No recent transactions yet.</p>
            ) : (
              recentTransactions.map((transaction) => (
                <article key={transaction.id} className="admin-transaction-row">
                  <div>
                    <strong>{transaction.user?.email || 'Unknown user'}</strong>
                    <span>{transaction.description || transaction.type}</span>
                  </div>
                  <div className="admin-transaction-row__meta">
                    <span>{formatDate(transaction.timestamp)}</span>
                    <strong>{formatSignedDuration(transaction.amount)}</strong>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
