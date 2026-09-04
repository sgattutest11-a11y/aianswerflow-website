import { Check } from 'lucide-react'

type PricingSectionProps = {
  standalone?: boolean
}

export function PricingSection({ standalone = false }: PricingSectionProps) {
  return (
    <section className={`section${standalone ? ' section--tight-top' : ''}`}>
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Start with a short trial, then buy more session time as needed</h2>
          <p>
            The current server flow is time-based: a short free trial for new users, followed by
            paid time packs inside the desktop app.
          </p>
        </div>

        <div className="pricing-grid">
          <article className="card pricing-card">
            <span className="pricing-card__label">Trial</span>
            <h3>₹0</h3>
            <p>10 minutes free</p>
            <ul>
              <li>
                <Check size={16} />
                <span>Google sign-in</span>
              </li>
              <li>
                <Check size={16} />
                <span>Guided interview rounds</span>
              </li>
            </ul>
          </article>

          <article className="card pricing-card pricing-card--highlight">
            <span className="pricing-card__label">Time packs</span>
            <h3>$10+</h3>
            <p>Buy session time in the app</p>
            <ul>
              <li>
                <Check size={16} />
                <span>1 hour for $10</span>
              </li>
              <li>
                <Check size={16} />
                <span>2 hours for $20</span>
              </li>
              <li>
                <Check size={16} />
                <span>3 hours for $30</span>
              </li>
            </ul>
            <button type="button" className="button button--primary pricing-card__cta">
              Buy in Desktop App
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
