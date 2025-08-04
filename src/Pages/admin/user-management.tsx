import UserMangementTable from "@/components/Features/admin/user-management-table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { ChevronDown, Funnel } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/shared/button";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersList, getUserSummary } from "@/services/api/admin";

const AdminDashboardUserManagement = () => {
  const [sortOption, setSortOption] = useState({
    field: "most-recent",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: userSummary } = useQuery({
    queryKey: ["user-summary"],
    queryFn: getUserSummary,
  });

  const { data: usersList } = useQuery({
    queryKey: ["users-list"],
    queryFn: getUsersList,
  });

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = currentPage * rowsPerPage;
    return usersList?.users?.slice(start, end);
  }, [usersList?.users, currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (size: number) => {
    setRowsPerPage(size);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-dark">Overview</h1>

      <div className="flex gap-2.5 w-full no-scroll overflow-x-auto">
        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#F2F4F7] px-3 py-1 shadow-none text-[#344054] rounded-2xl">
            Total Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {userSummary?.total_users || 0}
          </p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#34A8531A] px-3 py-1 shadow-none text-[#34A853] rounded-2xl">
            Total Active Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {userSummary?.active_users || 0}
          </p>
        </Card>

        <Card className="flex max-w-[318px] flex-shrink-0 w-full flex-col gap-y-16">
          <Badge className="w-fit bg-[#E7E7E7] px-3 py-1 shadow-none text-[#454545] rounded-2xl">
            Inactive Users
          </Badge>
          <p className="text-[#2E2E2E] font-semibold">
            {userSummary?.inactive_users || 0}
          </p>
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

        <UserMangementTable
          data={paginatedData || []}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalCount={usersList?.users?.length || 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
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
