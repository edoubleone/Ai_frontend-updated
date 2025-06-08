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
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AvatarComponent from "@/components/shared/custom-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import ShareIcon from "@/components/shared/share-icon";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import ShareBotModal from "../bot/share-bot.modal";
import CreateCampaign from "../bot/create-campaign";

interface RowAssistant {
  id: number;
  botAvatar: string;
  assistantName: string;
  botType: string;
  assistantLanguage: string;
  status: string;
  share_url: string;
}

interface DataTableProps {
  data: RowAssistant[];
}

const DashboardBotsDataTable = ({ data }: DataTableProps) => {
  const [action, setAction] = useState<"share" | "campaign" | null>(null);
  const [selectedRow, setSelectedRow] = useState<RowAssistant | null>(null);

  const columns: ColumnDef<RowAssistant>[] = [
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
      header: "Assistant Name",
    },
    {
      accessorKey: "botType",
      header: "Assitant Type",
    },
    {
      accessorKey: "assistantLanguage",
      header: "Assistant Language",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`text-base font-bold ${
            row.original.status === "Bot created"
              ? "text-[#34A853]"
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
            <button
              disabled={!row.original.share_url}
              onClick={() => {
                setAction("share");
                setSelectedRow(row.original);
              }}
              className={clsx(
                "flex transition-all text-sm w-full hover:bg-[#E7E7E7]/30 rounded items-start ease-in-out duration-500 gap-3 !py-3 !px-4"
              )}
            >
              <ShareIcon width={16} height={16} />
              Share Assistant
            </button>

            <button
              onClick={() => {
                setAction("campaign");
                setSelectedRow(row.original);
              }}
              className={clsx(
                "flex transition-all text-sm w-full hover:bg-[#E7E7E7]/30 rounded items-start ease-in-out duration-500 gap-3 !py-3 !px-4"
              )}
            >
              <ShareIcon width={16} height={16} />
              Create Campaign
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
        <TableHeader className="bg-[#EEEEFD]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="text-dark whitespace-nowrap p-4 text-base"
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
                <TableCell className="p-4 whitespace-nowrap" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={action === "share"}
        onOpenChange={(open) => setAction(open ? "share" : null)}
      >
        {selectedRow && selectedRow.share_url && (
          <ShareBotModal url={selectedRow.share_url} />
        )}
      </Dialog>

      <Dialog
        open={action === "campaign"}
        onOpenChange={(open) => setAction(open ? "campaign" : null)}
      >
        {selectedRow && (
          <CreateCampaign
            closeModal={() => setAction(null)}
            id={selectedRow?.id}
          />
        )}
      </Dialog>
    </>
  );
};

export default DashboardBotsDataTable;
