import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketCard } from "../_components/ticket-card";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

const OptionsTicket = async ({ params }: { params: { storeId: string } }) => {
  const deparment = await db.deparment.findMany();

  return (
    <>
      <Card className="col-span-9">
        <CardHeader>
          <CardTitle className="text-3xl">Abrir un nuevo ticket</CardTitle>
          <CardTitle className="text-lg text-gray-400 font-light">
            Elige un departamento
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols1 md:grid-cols-3 p-4 gap-4 mt-5">
          {deparment.map((dep) => (
            <TicketCard deparment={dep} storeId={params.storeId} key={dep.id} />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default OptionsTicket;
