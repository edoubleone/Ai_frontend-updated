import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/auth-provider";
import useCurrency from "@/hooks/use-currency";
import { currencySymbols } from "@/services/models/payment.model";
import { Link } from "react-router-dom";

interface CurrentPlanProps {
  border?: boolean;
}

const CurrentPlan = ({ border }: CurrentPlanProps) => {
  const { activePlan, isPlanLoading } = useAuth();
  const { currencySymbol, isLoading } = useCurrency();

  if (isPlanLoading || isLoading) {
    return (
      <Card
        className={`flex w-full flex-col justify-between flex-shrink-0 border max-w-[434px] gap-y-5 ${
          border ? "border-[#d2d2d2] rounded-lg" : "border-transparent"
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

  if (!activePlan) return null;

  return (
    <Card
      className={`flex w-full flex-col justify-between flex-shrink-0 border max-w-[434px] gap-y-5 ${
        border ? "border-[#d2d2d2] rounded-lg" : "border-transparent"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <span className="inline-flex gap-2 items-center">
            <h1 className="text-xl capitalize whitespace-nowrap font-bold">
              {activePlan.plan_name}
            </h1>
            <Badge className="bg-[#F2F8F4] capitalize text-defaultBlue text-xs font-bold shadow-none rounded-xl">
              {activePlan.billing_cycle}
            </Badge>
          </span>
          <p className="text-sm text-[#8B8B8B]">
            {activePlan.days_remaining
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
            /{activePlan.billing_cycle}
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

        {activePlan.plan_name !== "Free" && (
          <Link to={"/dashboard/payments"}>
            <Button variant="ghost" className="!text-defaultBlue !p-0">
              Upgrade Plan
            </Button>
          </Link>
        )}
        {activePlan.plan_name === "Free" && (
          <Link to={"/dashboard/payments"}>
            <Button variant="ghost" className="!text-defaultBlue !p-0">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default CurrentPlan;
