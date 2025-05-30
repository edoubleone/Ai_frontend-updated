"use client"

import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  onLoginClick: () => void
}

export function SuccessModal({ isOpen, onLoginClick }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Successful!</h2>
          <p className="text-gray-600 text-base">
            Password Reset successfully done.
          </p>
        </div>

        {/* Login Button */}
        <Button
          onClick={onLoginClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200"
        >
          Login
        </Button>
      </div>
    </div>
  )
}
