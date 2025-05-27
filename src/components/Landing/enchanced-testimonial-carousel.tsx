"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur. Risus dolor orci amet condimentum nisl bibendum viverra pretium. Enim amet a facilisis aliquet fringilla suspendisse. Cursus arcu id et risus aliquet ac.",
    author: "Elizabeth Kafaru",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet consectetur. Morbi vitae ut nullam molestie arcu. Tincidunt et suscipit bibendum fermentum sodales nunc. Lacinia lorem eu arcu nec cursus adipiscing quis.",
    author: "Elizabeth Kafaru",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    content:
      "Lorem ipsum dolor sit amet consectetur. Morbi vitae ut nullam molestie arcu. Tincidunt et suscipit bibendum fermentum sodales nunc. Lacinia lorem eu arcu nec cursus adipiscing quis.",
    author: "Elizabeth Kafaru",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    content:
      "Lorem ipsum dolor sit amet consectetur. Morbi vitae ut nullam molestie arcu. Tincidunt et suscipit bibendum fermentum sodales nunc. Lacinia lorem eu arcu nec cursus adipiscing quis.",
    author: "Elizabeth Kafaru",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Morbi vitae ut nullam molestie arcu. Tincidunt et suscipit bibendum fermentum sodales nunc. Lacinia lorem eu arcu nec cursus adipiscing quis.",
    author: "Elizabeth Kafaru",
    role: "UI/UX Designer",
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
    <section id="testimonials-carousel" className="py-20 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">What Our Client Said about us</h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <Button
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= testimonials.length - 4}
              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Testimonials Grid - 4 cards in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${currentIndex}`}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                index === 0 ? "bg-blue-600 text-white" : "bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              {/* Testimonial Content */}
              <div className="mb-6">
                <p className={`text-sm leading-relaxed ${index === 0 ? "text-blue-100" : "text-gray-600"}`}>
                  {testimonial.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                  <AvatarFallback className="bg-orange-500 text-white font-medium">
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
