import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { User, Bot, Share2, CheckCircle, ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react"

interface OnboardingModalProps {
  onClose: () => void
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  const steps = [
    {
      title: "Welcome to AI Sales Assistant!",
      content:
        "Transform your sales process with intelligent AI assistants that work around the clock to engage and convert your customers.",
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Setup Your Profile",
      content:
        "Click on your profile icon in the top right corner to update your business details, contact information, and preferences.",
      icon: <User className="w-8 h-8 text-white" />,
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Create Your AI Assistant",
      content:
        "Navigate to the dashboard and click 'Create Assistant' to configure your AI's personality, knowledge base, and conversation flow.",
      icon: <Bot className="w-8 h-8 text-white" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Share & Deploy",
      content:
        "Once your assistant is ready, copy the embed code for your website or share the direct chat link with your customers.",
      icon: <Share2 className="w-8 h-8 text-white" />,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "You're All Set!",
      content:
        "Your AI sales assistant is ready to help convert visitors into customers. Need help? Our support team is here for you 24/7.",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      color: "from-emerald-500 to-green-600",
    },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (isAnimating) return

    if (currentStep < steps.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      }, 150)
    } else {
      onClose()
    }
  }

  const handleBack = () => {
    if (isAnimating || currentStep === 0) return

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(currentStep - 1)
      setIsAnimating(false)
    }, 150)
  }

  const handleStepClick = (stepIndex: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(stepIndex)
      setIsAnimating(false)
    }, 150)
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 overflow-hidden">
        <CardHeader className="relative p-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className={`bg-gradient-to-r ${steps[currentStep].color} p-8 text-white text-center`}>
            <div className="mb-4 flex justify-center">{steps[currentStep].icon}</div>
            <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </div>

          <div className="px-6 -mt-2">
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div
            className={`transition-all duration-300 ${isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">{steps[currentStep].title}</h2>
            <p className="text-gray-600 text-center leading-relaxed mb-8">{steps[currentStep].content}</p>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentStep
                    ? "bg-blue-600 scale-125"
                    : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300 hover:bg-gray-400"
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isAnimating}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={isAnimating}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {currentStep < steps.length - 1 && (
            <div className="text-center mt-4">
              <Button variant="ghost" onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
                Skip onboarding
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
