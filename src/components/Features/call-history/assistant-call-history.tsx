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

interface RowCallHistory {
  id: number;
  botAvatar: string;
  assistantName: string;
  phoneNumber: string;
  customerName: string;
  duration: string;
  repeat: string;
  message: string;
  date: string;
}

export const dummyCallHistoryData: RowCallHistory[] = [
  {
    id: 1,
    botAvatar: "https://via.placeholder.com/150",
    assistantName: "Assistant 1",
    phoneNumber: "+2348133333333",
    customerName: "John Doe",
    duration: "10:00",
    repeat: "Daily",
    message: "Hello, how are you?",
    date: "2024-05-01",
  },
  {
    id: 2,
    botAvatar: "https://via.placeholder.com/150",
    assistantName: "Assistant 2",
    phoneNumber: "+2348133333333",
    customerName: "Jane Smith",
    duration: "15:00",
    repeat: "Daily",
    message: "Hello, how are you?",
    date: "2024-05-02",
  },
  {
    id: 3,
    botAvatar: "https://via.placeholder.com/150",
    assistantName: "Assistant 3",
    phoneNumber: "+2348133333333",
    customerName: "Mike Johnson",
    duration: "20:00",
    repeat: "Daily",
    message: "Hello, how are you?",
    date: "2024-05-03",
  },
];

interface DataTableProps {
  data: RowCallHistory[];
}

const AssistantCallHistory = ({ data }: DataTableProps) => {
  const columns: ColumnDef<RowCallHistory>[] = [
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
      accessorKey: "botAvatar",
      header: "Assistant",
      cell: () => <AvatarComponent />,
    },
    {
      accessorKey: "assistantName",
      header: "Name",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "customerName",
      header: "Customer's Name",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "repeat",
      header: "Repeat",
    },
    {
      accessorKey: "message",
      header: "Message",
    },
    {
      accessorKey: "date",
      header: "Date",
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

export default AssistantCallHistory;
