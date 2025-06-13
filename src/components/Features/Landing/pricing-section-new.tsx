import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Button from "@/components/shared/button";
import useCurrency from "@/hooks/use-currency";
import { useAuth } from "@/context/auth-provider";
import { useNavigate } from "react-router-dom";

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isAuthenticated } = useAuth();

  const { currencySymbol, exchangeRate } = useCurrency();

  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "month",
      buttonText: "Select Plan",
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
      buttonText: isAuthenticated ? "Select Plan" : "Try for Free",
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
      buttonText: isAuthenticated ? "Select Plan" : "Try for Free",
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
      buttonText: isAuthenticated ? "Select Plan" : "Try for Free",
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
      buttonText: isAuthenticated ? "Select Plan" : "Try for Free",
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
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="bg-[url('/images/blue-gradient.png')] rounded-xl w-full bg-no-repeat bg-center bg-cover min-h-60 flex basis-full md:basis-auto md:w-72" />
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative w-full min-h-60 sm:min-w-72 sm:w-fit border border-t-2 border-t-defaultBlue rounded-lg p-6 flex flex-col justify-between`}
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
                  if (plan.name === "Try for Free") {
                    navigate("/signup");
                  } else if (plan.name === "Free") {
                    navigate("/dashboard/payments");
                  } else {
                    navigate("/dashboard/payments");
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

      {/* Features Table */}
      <div className="bg-card border rounded-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 font-semibold text-foreground text-left">
                Plan
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className="p-4 font-semibold text-foreground text-center"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureRows.map((row) => (
              <tr key={row.key}>
                <td className="p-4 font-medium text-foreground text-[14px] flex items-center gap-2">
                  <p>{row.label}</p>
                  {row.hasTooltip && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3ZM11.7188 17.25C11.5333 17.25 11.3521 17.195 11.1979 17.092C11.0437 16.989 10.9236 16.8426 10.8526 16.6713C10.7817 16.5 10.7631 16.3115 10.7993 16.1296C10.8354 15.9477 10.9247 15.7807 11.0558 15.6496C11.1869 15.5185 11.354 15.4292 11.5359 15.393C11.7177 15.3568 11.9062 15.3754 12.0775 15.4464C12.2488 15.5173 12.3952 15.6375 12.4983 15.7917C12.6013 15.9458 12.6562 16.1271 12.6562 16.3125C12.6562 16.5611 12.5575 16.7996 12.3817 16.9754C12.2058 17.1512 11.9674 17.25 11.7188 17.25ZM13.2863 12.4688C12.5264 12.9788 12.4219 13.4461 12.4219 13.875C12.4219 14.049 12.3527 14.216 12.2297 14.339C12.1066 14.4621 11.9397 14.5312 11.7656 14.5312C11.5916 14.5312 11.4247 14.4621 11.3016 14.339C11.1785 14.216 11.1094 14.049 11.1094 13.875C11.1094 12.848 11.5819 12.0314 12.5541 11.3784C13.4578 10.7719 13.9688 10.3875 13.9688 9.54234C13.9688 8.96766 13.6406 8.53125 12.9614 8.20828C12.8016 8.13234 12.4458 8.05828 12.008 8.06344C11.4586 8.07047 11.032 8.20172 10.7034 8.46609C10.0837 8.96484 10.0312 9.50766 10.0312 9.51562C10.0271 9.60181 10.006 9.68632 9.96919 9.76435C9.93237 9.84238 9.88054 9.9124 9.81667 9.9704C9.75279 10.0284 9.67811 10.0732 9.5969 10.1024C9.51569 10.1315 9.42954 10.1444 9.34336 10.1402C9.25718 10.1361 9.17266 10.115 9.09463 10.0782C9.0166 10.0414 8.94659 9.98953 8.88859 9.92565C8.83059 9.86177 8.78574 9.7871 8.7566 9.70589C8.72745 9.62468 8.71459 9.53852 8.71875 9.45234C8.72391 9.33844 8.80313 8.31234 9.87984 7.44609C10.4381 6.99703 11.1483 6.76359 11.9892 6.75328C12.5845 6.74625 13.1437 6.84703 13.523 7.02609C14.6578 7.56281 15.2812 8.45766 15.2812 9.54234C15.2812 11.1281 14.2214 11.8402 13.2863 12.4688Z"
                        fill="#CECECE"
                      />
                    </svg>
                  )}
                </td>
                {plans.map((plan) => (
                  <td key={`${plan.name}-${row.key}`} className="p-4">
                    {typeof plan.features[
                      row.key as keyof typeof plan.features
                    ] === "boolean" ? (
                      plan.features[row.key as keyof typeof plan.features] ? (
                        <img
                          src="/icon/blue-check.svg"
                          width={20}
                          alt="check"
                        />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )
                    ) : (
                      <span className="text-base whitespace-nowrap inline-flex items-center gap-2 text-[#454545]">
                        <img
                          src="/icon/blue-check.svg"
                          width={20}
                          alt="check"
                        />
                        {
                          plan.features[
                            row.key as keyof typeof plan.features
                          ] as string
                        }
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-border">
              <td className="p-4">
                <p className="text-sm max-w-56 font-semibold text-[#2E2E2E]">
                  Powered by E-Doubleone Inc
                </p>
              </td>
              {plans.map((plan) => (
                <td key={`upgrade-${plan.name}`} className="p-4 text-center">
                  <div className="mb-2 flex gap-2.5 items-center">
                    <span className="text-3xl font-bold text-foreground">
                      {currencySymbol}
                      {plan.upgradePrice}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12C21 7.03125 16.9688 3 12 3ZM11.7188 17.25C11.5333 17.25 11.3521 17.195 11.1979 17.092C11.0437 16.989 10.9236 16.8426 10.8526 16.6713C10.7817 16.5 10.7631 16.3115 10.7993 16.1296C10.8354 15.9477 10.9247 15.7807 11.0558 15.6496C11.1869 15.5185 11.354 15.4292 11.5359 15.393C11.7177 15.3568 11.9062 15.3754 12.0775 15.4464C12.2488 15.5173 12.3952 15.6375 12.4983 15.7917C12.6013 15.9458 12.6562 16.1271 12.6562 16.3125C12.6562 16.5611 12.5575 16.7996 12.3817 16.9754C12.2058 17.1512 11.9674 17.25 11.7188 17.25ZM13.2863 12.4688C12.5264 12.9788 12.4219 13.4461 12.4219 13.875C12.4219 14.049 12.3527 14.216 12.2297 14.339C12.1066 14.4621 11.9397 14.5312 11.7656 14.5312C11.5916 14.5312 11.4247 14.4621 11.3016 14.339C11.1785 14.216 11.1094 14.049 11.1094 13.875C11.1094 12.848 11.5819 12.0314 12.5541 11.3784C13.4578 10.7719 13.9688 10.3875 13.9688 9.54234C13.9688 8.96766 13.6406 8.53125 12.9614 8.20828C12.8016 8.13234 12.4458 8.05828 12.008 8.06344C11.4586 8.07047 11.032 8.20172 10.7034 8.46609C10.0837 8.96484 10.0312 9.50766 10.0312 9.51562C10.0271 9.60181 10.006 9.68632 9.96919 9.76435C9.93237 9.84238 9.88054 9.9124 9.81667 9.9704C9.75279 10.0284 9.67811 10.0732 9.5969 10.1024C9.51569 10.1315 9.42954 10.1444 9.34336 10.1402C9.25718 10.1361 9.17266 10.115 9.09463 10.0782C9.0166 10.0414 8.94659 9.98953 8.88859 9.92565C8.83059 9.86177 8.78574 9.7871 8.7566 9.70589C8.72745 9.62468 8.71459 9.53852 8.71875 9.45234C8.72391 9.33844 8.80313 8.31234 9.87984 7.44609C10.4381 6.99703 11.1483 6.76359 11.9892 6.75328C12.5845 6.74625 13.1437 6.84703 13.523 7.02609C14.6578 7.56281 15.2812 8.45766 15.2812 9.54234C15.2812 11.1281 14.2214 11.8402 13.2863 12.4688Z"
                        fill="#CECECE"
                      />
                    </svg>
                  </div>
                  <Button>Upgrade</Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-lg text-black font-semibold">
          Don't know which plan is right for you? Use the{" "}
          <a href="#" className="text-defaultBlue underline">
            ROI Calculator
          </a>
        </p>
      </div>
    </div>
  );
};

export default PricingTable;
