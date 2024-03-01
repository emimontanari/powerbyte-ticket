import { HistoryTickets } from "@/app/(protected)/(dashboard)/[storeId]/(routes)/ticket/_components/history-tickets";
import { TicketForm } from "@/app/(protected)/(dashboard)/[storeId]/(routes)/ticket/_components/ticket-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { TicketContainer } from "./_components/ticket-container";
import { db } from "@/lib/db";

const TicketPage = async ({ params }: { params: { storeId: string } }) => {
  const tickets = await db.ticket.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  

  return (
    <>
      <Card className="col-span-2 h-[600px]">
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <HistoryTickets data={tickets} />
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-5">
        <CardHeader>
          <CardTitle>Información del Ticket</CardTitle>
          <CardDescription>Información del Ticket</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TicketContainer />
        </CardContent>
      </Card>
    </>
  );
};

export default TicketPage;
