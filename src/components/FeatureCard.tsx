import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
  bullets: string[]
}

export function FeatureCard({ icon, title, description, bullets }: FeatureCardProps) {
  return (
    <article className="card feature-card">
      <div className="feature-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}
