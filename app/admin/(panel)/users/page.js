import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { UsersSection } from "@/components/admin/users-section";
import { getAdminUsersData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [session, data] = await Promise.all([auth(), getAdminUsersData()]);

  return (
    <AdminShell
      title="Users"
      description="Admins and student accounts are separated into independent tables so staff access and learner records stay clean and manageable."
      activePath="/admin/users"
      user={session?.user}
    >
      <UsersSection data={data} />
    </AdminShell>
  );
}
