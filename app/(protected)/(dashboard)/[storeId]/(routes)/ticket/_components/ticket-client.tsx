import { DataTable } from "@/components/ui/data-table";


import { columns, TicketColumn } from "./columns";

interface TicketClientProps {
  data: TicketColumn[];
}

export const TicketClient = ({data} : TicketClientProps) => {
    
  return (
    <>
      <DataTable searchKey="department" columns={columns} data={data} />
    </>
  );
};

