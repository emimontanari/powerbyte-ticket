import { z } from "zod";

export const CreateStore = z.object({
  name: z.string({
    required_error: "Nombre es requerido",
    invalid_type_error: "Nombre es requerido",
  }),
});