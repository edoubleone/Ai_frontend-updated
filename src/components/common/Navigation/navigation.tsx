import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import Button from "@/components/shared/button";
import { Button as IconButton } from "@/components/ui/button";
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

  // Close mobile drawer
  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 shadow-sm bg-white/95 backdrop-blur-sm">
      <div className="container px-5 mx-auto sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg">
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
                        <Link
                          to="/login"
                          className="block text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
                          onClick={handleNavigation}
                        >
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
