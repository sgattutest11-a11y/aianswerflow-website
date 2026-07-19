export function Terms() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Terms</p>
          <h1>Usage and billing terms</h1>
          <p>
            The current product flow is based on sign-in plus session-time purchases, so the terms
            should describe desktop usage, payment packs, and account responsibilities.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container prose-card card">
          <h2>Usage</h2>
          <p>
            Describe who may use the product, the expected behavior, and any limits on misuse or
            account sharing.
          </p>
          <h2>Subscriptions</h2>
          <p>
            Clarify that AI Answerflow currently uses fixed time packs rather than a monthly
            subscription, and explain how purchased time is applied to a signed-in account.
          </p>
          <h2>Cancellation</h2>
          <p>
            Add final refund and cancellation terms here before launch so the pricing page and
            legal pages stay aligned with the desktop purchase flow.
          </p>
        </div>
      </section>
    </>
  )
}
