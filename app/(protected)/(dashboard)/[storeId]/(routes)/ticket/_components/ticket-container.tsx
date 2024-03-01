import { currentUser } from "@/lib/auth";
import { TicketForm } from "./ticket-form";

export const TicketContainer = async () => {
  const user = await currentUser();

  return (
    <TicketForm user={user} />
  )
};
