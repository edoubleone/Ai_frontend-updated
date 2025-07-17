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
import { EyeIcon, MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RowSupport {
  ticketId: string;
  customerName: string;
  email: string;
  date: string;
  message: string;
  status: string;
}

interface DataTableProps {
  data: RowSupport[];
}

// Dummy data for customer support table
export const dummyCustomerSupportData: RowSupport[] = [
  {
    ticketId: "TCK-001",
    customerName: "John Doe",
    email: "john.doe@example.com",
    date: "2024-05-01",
    message: "I need help with my order.",
    status: "Open",
  },
  {
    ticketId: "TCK-002",
    customerName: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2024-05-02",
    message: "Payment not going through.",
    status: "Pending",
  },
  {
    ticketId: "TCK-003",
    customerName: "Mike Johnson",
    email: "mike.johnson@example.com",
    date: "2024-05-03",
    message: "How do I reset my password?",
    status: "Resolved",
  },
];

const CustomerSupportTable = ({ data }: DataTableProps) => {
  const columns: ColumnDef<RowSupport>[] = [
    {
      accessorKey: "ticketId",
      header: "Ticket ID",
    },
    {
      accessorKey: "customerName",
      header: "Customer's Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "message",
      header: "Support Message",
      cell: ({ row }) => (
        <span className="line-clamp-2 max-w-xs block">{row.original.message}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`text-base font-bold ${
            row.original.status === "Resolved"
              ? "text-[#34A853]"
              : row.original.status === "Pending"
              ? "text-[#FEB800]"
              : "text-[#D39900]"
          }`}
        >
          {row.original.status}
        </span>
      ),
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
            <button key={row.original.ticketId} className="flex items-center gap-2">
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
    </>
  );
};

export default CustomerSupportTable;
