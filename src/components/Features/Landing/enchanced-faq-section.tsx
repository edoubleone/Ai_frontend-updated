"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    id: "item-1",
    question: "What types of AI solutions does KoolAI offer?",
    answer:
      "We provide machine learning, automation, data analytics, and custom AI software tailored to your industry needs.",
  },
  {
    id: "item-2",
    question: "How long does it take to implement an AI solution?",
    answer:
      "Implementation time varies depending on the complexity of your requirements. Simple chatbots can be deployed in 30 minutes, while custom AI solutions typically take 2-4 weeks from start to finish.",
  },
  {
    id: "item-3",
    question: "Is my data secure with KoolAI?",
    answer:
      "Absolutely. We use enterprise-grade security with end-to-end encryption, GDPR compliance, and SOC 2 certification. Your data is stored securely and never shared with third parties.",
  },
  {
    id: "item-4",
    question: "Can small businesses benefit from your services?",
    answer:
      "Yes! Our platform is designed for businesses of all sizes. We offer flexible pricing plans and our pay-per-engagement model means you only pay when the AI actually helps your customers.",
  },
  {
    id: "item-5",
    question: "Do I need technical skills to use Kool AI?",
    answer:
      "Not at all! Our drag-and-drop builder is designed for non-technical users. You can create and deploy AI chatbots without any coding knowledge. We also provide comprehensive tutorials and support.",
  },
  {
    id: "item-6",
    question: "What platforms can I integrate with?",
    answer:
      "Kool AI integrates with popular platforms including websites, WhatsApp, Facebook Messenger, Instagram, email systems, CRM tools, and many more through our API and webhook connections.",
  },
  {
    id: "item-7",
    question: "How does the pay-for-results pricing work?",
    answer:
      "You only pay when your AI bot successfully engages with customers. This includes answering questions, capturing leads, or completing transactions. No engagement, no charge - it's that simple.",
  },
  {
    id: "item-8",
    question: "Can I customize the AI's responses?",
    answer:
      "Yes, you have full control over your AI's personality, tone, and responses. You can train it with your specific business information, FAQs, and brand voice to ensure consistent customer experiences.",
  },
]

export function EnhancedFAQSection() {
  return (
    <section id="faq" className="py-10 sm:py-20 bg-[#EEEEFD]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl text-gray-900 md:text-4xl lg:text-5xl mb-6">FAQs</h2>
          <p className="font-light mx-auto max-w-3xl text-lg text-gray-600">
            Find answers to common questions about our platform, bot creation, and our pay-for-results pricing model.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4" defaultValue="item-1">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-lg border border-gray-200 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-normal text-[#2E2E2E]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-normal text-sm pb-6  leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      
      </div>
    </section>
  )
}
