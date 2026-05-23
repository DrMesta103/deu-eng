import Link from "next/link";
import { LogoutForm } from "@/components/admin/logout-form";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fa-solid fa-chart-line" },
  { href: "/admin/users", label: "Users", icon: "fa-regular fa-user" },
];

export function AdminShell({ title, description, activePath, user, children }) {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="relative overflow-hidden border-r border-black/5 bg-[#111827] text-white">
          <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,#fbbf24_0%,transparent_55%)] opacity-20" />
          <div className="relative flex h-full flex-col px-6 py-8">
            <Link href="/admin" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f55b2a] text-lg shadow-lg shadow-[#f55b2a]/30">
                <i className="fa-solid fa-shield-halved" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.28em] text-white/55">Control Panel</span>
                <span className="block text-xl font-extrabold tracking-tight">Engel Admin</span>
              </span>
            </Link>

            <nav className="mt-12 space-y-3">
              {navItems.map((item) => {
                const active = activePath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition ${
                      active ? "bg-[#f55b2a] text-white shadow-lg shadow-[#f55b2a]/20" : "bg-white/8 text-white hover:bg-white/14"
                    }`}
                  >
                    <i className={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Signed in as</p>
                <h2 className="mt-3 text-lg font-bold">{user?.name ?? "Admin User"}</h2>
                <p className="mt-1 text-sm text-white/70">{user?.email ?? "admin@engel-akademie.at"}</p>
                <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                  {user?.role ?? "ADMIN"}
                </div>
              </div>
              <LogoutForm />
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="border-b border-black/6 bg-white/75 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">Admin Workspace</p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                  Secure access enabled
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
