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
          <h2>Start free, upgrade when you need more sessions</h2>
          <p>
            The structure is ready for your product launch now, with the Pro CTA prepared for a
            later Razorpay Checkout integration.
          </p>
        </div>

        <div className="pricing-grid">
          <article className="card pricing-card">
            <span className="pricing-card__label">Free</span>
            <h3>₹0</h3>
            <p>2 sessions/day</p>
            <ul>
              <li>
                <Check size={16} />
                <span>Basic AI</span>
              </li>
              <li>
                <Check size={16} />
                <span>Practice-friendly workflow</span>
              </li>
            </ul>
          </article>

          <article className="card pricing-card pricing-card--highlight">
            <span className="pricing-card__label">Pro</span>
            <h3>₹799/month</h3>
            <p>Unlimited sessions</p>
            <ul>
              <li>
                <Check size={16} />
                <span>Claude</span>
              </li>
              <li>
                <Check size={16} />
                <span>GPT</span>
              </li>
              <li>
                <Check size={16} />
                <span>Priority access</span>
              </li>
            </ul>
            <button type="button" className="button button--primary pricing-card__cta">
              Subscribe
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
