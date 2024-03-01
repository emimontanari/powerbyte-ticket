"use client";

import { UserRole } from "@prisma/client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormErrorAuth } from "@/components/auth/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormErrorAuth message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
