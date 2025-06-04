import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bot } from "lucide-react"
import { Link } from "react-router-dom"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-5 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-blue-600">Kool Ai</span>
          </div>

          {/* Back Button */}
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Main Content Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8 md:p-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-wide">PRIVACY POLICY</h1>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                We value your trust. Our Privacy Policy explains how we collect, use, and protect your data when you
                engage with our services. We're committed to safeguarding your information with industry-leading
                standards. For more details, please review our Privacy Policy.
              </p>

              {/* Additional content sections can be added here */}
              <div className="mt-8 space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, use our
                    services, or contact us for support. This may include your name, email address, and other contact
                    information.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services, process
                    transactions, send you technical notices and support messages, and communicate with you about
                    products, services, and promotional offers.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction. We regularly review our
                    security practices to ensure your data remains safe.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at
                    privacy@koolai.com or through our support channels.
                  </p>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
