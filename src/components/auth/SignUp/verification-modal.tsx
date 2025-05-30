"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"


interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (code: string) => void
  onSuccess: () => void
  email?: string
  phone?: string
}

export function VerificationModal({ isOpen, onClose, onVerify, onSuccess, email, phone }: VerificationModalProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(18)
  const [isLoading, setIsLoading] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(18)
      setCanResend(false)
      setCode(["", "", "", "", "", ""])
    }
  }, [isOpen])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleConfirm = async () => {
    const verificationCode = code.join("")
    if (verificationCode.length !== 6) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onVerify(verificationCode)
      onClose()
      // Show success modal after verification
      setTimeout(() => {
        onSuccess()
      }, 300)
    }, 2000)
  }

  const handleResend = () => {
    setTimeLeft(18)
    setCanResend(false)
    setCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Verification</h2>

        {/* Code Input */}
        <div className="flex justify-center gap-3 mb-4">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <span className="text-blue-600 font-medium">{formatTime(timeLeft)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          We have sent a 6-digit verification pin to your {email ? "mail" : "phone number"}
          {email && (
            <>
              <br />
              <span className="font-medium">{email}</span>
            </>
          )}
          {phone && (
            <>
              <br />
              <span className="font-medium">{phone}</span>
            </>
          )}
          . Please, provide the digits to continue!
        </p>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirm}
          disabled={code.join("").length !== 6 || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg mb-6"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </div>
          ) : (
            "Confirm"
          )}
        </Button>

        {/* Resend Link */}
        <div className="text-center mb-4">
          <span className="text-gray-600">Didn't get pin? </span>
          {canResend ? (
            <button onClick={handleResend} className="text-blue-600 hover:underline font-medium">
              Resend
            </button>
          ) : (
            <span className="text-gray-400">Resend</span>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </Link>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-6">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}
      </div>
    </div>
  )
}
