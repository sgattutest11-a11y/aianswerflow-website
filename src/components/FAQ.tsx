import { faqItems } from '../data/site'

export function FAQ() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Short answers before launch</h2>
          <p>
            These common questions cover pricing, downloads, and the upcoming checkout flow.
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
