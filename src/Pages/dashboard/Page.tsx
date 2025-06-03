import BotsIcon from "@/components/shared/bots-icon";
import Button from "@/components/shared/button";
import { Card } from "@/components/ui/card";
import { Button as IconBtn } from "@/components/ui/button";
import IntegrationsIcon from "@/components/shared/integration-icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import DashboardMyBots from "@/components/Features/dashboard-index/my-bots";
import DashboardNotiifications from "@/components/Features/dashboard-index/notifications";

const DashboardIndexPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Dashboard</h1>

      <div className="flex gap-2.5 w-full">
        <Card className="flex w-full flex-col gap-y-4">
          <IconBtn
            className="border-[0.4px] border-[#00000033] rounded-md"
            size={"icon"}
            variant={"ghost"}
          >
            <BotsIcon width={16} height={16} />
          </IconBtn>
          <div>
            <h1 className="text-dark text-2xl font-bold">Total Bots</h1>
            <p className="text-lg font-bold text-dark">50</p>
          </div>

          <Button variant="ghost" className="!text-defaultBlue !w-fit !p-0">
            View Bots
          </Button>
        </Card>

        <Card className="flex w-full flex-col gap-y-4">
          <IconBtn
            className="border-[0.4px] border-[#00000033] rounded-md"
            size={"icon"}
            variant={"ghost"}
          >
            <IntegrationsIcon width={16} height={16} />
          </IconBtn>
          <div>
            <h1 className="text-dark text-2xl font-bold">Total Integrations</h1>
            <p className="text-lg font-bold text-dark">50</p>
          </div>

          <Button variant="ghost" className="!text-defaultBlue !w-fit !p-0">
            View Bots
          </Button>
        </Card>

        <Card className="flex w-full flex-col gap-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex gap-2 items-center">
                <h1 className="text-xl font-bold">Gold Plan</h1>
                <Badge className="bg-[#F2F8F4] text-defaultBlue text-xs font-bold shadow-none rounded-xl">
                  Monthly
                </Badge>
              </span>
              <p className="text-sm text-[#8B8B8B]">30 days remaining</p>
            </div>

            <p className="text-3xl font-extrabold text-dark">
              ₦10,000<span className="text-base text-[#8B8B8B]">/month</span>
            </p>
          </div>

          <span>
            <p className="text-sm font-semibold text-[#454545]">
              14 of 40 users
            </p>
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
      </div>

      <DashboardMyBots />

      <DashboardNotiifications />
    </div>
  );
};

export default DashboardIndexPage;
