"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { StatusBagge } from "@/components/status-badge";
import { TicketStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Message } from "@prisma/client";

export type TicketColumn = {
  id: string;
  status: string
  messages: Message[]
  priority: string;
  department: string;
  services: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<TicketColumn>[] = [
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="flex flex-col h-20 justify-center p-1">
        <span className="text-neutral-900 text-sm font-bold ">
          {row.original.department}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sky-600 text-sm font-bold uppercase">#{row.original.id.substring(0, 13)}</span>
        <span className="text-zinc-400 text-xs">{row.original.messages[0].body?.slice(0,30)}</span>
      </div>
    ),
  },
  // {
  //   accessorKey: "priority",
  //   header: "Priority",
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        <StatusBagge
          status={row.original.status}
          variant={row.original.status as TicketStatus}
        />
      </>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
