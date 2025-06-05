"use client"

import { useState, useEffect } from "react"
import bot from "/images/bot.png"
import chat from "/images/chatting-01.png"
import database from "/images/database-locked.png"
import users from "/images/user-multiple-02.png"

const steps = [
  {
    icon: bot,
    title: "Understanding",
    description: "It understands what your customers want and gives clear answers that make sense.",
  },
  {
    icon: users,
    title: "Presence",
    description: "Connect with customers on Instagram, WhatsApp, email, and your website—wherever they are.",
  },
  {
    icon: chat,
    title: "Automate",
    description: "It follows up with customers, sends quotes, and reminds them so you don't have to do anything.",
  },
  {
    icon: database,
    title: "Analyze",
    description: "Monitor what works, what doesn't, and pinpoint areas to focus your efforts for better results.",
  },
]

export function EnhancedHowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("how-it-works")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="how-it-works" className="py-16 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-32 items-center">
          {/* Left Side - Illustration */}
          <div
            className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="mb-8 z-[2]">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Commitment</h2>
              <p className="font-light text-sm leading-relaxed">
                We believe that the best way to create successful marketing campaigns is to work closely with our
                clients to understand their goals and challenges.
              </p>
            </div>

            
            <div className="relative z-[2]">
               <img src="/images/integration.png" alt="CTA Banner Background" className="w-full lg:-mb-[180px] md:mt-14 h-auto max-w-xl ld:max-w-lg lg:mx-auto" />
            </div>

            <div className="w-[500px] h-[400px] bg-blue-600/10 blur-3xl absolute top-0 -left-40" />
            <div className="w-[500px] h-[400px] bg-blue-600/10 blur-3xl absolute -bottom-28 -right-[175%]" />
          </div>

          {/* Right Side - Content */}
          <div
            className={`transition-all flex items-end h-full duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Steps */}
            <div className="flex flex-col gap-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  {/* Step Number Badge */}
                  {/* <div className="flex-shrink-0"> */}
                    <div className="w-20 h-20 bg-[#343CED] rounded-xl flex items-center justify-center">
                      <img src={step.icon} alt="icon" className="text-white font-bold text-3xl" />
                    </div>
                  {/* </div> */}

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-xl mb-1">{step.title}</h3>
                    <p className="font-light text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
