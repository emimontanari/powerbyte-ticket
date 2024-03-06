import { StatusBagge } from "@/components/status-badge";
import { Ticket } from "@prisma/client";
import { TicketStatus } from "@/types";
import Link from "next/link";

interface HistoryTicketProps {
  ticket: Ticket;
}

export const HistoryTicketItem = ({ ticket }: HistoryTicketProps) => {
  return (
    <Link href={`/ticket/${ticket.id}`}>
      <div className="space-y-8 mb-1 py-3 cursor-pointer rounded-sm hover:bg-slate-200 transition">
        <div className="flex items-center">
          <div className="ml-4 space-y-3 w-full">
            <p className="text-sm font-medium leading-none">
              #{ticket.id.substring(0, 13).toLocaleUpperCase()} -{" "}
              {ticket.department}
            </p>
            <div className="flex flex-row justify-between">
              <StatusBagge
                status={ticket.status}
                variant={ticket.status as TicketStatus}
              />
              <p className="text-sm text-gray-500 mr-2">
                {ticket.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
