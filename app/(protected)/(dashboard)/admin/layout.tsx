import Navbar from "@/components/navbar";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminProtectedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await currentUser();

  if (!user) redirect("/auth/login");


  if (user.role !== "ADMIN") redirect("/");

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AdminProtectedLayout;
