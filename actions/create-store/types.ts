import { z } from "zod";
import { Store } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateStore } from "./schema";

export type InputType = z.infer<typeof CreateStore>;

export type ReturnType = ActionState<InputType, Store>;
