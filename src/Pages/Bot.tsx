
import { EnhancedBenefitsSection } from "@/components/Features/Landing/enchanced-benefit-section"
import { EnhancedTestimonialsCarousel } from "@/components/Features/Landing/enchanced-testimonial-carousel"
import {DeviceShowcaseSection} from "@/components/Features/Landing/device-showcase-section"
import { PricingSection } from "@/components/Features/Landing/pricing-section"
import { EnhancedFAQSection } from "@/components/Features/Landing/enchanced-faq-section"
import { EnhancedHowItWorksSection } from "@/components/Features/Landing/enchanced-how-it-work-section"
import {EnhancedTestimonialsSection} from "@/components/Features/Landing/enchanced-testimonial-section"
import HeroSection from "@/components/Features/Landing/hero-section"




export default function Bot() {
  return (
    <div>
      <HeroSection/>

      <EnhancedTestimonialsSection/>
      <EnhancedHowItWorksSection/>
       <EnhancedBenefitsSection/>
      <DeviceShowcaseSection />
      <EnhancedTestimonialsCarousel />
      <PricingSection />
      <EnhancedFAQSection />


    </div>
  )
}