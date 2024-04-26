import { z } from "zod";
import { Ticket } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateTicket } from "./schema";

export type InputType = z.infer<typeof UpdateTicket>;

export type ReturnType = ActionState<InputType, Ticket>;
