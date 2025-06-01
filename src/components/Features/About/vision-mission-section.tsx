

export default function VisionMissionSection() {
  return (
    <section className="w-full py-12 lg:py-20 bg-[#F7F7FB]">
      <div className="container px-5 flex flex-col gap-y-5 md:px-6 mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-20">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">Our Vision and Mission</h2>
          <p className="mx-auto max-w-[700px]  md:text-xl font-light text-sm">
            We aim to help businesses of all sizes use technology to solve problems, take advantage of opportunities,
            and build a better future.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Image Column */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gray-100 rounded-2xl transform rotate-3"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gray-100 rounded-2xl transform -rotate-3"></div>
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
                <img
                  src="/images/robot-puzzle.png"
                  alt="Robot placing a puzzle piece"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-y-8 lg:gap-y-14">
            <div className="space-y-3">
              <h3 className=" font-bold text-2xl md:text-3xl">Mission</h3>
              <p className="font-light text-sm">
                To help businesses sell better, faster, and smarter using real, working AI.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-2xl md:text-3xl">Vision</h3>
              <p className="font-light text-sm">
                To change how companies connect with their customers by making intelligent sales automation the new
                normal. Bringing minimal delays and missed opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
