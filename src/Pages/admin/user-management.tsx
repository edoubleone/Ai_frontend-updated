import UserMangementTable, {
  dummyUserManagementData,
} from "@/components/Features/admin/user-management-table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { ChevronDown, Funnel } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/shared/button";
import { useState } from "react";

const AdminDashboardUserManagement = () => {
  const [sortOption, setSortOption] = useState({
    field: "most-recent",
    direction: "asc",
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Overview</h1>

      <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#F2F4F7] px-3 py-1 shadow-none text-[#344054] rounded-2xl">
            Total Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">2</p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#34A8531A] px-3 py-1 shadow-none text-[#34A853] rounded-2xl">
            Total Active Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">2</p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#E7E7E7] px-3 py-1 shadow-none text-[#454545] rounded-2xl">
            Inactive Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">9000</p>
        </Card>
      </div>

      <div className="flex gap-y-4 flex-col">
        <div className="flex items-center gap-2 justify-between w-full flex-wrap">
          <h2 className="text-2xl font-bold text-dark">User Management</h2>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[#334155]">Sort: </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  wrapperclass="!w-fit"
                  className="!rounded-[1.91px] !whitespace-nowrap !w-36 !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
                >
                  most recent
                  <ChevronDown className="size-5" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-1 !max-w-56">
                <div className="flex flex-col gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="ghost"
                      className="!text-left hover:bg-gray-100 !font-medium !w-full !justify-start"
                      onClick={() =>
                        setSortOption((prev) => ({
                          field: option.value,
                          direction:
                            prev.field === option.value &&
                            prev.direction === "asc"
                              ? "desc"
                              : "asc",
                        }))
                      }
                    >
                      {option.label}{" "}
                      {sortOption.field === option.value &&
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

        <UserMangementTable data={dummyUserManagementData} />
      </div>
    </div>
  );
};

export default AdminDashboardUserManagement;

const sortOptions = [
  { label: "All Users", value: "all-users" },
  { label: "Most Recent", value: "most-recent" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Deleted", value: "deleted" },
];
