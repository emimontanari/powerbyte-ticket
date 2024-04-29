"use client";
import { useRef, ElementRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserTicketInfo } from "../../_components/user-ticket-info";
import { ExtendedUser } from "@/next-auth";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks/use-action";
import { createMessage } from "@/actions/create-message";
import { toast } from "sonner";
import { TicketWithMessages } from "@/types";
import { ImageUpload } from "@/components/ui/image-upload";
import { Image } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface TicketReplyMessageProps {
  user: ExtendedUser;
  data?: TicketWithMessages;
}
const TicketReplyMessage = ({ user, data }: TicketReplyMessageProps) => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [valueImages, setValueImages] = useState<Image[]>([]);

  const { execute, fieldErrors, isLoading } = useAction(createMessage, {
    onSuccess: (data) => {
      toast.success("El Mensaje a sido enviado!", {
        description: `${data.createdAt}`,
      });
      formRef.current?.reset();
      setValueImages([]);
    },
    onError: (error) => {
      toast.error("Error al enviar el mensaje!");
    },
  });

  const onSubmit = (formData: FormData) => {
    const subject = formData.get("subject") as string;
    const body = formData.get("body") as string;
    const storeId = (params.storeId as string)
      ? (params.storeId as string)
      : (data?.storeId as string);
    const ticketId = params.ticketId as string;
    const images = valueImages.map((image) => image) as Image[];

    execute({
      subject,
      body,
      storeId,
      ticketId,
      images,
    });
  };

  console.log(isLoading)
  return (
    <form action={onSubmit} className="w-full space-y-6" ref={formRef}>
      <Card className="w-full shadow-sm">
        <CardContent className="space-y-5 mt-4">
          <UserTicketInfo user={user} label="Información del Ticket" />
          <FormInput
            label="Asunto"
            ref={inputRef}
            errors={fieldErrors}
            id="subject"
            className="text-sm px-2 py-1 h-10 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Ingrese el asunto..."
            disabled={isLoading}
          />
          <FormTextarea
            label="Mensaje"
            id="body"
            placeholder="Ingrese el mensaje..."
            className="h-40 w-full px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition"
            errors={fieldErrors}
            disabled={isLoading}
          />
          <ImageUpload
            onChange={(url) => {
              setValueImages((prev) => [...prev, { url } as Image]);
            }}
            onRemove={(url) => {
              setValueImages((prev) =>
                prev.filter((image) => image.url !== url)
              );
            }}
            value={valueImages?.map((image) => image.url)}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit
              className="w-[25%] h-10 bg-primary text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Enviar"
              )}
            </FormSubmit>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default TicketReplyMessage;
