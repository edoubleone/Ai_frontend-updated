import Button from "@/components/shared/button";
import VisaIcon from "@/components/shared/visa-icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/auth-provider";

import useCurrency from "@/hooks/use-currency";
import { currencySymbols } from "@/services/models/payment.model";

const SubscriptionPlan = ({ onUpgrade }: { onUpgrade: () => void }) => {
  const { currencySymbol, isLoading } = useCurrency();
  const { activePlan, isPlanLoading } = useAuth();

  if (isPlanLoading || isLoading) {
    return (
      <Card
        className={`flex w-full flex-col border-[#d2d2d2] rounded-lg justify-between flex-shrink-0 border max-w-[434px] gap-y-5 
        }`}
      >
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  return (
    <div className="grid w-full overflow-auto gap-6 sm:grid-cols-2">
      {/* Plan Header */}
      <Card
        className={`flex w-full justify-between border-[#d2d2d2] rounded-lg flex-col border gap-y-8 `}
      >
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <span className="inline-flex gap-2 items-center">
              <h1 className="text-xl capitalize whitespace-nowrap font-bold">
                {activePlan?.plan_name || "Free"}
              </h1>
              <Badge className="bg-[#F2F8F4] text-defaultBlue capitalize text-xs font-bold shadow-none rounded-xl">
                {activePlan?.billing_cycle || "Monthly"}
              </Badge>
            </span>
            <p className="text-sm text-[#8B8B8B]">
              {activePlan?.days_remaining
                ? `${activePlan.days_remaining} days remaining`
                : "No expiration date"}
            </p>
          </div>

          <p className="text-3xl font-extrabold text-dark">
            {activePlan
              ? `${
                  (activePlan?.currency &&
                    currencySymbols[
                      activePlan.currency as keyof typeof currencySymbols
                    ]) ||
                  "$"
                }${activePlan.amount}`
              : `${currencySymbol}0`}
            <span className="text-base text-[#8B8B8B]">
              /{activePlan?.billing_cycle || "Monthly"}
            </span>
          </p>
        </div>

        <span className="hidden">
          <p className="text-sm font-semibold text-[#454545]">14 of 40 users</p>
          <Progress value={20} />
        </span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Switch />
            <p className="text-sm text-[#454545]">Enable auto renew</p>
          </div>

          {activePlan && activePlan.plan_name !== "Free" && (
            <Button
              onClick={onUpgrade}
              wrapperclass="!w-fit"
              variant="ghost"
              className="!text-defaultBlue !p-0"
            >
              Upgrade Plan
            </Button>
          )}
          {(!activePlan || activePlan.plan_name === "Free") && (
            <Button
              onClick={onUpgrade}
              wrapperclass="!w-fit"
              variant="ghost"
              className="!text-defaultBlue !p-0"
            >
              Get Started
            </Button>
          )}
        </div>
      </Card>

      {/* Payment Method Section */}

      {activePlan && (
        <Card
          className={`hidden w-full border-[#d2d2d2] rounded-lg flex-col border gap-y-8`}
        >
          <div>
            <h1 className="text-xl font-bold text-[#232323]">Payment Method</h1>
            <p className="text-sm text-[#8B8B8B]">
              Change how you pay for your plan
            </p>
          </div>

          <div className="border flex items-center justify-between rounded-lg py-7 px-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border p-2.5 rounded-lg">
                <VisaIcon width={40} height={38} />
              </span>

              <div>
                <p className="text-sm font-semibold text-[#5C5C5C]">
                  Visa ending in 1234
                </p>
                <p className="text-[#8B8B8B] text-sm">Expiry 06/2024</p>
              </div>
            </div>

            <Button variant="outline-blue" wrapperclass="!w-fit">
              Edit
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SubscriptionPlan;
