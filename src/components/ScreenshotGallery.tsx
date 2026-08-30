import { PanelsTopLeft } from 'lucide-react'
import heroImage from '../assets/hero.png'

export function ScreenshotGallery() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Screenshots</p>
          <h2>A dark UI built for focused interview sessions</h2>
          <p>
            Showcase the product with desktop-style panels, subtle accents, and readable surfaces
            that fit a fast interview workflow.
          </p>
        </div>

        <div className="screenshot-grid">
          <article className="card screenshot-card screenshot-card--large">
            <div className="screenshot-card__header">
              <PanelsTopLeft size={18} />
              <span>Practice workspace</span>
            </div>
            <img src={heroImage} alt="AI Answerflow desktop preview" />
          </article>
        </div>
      </div>
    </section>
  )
}
