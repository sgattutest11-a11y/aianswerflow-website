import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Contact } from './pages/Contact'
import { Docs } from './pages/Docs'
import { Download } from './pages/Download'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Pricing } from './pages/Pricing'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  return null
}

function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/download" element={<Download />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
