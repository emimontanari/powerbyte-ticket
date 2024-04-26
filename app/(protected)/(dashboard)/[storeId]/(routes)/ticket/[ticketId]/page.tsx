import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketInformation } from "./_components/ticket-information";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { TicketConversation } from "./_components/ticket-conversation";
import { TicketWithMessagesAndUser } from "@/types";

const TicketIdPage = async ({
  params,
}: {
  params: { ticketId: string; storeId: string };
}) => {
  const user = await currentUser();
  const { ticketId, storeId } = params;

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

  if (!ticket) return redirect(`/${storeId}/ticket`);

  return (
    <>
      <Heading title={`Ticket #${params.ticketId}`} description="" />
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
    </>
  );
};

export default TicketIdPage;
