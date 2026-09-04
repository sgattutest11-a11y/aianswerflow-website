import { CheckCircle2, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import { heroChecks, siteTagline } from '../data/site'

export function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-section__grid">
        <div>
          <p className="eyebrow">{siteTagline}</p>
          <h1>Ace your interview with real-time AI answer guidance</h1>
          <p className="hero-copy">
            AI Answerflow is currently available only on Windows, with Google sign-in,
            session-based access, and structured interview rounds with AI feedback for job
            interviews, coding rounds, and system design rounds in English. Answer guidance stays
            in a private overlay that is kept out of your screen share.
          </p>

          <ul className="hero-checks">
            {heroChecks.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="hero-actions">
            <Link to="/download" className="button button--primary">
              Download Free
            </Link>
            <Link to="/docs" className="button button--secondary">
              <PlayCircle size={18} />
              Read Docs
            </Link>
          </div>
        </div>

        <div className="hero-visual card">
          <div className="hero-visual__badge">Session workspace preview</div>
          <img src={heroImage} alt="AI Answerflow interface preview" />
          <div className="hero-visual__panel">
            <span>Question</span>
            <p>Help me answer this clearly, confidently, and in a structured way.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
