import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "month",
      buttonText: "Your Plan",
      buttonVariant: "outline" as const,
      isPopular: false,
      features: {
        languages: "Multi",
        conversations: "30/ Month",
        support: "Via e-mail",
        chatHistory: "14 days",
        faq: "10",
        assistantSecurity: true,
        collectLeads: true,
        modelGPT: true,
        sendLeads: true,
        customisation: false,
        sendDirectly: false,
        unlimitedConversation: false,
        restAPI: false,
        liveAgentTransfer: false,
        fineTuning: false,
      },
      upgradePrice: 29,
    },
    {
      name: "Basic",
      price: 75,
      period: "month",
      buttonText: "Try for Free",
      buttonVariant: "default" as const,
      isPopular: false,
      features: {
        languages: "Multi",
        conversations: "200/ Month",
        support: "Via e-mail",
        chatHistory: "3 months",
        faq: "50",
        assistantSecurity: true,
        collectLeads: true,
        modelGPT: true,
        sendLeads: true,
        customisation: false,
        sendDirectly: false,
        unlimitedConversation: false,
        restAPI: false,
        liveAgentTransfer: false,
        fineTuning: false,
      },
      upgradePrice: 29,
    },
    {
      name: "Standard",
      price: 150,
      period: "month",
      buttonText: "Try for Free",
      buttonVariant: "default" as const,
      isPopular: true,
      features: {
        languages: "Multi",
        conversations: "400/ Month",
        support: "Priority support",
        chatHistory: "1 year",
        faq: "200",
        assistantSecurity: true,
        collectLeads: true,
        modelGPT: true,
        sendLeads: true,
        customisation: true,
        sendDirectly: true,
        unlimitedConversation: false,
        restAPI: false,
        liveAgentTransfer: false,
        fineTuning: false,
      },
      upgradePrice: 29,
    },
    {
      name: "Professional",
      price: 300,
      period: "month",
      buttonText: "Try for Free",
      buttonVariant: "default" as const,
      isPopular: false,
      features: {
        languages: "Multi",
        conversations: "900/ Month",
        support: "Priority support",
        chatHistory: "Unlimited",
        faq: "300",
        assistantSecurity: true,
        collectLeads: true,
        modelGPT: true,
        sendLeads: true,
        customisation: true,
        sendDirectly: true,
        unlimitedConversation: true,
        restAPI: true,
        liveAgentTransfer: true,
        fineTuning: true,
      },
      upgradePrice: 29,
    },
    {
      name: "Enterprise",
      price: null,
      period: "month",
      buttonText: "Try for Free",
      buttonVariant: "default" as const,
      isPopular: false,
      customText: "Contact Sales",
      features: {
        languages: "Multi",
        conversations: "Unlimited",
        support: "Personal manager",
        chatHistory: "Unlimited",
        faq: "Unlimited",
        assistantSecurity: true,
        collectLeads: true,
        modelGPT: true,
        sendLeads: true,
        customisation: true,
        sendDirectly: true,
        unlimitedConversation: true,
        restAPI: true,
        liveAgentTransfer: true,
        fineTuning: true,
      },
      upgradePrice: 29,
    },
  ];

  const featureRows = [
    { key: "languages", label: "Languages", hasTooltip: false },
    { key: "conversations", label: "Conversations", hasTooltip: true },
    { key: "support", label: "Support", hasTooltip: false },
    { key: "chatHistory", label: "Chat history", hasTooltip: false },
    { key: "faq", label: "FAQ", hasTooltip: false },
    { key: "assistantSecurity", label: "Assistant Security", hasTooltip: true },
    {
      key: "collectLeads",
      label: "Collect and export leads",
      hasTooltip: false,
    },
    { key: "modelGPT", label: "Model GPT assistant", hasTooltip: false },
    {
      key: "sendLeads",
      label: "Send collected leads to your email",
      hasTooltip: false,
    },
    { key: "customisation", label: "Customisation", hasTooltip: false },
    {
      key: "sendDirectly",
      label: "Send collected leads directly in your personal messengers",
      hasTooltip: true,
    },
    {
      key: "unlimitedConversation",
      label: "Unlimited conversation",
      hasTooltip: true,
    },
    { key: "restAPI", label: "Rest API", hasTooltip: true },
    {
      key: "liveAgentTransfer",
      label: "Live agent transfer",
      hasTooltip: true,
    },
    { key: "fineTuning", label: "Fine tuning", hasTooltip: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Choose your plan
        </h2>
        <p className="text-muted-foreground mb-8">
          Flexible Plans for Every Business
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm ${
              !isAnnual
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>

          <Switch
            checked={isAnnual}
            onCheckedChange={(checked) => setIsAnnual(checked)}
          />

          <span
            className={`text-sm ${
              isAnnual ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            Annually
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative border rounded-lg p-6 ${
              plan.isPopular
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card"
            }`}
          >
            {index === 0 && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-lg -z-10" />
            )}

            <div className="text-center">
              <h3
                className={`font-semibold mb-4 text-xl  ${
                  plan.isPopular ? "text-primary-foreground" : "text-[#343CED]"
                }`}
              >
                {plan.name}
              </h3>

              {plan.customText ? (
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {plan.customText}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span
                      className={`text-3xl font-bold ${
                        plan.isPopular
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      €{plan.price}
                    </span>
                    <span
                      className={`text-sm ml-1 ${
                        plan.isPopular
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      /{plan.period}
                    </span>
                  </div>
                </div>
              )}

              <Button
                variant={plan.isPopular ? "secondary" : plan.buttonVariant}
                className="w-full bg-[#343CED]"
              >
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Features Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="bg-muted p-4">
          <h4 className="font-semibold text-foreground">Plan</h4>
        </div>

        <div className="divide-y divide-border">
          {featureRows.map((row) => (
            <div key={row.key} className="grid grid-cols-6 items-center">
              <div className="p-4 font-medium text-foreground text-[14px] flex items-center gap-2">
                <p className="w-[80%]">{row.label}</p>
                {row.hasTooltip && (
                  <Info className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              {plans.map((plan) => (
                <div
                  key={`${plan.name}-${row.key}`}
                  className="p-4 text-center"
                >
                  {typeof plan.features[
                    row.key as keyof typeof plan.features
                  ] === "boolean" ? (
                    plan.features[row.key as keyof typeof plan.features] ? (
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )
                  ) : (
                    <span className="text-sm text-foreground">
                      {
                        plan.features[
                          row.key as keyof typeof plan.features
                        ] as string
                      }
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Upgrade Section */}
        <div className="grid grid-cols-6 border-t border-border">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Remove the "Powered by Resonoon" badge per assistant per month
            </p>
          </div>

          {plans.map((plan) => (
            <div key={`upgrade-${plan.name}`} className="p-4 text-center">
              <div className="mb-2">
                <span className="text-lg font-bold text-foreground">
                  €{plan.upgradePrice}
                </span>
                <Info className="w-4 h-4 text-muted-foreground inline ml-1" />
              </div>
              <Button variant="default" size="sm" className="w-full">
                Upgrade
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Don't know which plan is right for you? Use the{" "}
          <a href="#" className="text-primary hover:underline">
            ROI Calculator
          </a>
        </p>
      </div>
    </div>
  );
};

export default PricingTable;
