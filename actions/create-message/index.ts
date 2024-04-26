"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateMessage } from "./schema";
import { revalidatePath } from "next/cache";
import { Message, Ticket } from "@prisma/client";




const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized" }


    const { subject, body, storeId, ticketId, images } = data;

    if (!subject || !body) return { error: "All fields are required" }

    if (!ticketId) return { error: "Ticket id is required" }

    const ticket = await db.ticket.findUnique({
        where: {
            id: ticketId
        }
    })

    let message: Message;

    try {

        
        if (ticket?.status === "CLOSED") {
            message = await db.message.create({
                data: {
                    body,
                    subject,
                    ticketId,
                    senderId: user.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })

            if (images) {
                await db.image.createMany({
                    data: images.map(image => ({
                        url: image.url,
                        messageId: message.id,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }))
                });
            }

            await db.ticket.update({
                where: {
                    id: ticketId
                },
                data: {
                    status: "OPEN",
                    updatedAt: new Date()
                }
            })

            revalidatePath(`/${storeId}/ticket/${ticketId}`)

            return { data: message }

        }

        message = await db.message.create({
            data: {
                body,
                subject,
                ticketId,
                senderId: user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })


        if (images) {
            await db.image.createMany({
                data: images.map(image => ({
                    url: image.url,
                    messageId: message.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }))
            });
        }

        await db.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                status: user.role === "ADMIN" ? "IN_PROGRESS" : ticket?.status,
                updatedAt: new Date()
            }
        })




        revalidatePath(`/${storeId}/ticket/${ticketId}`)
        revalidatePath(`/admin/${ticketId}`)

        return { data: message }


    } catch (error) {
        return {
            error: "Failed to create ticket"
        }
    }
}

export const createMessage = createSafeAction(CreateMessage, handler);