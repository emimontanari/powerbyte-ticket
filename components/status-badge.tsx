import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Ticket } from "@prisma/client";

const backgroundVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-0.5",
  {
    variants: {
      variant: {
        OPEN: "bg-emerald-100",
        CLOSED: "bg-gray-100",
        RESOLVED: "bg-amber-100",
        IN_PROGRESS: "bg-orange-100",
      },
    },
    defaultVariants: {
      variant: "OPEN",
    },
  }
);
const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        OPEN: "bg-emerald-800",
        CLOSED: "bg-gray-700",
        RESOLVED: "bg-amber-700",
        IN_PROGRESS: "bg-orange-700",
      },
    },
    defaultVariants: {
      variant: "OPEN",
    }
  }
);
type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface StatusBaggeProps extends BackgroundVariantsProps, IconVariantsProps {
  status: string;
}

export const StatusBagge = ({
  variant,
  status,
}: StatusBaggeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant }))}>
      <div className={cn(iconVariants({ variant }) , "w-2 h-2 rounded-full mr-1")}>
        </div>
      <p className="whitespace-nowrap text-xs uppercase">{status}</p>
    </div>
  );
};
