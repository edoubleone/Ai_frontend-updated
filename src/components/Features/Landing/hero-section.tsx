import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <div className="bg-white pt-2 sm:pt-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center px-4 py-16 lg:py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Sell Smarter, Engage Better, and <br />
            Grow your <span className="text-blue-600">business</span> faster
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl lg:text-2xl text-gray-600 mb-10">
            Create your AI manager in 30 minutes with our user-friendly builder. No tech skills required! Pay only when
            it engages with your customers.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-2">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium"
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Link to="#demo">Login</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image Section - Much closer to buttons */}
        <div className="flex justify-center items-center px-4 -mb-64 -mt-64">
          <div className="relative w-full max-w-6xl">
            <div className="flex justify-center">
              <img
                src="/images/phonedesktop.png"
                alt="AI Manager Platform Interface"
                className="w-full max-w-6xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection