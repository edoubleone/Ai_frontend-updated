import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  MoreHorizontal,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { UsersData } from "@/services/models/admin";

interface DataTableProps {
  data: UsersData[];
  currentPage?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (size: number) => void;
}

const UserMangementTable = ({
  data,
  currentPage,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps) => {
  const totalPages = Math.ceil(totalCount || 0 / (rowsPerPage || 10));

  const handlePreviousPage = () => {
    if (currentPage && currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage && currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const columns: ColumnDef<UsersData>[] = [
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "created_at",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`text-base font-bold ${
            row.original.status === "active"
              ? "text-[#34A853]"
              : "text-[#D39900]"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "last_active",
      header: "Last Active",
    },
    {
      id: "actions",
      header: () => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.83545 12.5593H11.8005C12.1524 12.5593 12.4377 12.274 12.4377 11.9221V3.95691C12.4377 3.60499 12.1524 3.3197 11.8005 3.3197H3.83545C3.48353 3.3197 3.19824 3.60499 3.19824 3.95691V11.9221C3.19824 12.274 3.48353 12.5593 3.83545 12.5593Z"
            stroke="#2E2E2E"
            strokeWidth="1.43371"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.06592 3.479V12.3999"
            stroke="#2E2E2E"
            strokeWidth="1.43371"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5708 3.479V12.3999"
            stroke="#2E2E2E"
            strokeWidth="1.43371"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-3">
            <button
              key={row.original.first_name + row.original.last_name}
              className="flex items-center gap-2"
            >
              <EyeIcon className="h-4 w-4" />
              View
            </button>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  return (
    <>
      <Table>
        <TableHeader className="bg-[#F1F5F9]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="text-dark whitespace-nowrap p-2 sm:p-4 text-sm sm:text-base"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            className="bg-[#EEEEFD]"
            size={"icon"}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="text-dark" />
          </Button>

          <div className="flex gap-3 items-center">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage && currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage && currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage && currentPage - 2 + index;
              }

              return (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className={`text-sm ${
                    pageNumber === currentPage && currentPage
                      ? "text-white rounded-full bg-defaultBlue"
                      : "text-dark"
                  }`}
                  key={pageNumber}
                  onClick={() => onPageChange?.(pageNumber || 1)}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleNextPage}
            disabled={currentPage && currentPage === totalPages ? true : false}
          >
            <ChevronRight className="text-dark" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#334155]">Show: </p>
          <select
            value={rowsPerPage || 10}
            onChange={(e) =>
              onRowsPerPageChange?.(Number.parseInt(e.target.value))
            }
            className="!rounded-[1.91px] !whitespace-nowrap !w-fit !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default UserMangementTable;
