import { Button } from "@/components/ui/button"
import telegram from "/images/telegram.png"
import email from "/images/email 2.png"
import instagram from "/images/instagram.png"
import linktree from "/images/linktree.png"
import messanger from "/images/messanger.png"
import slack from "/images/slack.png"
import soundwave from "/images/soundwave.png"
import twitter from "/images/twitter.png"
import whatsapp from "/images/WhatsApp-White-Dark-Background-Logo.wine 3.png"


const icons = [email, whatsapp, telegram, messanger, slack, instagram, twitter, linktree, soundwave]


const HeroSection = () => {
  return (
    <div className="pt-2 bg-white sm:pt-4">
      <div className="max-w-screen-xl mx-auto overflow-hidden lg:px-8">
        {/* Hero Content */}
        <div className="flex flex-col items-center px-4 pt-20 pb-10 text-center gap-y-3 md:gap-y-5 lg:py-20">
          <h1 className="font-bold capitalize text-[24px] px-4 md:text-5xl lg:text-6xl text-gray-900 leading-tight">
            Grow your business by using <span className="text-blue-600">AI</span> to make smarter engagement and sales
          </h1>

          <p className="w-[90%] md:w-[75%] lg:w-[65%] text-md md:text-lg lg:text-xl">
            Enhance your business with intelligent automated responses across all platforms.
          </p>

          <div className="flex justify-center gap-4 mt-2 sm:gap-6">
            <a href="/signup" className="w-full sm:w-auto">
              <Button
                className="w-full py-[27px] bg-blue-600 border-2 border-blue-600 hover:bg-blue-700 text-white px-8 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Build a Bot
              </Button>
            </a>
            <a href="/demo" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full px-8 py-[27px] text-lg text-blue-600 font-medium border-2 border-blue-600 hover:bg-blue-600 shadow-md hover:text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Demo
              </Button>
            </a>
          </div>

          <div className="flex items-center mt-10 overflow-x-auto gap-x-6">
            {icons.map((icon, index) => (
              <img src={icon} key={index} alt="social icon" width={50} height={50} />
            ))}
          </div>
        </div>

        {/* Hero Image Section with Overlapping Testimonials */}
        <div className="relative">
          <div className="flex justify-center md:-mb-[100px] lg:-mb-[200px] items-center px-4">
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
        </div>
      </div>
    </div>
  )
}

export default HeroSection
