import {db} from "@/lib/db";



export const getAllServices = async () => {
  const allServices = await db.service.count();

  return allServices;
};
