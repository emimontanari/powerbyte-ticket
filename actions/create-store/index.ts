"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateStore } from "./schema";




const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();
    
    if (!user) return { error: "Unauthorized" }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    const { name } = data;

    if (!name) return { error: "Name is required" }



    console.log(data);

    try {
        const store = await db.store.create({
            data: {
                name,
                userId: user.id,
            }
        });


        return {
            data: store
        }


    } catch (error) {
        return {
            error: "Failed to create ticket"
        }
    }
}

export const createStore = createSafeAction(CreateStore, handler);