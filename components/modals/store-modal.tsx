"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef, ElementRef } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

import { useAction } from "@/hooks/use-action";
import { createStore } from "@/actions/create-store";
import { FormInput } from "../form/form-input";
import { FormSubmit } from "../form/form-submit";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors, isLoading } = useAction(createStore, {
    onSuccess: (data) => {
      toast.success("El Store a sido creado", {
        description: `${data.createdAt}`,
      });
      window.location.assign(`/${data.id}`);
      formRef.current?.reset();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  const onSubmit = async (formData: FormData) => {
    const name = formData.get("store") as string;

    execute({
      name,
    });
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <form action={onSubmit}>
              <FormInput
                label="Nombre"
                ref={inputRef}
                errors={fieldErrors}
                id="store"
                className="text-sm px-2 py-1 h-10 font-medium border-transparent hover:border-input focus:border-input transition"
                placeholder="E-Commerce"
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <FormSubmit disabled={isLoading}>Continue</FormSubmit>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

{
  /* <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-Commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form> */
}
