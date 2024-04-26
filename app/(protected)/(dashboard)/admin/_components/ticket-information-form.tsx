"use client";
import { TicketWithMessages } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@prisma/client";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { updateTicket } from "@/actions/update-status-ticket";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TicketInformationFormProps {
  data: TicketWithMessages;
}

export const TicketInformationForm = ({ data }: TicketInformationFormProps) => {
  const [value, setValue] = useState<Status>(data.status);

  const { execute, isLoading } = useAction(updateTicket, {
    onSuccess: (data) => {
      toast.success(`Ticket status updated to ${data.status} successfully`);
    },
    onError: (error) => {
      toast.error("Failed to update ticket status");
    },
  });

  const onSubmit = (formData: FormData) => {
    const status = formData.get("status") as string;

    if (data.status === status)
      return toast.error("Ticket status is already set to this status");

    execute({
      ticketId: data.id,
      status: status,
      storeId: data.storeId,
    });
  };

  useEffect(() => {
    setValue(data.status);
  }, [data.status]);

  return (
    <>
      <form action={onSubmit} className="w-full">
        <Select
          name="status"
          defaultValue={value}
          value={value}
          onValueChange={(value) => setValue(value as Status)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={Status.OPEN}>OPEN</SelectItem>
            <SelectItem value={Status.IN_PROGRESS}> EN PROCESO</SelectItem>
            <SelectItem value={Status.RESOLVED}> RESUELTO</SelectItem>
            <SelectItem value={Status.CLOSED}> CERRADO</SelectItem>
          </SelectContent>
        </Select>

        <FormSubmit
          disabled={isLoading}
          className="mt-2 w-full"
        >
          Update Status Ticket
        </FormSubmit>
      </form>
    </>
  );
};
