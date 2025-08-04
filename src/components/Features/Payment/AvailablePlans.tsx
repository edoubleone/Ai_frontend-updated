import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Button from "@/components/shared/button";
import useCurrency from "@/hooks/use-currency";
import { useAuth } from "@/context/auth-provider";

import { useMutation } from "@tanstack/react-query";
import {
  asyncPaystackPlan,
  asyncStripePlan,
  type PlanType,
  type StripePlanType,
} from "@/services/api/payment";
import { toast } from "sonner";

export type CurrencyCode = "usd" | "ngn";

export interface SelectedPlan {
  name: string;
  price: {
    usd: {
      monthly: number;
      yearly: number;
    };
    ngn: {
      monthly: number;
      yearly: number;
    };
  };
  upgradePrice?: {
    usd: {
      monthly: number;
      yearly: number;
    };
    ngn: {
      monthly: number;
      yearly: number;
    };
  };
  buttonText?: string;
}

const AvailablePlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isAuthenticated, user, activePlan } = useAuth();

  const { currencySymbol, currencyCode, isLoading } = useCurrency();

  const { mutate, isPending, error, variables } = useMutation({
    mutationFn: async (planType: PlanType) => {
      return await asyncPaystackPlan(planType, { email: user?.email ?? "" });
    },
    onSuccess: (data) => {
      window.location.href = data.checkout_url;
      toast.success("Payment initialized! Proceeding to checkout..");
    },
    onError: () => {
      toast.error(
        error?.message || "failed to initialize payment. please try again!"
      );
    },
  });

  const {
    mutate: stripeMutate,
    isPending: stripeLoading,
    variables: stripeVariables,
    error: stripeError,
  } = useMutation({
    mutationFn: async (payload: {
      plan: StripePlanType;
      email: string;
      currency: string;
    }) => {
      return await asyncStripePlan(payload.plan, {
        email: payload.email,
        currency: payload.currency,
      });
    },
    onSuccess: (data) => {
      window.location.href = data.checkout_url;
      toast.success("Payment initialized! Proceeding to checkout..");
    },
    onError: () => {
      toast.error(
        stripeError?.message ||
          "failed to initialize payment. please try again!"
      );
    },
  });

  const plans = [
    {
      name: "Free",
      price: {
        usd: {
          monthly: 0,
          yearly: 0,
        },
        ngn: {
          monthly: 0,
          yearly: 0,
        },
      },
      period: "month",
      buttonText: isAuthenticated ? "Upgrade" : "Try for Free",
      buttonVariant: "solid" as const,
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
      upgradePrice: {
        usd: {
          monthly: 25,
          yearly: 25,
        },
        ngn: {
          monthly: 1000,
          yearly: 8000,
        },
      },
    },
    {
      name: "Basic",
      price: {
        usd: {
          monthly: 75,
          yearly: 825,
        },
        ngn: {
          monthly: 3000,
          yearly: 30000,
        },
      },
      period: "month",
      buttonText: isAuthenticated ? "Upgrade" : "Try for Free",
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
      upgradePrice: {
        usd: {
          monthly: 25,
          yearly: 25,
        },
        ngn: {
          monthly: 1000,
          yearly: 8000,
        },
      },
    },
    {
      name: "Standard",
      price: {
        usd: {
          monthly: 150,
          yearly: 1650,
        },
        ngn: {
          monthly: 5000,
          yearly: 50000,
        },
      },
      period: "month",
      buttonText: isAuthenticated ? "Upgrade" : "Try for Free",
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
      upgradePrice: {
        usd: {
          monthly: 25,
          yearly: 25,
        },
        ngn: {
          monthly: 1000,
          yearly: 8000,
        },
      },
    },
    {
      name: "Professional",
      price: {
        usd: {
          monthly: 300,
          yearly: 3300,
        },
        ngn: {
          monthly: 8000,
          yearly: 80000,
        },
      },
      period: "month",
      buttonText: isAuthenticated ? "Upgrade" : "Try for Free",
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
      upgradePrice: {
        usd: {
          monthly: 25,
          yearly: 25,
        },
        ngn: {
          monthly: 1000,
          yearly: 8000,
        },
      },
    },
    {
      name: "Enterprise",
      price: {
        usd: {
          monthly: 400,
          yearly: 4000,
        },
        ngn: {
          monthly: 13500,
          yearly: 135000,
        },
      },
      period: "month",
      buttonText: isAuthenticated ? "Upgrade" : "Try for Free",
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
      upgradePrice: {
        usd: {
          monthly: 25,
          yearly: 25,
        },
        ngn: {
          monthly: 1000,
          yearly: 8000,
        },
      },
    },
  ];

  const handlePlanClick = (plan: SelectedPlan) => {
    if (!user) return;

    if (currencyCode === "USD") {
      const planType =
        plan.name.toLowerCase().replace(" ", "-") +
        (isAnnual ? "-yearly" : "-monthly");
      const currency = currencyCode.toLowerCase();
      stripeMutate({
        plan: planType as StripePlanType,
        email: user?.email,
        currency,
      });
    } else {
      const planType =
        plan?.name?.toLowerCase().replace(" ", "-") +
        (isAnnual ? "-yearly" : "-monthly");
      mutate(planType as PlanType);
    }
  };

  const getButtonText = (plan: SelectedPlan) => {
    if (!isAuthenticated) return plan?.buttonText;

    const currentPlanName = activePlan?.plan_name?.toLowerCase();
    const planName = plan?.name?.toLowerCase();

    if (planName === "free" && currentPlanName !== "free") return "Get Started";
    if (planName === currentPlanName) return "Your Plan";

    const currentPlanPrice = activePlan?.amount ?? 0;
    const planPrice = getPrice(plan);

    if (Number(planPrice) > currentPlanPrice) return "Upgrade";
    if (Number(planPrice) < currentPlanPrice) return "Downgrade";
    if (Number(planPrice) === currentPlanPrice) return "Your Plan";
    return "Switch Plan";
  };

  const getPrice = (plan: SelectedPlan) => {
    const code = currencyCode.toLowerCase() as CurrencyCode;
    const prices = plan?.price[code];
    return isAnnual ? prices?.yearly.toFixed(0) : prices?.monthly.toFixed(0);
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

                {/* {plan.customText && (
                  <div className="mb-6">
                    <p className="text-sm font-medium underline text-defaultBlue">
                      {plan.customText}
                    </p>
                  </div>
                )} */}
              </div>

              <div className="flex items-baseline">
                {isLoading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <span
                    className={`text-3xl font-black text-dark
                `}
                  >
                    {Intl.NumberFormat(
                      currencyCode === "USD" ? "en-US" : "en-NG",
                      {
                        style: "currency",
                        currency: currencyCode,
                      }
                    ).format(Number(getPrice(plan)))}
                  </span>
                )}

                <span className={`text-xs mt-auto text-[#737373]`}>
                  /{isAnnual ? "year" : plan.period}
                </span>
              </div>

              <Button
                loading={
                  (isPending &&
                    variables ===
                      plan.name.toLowerCase().replace(" ", "-") +
                        (isAnnual ? "-yearly" : "-monthly")) ||
                  (stripeLoading &&
                    stripeVariables?.plan ===
                      plan.name.toLowerCase().replace(" ", "-") +
                        (isAnnual ? "-yearly" : "-monthly"))
                }
                disabled={
                  (isLoading &&
                    variables ===
                      plan.name.toLowerCase().replace(" ", "-") +
                        (isAnnual ? "-yearly" : "-monthly")) ||
                  (stripeLoading &&
                    stripeVariables?.plan ===
                      plan.name.toLowerCase().replace(" ", "-") +
                        (isAnnual ? "-yearly" : "-monthly"))
                }
                onClick={() => {
                  const buttonText = getButtonText(plan);
                  if (buttonText === "Upgrade" || buttonText === "Downgrade") {
                    handlePlanClick(plan);
                  }
                }}
                variant={
                  getButtonText(plan) === "Your Plan"
                    ? "lightLavender"
                    : plan.buttonVariant
                }
              >
                {getButtonText(plan)}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePlans;
