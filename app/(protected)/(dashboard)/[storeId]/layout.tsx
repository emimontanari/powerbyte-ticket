import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
