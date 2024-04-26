import { z } from "zod";

export const UpdateTicket = z.object({
    ticketId: z.string(),
    status: z.string({
        required_error: "status is required",
        invalid_type_error: "status is required",
    }),
    storeId: z.string(),
});