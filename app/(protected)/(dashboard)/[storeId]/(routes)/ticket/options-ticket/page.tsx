import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TicketCard } from "../_components/ticket-card";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

const OptionsTicket = async ({ params }: { params: { storeId: string } }) => {
  
  const deparment = await db.deparment.findMany();

  return (
    <>
      <Heading title="Open a new ticket" description="Choose Department" />
      <Separator />
      <Card className="w-full">
        <CardContent className="grid grid-cols1 md:grid-cols-3 p-4 gap-4 mt-5">
          {deparment.map((dep) => (
            <Suspense fallback={<TicketCard.Skeleton />} key={dep.id}>
              <TicketCard
                deparment={dep}
                storeId={params.storeId}
                key={dep.id}
              />
            </Suspense>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default OptionsTicket;
