import { Code2, MonitorSmartphone, PanelsTopLeft } from 'lucide-react'
import heroImage from '../assets/hero.png'

export function ScreenshotGallery() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Screenshots</p>
          <h2>A dark UI built for long technical sessions</h2>
          <p>
            Showcase the product with desktop-style panels, subtle accents, and readable surfaces
            that fit an AI developer tool.
          </p>
        </div>

        <div className="screenshot-grid">
          <article className="card screenshot-card screenshot-card--large">
            <div className="screenshot-card__header">
              <PanelsTopLeft size={18} />
              <span>Interview workspace</span>
            </div>
            <img src={heroImage} alt="AI Answerflow desktop preview" />
          </article>

          <article className="card screenshot-card">
            <div className="screenshot-card__header">
              <Code2 size={18} />
              <span>Live coding hints</span>
            </div>
            <div className="mock-console">
              <span>{'>'} Clarify approach</span>
              <span>{'>'} Compare trade-offs</span>
              <span>{'>'} Explain complexity</span>
            </div>
          </article>

          <article className="card screenshot-card">
            <div className="screenshot-card__header">
              <MonitorSmartphone size={18} />
              <span>Remote interview view</span>
            </div>
            <div className="mock-window">
              <div className="mock-window__line" />
              <div className="mock-window__line mock-window__line--short" />
              <div className="mock-window__panel" />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
