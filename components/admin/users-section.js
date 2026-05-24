import Link from "next/link";

function MetricCard({ label, value, tone }) {
  const tones = {
    purple: "bg-brand-purple text-white shadow-brand-purple/20",
    dark: "bg-[#111827] text-white shadow-black/10",
    sand: "bg-[#e8dcc7] text-slate-900 shadow-transparent",
    white: "bg-white text-slate-900 shadow-black/5",
  };

  return (
    <article className={`rounded-[1.75rem] p-6 shadow-xl ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{label}</p>
      <p className="mt-4 text-4xl font-extrabold tracking-tight">{value}</p>
    </article>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700",
    Inactive: "bg-slate-200 text-slate-700",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}

function UsersTable({ tab, rows, emptyMessage }) {
  if (!rows.length) {
    return <div className="px-6 py-10 text-sm text-slate-500">{emptyMessage}</div>;
  }

  return (
    <table className="min-w-full text-left">
      <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
        <tr>
          <th className="px-4 py-4 sm:px-6">Name</th>
          <th className="px-4 py-4 sm:px-6">Email</th>
          {tab === "students" ? <th className="px-4 py-4 sm:px-6">Locale</th> : <th className="px-4 py-4 sm:px-6">Role</th>}
          {tab === "students" ? <th className="px-4 py-4 sm:px-6">Phone</th> : null}
          <th className="px-4 py-4 sm:px-6">Status</th>
          <th className="px-4 py-4 sm:px-6">Last Seen</th>
          <th className="px-4 py-4 sm:px-6">Created</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black/6">
        {rows.map((user) => (
          <tr key={user.id} className="hover:bg-slate-50/70">
            <td className="px-4 py-5 sm:px-6">
              <div className="font-bold text-slate-900">{user.name}</div>
              <div className="mt-1 text-xs text-slate-500">{user.id}</div>
            </td>
            <td className="px-4 py-5 text-sm text-slate-700 sm:px-6">{user.email}</td>
            {tab === "students" ? (
              <td className="px-4 py-5 text-sm font-semibold text-slate-800 sm:px-6">{user.locale}</td>
            ) : (
              <td className="px-4 py-5 text-sm font-semibold text-slate-800 sm:px-6">{user.role}</td>
            )}
            {tab === "students" ? <td className="px-4 py-5 text-sm text-slate-700 sm:px-6">{user.phone}</td> : null}
            <td className="px-4 py-5 sm:px-6"><StatusBadge status={user.status} /></td>
            <td className="px-4 py-5 text-sm text-slate-600 sm:px-6">{user.lastSeen}</td>
            <td className="px-4 py-5 text-sm text-slate-600 sm:px-6">{user.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function UsersSection({ data }) {
  const isStudents = data.tab === "students";

  return (
    <div className="space-y-8">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Admin Users" value={data.overview.totalAdmins} tone="dark" />
        <MetricCard label="Student Users" value={data.overview.totalStudents} tone="purple" />
        <MetricCard label="Active Students" value={data.overview.activeStudents} tone="white" />
        <MetricCard label="Inactive Students" value={data.overview.inactiveStudents} tone="sand" />
      </section>

      <section className="rounded-[2rem] border border-black/6 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/users/admins"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!isStudents ? "bg-[#f55b2a] text-white" : "bg-slate-100 text-slate-700"}`}
            >
              Admins & Editors
            </Link>
            <Link
              href="/admin/users/students"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isStudents ? "bg-[#f55b2a] text-white" : "bg-slate-100 text-slate-700"}`}
            >
              Students
            </Link>
          </div>

          <form className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
            <input
              type="text"
              name="search"
              defaultValue={data.filters.search}
              placeholder={isStudents ? "Search by name, email, or phone" : "Search by name or email"}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f55b2a] focus:bg-white"
            />
            <select
              name="status"
              defaultValue={data.filters.status}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f55b2a] focus:bg-white"
            >
              <option value="all">All statuses</option>
              <option value="active">Active only</option>
              <option value="inactive">Inactive only</option>
            </select>
            <select
              name="sort"
              defaultValue={data.filters.sort}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f55b2a] focus:bg-white"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
              <option value="recent_login">Recent login</option>
              {isStudents ? <option value="locale_asc">Locale A-Z</option> : null}
            </select>
            {isStudents ? (
              <select
                name="locale"
                defaultValue={data.filters.locale}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#f55b2a] focus:bg-white"
              >
                <option value="all">All locales</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            ) : (
              <div className="hidden lg:block" />
            )}
            <button type="submit" className="rounded-2xl bg-[#f55b2a] px-5 py-3 font-bold text-white transition hover:bg-[#df4b1d]">
              Apply
            </button>
          </form>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-sm">
        <div className="border-b border-black/6 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">
            {isStudents ? "Registered Students" : "Team Access"}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{data.meta.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{data.meta.description}</p>
        </div>
        <div className="overflow-x-auto">
          <UsersTable tab={data.tab} rows={data.rows} emptyMessage={data.meta.emptyMessage} />
        </div>
      </section>
    </div>
  );
}
