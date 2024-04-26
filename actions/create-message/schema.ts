import { z } from "zod";

export const CreateMessage = z.object({
  subject: z.string({
    required_error: "subject is required",
    invalid_type_error: "subject is required",
  }).min(3, {
    message: "El asunto debe tener al menos 3 caracteres."
  }),
  body: z.string({
    required_error: "message is required",
    invalid_type_error: "message is required",
  }).min(3, {
    message: "El mensaje debe tener al menos 3 caracteres."
  }),
  ticketId: z.string(),
  storeId: z.string(),
  images: z.array(z.object({
    url: z.string()
  }))
});