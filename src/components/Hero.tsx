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
          <h1>Keep interview answers close without leaving your workflow</h1>
          <p className="hero-copy">
            AnswerFlow is a Windows desktop app with Google sign-in, session-based access, a
            protected overlay, and fast answer generation for live technical interviews.
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
          <div className="hero-visual__badge">Desktop overlay preview</div>
          <img src={heroImage} alt="AnswerFlow AI interface preview" />
          <div className="hero-visual__panel">
            <span>Question</span>
            <p>Explain the time complexity, trade-offs, and edge cases clearly before you code.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
