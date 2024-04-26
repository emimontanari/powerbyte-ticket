import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { Package, Store, Ticket } from "lucide-react";
import { TicketColumn, columns } from "../_components/columns";
import { TicketTable } from "../_components/tickets-table";
import { format } from "date-fns";
import { getAllServices } from "@/actions/getAllServices";

const AdminPage = async () => {
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

  const totalTickets = formattedTickets.length;

  const totalServices = await getAllServices();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Admin Page" description="Check all messages" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tiendas
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{10}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTickets}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>All Tickets</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <TicketTable data={formattedTickets} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
