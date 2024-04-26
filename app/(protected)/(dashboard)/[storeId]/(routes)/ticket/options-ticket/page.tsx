import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TicketCard } from "../_components/ticket-card";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { getAllDeparments } from "@/actions/getAllDeparments";

const OptionsTicket = async ({ params }: { params: { storeId: string } }) => {
  const deparments = await getAllDeparments();

  return (
    <>
      <Heading title="Open a new ticket" description="Choose Department" />
      <Separator />
      <Card className="w-full">
        <CardContent className="grid grid-cols1 md:grid-cols-3 p-4 gap-4 mt-5">
          {deparments.map((dep) => (
              <TicketCard
                deparment={dep}
                storeId={params.storeId}
                key={dep.id}
              />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default OptionsTicket;
