import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HistoryTickets } from "./_components/history-tickets";

// export async function generateMetadata({
//   params,
// }: {
//   params: { storeId: string };
// }) {
//   const store = await db.store.findUnique({
//     where: {
//       id: params.storeId,
//     },
//   });

//   return {
//     title: `Ticket - ${store?.name}` || "Ticket",
//   };
// }

const TicketLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-10 p-2">
      {children}
    </div>
  );
};

export default TicketLayout;
