export default function AboutUsSection() {
  return (
    <section className="w-full py-24 px-5 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="md:text-4xl lg:text-5xl font-heavy text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className=" md:text-xl text-gray-600 font-normal text-md">We turn Leads into Paying Clients</p>
        </div>

        {/* Image Section */}
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-4xl">
            <img
              src="/images/robot-hero.png"
              alt="AI robot working on laptop with city skyline background"
              className="w-full h-auto rounded-2xl shadow-lg object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
