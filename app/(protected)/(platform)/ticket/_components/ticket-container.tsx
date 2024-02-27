import { TicketForm } from "./ticket-form";
import { ExtendedUser } from "@/next-auth";

interface TicketContainerProps {
  user?: ExtendedUser;
}

export const TicketContainer = async ({ user }: TicketContainerProps) => {

  return <TicketForm />;
};
