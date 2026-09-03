import { Check } from 'lucide-react'
import { interviewTypes } from '../data/site'

export function PrivacyAndUseCases() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Stays private</p>
            <h2>Guidance that stays on your screen, out of your share</h2>
            <p>
              The answer overlay is a private, always-on-top window that is kept out of screen
              shares and recordings in supported video calls.
            </p>
          </div>

          <div className="card-grid card-grid--two">
            <article className="card info-card">
              <span className="pill">Private overlay</span>
              <h2>On your side, not on their screen</h2>
              <ul className="content-list">
                <li>Always-on-top answer window during practice</li>
                <li>Kept out of screen shares and recordings</li>
                <li>No bot joins your call and it never speaks for you</li>
              </ul>
            </article>

            <article className="card info-card">
              <span className="pill">What you control</span>
              <h2>Answer help you can hide in one motion</h2>
              <ul className="content-list">
                <li>Show or hide the overlay instantly</li>
                <li>Resize and reposition to keep it clear of your work</li>
                <li>Works with keyboard shortcuts for a smooth flow</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--compact">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">One app</p>
            <h2>Built for the rounds you actually face</h2>
            <p>
              Use the same desktop workflow to prepare across the interview types that matter for
              your search.
            </p>
          </div>

          <div className="card-grid card-grid--three">
            {interviewTypes.map((type) => (
              <article key={type} className="card info-card">
                <h2>{type}</h2>
                <p className="content-list">
                  <Check size={16} />
                  <span>Answer guidance tailored to the round</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
