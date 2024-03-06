
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

const TicketLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-10 p-2">
      {children}
    </div>
  );
};

export default TicketLayout;
