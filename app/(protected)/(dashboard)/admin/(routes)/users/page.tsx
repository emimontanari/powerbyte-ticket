import { db } from "@/lib/db";
import { UsersColumns, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";

const UsersAdminPage = async () => {
  const users = await db.user.findMany({
    include: {
      accounts: true,
      twoFactorConfirmation: true,
      messages: true,
    },
  });

  console.log(users)

  const formattedUsers: UsersColumns[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    accounts: user.accounts,
    role: user.role,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    twoFactorConfirmation: user.twoFactorConfirmation,
    messages: user.messages,
  }));

  return (
    <div className="p-5">
      <DataTable data={formattedUsers}  columns={columns} searchKey="email"/>
    </div>
  );
};

export default UsersAdminPage;
