import { faqItems } from '../data/site'

export function FAQ() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Common questions</h2>
          <p>
            These questions cover pricing, downloads, and current product limits such as language support.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.question} className="card faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
