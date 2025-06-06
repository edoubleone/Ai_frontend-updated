"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


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

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          What Our Client Said about us
        </h2>
        
        <div className="flex gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${currentIndex}`}
            className={`rounded-2xl p-6 transition-all duration-300 ${
              index === currentIndex
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-900"
            }`}
          >
            <p className={`text-sm leading-relaxed mb-6 ${
              index === currentIndex ? "text-white" : "text-gray-600"
            }`}>
              {testimonial.content}
            </p>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                <AvatarFallback>EK</AvatarFallback>
              </Avatar>
              <div>
                <h4 className={`font-semibold ${
                  index === currentIndex ? "text-white" : "text-gray-900"
                }`}>
                  {testimonial.author}
                </h4>
                <p className={`text-sm ${
                  index === currentIndex ? "text-blue-200" : "text-gray-500"
                }`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
