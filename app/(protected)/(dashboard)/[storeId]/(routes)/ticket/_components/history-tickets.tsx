import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ticket } from "@prisma/client";
import { HistoryTicketItem } from "./history-ticket-item";

interface HistoryTicketsProps {
  data: Ticket[];
}

export async function HistoryTickets({ data }: HistoryTicketsProps) {

  return (
    <>
      {data.map((ticket) => (
        <HistoryTicketItem ticket={ticket} key={ticket.id}/>
      ))}
    </>
  );
}
