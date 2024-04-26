import { z } from "zod";

export const CreateTicket = z.object({
  department: z.string({
    required_error: "department is required",
    invalid_type_error: "department is required",
  }),
  services: z.string({
    required_error: "service is required",
    invalid_type_error: "service is required",
  }),
  priority: z.string({
    required_error: "priority is required",
    invalid_type_error: "priority is required",
  }),
  subject: z.string({
    required_error: "subject is required",
    invalid_type_error: "subject is required",
  }).min(3, {
    message: "El asunto debe tener al menos 3 caracteres."
  }),
  message: z.string({
    required_error: "message is required",
    invalid_type_error: "message is required",
  }).min(3, {
    message: "El mensaje debe tener al menos 3 caracteres."
  }),
  storeId: z.string(),
  images: z.array(z.object({
    url: z.string(),
  })).optional(),
});