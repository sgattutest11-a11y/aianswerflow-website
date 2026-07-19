import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="page-hero page-hero--centered">
      <div className="container page-hero__content">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist or has moved.</p>
        <div className="hero-actions">
          <Link to="/" className="button button--primary">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  )
}
