import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { UsersSection } from "@/components/admin/users-section";
import { getAdminUsersData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminUsersStudentsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const [session, data] = await Promise.all([
    auth(),
    getAdminUsersData("students", resolvedSearchParams),
  ]);

  return (
    <AdminShell
      title="Users"
      description="Use tabs to switch between internal staff access and registered student accounts. Search, filter, and sort are built in."
      activePath="/admin/users/students"
      user={session?.user}
    >
      <UsersSection data={data} />
    </AdminShell>
  );
}
