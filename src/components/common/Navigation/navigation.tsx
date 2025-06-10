import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

import Button from "@/components/shared/button";
import { useAuth } from "@/context/auth-provider";
import LogOutDialog from "../logout-dialog";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, setLogOut } = useAuth();

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#F0EFFB] bg-white">
      <div className="container px-5 mx-auto py-5 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={'/kool_ai.png'}
              alt="Kool AI Logo"
              width={103}
              className="object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavigation}
                className={`font-medium text-sm transition-colors duration-200 hover:text-defaultBlue ${
                  location.pathname === item.href
                    ? "text-defaultBlue font-bold"
                    : "text-[#5C5C5C]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="font-light text-gray-700 transition-colors duration-200 hover:text-blue-600"
                >
                  <Button className="!text-defaultBlue" variant="ghost">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={() => setLogOut(true)}
                  className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="w-6 h-6" />
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
                        location.pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="flex flex-col pt-6 border-t gap-y-4">
                    {isAuthenticated ? (
                      <>
                        <Link to="/dashboard" onClick={handleNavigation}>
                          <Button variant="ghost" className="!text-defaultBlue">
                            Dashboard
                          </Button>
                        </Link>
                        <Button onClick={() => setLogOut(true)}>Log Out</Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={handleNavigation}>
                          <Button variant="ghost" className="!text-defaultBlue">
                            Login
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={handleNavigation}>
                          <Button className="w-full text-white bg-blue-600 hover:bg-blue-700">
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <LogOutDialog />
      </div>
    </nav>
  );
}
