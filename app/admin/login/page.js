import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Admin Login | Engel",
  description: "Secure sign-in for the academy admin panel.",
};

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR") {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-10 text-slate-900">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2.5rem] bg-[#111827] p-8 text-white shadow-2xl shadow-black/10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">DeutschAkademie Engel</p>
          <h1 className="mt-6 max-w-lg text-5xl font-extrabold leading-tight tracking-tight">
            Admin access for the academy team.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            This panel is connected to PostgreSQL with Prisma and protected with credential-based admin authentication.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white/8 p-5">
              <p className="text-sm font-semibold text-white/60">Protected area</p>
              <p className="mt-2 text-2xl font-bold">Dashboard and users</p>
            </div>
            <div className="rounded-[1.75rem] bg-[#f55b2a] p-5 text-white">
              <p className="text-sm font-semibold text-white/75">Default admin seed</p>
              <p className="mt-2 text-lg font-bold">admin@engel-akademie.at</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">Secure Login</p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">Sign in to continue</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Use an admin or editor account. Student accounts do not have access to this dashboard.
            </p>
          </div>
          <AdminLoginForm />
        </section>
      </div>
    </main>
  );
}
