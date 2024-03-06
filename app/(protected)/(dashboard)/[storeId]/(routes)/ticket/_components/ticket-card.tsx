import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Deparment } from "@prisma/client";
import Link from "next/link";

interface TicketCardProps {
  deparment: Deparment;
  storeId: string;
}

export const TicketCard = ({ deparment, storeId }: TicketCardProps) => {
  return (
    <Card className="flex flex-col w-[100%]">
      <CardHeader className="flex-1">
        <CardTitle >{deparment.name}</CardTitle>
        <CardDescription>Descripcion</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          className="w-full"
          href={`/${storeId}/ticket/new-ticket?deparment=${deparment.name}`}
        >
          <Button className="w-full" variant="default">Abrir un nuevo ticket</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
