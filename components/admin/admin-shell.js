import Link from "next/link";
import { LogoutForm } from "@/components/admin/logout-form";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fa-solid fa-chart-line" },
  { href: "/admin/users/admins", label: "Users", icon: "fa-regular fa-user" },
  { href: "/admin/pages", label: "Pages", icon: "fa-regular fa-file-lines" },
];

function NavLink({ item, activePath }) {
  const active = activePath === item.href || activePath.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition ${
        active ? "bg-[#f55b2a] text-white shadow-lg shadow-[#f55b2a]/20" : "bg-white/8 text-white hover:bg-white/14"
      }`}
    >
      <i className={item.icon} />
      <span>{item.label}</span>
    </Link>
  );
}

function CompactNavLink({ item, activePath }) {
  const active = activePath === item.href || activePath.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      title={item.label}
      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
        active ? "bg-[#f55b2a] text-white shadow-lg shadow-[#f55b2a]/20" : "bg-white/8 text-white hover:bg-white/14"
      }`}
    >
      <i className={item.icon} />
    </Link>
  );
}

export function AdminShell({ title, description, activePath, user, children, compactSidebar = false }) {
  const sidebarWidth = compactSidebar ? "lg:w-[92px]" : "lg:w-[280px]";
  const contentOffset = compactSidebar ? "lg:ml-[92px]" : "lg:ml-[280px]";

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-slate-900">
      <aside className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:h-screen ${sidebarWidth} lg:overflow-hidden lg:border-r lg:border-black/5 lg:bg-[#111827] lg:text-white`}>
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,#fbbf24_0%,transparent_55%)] opacity-20" />
        <div className={`relative flex h-full flex-col ${compactSidebar ? "items-center px-3 py-6" : "px-6 py-8"}`}>
          <Link href="/admin" className={`inline-flex ${compactSidebar ? "" : "items-center gap-3"}`} title="Admin dashboard">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f55b2a] text-lg shadow-lg shadow-[#f55b2a]/30">
              <i className="fa-solid fa-shield-halved" />
            </span>
            {!compactSidebar ? (
              <span>
                <span className="block text-xs uppercase tracking-[0.28em] text-white/55">Control Panel</span>
                <span className="block text-xl font-extrabold tracking-tight">Engel Admin</span>
              </span>
            ) : null}
          </Link>

          <nav className={compactSidebar ? "mt-10 grid gap-3" : "mt-12 space-y-3"}>
            {navItems.map((item) =>
              compactSidebar ? <CompactNavLink key={item.href} item={item} activePath={activePath} /> : <NavLink key={item.href} item={item} activePath={activePath} />
            )}
          </nav>

          <div className={`mt-auto ${compactSidebar ? "grid gap-3" : "space-y-4"}`}>
            {compactSidebar ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white" title={`${user?.name ?? "Admin User"} • ${user?.role ?? "ADMIN"}`}>
                  <i className="fa-regular fa-user" />
                </div>
                <LogoutForm compact />
              </>
            ) : (
              <>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Signed in as</p>
                  <h2 className="mt-3 text-lg font-bold">{user?.name ?? "Admin User"}</h2>
                  <p className="mt-1 text-sm text-white/70">{user?.email ?? "admin@engel-akademie.at"}</p>
                  <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                    {user?.role ?? "ADMIN"}
                  </div>
                </div>
                <LogoutForm />
              </>
            )}
          </div>
        </div>
      </aside>

      <div className={contentOffset}>
        <main className="min-h-screen">
          <header className="border-b border-black/6 bg-white/75 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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

                <div className="lg:hidden">
                  <div className="flex flex-wrap gap-3">
                    {navItems.map((item) => {
                      const active = activePath === item.href || activePath.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                            active ? "bg-[#f55b2a] text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <i className={item.icon} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                    <div className="ml-auto">
                      <LogoutForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}