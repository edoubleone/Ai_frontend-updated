"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    content:
      "Kool AI has made workflow and interaction with cient really flexible for me. So flexible",
    author: "Adewale James",
    role: "CEO Havid Solutions",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    content:
      "My business have scaled up 10% since i started using KoolAI. koolAI help me to keep up with my client.",
    author: "Rotimi Philips",
    role: "Business Analyst",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    content:
      "I need your facebook features too also instagram, twitter. Every integration that you have.",
    author: "Ruth Ene",
    role: "Adrova Autos",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    content:
      "A great App. Easy to you and very flexible",
    author: "Elizabeth Kafaru",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    content:
      "Great. Are you available in Ghana?.",
    author: "Amah Koffi",
    role: "Trade Specialise at Aptah Logistics",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function EnhancedTestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - 3)) % (testimonials.length - 3))
  }

  const getVisibleTestimonials = () => {
    return testimonials.slice(currentIndex, currentIndex + 4)
  }

  return (
    <section id="testimonials-carousel" className="py-4 bg-white sm:py-12">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-xl text-3xl font-semibold sm:text-4xl">What Our Client Said about us</h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <Button
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= testimonials.length - 4}
              className="w-12 h-12 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Testimonials Grid - 4 cards in a row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}`}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                index === 0 ? "bg-blue-600 text-white" : "bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              {/* Testimonial Content */}
              <div className="mb-6">
                <p className={`font-light text-sm leading-relaxed ${index === 0 ? "text-blue-100" : "text-gray-600"}`}>
                  {testimonial.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                  <AvatarFallback className="font-medium text-white bg-orange-500">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className={`font-medium ${index === 0 ? "text-white" : "text-gray-900"}`}>
                    {testimonial.author}
                  </h4>
                  <p className={`text-sm ${index === 0 ? "text-blue-200" : "text-gray-500"}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
