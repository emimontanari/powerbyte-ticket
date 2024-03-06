import { currentUser } from "@/lib/auth";
import { TicketForm } from "./ticket-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Deparment, Priority, Service } from "@prisma/client";

interface TicketContainerProps {
  service: Service[];
  deparment: Deparment[];
  priority: Priority[];
}

export const TicketContainer = async ({
  service,
  deparment,
  priority,
}: TicketContainerProps) => {
  const user = await currentUser();

  return (
    <Card className="col-span-4 md:col-span-5">
      <CardHeader>
        <CardTitle>Información del Ticket</CardTitle>
        <CardDescription>Información del Ticket</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TicketForm
          user={user}
          service={service}
          deparment={deparment}
          priority={priority}
        />
      </CardContent>
    </Card>
  );
};
