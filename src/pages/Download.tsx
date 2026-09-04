const DOWNLOAD_URL =
  'https://github.com/sgattutest11-a11y/aianswerflow-website/releases/download/v1.0.0/Ai.AnswerFlow-Setup-2.0.0.exe'

export function Download() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Download</p>
          <h1>Get the latest Windows desktop build</h1>
          <p>
            AI Answerflow is currently supported only on Windows. Use this page for the Windows
            installer, release notes, and first-run guidance around Google sign-in and session setup.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container card-grid card-grid--two">
          <article className="card info-card">
            <span className="pill">Windows</span>
            <h2>Download Latest</h2>
            <p>Ai AnswerFlow Setup 2.0.0 (Windows, ~205 MB)</p>
            <a
              className="button button--primary"
              href={DOWNLOAD_URL}
              download="Ai-AnswerFlow-Setup-2.0.0.exe"
            >
              Download Latest
            </a>
            <p className="muted-text">
              Latest packaged Electron release. On Windows, save and run the installer.
            </p>
          </article>

          <article className="card info-card">
            <span className="pill">What’s included</span>
            <h2>Release Notes</h2>
            <ul className="content-list">
              <li>Google sign-in flow</li>
              <li>Guided interview rounds</li>
              <li>Session timer and purchase flow</li>
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
              <li>Launch AI Answerflow, sign in with Google, and start your first session.</li>
            </ol>
          </article>
        </div>
      </section>
    </>
  )
}
