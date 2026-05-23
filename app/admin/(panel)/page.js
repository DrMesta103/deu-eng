import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardSection } from "@/components/admin/dashboard-section";
import { getAdminDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [session, data] = await Promise.all([auth(), getAdminDashboardData()]);

  return (
    <AdminShell
      title="Dashboard"
      description="A clean operational view of users, staff access, leads, and platform activity backed by PostgreSQL."
      activePath="/admin"
      user={session?.user}
    >
      <DashboardSection data={data} />
    </AdminShell>
  );
}
