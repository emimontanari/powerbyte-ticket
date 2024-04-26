import { db } from "@/lib/db";

const sleep = (seconds: number): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
}

export const getAllDeparments = async () => {

    const allDeparments = await db.deparment.findMany();

    return allDeparments;
}