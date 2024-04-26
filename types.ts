import { Image, Message, Ticket, User } from "@prisma/client";
import { ExtendedUser } from "./next-auth";

export type TicketStatus = "OPEN" | "CLOSED" | "RESOLVED" | "IN_PROGRESS";


export type TicketWithMessages = Ticket & { messages: Message[] };
export type TicketWithMessagesAndUser = TicketWithMessages & { sender: User };

export type MessageWithImages = Message & { images: Image[] };