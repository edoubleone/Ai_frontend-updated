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
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";

interface RowPaymentHistory {
  id: number;
  invoiceNo: string;
  dueDate: string;
  amount: string;
  paymentMethod: string;
  subscriptionType: string;
  status: string;
}

interface DataTableProps {
  data: RowPaymentHistory[];
}

const PaymentHistoryTable = ({ data }: DataTableProps) => {
  const columns: ColumnDef<RowPaymentHistory>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="rounded-[1.91px] shadow-none"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "invoiceNo",
      header: "Invoice No",
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
    },
    {
      accessorKey: "subscriptionType",
      header: "Subscription Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`text-base font-bold ${
            row.original.status === "Paid" ? "text-[#34A853]" : "text-[#D39900]"
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
            <button
              className={clsx(
                "flex transition-all text-sm w-full hover:bg-[#E7E7E7]/30 rounded items-start ease-in-out duration-500 gap-3 !py-3 !px-4"
              )}
            >
              View Details
            </button>

            <button
              onClick={() => {
                console.log(row);
              }}
              className={clsx(
                "flex transition-all text-sm w-full hover:bg-[#E7E7E7]/30 rounded items-start ease-in-out duration-500 gap-3 !py-3 !px-4"
              )}
            >
              Download Receipt
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
    <div className="flex flex-col gap-y-5">
      <div className="overflow-x-auto no-scroll overflow-y-hidden">
        <Table>
          <TableHeader className="bg-[#EEEEFD]">
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
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Button variant={"outline"} className="bg-[#EEEEFD]" size={"icon"}>
            <ChevronLeft className="text-dark" />
          </Button>

          <div className="flex gap-3 items-center">
            {[1, 2, 3].map((e) => (
              <Button
                variant={"ghost"}
                size={"icon"}
                className={`text-sm ${
                  e === 1
                    ? "text-white rounded-full bg-defaultBlue"
                    : "text-dark"
                }`}
                key={e}
              >
                {e}
              </Button>
            ))}
          </div>

          <Button variant={"outline"} size={"icon"}>
            <ChevronRight className="text-dark" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#334155]">Show: </p>
          <Button
            variant={"ghost"}
            className="!rounded-[1.91px] !whitespace-nowrap !w-fit !text-sm !py-2 !border-[.96px] !border-[#E2E8F0]"
          >
            All
            <ChevronDown className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const dummyData: RowPaymentHistory[] = [
  {
    id: 1,
    invoiceNo: "INV001",
    dueDate: "2024-01-01",
    amount: "$100",
    paymentMethod: "Credit Card",
    subscriptionType: "Monthly",
    status: "Paid",
  },
  {
    id: 2,
    invoiceNo: "INV002",
    dueDate: "2024-02-01",
    amount: "$200",
    paymentMethod: "PayPal",
    subscriptionType: "Yearly",
    status: "Pending",
  },
  {
    id: 3,
    invoiceNo: "INV003",
    dueDate: "2024-03-01",
    amount: "$300",
    paymentMethod: "Bank Transfer",
    subscriptionType: "Monthly",
    status: "Paid",
  },
];

const PaymentHistory = () => {
  return <PaymentHistoryTable data={dummyData} />;
};

export default PaymentHistory;
