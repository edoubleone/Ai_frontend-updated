import Button from "@/components/shared/button";
import SearchInput from "@/components/shared/search-input";
import { Card } from "@/components/ui/card";

import { ArrowRight2 } from "iconsax-reactjs";
import DashboardBotsDataTable from "./bots-table";

import { ChevronDown, Funnel } from "lucide-react";
import BotsTableSkeletonLoader from "../bot/bot-table-loader";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataType {
  id: number;
  botAvatar: string;
  assistantName: string;
  botType: string;
  assistantLanguage: string;
  status: string;
  share_url: string;
  share_whatsapp_url: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardMyBots({
  data,
  loading,
}: {
  data: DataType[];
  loading: boolean;
}) {
  const fields = [
    { label: "Name", value: "assistantName" },
    { label: "Industry", value: "industry" },
    { label: "Created At", value: "created_at" },
    { label: "Updated At", value: "updated_at" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState({
    field: fields[0].value,
    direction: "desc",
  });

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
    <Card className="border-none w-full rounded-lg py-8 px-4 sm:px-8 lg:px-12">
      <div className="flex w-full mb-9 items-center justify-between">
        <h1 className="text-dark font-bold text-2xl">My Assistants</h1>

        <Link to={`/dashboard/assistants`}>
          <Button
            wrapperclass="!w-fit"
            variant="ghost"
            className="!text-defaultBlue !p-0"
          >
            See All
            <ArrowRight2 size={24} />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col overflow-hidden gap-y-9">
        <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
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
              className="!rounded-[1.91px] !hidden !w-fit !p-2 !border-[.96px] !border-[#E2E8F0]"
            >
              <Funnel className="size-5 text-dark" />
            </Button>
          </div>
        </div>

        {loading ? (
          <BotsTableSkeletonLoader />
        ) : (
          <DashboardBotsDataTable data={filteredData} />
        )}
      </div>
    </Card>
  );
}
