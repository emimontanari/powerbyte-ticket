import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { HistoryTickets } from "../_components/history-tickets";
import { TicketContainer } from "../_components/ticket-container";

const NewTicketPage = async ({ params }: { params: { storeId: string, deparment: string } }) => {
  
  const tickets = await db.ticket.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const services = await db.service.findMany();
  const deparmentDb = await db.deparment.findMany();
  const priority = await db.priority.findMany();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-10 p-2">
      <Card className="col-span-5 h-[600px] md:col-span-2">
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <HistoryTickets data={tickets} />
        </CardContent>
      </Card>

      <TicketContainer
        service={services}
        deparment={deparmentDb}
        priority={priority}
      />
      
    </div>
  );
};

export default NewTicketPage;