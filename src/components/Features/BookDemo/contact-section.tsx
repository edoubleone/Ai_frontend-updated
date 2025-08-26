import { ContactForm } from "./contact-form";

export default function ContactSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      {" "}
      {/* Removed text-white */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form Column */}
          <div>
            <div className="mb-8 space-y-2">
              <h2 className="text-xl font-semibold tracking-tighter sm:text-4xl md:text-5xl mb-2">
                Book a Demo
              </h2>
              <p className="font-normal text-sm sm:text-base text-[#737373]">
                See How KoolAI Can Transform Your Customer Engagement
              </p>
            </div>
            <ContactForm />
          </div>

          <div>
            <img
              src="/images/demo.png"
              alt="demo png"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
