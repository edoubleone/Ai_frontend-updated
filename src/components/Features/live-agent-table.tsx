import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AvatarComponent from "@/components/shared/custom-avatar";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Updated interface to match the new API structure
interface RowLiveAgents {
  id: number;
  agentsName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  availability: "Available" | "Offline" | "Busy";
  issues?: string;
  industry?: string;
  persona?: string;
  tone?: string;
  created_at?: string;
  updated_at?: string;
}

export const dummyLiveAgentsData: RowLiveAgents[] = [
  {
    id: 1,
    agentsName: "Bot King",
    displayName: "Bot King",
    email: "bot-king@example.com",
    phoneNumber: "+2348133333333",
    availability: "Available",
    issues: "No issues",
  },
  {
    id: 2,
    agentsName: "Sales Bot",
    displayName: "Sales Assistant",
    email: "sales-bot@example.com",
    phoneNumber: "+2348133333334",
    availability: "Busy",
    issues: "High load",
  },
  {
    id: 3,
    agentsName: "Support Bot",
    displayName: "Customer Support",
    email: "support-bot@example.com",
    phoneNumber: "+2348133333335",
    availability: "Available",
    issues: "No issues",
  },
];

interface DataTableProps {
  data: RowLiveAgents[];
  isLoading?: boolean;
  error?: Error | null;
}

const LiveAgentsTable = ({
  data,
  isLoading = false,
  error,
}: DataTableProps) => {
  console.log("LiveAgentsTable received data:", data);
  console.log("LiveAgentsTable isLoading:", isLoading);
  console.log("LiveAgentsTable error:", error);

  const navigate = useNavigate();

  const handleViewAssistant = (assistantId: number) => {
    console.log("Viewing assistant:", assistantId);
    // Navigate to assistant details page
    navigate(`/dashboard/assistants/${assistantId}`);
  };
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "agentsName",
      desc: false,
    },
  ]);
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<RowLiveAgents>[] = [
    {
      accessorKey: "agentsName",
      header: "Bot",
      cell: () => <AvatarComponent />,
    },
    {
      accessorKey: "displayName",
      header: "Display Name",
      enableSorting: true,
    },
    {
      accessorKey: "issues",
      header: "Issues",
      enableSorting: true,
      cell: () => <span className="text-sm text-gray-500">No issues</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      enableSorting: true,
    },
    {
      accessorKey: "availability",
      header: "Availability",
      enableSorting: true,
      cell: ({ row }) => (
        <span
          className={cn("text-sm font-bold flex items-center gap-2", {
            "text-green-500": row.original.availability === "Available",
            "text-red-500": row.original.availability === "Offline",
            "text-yellow-500": row.original.availability === "Busy",
          })}
        >
          <span
            className={cn("size-2 rounded-full", {
              "bg-green-500": row.original.availability === "Available",
              "bg-red-500": row.original.availability === "Offline",
              "bg-yellow-500": row.original.availability === "Busy",
            })}
          ></span>
          {row.original.availability}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={`/dashboard/logs/live-conversation/${row.original.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewAssistant(row.original.id)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View {row.original.agentsName} details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading assistant data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <span className="text-red-600">
          Error loading assistant data: {error.message}
        </span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <span className="text-gray-600">No assistant data available</span>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader className="bg-[#EEEEFD]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="text-dark whitespace-nowrap p-2 sm:p-4 text-sm sm:text-base cursor-pointer"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <span>
                        {header.column.getIsSorted() === "asc"
                          ? "↑"
                          : header.column.getIsSorted() === "desc"
                          ? "↓"
                          : "↕"}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className="p-2 sm:p-4 whitespace-nowrap text-sm sm:text-base"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default LiveAgentsTable;
