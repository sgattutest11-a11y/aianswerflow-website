import { PricingSection } from '../components/PricingSection'

export function Pricing() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Pricing</p>
          <h1>Choose the plan that matches your interview pace</h1>
          <p>
            Keep the free tier for light practice, or upgrade to Pro when you want unlimited
            access and premium models.
          </p>
        </div>
      </section>

      <PricingSection standalone />

      <section className="section section--compact">
        <div className="container">
          <div className="card callout-card">
            <h2>Checkout can be wired in later</h2>
            <p>
              The `Subscribe` button is already placed so you can connect Razorpay Checkout without
              redesigning the page.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
