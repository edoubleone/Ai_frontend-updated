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
import { Checkbox } from "@/components/ui/checkbox";
import AvatarComponent from "@/components/shared/custom-avatar";
import { cn } from "@/lib/utils";
import { EllipsisIcon } from "lucide-react";

interface RowLiveAgents {
  id: number;
  agentsName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  availability: string;
}

export const dummyLiveAgentsData: RowLiveAgents[] = [
  {
    id: 1,
    agentsName: "John Doe",
    displayName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+2348133333333",
    availability: "Available",
  },
  {
    id: 2,
    agentsName: "Jane Smith",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+2348133333333",
    availability: "Available",
  },
  {
    id: 3,
    agentsName: "Mike Johnson",
    displayName: "Mike Johnson",
    email: "mike.johnson@example.com",
    phoneNumber: "+2348133333333",
    availability: "Available",
  },
];

interface DataTableProps {
  data: RowLiveAgents[];
}

const LiveAgentsTable = ({ data }: DataTableProps) => {
  const columns: ColumnDef<RowLiveAgents>[] = [
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
      accessorKey: "agentsName",
      header: "Agents Name",
      cell: () => <AvatarComponent />,
    },
    {
      accessorKey: "displayName",
      header: "Display Name",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "availability",
      header: "Availability",
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
      cell: () => (
        <button className="flex items-center justify-center">
          <EllipsisIcon className="size-5 rotate-90" />
        </button>
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
    </>
  );
};

export default LiveAgentsTable;
