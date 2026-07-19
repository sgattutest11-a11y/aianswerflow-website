export function Download() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Download</p>
          <h1>Get the latest Windows build</h1>
          <p>
            This page is ready for the Electron installer flow, release notes, and quick setup
            guidance.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container card-grid card-grid--two">
          <article className="card info-card">
            <span className="pill">Windows</span>
            <h2>Download Latest</h2>
            <p>Version 1.0.0</p>
            <button type="button" className="button button--primary">
              Download Latest
            </button>
            <p className="muted-text">Later this button can point to your Electron installer.</p>
          </article>

          <article className="card info-card">
            <span className="pill">What’s included</span>
            <h2>Release Notes</h2>
            <ul className="content-list">
              <li>Desktop app shell</li>
              <li>Dark UI foundations</li>
              <li>Interview workflow structure</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section section--compact">
        <div className="container">
          <article className="card info-card">
            <span className="pill">Installation Guide</span>
            <h2>Install in three quick steps</h2>
            <ol className="content-list content-list--ordered">
              <li>Download the latest Windows installer.</li>
              <li>Run setup and allow the app to finish installing.</li>
              <li>Launch AnswerFlow AI and begin your first session.</li>
            </ol>
          </article>
        </div>
      </section>
    </>
  )
}
