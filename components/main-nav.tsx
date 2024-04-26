"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainNavProps {
  isAdmin: boolean;
}

export function MainNav({
  className,
  isAdmin,
  ...props
}: React.HTMLAttributes<HTMLElement> & MainNavProps) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Inicio",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/ticket`,
      label: "Ticket",
      active: pathname === `/${params.storeId}/ticket`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  const adminRouter = [
    {
      href: `/admin`,
      label: "Inicio",
      active: pathname === `/admin`,
    },
    {
      href: `/admin/tickets`,
      label: "Tickets",
      active: pathname === `/admin/tickets`,
    },
    {
      href: `/admin/users`,
      label: "Usuarios",
      active: pathname === `/admin/users`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {isAdmin
        ? adminRouter.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))
        : routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
    </nav>
  );
}
