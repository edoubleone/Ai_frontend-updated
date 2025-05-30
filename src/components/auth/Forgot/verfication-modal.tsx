"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Loader2 } from 'lucide-react'

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  onVerificationComplete: (code: string) => void
}

export function VerificationModal({ isOpen, onClose, email, onVerificationComplete }: VerificationModalProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(18)
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isOpen])

  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      inputRefs.current[0]?.focus()
    }
  }, [isOpen])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }

    setCode(newCode)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "")
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

  const handleConfirm = async () => {
    const verificationCode = code.join("")
    if (verificationCode.length === 6) {
      setIsVerifying(true)
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false)
        onVerificationComplete(verificationCode)
      }, 1500)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    // Simulate resend API call
    setTimeout(() => {
      setIsResending(false)
      setTimeLeft(18)
      setCode(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-xl">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password Verification</h2>
        </div>

        {/* Verification Code Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <span className="text-blue-500 font-semibold text-lg">{formatTime(timeLeft)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          We have sent a 6- digit verification pin to your mail/
          <br />
          Phone number. Please, provide the digits to continue!
        </p>

        {/* Confirm Button */}
        <div className="mb-6">
          <Button
            onClick={handleConfirm}
            disabled={code.join("").length !== 6 || isVerifying}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : "Confirm"}
          </Button>
        </div>

        {/* Resend Link */}
        <div className="text-center mb-6">
          <span className="text-gray-600">{"Didn't get pin? "}</span>
          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || isResending}
            className="text-blue-500 hover:text-blue-600 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? "Sending..." : "Resend"}
          </button>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
        </div>
      </div>
    </div>
  )
}
