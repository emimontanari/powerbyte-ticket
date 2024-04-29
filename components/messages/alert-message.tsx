import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: React.ReactNode;
  variant: "default" | "destructive" | "success" | "blue";
  className?: string;
}

export function AlertDestructive({
  children,
  variant = "default",
  className,
}: AlertProps) {
  return (
    <Alert variant={variant} className={cn("border" , className)}>
      {/* <AlertTitle>Error</AlertTitle> */}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
