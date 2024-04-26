import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import {db } from "@/lib/db";
import { UserButton } from "./auth/user-button";

const Navbar = async () => {
  const  user  = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const stores = await db.store.findMany({
    where: {
      userId: user.id,
    }
  });
  

  const isAdmin = user.role === 'ADMIN';
  
  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {!isAdmin && (
        <StoreSwitcher items={stores} /> 
        )}
        <MainNav className="mx-6"  isAdmin={isAdmin}/>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
