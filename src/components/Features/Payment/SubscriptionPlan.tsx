import Button from "@/components/shared/button";
import VisaIcon from "@/components/shared/visa-icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

import useCurrency from "@/hooks/use-currency";


const SubscriptionPlan = () => {
  const { currencySymbol } = useCurrency();

  return (
    <div className="grid w-full overflow-auto gap-6 sm:grid-cols-2">
      {/* Plan Header */}
      <Card
        className={`flex w-full border-[#d2d2d2] rounded-lg flex-col border gap-y-8 `}
      >
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <span className="inline-flex gap-2 items-center">
              <h1 className="text-xl whitespace-nowrap font-bold">Gold Plan</h1>
              <Badge className="bg-[#F2F8F4] text-defaultBlue text-xs font-bold shadow-none rounded-xl">
                Monthly
              </Badge>
            </span>
            <p className="text-sm text-[#8B8B8B]">30 days remaining</p>
          </div>

          <p className="text-3xl font-extrabold text-dark">
            {currencySymbol}10,000
            <span className="text-base text-[#8B8B8B]">/month</span>
          </p>
        </div>

        <span>
          <p className="text-sm font-semibold text-[#454545]">14 of 40 users</p>
          <Progress value={20} />
        </span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Switch />
            <p className="text-sm text-[#454545]">Enable auto renew</p>
          </div>

          <Button
            wrapperclass="!w-fit"
            variant="ghost"
            className="!text-defaultBlue !p-0"
          >
            Upgrade Plan
          </Button>
        </div>
      </Card>

      {/* Payment Method Section */}

      <Card
        className={`flex w-full border-[#d2d2d2] rounded-lg flex-col border gap-y-8`}
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
    </div>
  );
};

export default SubscriptionPlan;
