import LiveAgentsTable, {
  dummyLiveAgentsData,
} from "@/components/Features/live-agent-table";
import AdminUserIcon from "@/components/shared/admin-user-icon";
import Button from "@/components/shared/button";
import SearchInput from "@/components/shared/search-input";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Funnel, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LiveAgentPage = () => {
  return (
    <div className="flex flex-col gap-y-5 w-full">
      <h2 className="font-bold text-2xl">Live Agent</h2>

      <Card className="flex flex-col gap-y-10">
        <div className="flex items-center justify-between gap-4">
          <p>Analytics</p>

          <Link to={`/dashboard/live-agent/create-live-agent`}>
            <Button wrapperclass="!w-fit">
              <PlusIcon className="size-5" /> Add Live Agent
            </Button>
          </Link>
        </div>

        <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
          <Card className="flex bg-[#EEEEFD] max-w-[318px] flex-shrink-0 w-full flex-col gap-y-4">
            <span className="size-7 flex text-white rounded-md items-center justify-center bg-defaultBlue">
              <AdminUserIcon />
            </span>

            <p className="text-2xl font-bold">Agents Logs</p>

            <p className="text-xl font-bold">10</p>
          </Card>
        </div>
      </Card>

      <Card className="flex flex-col gap-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between w-full">
          <SearchInput
            placeholder="Search"
            inputClass="!border-[#D0D0D0] !border-[0.96px] !bg-[#F5F5F5]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[#334155]">Sort: </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  wrapperclass="!w-fit"
                  className="!rounded-[1.91px] !whitespace-nowrap !w-36 !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
                >
                  Sort
                  <ChevronDown className="size-5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-1 !max-w-56">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="!text-left hover:bg-gray-100 !font-medium !w-full !justify-start"
                  >
                    <p>Sort by</p>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              wrapperclass="!w-fit"
              variant={"ghost"}
              className="!rounded-[1.91px] !hidden !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Funnel className="size-5 text-dark" />
            </Button>
          </div>
        </div>

        <LiveAgentsTable data={dummyLiveAgentsData} />
      </Card>
    </div>
  );
};

export default LiveAgentPage;
