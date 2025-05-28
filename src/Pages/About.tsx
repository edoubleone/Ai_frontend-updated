import AboutUsSection from "@/components/Features/About/about-section"
import VisionMissionSection from "@/components/Features/About/vision-mission-section"
import WhatDrivesUsSection from "@/components/Features/About/what-drive-us-section"

// Change to a named function component with explicit default export
function About() {
  return (
    <div>
      <AboutUsSection />
      <VisionMissionSection />
      <WhatDrivesUsSection />
    </div>
  )
}

// Add this line to explicitly export the component
export default About