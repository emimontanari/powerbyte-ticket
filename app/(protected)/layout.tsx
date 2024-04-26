import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ProtectedLayout;
