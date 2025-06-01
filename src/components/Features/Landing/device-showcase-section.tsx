 "use client"

import { useState, useEffect } from "react"

export function DeviceShowcaseSection() {
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

    const element = document.getElementById("device-showcase")
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
    <section
      id="device-showcase"
      className="max-w-sceen-2xl bg-white w-full"
    >
      <div className="relative w-full">
        {/* Main Device Mockup - Full Width */}
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <div className="w-full">
            <img
              src="/images/hero-device-mockup.png"
              alt="Kool AI Platform Interface - Everything made easy for you"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Floating Elements for Visual Enhancement */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full transition-all duration-1000 ${
              isVisible ? "animate-bounce" : "opacity-0"
            }`}
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className={`absolute top-20 right-20 w-6 h-6 bg-purple-300/30 rounded-full transition-all duration-1000 ${
              isVisible ? "animate-bounce" : "opacity-0"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className={`absolute bottom-20 left-20 w-8 h-8 bg-blue-300/30 rounded-full transition-all duration-1000 ${
              isVisible ? "animate-bounce" : "opacity-0"
            }`}
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className={`absolute bottom-10 right-10 w-5 h-5 bg-indigo-300/30 rounded-full transition-all duration-1000 ${
              isVisible ? "animate-bounce" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>
    </section>
  )
}
