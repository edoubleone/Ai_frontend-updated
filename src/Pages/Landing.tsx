
import { EnhancedBenefitsSection } from "@/components/Features/Landing/enchanced-benefit-section"
import {DeviceShowcaseSection} from "@/components/Features/Landing/device-showcase-section"
import { PricingSection } from "@/components/Features/Landing/pricing-section"
import { EnhancedFAQSection } from "@/components/Features/Landing/enchanced-faq-section"
import { EnhancedHowItWorksSection } from "@/components/Features/Landing/enchanced-how-it-work-section"

import HeroSection from "@/components/Features/Landing/hero-section"
import HowItWorksSection from "@/components/Features/Landing/HowItWorksSection"
import TestimonialSection from "@/components/Features/Landing/enchanced-testimonial-carousel"
import { EnhancedTestimonialsSection } from "@/components/Features/Landing/enchanced-testimonial-section"


export default function Landing() {
  return (
    <div>
      <HeroSection />
      {/* Testimonials Section - Full Width */}
      <div className="max-w-screen-2xl lg:px-16 h-full flex bg-white z-10">
        <EnhancedTestimonialsSection />
      </div>
      <HowItWorksSection />
      <EnhancedHowItWorksSection/>
      <EnhancedBenefitsSection/>
      <DeviceShowcaseSection />
      <TestimonialSection />
      <PricingSection />
      <EnhancedFAQSection />
    </div>
  )
}