"use client";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navbar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();
  const stores = [{ id: "1", name: user?.name }];
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
};
