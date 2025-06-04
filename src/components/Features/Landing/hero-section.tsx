import { Button } from "@/components/ui/button"
import { EnhancedTestimonialsSection } from "@/components/Features/Landing/enchanced-testimonial-section"
const HeroSection = () => {
  return (
    <div className="bg-white pt-2 sm:pt-4">
      <div className="mx-auto max-w-screen-xl lg:px-8">
        {/* Hero Content */}
        <div className="flex flex-col items-center text-center gap-y-3 md:gap-y-5 px-4 pt-20 pb-10 lg:py-20">
          <h1 className="font-bold text-[24px] md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-tight">
            Sell Smarter, Engage Better, and <br />
            Grow your <span className="text-blue-600">business</span> faster
          </h1>

          <p className="w-[90%] md:w-[55%] lg:max-w-2xl text-md md:text-lg lg:text-xl">
            Create your AI manager in 30 minutes with our user-friendly builder. No tech skills required! Pay only when
            it engages with your customers.
          </p>

          <div className="flex justify-center gap-4 sm:gap-6 mt-2">
            <a href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Build a Bot
              </Button>
            </a>
            <a href="/demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full px-8 py-4 text-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Demo
              </Button>
            </a>
          </div>
        </div>

        {/* Hero Image Section with Overlapping Testimonials */}
        <div className="relative">
          <div className="flex justify-center items-center px-4">
            <div className="relative w-full max-w-6xl">
              <div className="flex justify-center w-full px-6 md:px-20">
                <img
                  src="/images/desktop.png"
                  alt="AI Manager Platform Interface"
                  className="w-full max-w-[2000px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Testimonials Section - Full Width */}
          <div className="max-w-screen-2xl">
            <EnhancedTestimonialsSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
