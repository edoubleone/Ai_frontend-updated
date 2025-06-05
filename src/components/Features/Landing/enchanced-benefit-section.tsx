"use client"

import { useState, useEffect } from "react"
import {
  MessageSquare,
  Zap,
  Target,
  Globe,
  Puzzle,
  Bot,
  Mic,
  BarChart3,
} from "lucide-react"

const benefits = [
  {
    icon: MessageSquare,
    title: "Talk to Customers Anytime",
    description:
      "Maintain an open communication with your customers around the clock, ensuring they never feel alone or unsupported.",
  },
  {
    icon: Zap,
    title: "Fast Replies Build Trust",
    description:
      "Respond to inquiries in a matter of seconds, demonstrating a commitment to customer satisfaction.",
  },
  {
    icon: Target,
    title: "Smarter AI Lead Sorting",
    description:
      "Focus on high-potential leads with advanced AI that filters and sorts prospects, so you engage only those ready to convert.",
  },
  {
    icon: Globe,
    title: "Be Everywhere At Everytime",
    description:
      "From messages to emails, reach your audience everywhere and maximize your brand's presence, outreach, and engagement.",
  },
  {
    icon: Puzzle,
    title: "Works With What You Already Use",
    description:
      "Experience the convenience of easy integration with your current CRM systems, e-commerce platforms, and other essential business tools.",
  },
  {
    icon: Bot,
    title: "Automation That Feels Human",
    description:
      "Automate essential processes such as upselling, generating quotes, and conducting follow-ups, all while maintaining a conversational tone.",
  },
  {
    icon: Mic,
    title: "Voice That Doesn't Feel Like AI",
    description:
      "A voice powered by AI, crafted to sound human — warm, natural, and expressive. It doesn't just speak, it connects.",
  },
  {
    icon: BarChart3,
    title: "Know What's Working And When",
    description:
      "Monitor key metrics such as conversion rates, performance indicators, and the factors driving your sales.",
  },
]

export function EnhancedBenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("benefits")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="benefits" className="bg-white py-5 md:py-10">
      <div className="container mx-auto px-4 md:px-5 lg:px-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className=" font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Benefits of subscribing to{" "}
            <span className="text-blue-800">ArgenticAI</span>.
          </h2>
          <p className="mx-auto w-[90%] md:w-[75%] lg:w-[60%] font-light text-sm text-gray-600 leading-relaxed">
            Subscribe to ArgenticAI and unlock advanced AI-powered insights,
            streamline your workflow, save valuable time, and enhance
            decision-making. Enjoy personalized support and continuous updates
            designed to help you stay ahead, increase productivity, and achieve
            your goals faster and smarter.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const isActive = hoveredCard === index

            return (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`p-6 rounded-2xl h-full transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white transform"
                      : "bg-[#F4F4F4] hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 group-hover:bg-blue-200 text-blue-600"
                    }`}
                  >
                    <benefit.icon className="w-6 h-6" />
                  </div>

                  <h3
                    className={`font-semibold text-xl  mb-3 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {benefit.title}
                  </h3>

                  <p
                    className={`font-normal text-sm leading-tight transition-colors duration-300 ${
                      isActive ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {benefit.description}
                  </p>

                  {isActive && (
                    <div className="mt-4 flex items-center text-white text-sm font-medium animate-in slide-in-from-left-2 duration-300">
                     
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
