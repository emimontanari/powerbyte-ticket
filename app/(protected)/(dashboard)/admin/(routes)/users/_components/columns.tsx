"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {
  Account,
  Message,
  TwoFactorConfirmation,
  UserRole,
} from "@prisma/client";
import { format } from "date-fns";

export type UsersColumns = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  accounts: Account[];
  role: UserRole;
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation: TwoFactorConfirmation | null;
  messages: Message[];
};

export const columns: ColumnDef<UsersColumns>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="flex flex-col h-20 justify-center p-1">
        <span className="text-neutral-900 text-sm font-bold ">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex flex-col h-20 justify-center p-1">
        <span className="text-neutral-900 text-sm font-bold ">
          {row.original.email}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "Messages",
    header: "Messages",
    cell: ({ row }) => (
      <div className="flex flex-col h-20 justify-center p-1">
        <span className="text-neutral-900 text-sm font-bold ">
          {row.original.messages.length}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ row }) => (
      <div className="flex flex-col h-20 justify-center p-1">
        <span className="text-neutral-900 text-sm font-bold ">
          {format(row.original.emailVerified!, "MMMM do, yyyy")}
        </span>
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
