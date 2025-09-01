import { Card } from "@/components/ui/card";
import { Button as IconBtn } from "@/components/ui/button";
import BotsIcon from "@/components/shared/bots-icon";
import Button from "@/components/shared/button";
import { ArrowRight2 } from "iconsax-reactjs";
import DashboardBotsDataTable from "@/components/Features/dashboard-index/bots-table";
import { ChevronDown, Funnel } from "lucide-react";
import SearchInput from "@/components/shared/search-input";
import { useQuery } from "@tanstack/react-query";
import { GetAssistants } from "@/services/api/conversation";
import { Link } from "react-router-dom";
import BotsTableSkeletonLoader from "@/components/Features/bot/bot-table-loader";
import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BotsPage = () => {
  const fields = [
    { label: "Created At", value: "created_at" },
    { label: "Name", value: "assistantName" },
    { label: "Industry", value: "industry" },

    { label: "Updated At", value: "updated_at" },
  ];

  const { data: assistants = [], isLoading } = useQuery({
    queryFn: GetAssistants,
    queryKey: ["assistants"],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState({
    field: fields[0].value,
    direction: "desc",
  });

  const data = assistants.map((assistant) => ({
    id: assistant.id,
    botAvatar: assistant.name,
    assistantName: assistant.name,
    botType: "Text",
    assistantLanguage: "English",
    status: "Bot created",
    share_url: assistant.share_url,
    share_whatsapp_url: assistant.share_whatsapp_url,
    industry: assistant.industry,
    created_at: assistant.created_at,
    updated_at: assistant.updated_at,
  }));

  const sortedData = useMemo(() => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      switch (sortOption.field) {
        case "assistantName":
          return sortOption.direction === "asc"
            ? a.assistantName.localeCompare(b.assistantName)
            : b.assistantName.localeCompare(a.assistantName);
        case "industry":
          return sortOption.direction === "asc"
            ? a.industry.localeCompare(b.industry)
            : b.industry.localeCompare(a.industry);
        case "created_at":
          return sortOption.direction === "asc"
            ? new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime();
        case "updated_at":
          return sortOption.direction === "asc"
            ? new Date(a.updated_at).getTime() -
                new Date(b.updated_at).getTime()
            : new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime();
        default:
          return 0;
      }
    });
    return sorted;
  }, [data, sortOption]);

  const filteredData = sortedData.filter((row) =>
    row.assistantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">My Assistants</h1>

      <Card className="flex overflow-hidden flex-col gap-6 py-4 px-4 sm:px-8 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold">Analytics</h1>

          <Link to={"/dashboard/assistants/create-assistant"}>
            <Button wrapperclass="!w-fit">
              Build an Assistant <ArrowRight2 size={20} />
            </Button>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-scroll no-scroll items-center">
          <Card className="flex flex-1 min-w-[318px] h-full flex-shrink-0 w-full flex-col bg-[#EEEEFD] gap-y-4">
            <IconBtn
              className="border-[0.4px] border-[#00000033] rounded-md"
              size={"icon"}
              variant={"ghost"}
            >
              <BotsIcon width={16} height={16} />
            </IconBtn>
            <h1 className="text-dark text-2xl font-bold">Total Assistants</h1>
            <p className="text-lg font-bold text-defaultBlue">
              {assistants?.length || 0}
            </p>
          </Card>

          <Card className="flex flex-1 min-w-[318px] h-full flex-shrink-0 w-full flex-col bg-[#EEEEFD] gap-y-4">
            <IconBtn
              className="border-[0.4px] border-[#00000033] rounded-md"
              size={"icon"}
              variant={"ghost"}
            >
              <BotsIcon width={16} height={16} />
            </IconBtn>
            <h1 className="text-dark text-2xl font-bold">
              Total Assistants Deleted
            </h1>
            <p className="text-lg font-bold text-defaultBlue">0</p>
          </Card>
        </div>
      </Card>

      <Card className="flex flex-col gap-y-5 py-4 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between w-full">
          <SearchInput
            onDebouncedChange={handleSearch}
            placeholder="Search Bot"
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
                  {fields.find((f) => f.value === sortOption.field)?.label}{" "}
                  <ChevronDown className="size-5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-1 !max-w-56">
                <div className="flex flex-col gap-2">
                  {fields.map((field) => (
                    <Button
                      key={field.value}
                      variant="ghost"
                      className="!text-left hover:bg-gray-100 !font-medium !w-full !justify-start"
                      onClick={() =>
                        setSortOption((prev) => ({
                          field: field.value,
                          direction:
                            prev.field === field.value &&
                            prev.direction === "asc"
                              ? "desc"
                              : "asc",
                        }))
                      }
                    >
                      {field.label}{" "}
                      {sortOption.field === field.value &&
                        (sortOption.direction === "asc" ? "↑" : "↓")}
                    </Button>
                  ))}
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

        {isLoading ? (
          <BotsTableSkeletonLoader />
        ) : (
          <DashboardBotsDataTable data={filteredData} />
        )}
      </Card>
    </div>
  );
};

export default BotsPage;
