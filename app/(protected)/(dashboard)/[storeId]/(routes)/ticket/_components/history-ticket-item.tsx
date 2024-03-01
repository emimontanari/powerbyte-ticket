import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ticket } from "@prisma/client";

interface HistoryTicketProps {
  ticket: Ticket;
}

export const HistoryTicketItem = ({ ticket }: HistoryTicketProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            #{ticket.id} - {ticket.department}
          </p>
          <p className="text-sm text-muted-foreground">{ticket.status}</p>
        </div>
      </div>
    </div>
  );
};
