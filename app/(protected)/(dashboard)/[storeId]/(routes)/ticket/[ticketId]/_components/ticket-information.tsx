import { StatusBagge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";
import { Ticket } from "@prisma/client";
import { format } from "date-fns";

interface TicketInformationProps {
  data: Ticket;
  user?: ExtendedUser;
}

export const TicketInformation = ({ data, user }: TicketInformationProps) => {
  return (
    <Card className="col-span-4 h-[600px] md:col-span-2">
      <CardHeader>
        <CardTitle>Ticket Information</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-1 ">

          <div className="flex flex-col gap-1 rounded-xs bg-neutral-50 shadow-sm h-20 p-5">
            <span className="font-semibold text-xs text-gray-400">
              Subject:
            </span>
            <span className="uppercase text-gray-900 text-sm">
              {user?.name}
            </span>
          </div>
          <div className="flex flex-col gap-1 bg-neutral-50 rounded-xs shadow-sm h-20 p-5">
            <span className="font-semibold text-xs text-gray-400">
            Department:
            </span>
            <span className="uppercase text-gray-900 text-sm">
              {data?.department}
            </span>
          </div>
          <div className="flex flex-col gap-1 bg-neutral-50 rounded-xs shadow-sm h-20 p-5">
            <span className="font-semibold text-xs text-gray-400">
            Submitted:
            </span>
            <span className="uppercase text-gray-900 text-sm">
            {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
          <div className="flex flex-col gap-1 bg-neutral-50 rounded-xs shadow-sm h-20 p-5">
            <span className="font-semibold text-xs text-gray-400">
            Last Updated:
            </span>
            <span className="uppercase text-gray-900 text-sm">
            {format(new Date(data.updatedAt), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
          <div className="flex flex-col gap-1 bg-neutral-50 rounded-xs shadow-sm h-20 p-5">
            <span className="font-semibold text-xs text-gray-400">
            Status/Priority:
            </span>
            <span className="uppercase text-gray-900 text-sm">
                <StatusBagge 
                status={data.status}
                /> {data.priority}
            </span>
          </div>


        </div>
      </CardContent>
    </Card>
  );
};
