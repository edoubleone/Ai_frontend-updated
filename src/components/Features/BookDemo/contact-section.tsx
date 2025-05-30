import { ContactForm } from "./contact-form"
import { MapComponent } from "./map-component"

export default function ContactSection() {
  
  return (
    <section className="w-full py-12 md:py-16 lg:py-20"> {/* Removed text-white */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form Column */}
          <div>
            <div className="mb-8">
              <h2 className="font-light text-xl  tracking-tighter sm:text-4xl md:text-5xl mb-2">Book a Demo</h2>
              <p className="font-light text-sm">Book A Demo With Us Today</p>
            </div>
            <ContactForm />
          </div>

          {/* Map Column */}
      {/* Map Column */}
<div className="h-[200px] min-h-[100px] lg:min-h-0">
  <MapComponent/>
</div>
        </div>
      </div>
    </section>
  )
}
