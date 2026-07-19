import { Link } from 'react-router-dom'
import { siteName } from '../data/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link to="/" className="brand-mark brand-mark--footer">
            <span className="brand-mark__badge">AF</span>
            <span>{siteName}</span>
          </Link>
          <p className="site-footer__copy">
            AI interview support for job interviews, practice sessions, and interview preparation in English.
          </p>
        </div>

        <div>
          <h3 className="footer-title">Product</h3>
          <div className="footer-links">
            <Link to="/pricing">Pricing</Link>
            <Link to="/download">Download</Link>
            <Link to="/docs">Docs</Link>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Company</h3>
          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© 2022 {siteName}. All rights reserved.</span>
      </div>
    </footer>
  )
}
