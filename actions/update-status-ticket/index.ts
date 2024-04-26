"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateTicket } from "./schema";
import { revalidatePath } from "next/cache";
import { Status } from "@prisma/client";




const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }



    const { status, storeId, ticketId } = data;

    if (!status || !ticketId || !storeId) return { error: "status is required" }


    const dbUser = await getUserById(user.id);

    if (!dbUser) return { error: "Unauthorized" }

    if (dbUser.role !== "ADMIN") return { error: "Unauthorized" }

    let ticket;



    try {
        ticket = await db.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                status: status as Status,
                updatedAt: new Date()
            }
        })


        revalidatePath(`/admin/${ticketId}`)

        return { data: ticket }


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create ticket"
        }
    }
}

export const updateTicket = createSafeAction(UpdateTicket, handler);