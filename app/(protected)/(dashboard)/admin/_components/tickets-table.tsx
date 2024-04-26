
import { DataTable } from "@/components/ui/data-table";
import { TicketColumn, columns } from "./columns";

interface TicketClientProps {
  data: TicketColumn[];
}

export const TicketTable = ({ data }: TicketClientProps) => {
  return (
    <>
      <DataTable searchKey="department" columns={columns} data={data} />
    </>
  );
};
