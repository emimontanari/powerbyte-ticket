import { db } from "@/lib/db";



interface TotalTicket {
  storeId: string;
}


export const getTotalTicketStore = async ({ storeId }: TotalTicket) => {

  const salesTicket = await db.ticket.count({
    where: {
      storeId,
    },
  });

  return salesTicket;
};



