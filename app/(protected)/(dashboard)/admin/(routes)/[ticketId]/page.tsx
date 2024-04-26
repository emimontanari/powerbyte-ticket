import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { TicketConversation } from "../../../[storeId]/(routes)/ticket/[ticketId]/_components/ticket-conversation";
import { TicketInformation } from "../../../[storeId]/(routes)/ticket/[ticketId]/_components/ticket-information";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const AdmintTicketIdPage = async ({
  params,
}: {
  params: { ticketId: string };
}) => {
  const user = await currentUser();

  const { ticketId } = params;

  const ticket = await db.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          sender: true,
          images: true,
        },
      },
    },
  });

  if (!ticket) return;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={`Ticket #${ticketId}`} description="" />
        <Separator />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-10 p-2">
          <TicketInformation data={ticket} user={user} />
          <Card className="col-span-4 md:col-span-5">
            <CardHeader>
              <CardTitle>Información del Ticket</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <TicketConversation data={ticket} user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdmintTicketIdPage;
