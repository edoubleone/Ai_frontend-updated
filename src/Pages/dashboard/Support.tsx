
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facebook, Linkedin, Instagram, X } from "lucide-react";

const HelpAndSupport = () => {
  const [formData, setFormData] = useState({
    message: "",
    email: "",
    countryCode: "+1",
    phoneNumber: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const socialMediaLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      description: "Drop us a message anytime.",
      color: "text-blue-600"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      description: "Drop us a message anytime.",
      color: "text-blue-700"
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: "Drop us a message anytime.",
      color: "text-pink-600"
    },
    {
      name: "X",
      icon: X,
      description: "Drop us a message anytime.",
      color: "text-gray-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="h-full gap-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Help and Support</h1>

          <div className="flex h-full w-full justify-evenly bg-background py-8 rounded-lg">
            <div className="w-[40%]">
              <p className="text-gray-600 mb-8">
                If you have any inquiries, get in touch with us. We'll be happy to help you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Lorem ipsum sit dolor amec Lorem ipsum sit dolor amec Lorem ipsum sit dolor amec"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="elizabeth@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Select value={formData.countryCode} onValueChange={(value) => handleInputChange("countryCode", value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{formData.countryCode}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+234">🇳🇬 +234</SelectItem>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="8023456789"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                  >
                    Proceed
                  </Button>
                </div>
              </form>
            </div>

            <div className="h-[calc(100vh-100px)] bg-gray-50 w-[1px]" />

            <div className="">
                <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h3>
                    <div className="space-y-4">
                    {socialMediaLinks.map((social, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className={`p-2 rounded-full ${index != socialMediaLinks.length-1 && "bg-[#2B32C5] text-white"} ${social.color}`}>
                            <social.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{social.name}</h4>
                            <p className="text-sm text-gray-600">{social.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;