import { howItWorksSteps } from '../data/site'

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">How It Works</p>
          <h2>Prepare. Perform. Review.</h2>
          <p>
            One loop per round you are preparing for. Each review sets up the next practice
            session.
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
