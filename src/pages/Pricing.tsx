import { PricingSection } from '../components/PricingSection'

export function Pricing() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Pricing</p>
          <h1>Choose the amount of session time you need</h1>
          <p>
            New users get a short free trial. After that, session time is purchased inside the
            desktop app through fixed time packs.
          </p>
        </div>
      </section>

      <PricingSection standalone />

      <section className="section section--compact">
        <div className="container">
          <div className="card callout-card">
            <h2>Desktop checkout flow</h2>
            <p>
              AI Answerflow already exposes paid session packs through the desktop app, so the website
              should describe the in-app purchase flow instead of a monthly subscription.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
