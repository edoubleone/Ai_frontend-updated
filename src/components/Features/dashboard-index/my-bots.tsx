import Button from "@/components/shared/button";
import SearchInput from "@/components/shared/search-input";
import { Card } from "@/components/ui/card";

import { ArrowRight2 } from "iconsax-reactjs";
import DashboardBotsDataTable from "./bots-table";

import { ChevronDown, Download, Funnel } from "lucide-react";

const data = [
  {
    id: 1,
    botAvatar: "https://example.com/bot-avatar-1.png",
    assistantName: "Assistant 1",
    botType: "Text",
    assistantLanguage: "English",
    status: "Bot in Progress",
  },

  {
    id: 2,
    botAvatar: "https://example.com/bot-avatar-1.png",
    assistantName: "Assistant 2",
    botType: "Image",
    assistantLanguage: "English",
    status: "Bot in Progress",
  },

  {
    id: 3,
    botAvatar: "https://example.com/bot-avatar-1.png",
    assistantName: "Assistant 3",
    botType: "Text",
    assistantLanguage: "English",
    status: "Bot created",
  },
];

const DashboardMyBots = () => {
  return (
    <Card className="border-none w-full rounded-lg py-8 px-4 sm:px-8 lg:px-12">
      <div className="flex w-full mb-9 items-center justify-between">
        <h1 className="text-dark font-bold text-2xl">My Bots</h1>

        <Button
          wrapperclass="!w-fit"
          variant="ghost"
          className="!text-defaultBlue !p-0"
        >
          See All
          <ArrowRight2 size={24} />
        </Button>
      </div>

      <div className="flex flex-col gap-y-9">
        <div className="flex justify-between w-full">
          <SearchInput
            placeholder="Search Bot"
            inputClass="!border-[#D0D0D0] !border-[0.96px] !bg-[#F5F5F5]"
          />

          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#334155]">Sort: </p>
            <Button
              variant={"ghost"}
              className="!rounded-[1.91px] !w-36 !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
            >
              Most Recent
              <ChevronDown className="size-5"/>
            </Button>
            <Button
              variant={"ghost"}
              className="!rounded-[1.91px] !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Funnel className="size-5 text-dark" />
            </Button>

            <Button
              variant={"ghost"}
              className="!rounded-[1.91px] !text-sm !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Download className="size-5 text-dark" />
              Export
            </Button>
          </div>
        </div>

        <DashboardBotsDataTable data={data} />
      </div>
    </Card>
  );
};

export default DashboardMyBots;
