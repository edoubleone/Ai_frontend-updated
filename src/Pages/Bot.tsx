import { DashboardLayout } from "@/components/bot/dashboard-layout"
import { EnhancedBenefitsSection } from "@/components/Landing/enchanced-benefit-section"
import {DeviceShowcaseSection} from "@/components/Landing/device-showcase-section"
import { PricingSection } from "@/components/Landing/pricing-section"
import { EnhancedFAQSection } from "@/components/Landing/enchanced-faq-section"
import Footer from "@/components/Landing/footer"


export default function Bot() {
  return (
    <div>
     
      <PricingSection />
      <EnhancedFAQSection />
      <Footer />

    </div>
  )
}