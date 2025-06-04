"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useLocation } from "react-router-dom"
import logo from "@/assets/images/logo.png"

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close mobile drawer
  const handleNavigation = () => {
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 shadow-sm bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-5 sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="transition-opacity hover:opacity-80">
            <div className="flex items-center justify-center rounded-lg">
              <img 
                src={logo} 
                alt="Kool AI Logo" 
                className="object-contain w-full h-full p-1"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavigation}
                className={`font-medium text-sm transition-colors duration-200 hover:text-blue-600 ${
                  location.pathname === item.href
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link
              to="/login"
              className="font-light text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Login
            </Link>
            <Link to="/signup" className="inline-block">
              <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-10 h-10" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col mt-6 space-y-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleNavigation}
                      className={`text-left text-lg font-medium transition-colors duration-200 ${
                        location.pathname === item.href ? "text-blue-600" : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-6 space-y-4 border-t">
                    <Link
                      to="/login"
                      className="block text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
                      onClick={handleNavigation}
                    >
                      Login
                    </Link>
                    <Link to="/signup" onClick={handleNavigation}>
                      <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
