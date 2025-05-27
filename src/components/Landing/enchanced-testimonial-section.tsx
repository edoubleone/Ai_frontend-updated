"use client"

import { ArrowRight, Star, TrendingUp, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"

const stats = [
  {
    value: "150k",
    label: "Active users",
    icon: Users,
    color: "text-blue-600",
  },
  {
    value: "50k",
    label: "New users per month",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    value: "98%",
    label: "Satisfied Customers",
    icon: Heart,
    color: "text-red-600",
  },
]

const userAvatars = [
  {
    src: "/placeholder.svg?height=40&width=40",
    alt: "Sarah Johnson",
    fallback: "SJ",
    name: "Sarah J.",
  },
  {
    src: "/placeholder.svg?height=40&width=40",
    alt: "Mike Chen",
    fallback: "MC",
    name: "Mike C.",
  },
  {
    src: "/placeholder.svg?height=40&width=40",
    alt: "Emma Davis",
    fallback: "ED",
    name: "Emma D.",
  },
]

export function EnhancedTestimonialsSection() {
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

    const element = document.getElementById("testimonials")
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
    <section id="testimonials" className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Trust Indicators & Stats */}
          <div
            className={`space-y-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            {/* Trust Header */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Trusted by many across the world</h2>

              {/* Reviews Section */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex -space-x-2">
                  {userAvatars.map((user, index) => (
                    <Avatar
                      key={index}
                      className="w-10 h-10 border-2 border-white hover:scale-110 transition-transform cursor-pointer"
                      title={user.name}
                    >
                      <AvatarImage src={user.src || "/placeholder.svg"} alt={user.alt} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                        {user.fallback}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-blue-600">4.8k</span>
                    <span className="text-blue-600 font-medium">Reviews</span>
                  </div>
                  <p className="text-sm text-gray-600">Join Our digital community</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Value Proposition */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div>
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100">
                Why Choose Us
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Why Choose <span className="text-blue-600">Agentic AI</span>?
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Because it works. Because it saves time. It feels like having another teammate who never sleeps, never
                forgets to follow up, and always keeps your sales moving.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">24/7 automated customer engagement</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Never miss a lead or follow-up opportunity</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Seamless integration with your existing workflow</p>
                </div>
              </div>

              <Button
                asChild
                variant="link"
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium text-lg group"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
