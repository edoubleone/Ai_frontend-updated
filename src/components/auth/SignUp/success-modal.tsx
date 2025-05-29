"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  buttonText?: string
}

export function SuccessModal({
  isOpen,
  onClose,
  title = "Successful!",
  message = "Congratulations! You've successfully signed up to Agentic AI.",
  buttonText = "Okay",
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-white stroke-[3]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

        {/* Okay Button */}
        <Button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
