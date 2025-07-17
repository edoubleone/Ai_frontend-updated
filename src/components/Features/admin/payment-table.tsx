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

interface RowPayment {
  date: string;
  orgName: string;
  seats: number;
  subType: string;
  totalAmount: string;
  status: string;
}

interface DataTableProps {
  data: RowPayment[];
}

// Dummy data for payment table
export const dummyPaymentData: RowPayment[] = [
  {
    date: "2024-05-01",
    orgName: "Acme Corp",
    seats: 10,
    subType: "Pro",
    totalAmount: "$500.00",
    status: "Paid",
  },
  {
    date: "2024-05-02",
    orgName: "Beta LLC",
    seats: 5,
    subType: "Starter",
    totalAmount: "$150.00",
    status: "Pending",
  },
  {
    date: "2024-05-03",
    orgName: "Gamma Inc",
    seats: 20,
    subType: "Enterprise",
    totalAmount: "$2000.00",
    status: "Failed",
  },
];

const AdminPaymentTable = ({ data }: DataTableProps) => {
  const columns: ColumnDef<RowPayment>[] = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "orgName",
      header: "Name of Organization",
    },
    {
      accessorKey: "seats",
      header: "Current Number of Seats",
    },
    {
      accessorKey: "subType",
      header: "Current Subscription Type",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`text-base font-bold ${
            row.original.status === "Paid"
              ? "text-[#34A853]"
              : row.original.status === "Pending"
              ? "text-[#FEB800]"
              : "text-[#C82332]"
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
            <button key={row.original.orgName + row.original.date} className="flex items-center gap-2">
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

export default AdminPaymentTable;
