import { HistoryTickets } from "@/components/ticket/history-tickets";
import { TicketForm } from "@/app/(protected)/(platform)/ticket/_components/ticket-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import { TicketContainer } from "./_components/ticket-container";

const TicketPage = async () => {
  const user = await currentUser();

  return (
    <>
      <Card className="col-span-2 h-[600px]">
        <CardHeader>
          <CardTitle>Tickets Recientes</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <HistoryTickets />
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-5">
        <CardHeader>
          <CardTitle>Información del Ticket</CardTitle>
          <CardDescription>Información del Ticket</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <UserInfo label="Información del Ticket" user={user} />
          <TicketContainer 
            user={user}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TicketPage;
