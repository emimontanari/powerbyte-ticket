"use client";
import { useSearchParams } from "next/navigation";
import { useRef, ElementRef, useState } from "react";
import { useParams } from "next/navigation";
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { UserTicketInfo } from "../_components/user-ticket-info";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAction } from "@/hooks/use-action";
import { createTicket } from "@/actions/create-ticket";
import { toast } from "sonner";
import { Deparment, Image, Priority, Service } from "@prisma/client";
import { ImageUpload } from "@/components/ui/image-upload";

interface TicketFormProps {
  user?: ExtendedUser;
  service?: Service[];
  deparment?: Deparment[];
  priority?: Priority[];
}

export const TicketForm = ({
  user,
  service,
  deparment,
  priority,
}: TicketFormProps) => {
  const [valueImages, setValueImages] = useState<Image[]>([]);
  const params = useParams();
  const searchParams = useSearchParams();

  const deparmentParams = searchParams.get("deparment");

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors, isLoading } = useAction(createTicket, {
    onSuccess: (data) => {
      toast.success("El Ticket a sido creado", {
        description: `${data.createdAt}`,
      });
      formRef.current?.reset();

      setValueImages([]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error al crear el ticket");
    },
  });

  const onSubmit = async (formData: FormData) => {
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const department = formData.get("department") as string;
    const services = formData.get("services") as string;
    const priority = formData.get("priority") as string;
    const storeId = params.storeId as string;
    // const files = formData.getAll("image") as File[];
    const images = valueImages.map((image) => image) as Image[]

    execute({
      subject,
      message,
      department,
      services,
      priority,
      storeId,
      images
    });
  };

  return (
    <form action={onSubmit} className="w-full space-y-6" ref={formRef}>
      <Card className="w-full shadow-sm">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">{""}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <UserTicketInfo user={user} label="Información del Ticket" />

          <div className="flex flex-col w-full items-center md:flex-row gap-3">
            <div className="flex flex-col w-full">
              <p className="text-sm uppercase mb-1">Departamento</p>
              <Select
                disabled={isLoading}
                name="department"
                defaultValue={(deparmentParams as string) || ""}
              >
                <SelectTrigger className="w-[100%] h-[40px]">
                  <SelectValue
                    defaultValue={(deparmentParams as string) || ""}
                    placeholder="Seleccione Departamento"
                  />
                </SelectTrigger>
                <SelectContent>
                  {deparment?.map((deparment) => (
                    <SelectItem key={deparment.id} value={deparment.name}>
                      {deparment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full">
              <p className="text-sm uppercase mb-1">Servicios Relacionados </p>
              <Select disabled={isLoading} name="services" defaultValue="">
                <SelectTrigger className="w-[100%] h-[40px]">
                  <SelectValue
                    placeholder="Seleccione Servicio"
                    defaultValue={""}
                  />
                </SelectTrigger>

                <SelectContent>
                  {service?.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full">
              <p className="text-sm uppercase mb-1">Prioridad</p>
              <Select disabled={isLoading} name="priority" defaultValue="">
                <SelectTrigger className="w-[100%] h-[40px]">
                  <SelectValue
                    defaultValue={""}
                    placeholder="Seleccione Prioridad"
                  />
                </SelectTrigger>

                <SelectContent>
                  {priority?.map((priority) => (
                    <SelectItem key={priority.id} value={priority.name}>
                      {priority.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full shadow-sm">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">{""}</p>
        </CardHeader>
        <CardContent className="space-y-5">
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
            id="message"
            placeholder="Ingrese el mensaje..."
            className="h-40 w-full px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition"
            errors={fieldErrors}
            disabled={isLoading}
          />
          <ImageUpload
            onChange={(url) => {setValueImages((prev) => [...prev, { url } as Image]);}}
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
              Enviar
            </FormSubmit>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
