import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { advantages } from '../data/site'

export function Advantages() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why AI Answerflow</p>
            <h2>Built around how you actually interview</h2>
            <p>
              No add-ons to stitch together. Everything runs inside one desktop app against the
              same resume, role notes, and session.
            </p>
          </div>

          <div className="card-grid card-grid--two">
            {advantages.map((advantage) => (
              <article key={advantage.title} className="card info-card">
                <span className="pill">{advantage.tag}</span>
                <h2>{advantage.title}</h2>
                <p>{advantage.description}</p>
                <ul className="content-list">
                  {advantage.points.map((point) => (
                    <li key={point}>
                      <Check size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--compact">
        <div className="container">
          <div className="card callout-card">
            <h2>Your next round is the one that counts</h2>
            <p>
              Download the Windows desktop app, sign in with Google, and start a practice round
              right away.
            </p>
            <div className="hero-actions">
              <Link to="/download" className="button button--primary">
                Download the app
              </Link>
              <Link to="/pricing" className="button button--secondary">
                See plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
