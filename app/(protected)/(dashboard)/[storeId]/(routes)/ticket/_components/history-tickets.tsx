import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ticket, User } from "@prisma/client";
import { HistoryTicketItem } from "./history-ticket-item";

interface HistoryTicketsProps {
  data: Ticket[];
}

export async function HistoryTickets({ data }: HistoryTicketsProps) {
  return (
    <>
    {data.length ? (
      data.map((ticket) => (
        <HistoryTicketItem ticket={ticket} key={ticket.id} />
      ))
    ) : (
      <p className="text-center text-gray-500">No hay tickets</p>
    )}

    </>
  );
}
