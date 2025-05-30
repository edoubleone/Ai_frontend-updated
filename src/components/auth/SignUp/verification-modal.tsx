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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl">
        {/* Close Button */}
        <button onClick={onClose} className="absolute text-gray-400 top-4 right-4 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">Verification</h2>

        {/* Code Input */}
        <div className="flex justify-center gap-3 mb-4">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-lg font-semibold text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="mb-6 text-center">
          <span className="font-medium text-blue-600">{formatTime(timeLeft)}</span>
        </div>

        {/* Description */}
        <p className="mb-8 leading-relaxed text-center text-gray-600">
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
          className="w-full py-3 mb-6 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
        <div className="mb-4 text-center">
          <span className="text-gray-600">Didn't get pin? </span>
          {canResend ? (
            <button onClick={handleResend} className="font-medium text-blue-600 hover:underline">
              Resend
            </button>
          ) : (
            <span className="text-gray-400">Resend</span>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-6">
            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
