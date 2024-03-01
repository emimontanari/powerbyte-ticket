"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateTicket } from "./schema";
import { revalidatePath } from "next/cache";




const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }


    const { department, services, priority, subject, message, storeId } = data;

    if (!department || !services || !priority || !subject || !message) return { error: "All fields are required" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    let ticket;

    try {
        ticket = await db.ticket.create({
            data: {
                department,
                services,
                priority,
                subject,
                message,
                status: "OPEN",
                createdAt: new Date(),
                updatedAt: new Date(),
                storeId
            }
        })
        revalidatePath(`/${storeId}/ticket`)

        return { data: ticket }


    } catch (error) {
        return {
            error: "Failed to create ticket"
        }
    }
}

export const createTicket = createSafeAction(CreateTicket, handler);