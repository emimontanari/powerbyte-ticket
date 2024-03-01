import {db} from "@/lib/db";



export const getTotalTicketStore = async (storeId: string) => {
  const salesTicket = await db.ticket.count({
    where: {
      storeId,
    },
  });

  return salesTicket;
};
