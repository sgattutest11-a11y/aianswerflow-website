import { contactChannels } from '../data/site'

export function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__content">
          <p className="eyebrow">Contact</p>
          <h1>Support channels for launch and feedback</h1>
          <p>
            Keep support simple: direct email for help, social links for updates, and room to add
            Discord later.
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
