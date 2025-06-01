import { ContactForm } from "./contact-form"
import { MapComponent } from "./map-component"

export default function ContactSection() {
  const address = "Bethlehem Ave, 1519, Dundalk, Maryland 21222, US"
  const coordinates = { lat: 39.2504, lng: -76.5011 } // Example coordinates for Dundalk, MD

  return (
    <section className="w-full py-20 pb-12 md:py-16 lg:py-20"> {/* Removed text-white */}
      <div className="max-w-screen-2xl px-5 md:px-10 lg:pt-5 lg:px-16 mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          {/* Contact Form Column */}
          <div>
            <div className="mb-8">
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-2">Get in touch</h2>
              <p className="font-light text-sm">Our friendly team would love to hear from you.</p>
            </div>
            <ContactForm />
          </div>

          {/* Map Column */}
          <div className="h-full">
            <MapComponent address={address} coordinates={coordinates} />
          </div>
        </div>
      </div>
    </section>
  )
}
