import { ProductImage } from "@/components/messages/Message-image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/data/user";
import { cn } from "@/lib/utils";
import { MessageWithImages } from "@/types";
import { format } from "date-fns";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TicketMessageProps {
  data: MessageWithImages;
}

export const TicketMessage = async ({ data }: TicketMessageProps) => {
  const user = await getUserById(data.senderId);
  const messageLines = data.body?.split("\n") || [];

  return (
    <Card
      className={cn(
        "space-y-4 p-5",
        user?.role === "ADMIN" && "border-l-blue-900 border-l-4"
      )}
      key={data.id}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <UserRound className="w-5 h-5" />
          <span className="font-bold uppercase">{user?.name}</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span
            className={cn(
              "py-1 px-2 rounded-sm text-xs uppercase font-semibold float-right",
              user?.role === "ADMIN"
                ? "text-blue-600 bg-blue-200"
                : "text-green-600 bg-green-200"
            )}
          >
            {user?.role === "USER" ? "PROPIETARIO" : "OPERADOR"}
          </span>
          <div className="text-gray-500">
            {format(new Date(data.createdAt), "MMMM d 'at' h:mm a")}
          </div>
        </div>
      </div>
      <Separator />

      <div className="space-y-4 p-1 text-start">
        {messageLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-2">
          {data.images?.map((image) => (
            <div key={image.id}>
              <Link href={image.url} passHref target="_blank">
                <ProductImage value={image} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
