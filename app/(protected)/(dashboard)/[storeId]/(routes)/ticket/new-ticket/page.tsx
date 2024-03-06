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
    <>
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
    </>
  );
};

export default NewTicketPage;


//!! TODO: EN VEZ DE UNA PAGE, DEBERIA SER EL [DEPARMENT] PAGE Y QUE LA URL SE GENERE DEPENDIOENDO DEL DEPARMENTO, CAMBIAR EL NOMNRE A [DEPARMENT]