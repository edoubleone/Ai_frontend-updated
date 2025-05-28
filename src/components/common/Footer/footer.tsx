import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-white w-full py-8">
      {/* CTA Banner Section using the imported image */}
      <div className="relative mx-4 mb-8 lg:mx-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Image */}
        <img src="/images/cta-banner.png" alt="CTA Banner Background" className="w-[80%] h-auto object-cover mx-auto" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-16 lg:px-16 lg:py-20">
            {/* Left side - Main heading */}
           

           
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className=" px-4 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    About
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Products & Services
                  </a>
                </li>
                <li>
                  <a href="/testimonials" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Testimonial
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Link</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Terms & conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:hi@digitalagency.com"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-base"
                  >
                    hi@digitalagency.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-base leading-relaxed">
                    Jl Codelaras Selatan No 26
                    <br />
                    Kediri, Jawa Timur, ID
                    <br />
                    64213
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:+6281234567890"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-base"
                  >
                    +62 812 3456 7890
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">Join our Newsletter</h3>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm">© 2024 Copyright. All rights reserved</p>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <Link to="/terms" className="hover:text-gray-700 transition-colors">
                    Terms
                  </Link>
                  <Link to="/privacy" className="hover:text-gray-700 transition-colors">
                    Privacy
                  </Link>
                  <Link to="/contact" className="hover:text-gray-700 transition-colors">
                    Contact
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
