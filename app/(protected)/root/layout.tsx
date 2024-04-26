import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const store = await db.store.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (store) redirect(`/${store.id}`);

  if (user.role === "ADMIN") redirect("/admin");

  return <>{children}</>;
}
