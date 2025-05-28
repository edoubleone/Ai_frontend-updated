import { ContactForm } from "./contact-form"
import { MapComponent } from "./map-component"

export default function ContactSection() {
  const address = "Bethlehem Ave, 1519, Dundalk, Maryland 21222, US"
  const coordinates = { lat: 39.2504, lng: -76.5011 } // Example coordinates for Dundalk, MD

  return (
    <section className="w-full py-12 md:py-16 lg:py-20"> {/* Removed text-white */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-gray-900 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">Get in touch</h2>
              <p className="text-gray-600">Our friendly team would love to hear from you.</p>
            </div>
            <ContactForm />
          </div>

          {/* Map Column */}
          <div className="h-full min-h-[400px] lg:min-h-0">
            <MapComponent address={address} coordinates={coordinates} />
          </div>
        </div>
      </div>
    </section>
  )
}
