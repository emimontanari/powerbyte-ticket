import { MessageWithImages, TicketWithMessages } from "@/types";
import { TicketMessage } from "./ticket-message";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil } from "lucide-react";
import TicketReplyMessage from "./ticket-reply-message";
import { ExtendedUser } from "@/next-auth";
import { AlertDestructive } from "@/components/messages/alert-message";

interface TicketConversationProps {
  data: TicketWithMessages;
  user?: ExtendedUser;
}

export const TicketConversation = ({ data, user }: TicketConversationProps) => {

  const isClosed = data.status === "CLOSED";
  
  return (
    <>
      {isClosed && (
        <AlertDestructive
          variant="default"
          className="border-blue-300 text-blue-600 font-semibold text-start bg-sky-100"
        >
          This ticket is closed. You may reply to this ticket to reopen it.
        </AlertDestructive>
      )}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center justify-center space-x-4 text-blue-600 font-semibold">
              <Pencil className="w-5 h-5 t" />
              <p className="text-xl">Responder</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TicketReplyMessage user={user as ExtendedUser} data={data} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {data.messages.map((message) => (
        <TicketMessage data={message as MessageWithImages} key={message.id} />
      ))}
    </>
  );
};
