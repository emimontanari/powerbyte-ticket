import { Toaster } from "sonner";
import { Navbar } from "./_components/navbar";

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
