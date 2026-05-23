import { redirect } from "next/navigation";
import { auth } from "@/auth";

const allowedRoles = new Set(["ADMIN", "EDITOR"]);

export default async function AdminPanelLayout({ children }) {
  const session = await auth();

  if (!session?.user?.role || !allowedRoles.has(session.user.role)) {
    redirect("/admin/login");
  }

  return children;
}
