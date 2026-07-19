import { howItWorksSteps } from '../data/site'

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">How It Works</p>
          <h2>From setup to interview confidence in minutes</h2>
          <p>
            The flow stays lightweight: open the app, ask for help, and use the guidance to shape
            your explanation and implementation.
          </p>
        </div>

        <div className="steps-grid">
          {howItWorksSteps.map((step, index) => (
            <article key={step.title} className="card step-card">
              <span className="step-card__index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
