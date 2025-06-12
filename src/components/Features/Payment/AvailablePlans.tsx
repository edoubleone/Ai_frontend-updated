import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Button from "@/components/shared/button";
import useCurrency from "@/hooks/use-currency";
import { useAuth } from "@/context/auth-provider";
import { Dialog } from "@/components/ui/dialog";
import MakePlanPayment from "./make-payment";

interface Plan {
  name: string;
  price: number;
}

const AvailablePlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isAuthenticated } = useAuth();

  const { currencySymbol, exchangeRate } = useCurrency();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "month",
      buttonText: "Your Plan",
      buttonVariant: "lightLavender" as const,
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
      buttonText: isAuthenticated ? "Switch Plan" : "Try for Free",
      buttonVariant: "solid" as const,
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
      buttonText: isAuthenticated ? "Switch Plan" : "Try for Free",
      buttonVariant: "solid" as const,
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
      buttonText: isAuthenticated ? "Switch Plan" : "Try for Free",
      buttonVariant: "solid" as const,
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
      buttonText: isAuthenticated ? "Switch Plan" : "Try for Free",
      buttonVariant: "solid" as const,
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

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-[48px] font-semibold text-black mb-4">
          Choose your plan
        </h2>
        <p className="text-[#737373] text-base mb-4">
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-4 mb-8">
        <div className="bg-[url('/images/blue-gradient.png')] rounded-xl w-full bg-no-repeat bg-center bg-cover min-h-60 flex basis-full md:basis-auto" />
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative w-full min-h-60 border border-t-2 border-t-defaultBlue rounded-lg p-6 flex flex-col justify-between`}
          >
            <div className="text-start flex flex-col justify-between h-full">
              <div>
                <h3
                  className={`font-semibold mb-4 text-xl  ${
                    plan.customText ? "text-dark" : "text-defaultBlue"
                  }`}
                >
                  {plan.name}
                </h3>

                {plan.customText && (
                  <div className="mb-6">
                    <p className="text-sm font-medium underline text-defaultBlue">
                      {plan.customText}
                    </p>
                  </div>
                )}
              </div>

              {!plan.customText && (
                <div className="flex items-baseline">
                  <span
                    className={`text-3xl font-black text-dark
                `}
                  >
                    {plan.price !== null
                      ? `${currencySymbol || "$"} ${(
                          plan.price * exchangeRate
                        ).toFixed(0)}`
                      : "Contact us"}
                  </span>
                  <span className={`text-xs mt-auto text-[#737373]`}>
                    /{plan.period}
                  </span>
                </div>
              )}

              <Button
                onClick={() => {
                  if (plan.buttonText === "Switch Plan") {
                    handlePlanClick({
                      price: plan?.price || 0,
                      name: plan.name,
                    });
                  }
                }}
                variant={plan.buttonVariant}
              >
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {selectedPlan && <MakePlanPayment plan={selectedPlan} />}
      </Dialog>
    </div>
  );
};

export default AvailablePlans;
