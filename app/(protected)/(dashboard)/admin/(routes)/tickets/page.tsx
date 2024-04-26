import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { format } from "date-fns";
import { TicketColumn } from "../../_components/columns";
import { TicketTable } from "../../_components/tickets-table";

const TicketAdminPage = async () => {

  const tickets = await db.ticket.findMany({
    include: {
      messages: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTickets: TicketColumn[] = tickets.map((ticket) => ({
    id: ticket.id,
    department: ticket.department,
    messages: ticket.messages as Message[],
    priority: ticket.priority,
    services: ticket.services,
    status: ticket.status,
    createdAt: format(ticket.createdAt, "MMMM do, yyyy"),
    updatedAt: format(ticket.updatedAt, "MMMM do, yyyy"),
  }));

  return (
    
    <div className="p-5">
      <TicketTable data={formattedTickets} />
    </div>
  );
};

export default TicketAdminPage;
