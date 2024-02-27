"use client";
import * as z from "zod";
import { ExtendedUser } from "@/next-auth";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketMessageSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../../../components/ui/card";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";

interface UserInfoProps {
  user?: ExtendedUser;
}

export const TicketForm = ({ user }: UserInfoProps) => {
  const form = useForm<z.infer<typeof TicketMessageSchema>>({
    resolver: zodResolver(TicketMessageSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof TicketMessageSchema>) => {
    console.log(values);
  };
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{""}</p>
      </CardHeader>
      <CardContent className="space-y-5">
      <form
          // action={onSubmit}
          // ref={formRef}
          className="w-full space-y-6"
        >
          <FormInput
            label="Asunto"
            // ref={inputRef}
            // errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-10 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Ingrese el asunto..."
          />

          <FormTextarea
          label="Mensaje"
          id="title"
          // onKeyDown={onTextareakeyDown}
          // ref={ref}
          placeholder="Ingrese el mensaje..."
          className="h-40 w-full px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition"
          // errors={fieldErrors}
        />
          <input
            hidden
            // value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Enviar
            </FormSubmit>
            <Button 
              // onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};



{/* <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asunto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Asunto"
                        className="h-[40px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="h-[300px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-[400px] h-[40px]">
              Enviar
            </Button>
          </form>
        </Form> */}