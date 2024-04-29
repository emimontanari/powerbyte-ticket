"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateTicket } from "./schema";
import { revalidatePath } from "next/cache";
import { Message, Ticket } from "@prisma/client";




const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }


    const { department, services, priority, subject, message, storeId, images } = data;


    if (!department || !services || !priority || !subject || !message) return { error: "Todos los campos son requeridos" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    let ticket: Ticket;
    let newMessage: Message;

    try {
        ticket = await db.ticket.create({
            data: {
                department,
                services,
                priority,
                status: "OPEN",
                createdAt: new Date(),
                updatedAt: new Date(),
                storeId
            }
        })

        newMessage = await db.message.create({
            data: {
                body: message,
                subject,
                ticketId: ticket.id,
                senderId: user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        if (images) {
            await db.image.createMany({
                data: images.map(image => ({
                    url: image.url,
                    messageId: newMessage.id,
                    createdAt: new Date(),
                    updatedAt: new Date()

                }))
            });

        }
        revalidatePath(`/${storeId}/ticket`)

        return { data: ticket }


    } catch (error) {
        return {
            error: "Failed to create ticket"
        }
    }
}

export const createTicket = createSafeAction(CreateTicket, handler);