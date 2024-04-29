import { TicketInformationForm } from "@/app/(protected)/(dashboard)/admin/_components/ticket-information-form";
import { StatusBagge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById } from "@/data/user";
import { ExtendedUser } from "@/next-auth";
import { TicketWithMessages } from "@/types";
import { format } from "date-fns";

interface TicketInformationProps {
  data: TicketWithMessages;
  user?: ExtendedUser;
}

export const TicketInformation = async ({
  data,
  user,
}: TicketInformationProps) => {
  const lastMessage = data.messages[data.messages.length - 1];
  const messageByUser = await getUserById(lastMessage.senderId);

  const isAdmin = user?.role === "ADMIN";

  return (
    <Card className="col-span-4 h-[650px] md:col-span-2 overflow-scroll">
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
              {messageByUser?.name}
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
              <StatusBagge status={data.status} variant={data.status} />
              {data.priority}
            </span>
          </div>
          {isAdmin && (
            <div className="flex flex-col gap-1 bg-neutral-50 rounded-xs shadow-sm h-30 p-5">
              <span className="font-semibold text-xs text-gray-400">
                Estado:
              </span>

              <TicketInformationForm data={data} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
