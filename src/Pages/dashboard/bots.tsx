import { Card } from "@/components/ui/card";
import { Button as IconBtn } from "@/components/ui/button";
import BotsIcon from "@/components/shared/bots-icon";
import Button from "@/components/shared/button";
import { ArrowRight2 } from "iconsax-reactjs";
import DashboardBotsDataTable from "@/components/Features/dashboard-index/bots-table";
import { ChevronDown, Download, Funnel } from "lucide-react";
import SearchInput from "@/components/shared/search-input";
import { useQuery } from "@tanstack/react-query";
import { GetAssistants } from "@/services/api/conversation";
import { Link } from "react-router-dom";
import BotsTableSkeletonLoader from "@/components/Features/bot/bot-table-loader";

const BotsPage = () => {
  const { data: assistants = [], isLoading } = useQuery({
    queryFn: GetAssistants,
    queryKey: ["assistants"],
  });

  const data = assistants.map((assistant) => ({
    botAvatar: assistant.name,
    assistantName: assistant.name,
    botType: "Text",
    assistantLanguage: "English",
    status: "Bot created",
  }));

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">My Bots</h1>

      <Card className="flex overflow-hidden flex-col gap-6 py-4 px-4 sm:px-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold">Analytics</h1>

          <Link to={"/dashboard/bots/create-bot"}>
            <Button wrapperclass="!w-fit">
              Build a Bot <ArrowRight2 size={20} />
            </Button>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-scroll no-scroll items-center">
          <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col bg-[#EEEEFD] gap-y-4">
            <IconBtn
              className="border-[0.4px] border-[#00000033] rounded-md"
              size={"icon"}
              variant={"ghost"}
            >
              <BotsIcon width={16} height={16} />
            </IconBtn>
            <h1 className="text-dark text-2xl font-bold">Total Bots</h1>
            <p className="text-lg font-bold text-defaultBlue">
              {assistants?.length || 0}
            </p>
          </Card>

          <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col bg-[#EEEEFD] gap-y-4">
            <IconBtn
              className="border-[0.4px] border-[#00000033] rounded-md"
              size={"icon"}
              variant={"ghost"}
            >
              <BotsIcon width={16} height={16} />
            </IconBtn>
            <h1 className="text-dark text-2xl font-bold">Total Bots Deleted</h1>
            <p className="text-lg font-bold text-defaultBlue">0</p>
          </Card>
        </div>
      </Card>

      <Card className="flex flex-col gap-y-5 py-4 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between w-full">
          <SearchInput
            placeholder="Search Bot"
            inputClass="!border-[#D0D0D0] !border-[0.96px] !bg-[#F5F5F5]"
          />

          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#334155]">Sort: </p>
            <Button
              wrapperclass="!w-fit"
              variant={"ghost"}
              className="!rounded-[1.91px] !w-36 !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
            >
              Most Recent
              <ChevronDown className="size-5" />
            </Button>
            <Button
              wrapperclass="!w-fit"
              variant={"ghost"}
              className="!rounded-[1.91px] !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Funnel className="size-5 text-dark" />
            </Button>

            <Button
              wrapperclass="!w-fit"
              variant={"ghost"}
              className="!rounded-[1.91px] !text-sm !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Download className="size-5 text-dark" />
              Export
            </Button>
          </div>
        </div>

        {isLoading ? (
          <BotsTableSkeletonLoader />
        ) : (
          <DashboardBotsDataTable data={data} />
        )}
      </Card>
    </div>
  );
};

export default BotsPage;
