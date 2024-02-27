
const TicketLayout = async ({ children }: { children: React.ReactNode }) => {


  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-10 p-2">

      {children}
    </div>
  );
};

export default TicketLayout;
