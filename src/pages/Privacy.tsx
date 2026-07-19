export function Privacy() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy overview</h1>
          <p>
            This page should describe how AnswerFlow handles account sign-in, billing state, and
            desktop-generated session content. Replace it with reviewed legal text before launch.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container prose-card card">
          <h2>Data handling</h2>
          <p>
            AnswerFlow should only collect the minimum data needed to operate Google sign-in,
            manage session-time balances, process payments, and support the desktop workflow.
          </p>
          <h2>Account information</h2>
          <p>
            Describe what account information is stored for Google-authenticated users and what
            billing metadata is retained for purchased session time.
          </p>
          <h2>Updates</h2>
          <p>
            Replace this summary with final legal wording before launch while keeping the page
            layout and navigation unchanged.
          </p>
        </div>
      </section>
    </>
  )
}
