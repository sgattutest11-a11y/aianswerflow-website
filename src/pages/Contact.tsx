import { contactChannels } from '../data/site'

export function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Contact</p>
          <h1>Support and setup links</h1>
          <p>
            Keep contact simple: direct email for support and clear links for setup, pricing, and
            downloads.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container card-grid card-grid--two">
          {contactChannels.map((channel) => (
            <a
              key={channel.label}
              className="card contact-card"
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <span className="pill">{channel.label}</span>
              <h2>{channel.value}</h2>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
