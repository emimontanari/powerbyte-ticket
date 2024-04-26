import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Heading } from "@/components/ui/heading";
import { db } from "@/lib/db";
import Link from "next/link";
import { TicketColumn } from "./_components/columns";
import { TicketClient } from "./_components/ticket-client";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRightFromSquare } from "lucide-react";

const TicketPage = async ({ params }: { params: { storeId: string } }) => {
  const tickets = await db.ticket.findMany({
    where: {
      storeId: params.storeId,
    },
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
    subject: ticket.messages[0].subject as string,
    priority: ticket.priority,
    status: ticket.status,
    createdAt: format(ticket.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <Heading title="My Support Tickets" description="" />
      <Separator />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-10 p-2">
        <Card className="col-span-4 h-[600px] md:col-span-2">
          <CardHeader>
            <CardTitle>Support</CardTitle>
          </CardHeader>
          <CardContent className="">
            <Link
              href={`/${params.storeId}/ticket/options-ticket`}
              className=" flex items-center gap-2 text-sky-600 font-semibold cursor-pointer justify-center w-full h-10 border border-sky-600 rounded-sm hover:bg-sky-600 hover:text-white transition-all duration-300 ease-in-out text-sm"
            >
              <ArrowUpRightFromSquare className="w-4 h-4 " />
              Open a new ticket
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-4 md:col-span-5">
          <CardHeader>
            <CardTitle>Información del Ticket</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <TicketClient data={formattedTickets} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TicketPage;
