import { Bot, Braces, Video } from 'lucide-react'
import { featureCards } from '../data/site'
import { FeatureCard } from './FeatureCard'

const icons = [
  <Bot key="bot" size={22} />,
  <Braces key="braces" size={22} />,
  <Video key="video" size={22} />,
]

export function FeatureSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Features</p>
          <h2>Interview support that stays practical</h2>
          <p>
            The experience is designed for real interviews, not generic chat. Keep answers clear,
            relevant, and useful under pressure.
          </p>
        </div>

        <div className="card-grid card-grid--three">
          {featureCards.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={icons[index]}
              title={feature.title}
              description={feature.description}
              bullets={feature.bullets}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
