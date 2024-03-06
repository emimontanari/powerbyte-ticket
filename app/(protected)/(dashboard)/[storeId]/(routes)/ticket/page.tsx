import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const TicketPage = async ({ params }: { params: { storeId: string } }) => {
  
  return (
    <>
      <Card className="col-span-5 h-[600px] md:col-span-2">
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Link href={`/${params.storeId}/ticket/options-ticket`}>
            Crear Ticket
          </Link>
        </CardContent>
      </Card>

      <Card className="col-span-4 md:col-span-5">
        <CardHeader>
          <CardTitle>Información del Ticket</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          Table with all tickets information
        </CardContent>
      </Card>
    </>
  );
};

export default TicketPage;
