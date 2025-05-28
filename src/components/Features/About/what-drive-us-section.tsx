import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, Zap, Workflow, BookOpen, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Independent AI Agents",
    description:
      "Our AI agents operate autonomously, capable of independent thinking, strategic planning, and taking decisive action with minimal human oversight. This level of independence not only enhances operational efficiency but also streamlines complex processes across various departments. By handling routine and data-driven tasks, these AI agents free up human talent to focus on more complex, creative, and high-impact work.",
  },
  {
    icon: Target,
    title: "Context-Aware Intelligence",
    description:
      "Experience advanced AI that understands its environment and accurately interprets user intentions. By recognizing diverse inputs and responding effectively, it makes smarter decisions based on available information and user actions. This heightened awareness leads to more personalized interactions, improved user experiences, and better outcomes, empowering businesses to deliver smarter, more intuitive solutions every time.",
  },
  {
    icon: Zap,
    title: "Goal-Driven Agents",
    description:
      "Our design approach creates AI agents that actively pursue specific goals rather than simply reacting to situations. These agentic AIs take initiative in completing tasks and solving problems, driving meaningful progress. By focusing on clear missions and outcomes, they ensure alignment with larger strategic objectives, empowering organizations to achieve more efficient and effective results across their operations.",
  },
  {
    icon: Workflow,
    title: "Seamless Workflow Integration",
    description:
      "Our technology effortlessly integrates with your existing workflows and systems, ensuring smooth adoption without disruption. By working harmoniously with what you already use, our AI maximizes efficiency and effectiveness from day one. This seamless fit helps organizations leverage advanced technology confidently, enhancing productivity while maintaining operational continuity and minimizing the learning curve for teams.",
  },
  {
    icon: BookOpen,
    title: "Adaptive AI Learning",
    description:
      "Our AI systems prioritize continuous learning and flexibility, enabling real-time adaptation to new data, user feedback, and changing conditions. This dynamic approach prevents obsolescence by evolving with emerging needs and challenges. By staying responsive and up-to-date, our AI agents ensure sustained effectiveness, helping organizations remain agile and competitive in an ever-changing environment.",
  },
  {
    icon: Users,
    title: "Human-AI Partnership",
    description:
      "We envision a collaborative future where AI enhances human skills rather than replaces them. Our AI systems serve as reliable partners, amplifying human effort and creativity. This synergy fosters greater innovation and productivity, empowering people to achieve more while leveraging the strengths of advanced technology for smarter, more impactful results across all industries.",
  },
]

export default function WhatDrivesUsSection() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">What drives us</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're building a future where your customers don't have to wait
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="bg-gray-50 border-0 shadow-none hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
