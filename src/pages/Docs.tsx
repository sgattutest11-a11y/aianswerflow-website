import { docsSections } from '../data/site'

export function Docs() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Docs</p>
          <h1>Everything a new user needs to get started</h1>
          <p>
            Organize the product documentation around onboarding, settings, troubleshooting, and
            common questions.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container card-grid card-grid--three">
          {docsSections.map((section) => (
            <article key={section.title} className="card info-card">
              <span className="pill">Guide</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
