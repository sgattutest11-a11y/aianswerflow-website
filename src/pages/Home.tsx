import { Advantages } from '../components/Advantages'
import { FAQ } from '../components/FAQ'
import { FeatureSection } from '../components/FeatureSection'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { PricingSection } from '../components/PricingSection'
import { PrivacyAndUseCases } from '../components/PrivacyAndUseCases'
import { ScreenshotGallery } from '../components/ScreenshotGallery'
import { trustedLogos } from '../data/site'

export function Home() {
  return (
    <>
      <Hero />

      <section className="section section--compact">
        <div className="container">
          <div className="trusted-strip card">
            <span className="trusted-strip__title">Built for interview prep</span>
            <div className="trusted-strip__items">
              {trustedLogos.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <FeatureSection />
      <PrivacyAndUseCases />
      <ScreenshotGallery />
      <PricingSection />
      <FAQ />
      <Advantages />
    </>
  )
}
