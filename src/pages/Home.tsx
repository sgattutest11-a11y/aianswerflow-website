import { FAQ } from '../components/FAQ'
import { FeatureSection } from '../components/FeatureSection'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { PricingSection } from '../components/PricingSection'
import { ScreenshotGallery } from '../components/ScreenshotGallery'
import { trustedLogos } from '../data/site'

export function Home() {
  return (
    <>
      <Hero />

      <section className="section section--compact">
        <div className="container">
          <div className="trusted-strip card">
            <span className="trusted-strip__title">Trusted by Developers</span>
            <div className="trusted-strip__items">
              {trustedLogos.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureSection />
      <HowItWorks />
      <ScreenshotGallery />
      <PricingSection />
      <FAQ />
    </>
  )
}
