"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VerificationModal } from "./verfication-modal"
import { SuccessModal } from "./success-modal"
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo.png"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to send verification code
    setTimeout(() => {
      setIsSubmitting(false)
      setShowVerificationModal(true)
    }, 1500)
  }

  const handleVerificationComplete = (code: string) => {
    // Handle verification completion
    console.log("Verification code:", code)
    setShowVerificationModal(false)
    setShowSuccessModal(true)
  }

  const handleCloseModal = () => {
    setShowVerificationModal(false)
  }

  const handleBackToForm = () => {
    setIsPasswordReset(false)
    setEmail("")
  }

  const handleLoginClick = () => {
    // Navigate to login page
    window.location.href = "/login"
  }

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Panel - Form (50% width) */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 lg:px-16">
          <div className="w-full max-w-md mx-auto">
          <Link to="/" className="inline-block mb-8">
            <img
              src={logo}
              alt="Kool AI Logo"
              className="h-10 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password</h1>
              <p className="text-gray-600">No worries, we'll send you the reset instructions</p>
            </div>

            {/* Form */}
            {!isPasswordReset ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Proceed Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Proceed"}
                </Button>

                {/* Remember Password */}
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Remember password?{" "}
                    <a href="/login" className="text-blue-600 hover:underline font-medium">
                      Login
                    </a>
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Password Reset Successful</h2>
                <p className="text-gray-600">
                  Your password has been successfully reset.
                  <br />
                  You can now login with your new password.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => (window.location.href = "/login")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                  >
                    Go to Login
                  </Button>
                  <Button
                    onClick={handleBackToForm}
                    variant="outline"
                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
                  >
                    Back to reset form
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Background Image (50% width) */}
        <div className="hidden lg:block w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/background.png')",
            }}
          />
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={showVerificationModal}
        onClose={handleCloseModal}
        email={email}
        onVerificationComplete={handleVerificationComplete}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onLoginClick={handleLoginClick}
      />
    </>
  )
}
