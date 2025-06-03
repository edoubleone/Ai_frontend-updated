// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react"
// import { Link } from "react-router-dom"

// export default function Footer() {
//   return (
//     <footer className="hidden w-full py-8 bg-white">
//       {/* CTA Banner Section using the imported image */}
//       <div className="relative mx-4 mb-8 lg:mx-8">
//         <div className="relative overflow-hidden rounded-3xl">
//           {/* Background Image */}
//         <img src="/images/cta-banner.png" alt="CTA Banner Background" className="w-[80%] h-auto object-cover mx-auto" />

//           {/* Content overlay */}
//           <div className="absolute inset-0 flex flex-col items-center justify-between gap-8 px-8 py-16 lg:flex-row lg:px-16 lg:py-20">
//             {/* Left side - Main heading */}
           

           
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Section */}
//       <div className="px-4 py-12 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
//             {/* Company Section */}
//             <div>
//               <h3 className="mb-6 text-lg font-semibold text-gray-900">Company</h3>
//               <ul className="space-y-4">
//                 <li>
//                   <a href="/about" className="text-base text-gray-600 transition-colors hover:text-gray-900">
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/products" className="text-base text-gray-600 transition-colors hover:text-gray-900">
//                     Products & Services
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/testimonials" className="text-base text-gray-600 transition-colors hover:text-gray-900">
//                     Testimonial
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/faq" className="text-base text-gray-600 transition-colors hover:text-gray-900">
//                     FAQ
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Links Section */}
//             <div>
//               <h3 className="mb-6 text-lg font-semibold text-gray-900">Link</h3>
//               <ul className="space-y-4">
//                 <li>
//                   <a href="/terms" className="text-base text-gray-600 transition-colors hover:text-gray-900">
//                     Terms & conditions
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/privacy" className="text-base text-gray-600 transition-colors hover:text-gray-900">
//                     Privacy policy
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Section */}
//             <div>
//               <h3 className="mb-6 text-lg font-semibold text-gray-900">Contact</h3>
//               <ul className="space-y-4">
//                 <li className="flex items-start gap-3">
//                   <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
//                   <a
//                     href="mailto:hi@digitalagency.com"
//                     className="text-base text-gray-600 transition-colors hover:text-gray-900"
//                   >
//                     hi@digitalagency.com
//                   </a>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
//                   <span className="text-base leading-relaxed text-gray-600">
//                     Jl Codelaras Selatan No 26
//                     <br />
//                     Kediri, Jawa Timur, ID
//                     <br />
//                     64213
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
//                   <a
//                     href="tel:+6281234567890"
//                     className="text-base text-gray-600 transition-colors hover:text-gray-900"
//                   >
//                     +62 812 3456 7890
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Newsletter Section */}
//             <div>
//               <h3 className="mb-6 text-lg font-semibold text-gray-900">Join our Newsletter</h3>
//               <div className="space-y-4">
//                 <Input
//                   type="email"
//                   placeholder="Your email address"
//                   className="w-full h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <Button className="w-full h-12 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
//                   Submit
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Section */}
//           <div className="pt-8 border-t border-gray-200">
//             <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
//               <p className="text-sm text-gray-500">© 2024 Copyright. All rights reserved</p>

//               <div className="flex items-center gap-8">
//                 <div className="flex items-center gap-6 text-sm text-gray-500">
//                   <Link to="/terms" className="transition-colors hover:text-gray-700">
//                     Terms
//                   </Link>
//                   <Link to="/privacy" className="transition-colors hover:text-gray-700">
//                     Privacy
//                   </Link>
//                   <Link to="/contact" className="transition-colors hover:text-gray-700">
//                     Contact
//                   </Link>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                     <Facebook className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                     <Twitter className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                     <Instagram className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                     <Linkedin className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
//                     <Youtube className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }



import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-white">
      {/* CTA Banner Section using the imported image */}
      <div className="px-5 md:px-10 lg:px-16">
        <main className="mx-auto max-w-7xl md:h-[371px] bg-[#343CED] flex flex-col md:flex-row items-center justify-evenly gap-y-10 p-10 lg:px-20 bg-[url('/images/footer-banner.png')] bg-contain bg-top md:bg-left bg-no-repeat rounded-3xl">
          <div className="w-full md:w-[40%]">
            <h2 className="text-4xl text-white font-bold lg:text-6xl leading-normal md:leading-loose">Elevate your brand Today!</h2>
          </div>
          <div className="w-full md:w-[43%] flex flex-col pt-5 md:pt-0 items-start gap-5">
            <p className="text-2xl text-white">Ready to transform your digital dresence? Let's create magic together! book our services now!</p>
            
            <button type="button" className="rounded-lg bg-white font-semibold text-[#343CED] px-[24px] py-[12px]">Book a call</button>
          </div>
        </main>
      </div>

      {/* Main Footer Section */}
      <div className="pt-12 px-5 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-y-12 mb-12 md:gap-10 lg:gap-20">
            {/* Company Section */}
            <nav className="flex w-[70%] justify-between gap-x-16">
              <div className="w-[20%]">
                <h3 className="mb-6 text-2xl md:text-xl font-semibold text-gray-900">Company</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="/about" className="text-base text-gray-600 transition-colors hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="text-base text-gray-600 transition-colors hover:text-gray-900">
                      Products & Services
                    </a>
                  </li>
                  <li>
                    <a href="/testimonials" className="text-base text-gray-600 transition-colors hover:text-gray-900">
                      Testimonial
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="text-base text-gray-600 transition-colors hover:text-gray-900">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Links Section */}
              <div>
                <h3 className="mb-6 text-2xl md:text-xl font-semibold text-gray-900">Link</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="/terms" className="text-base text-gray-600 transition-colors hover:text-gray-900">
                      Terms & conditions
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-base text-gray-600 transition-colors hover:text-gray-900">
                      Privacy policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="mb-6 text-2xl md:text-xl font-semibold text-gray-900">Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <a
                      href="mailto:hi@digitalagency.com"
                      className="text-base text-gray-600 transition-colors hover:text-gray-900"
                    >
                      hello@koolai.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-base leading-relaxed text-gray-600">
                    7404 Executive place, Lanham MD, 
                      <br />
                      United States
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <a
                      href="tel:+6281234567890"
                      className="text-base text-gray-600 transition-colors hover:text-gray-900"
                    >
                      +12029710392
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Newsletter Section */}
            <div className="w-2/5">
              <h3 className="mb-5 text-lg font-semibold text-gray-900">Join our Newsletter</h3>
              <div className="flex items-center w-full bg-[#ECECEC] rounded-lg py-2 px-3 border border-[#E2E8F0]">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-[70%] h-12 px-4 bg-transparent"
                />
                <Button className="w-[30%] h-12 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm text-gray-500">©️ 2025 Copyright. All rights reserved</p>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <Link to="/terms" className="transition-colors hover:text-gray-700">
                    Terms
                  </Link>
                  <Link to="/privacy" className="transition-colors hover:text-gray-700">
                    Privacy
                  </Link>
                  <Link to="/contact" className="transition-colors hover:text-gray-700">
                    Contact
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 transition-colors hover:text-gray-600">
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