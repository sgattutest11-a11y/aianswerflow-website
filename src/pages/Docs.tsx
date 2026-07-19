import { docsSections } from '../data/site'

export function Docs() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Docs</p>
          <h1>Everything needed to start a desktop session</h1>
          <p>
            The docs focus on Windows setup, Google sign-in, session-time usage, and the protected
            overlay workflow.
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
