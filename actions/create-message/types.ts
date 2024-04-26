import { z } from "zod";
import { Message } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateMessage } from "./schema";

export type InputType = z.infer<typeof CreateMessage>;

export type ReturnType = ActionState<InputType, Message>;
