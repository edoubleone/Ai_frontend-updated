import { EnhancedFAQSection } from "@/components/Features/Landing/enchanced-faq-section";
import PricingTable from "@/components/Features/Landing/pricing-section-new";

export default function Pricing() {
  return (
    <div className="pt-20">
      <PricingTable />
      <EnhancedFAQSection />
    </div>
  );
}
