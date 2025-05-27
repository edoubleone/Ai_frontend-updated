"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Zap, Target, Globe, Puzzle, Bot, Mic, BarChart3 } from "lucide-react"

const benefits = [
  {
    icon: MessageSquare,
    title: "Talk to Customers Anytime",
    description:
      "Maintain an open communication with your customers around the clock, ensuring they never feel alone or unsupported.",
    featured: true,
    color: "blue",
  },
  {
    icon: Zap,
    title: "Fast Replies Build Trust",
    description: "Respond to inquiries in a matter of seconds, demonstrating a commitment to customer satisfaction.",
    featured: false,
    color: "green",
  },
  {
    icon: Target,
    title: "Smarter AI Lead Sorting",
    description:
      "Focus on high-potential leads with advanced AI that filters and sorts prospects, so you engage only those ready to convert.",
    featured: false,
    color: "purple",
  },
  {
    icon: Globe,
    title: "Be Everywhere At Everytime",
    description:
      "From messages to emails, reach your audience everywhere and maximize your brand's presence, outreach, and engagement.",
    featured: false,
    color: "orange",
  },
  {
    icon: Puzzle,
    title: "Works With What You Already Use",
    description:
      "Experience the convenience of easy integration with your current CRM systems, e-commerce platforms, and other essential business tools.",
    featured: false,
    color: "teal",
  },
  {
    icon: Bot,
    title: "Automation That Feels Human",
    description:
      "Automate essential processes such as upselling, generating quotes, and conducting follow-ups, all while maintaining a conversational tone.",
    featured: false,
    color: "indigo",
  },
  {
    icon: Mic,
    title: "Voice That Doesn't Feel Like AI",
    description:
      "A voice powered by AI, crafted to sound human — warm, natural, and expressive. It doesn't just speak, it connects.",
    featured: false,
    color: "pink",
  },
  {
    icon: BarChart3,
    title: "Know What's Working And When",
    description:
      "Monitor key metrics such as conversion rates, performance indicators, and the factors driving your sales.",
    featured: false,
    color: "red",
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
    <section id="benefits" className="bg-white py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            Benefits of subscribing to <span className="text-blue-600">ArgenticAI</span>.
          </h2>
          <p className="mx-auto max-w-4xl text-lg text-gray-600 leading-relaxed">
            Subscribe to ArgenticAI and unlock advanced AI-powered insights, streamline your workflow, save valuable
            time, and enhance decision-making. Enjoy personalized support and continuous updates designed to help you
            stay ahead, increase productivity, and achieve your goals faster and smarter.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`p-6 rounded-2xl transition-all duration-300 h-full ${
                  benefit.featured
                    ? "bg-blue-600 text-white shadow-lg transform group-hover:scale-105"
                    : hoveredCard === index
                      ? "bg-white shadow-xl transform scale-105 border-2 border-blue-200"
                      : "bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                    benefit.featured
                      ? "bg-white/20"
                      : hoveredCard === index
                        ? "bg-blue-600 scale-110"
                        : "bg-blue-100 group-hover:bg-blue-200"
                  }`}
                >
                  <benefit.icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      benefit.featured ? "text-white" : hoveredCard === index ? "text-white" : "text-blue-600"
                    }`}
                  />
                </div>

                <h3
                  className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                    benefit.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {benefit.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed transition-colors duration-300 ${
                    benefit.featured ? "text-blue-100" : "text-gray-600"
                  }`}
                >
                  {benefit.description}
                </p>

                {/* Hover indicator */}
                {hoveredCard === index && !benefit.featured && (
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium animate-in slide-in-from-left-2 duration-300">
                    <span>Learn more</span>
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          
        </div>
      </div>
    </section>
  )
}
