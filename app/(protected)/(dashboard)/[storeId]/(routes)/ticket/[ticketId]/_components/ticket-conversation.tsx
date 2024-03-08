import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExtendedUser } from "@/next-auth";
import { Ticket } from "@prisma/client";
import { format } from "date-fns";
import { UserRound } from "lucide-react";

interface TicketConversationProps {
  data: Ticket;
  user?: ExtendedUser;
}

export const TicketConversation = ({ data, user }: TicketConversationProps) => {
  const { message, createdAt } = data;

  const messageLines = message.split("\n");

  return (
    <Card className="space-y-4 p-5 border-l-4 border-l-blue-900">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <UserRound className="w-4 h-4" />
          <span className="font-bold uppercase">{user?.name}</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="bg-green-200 text-green-600 py-1 px-2 rounded-sm text-xs uppercase font-semibold float-right">
            Propietario
          </span>
          <div className="text-gray-500">
            {format(new Date(data.createdAt), "MMMM d 'at' h:mm a")}
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4 p-1 text-start">
        {messageLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </Card>
  );
};
