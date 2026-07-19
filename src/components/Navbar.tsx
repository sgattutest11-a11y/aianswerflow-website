import { Link, NavLink } from 'react-router-dom'
import { navLinks, siteName } from '../data/site'

export function Navbar() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand-mark" aria-label={`${siteName} home`}>
          <span className="brand-mark__badge">AF</span>
          <span>{siteName}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `site-nav__link${isActive && link.to !== '/#features' ? ' is-active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="button button--ghost" aria-disabled="true">
          Login
        </button>
      </div>
    </header>
  )
}
