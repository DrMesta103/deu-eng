function MetricCard({ metric }) {
  const tones = {
    dark: "bg-[#111827] text-white",
    orange: "bg-[#f55b2a] text-white",
    white: "bg-white text-slate-900",
    sand: "bg-[#eee4d6] text-slate-900",
  };

  return (
    <article className={`rounded-[1.75rem] p-6 shadow-xl shadow-black/5 ${tones[metric.tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">{metric.label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-4xl font-extrabold tracking-tight">{metric.value}</p>
        <span className="rounded-full bg-black/8 px-3 py-1 text-xs font-bold">{metric.note}</span>
      </div>
    </article>
  );
}

function InsightBars({ values }) {
  return (
    <div className="mt-8 flex h-56 items-end gap-4">
      {values.map((value, index) => (
        <div key={`${index}-${value.label}`} className="flex flex-1 flex-col items-center gap-3">
          <div
            className="w-full rounded-t-[1.25rem] rounded-b-[1.25rem] bg-[#f55b2a] shadow-lg shadow-[#f55b2a]/20"
            style={{ height: `${value.height}%` }}
          />
          <span className="text-xs font-semibold text-slate-500">{value.label}</span>
        </div>
      ))}
    </div>
  );
}

function RecentUsersTable({ rows }) {
  return (
    <table className="min-w-full text-left">
      <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
        <tr>
          <th className="px-6 py-4">User</th>
          <th className="px-6 py-4">Role</th>
          <th className="px-6 py-4">Locale</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Joined</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black/6">
        {rows.map((user) => (
          <tr key={user.id} className="hover:bg-slate-50/70">
            <td className="px-6 py-5">
              <div className="font-bold text-slate-900">{user.name}</div>
              <div className="mt-1 text-sm text-slate-500">{user.email}</div>
            </td>
            <td className="px-6 py-5 text-sm font-semibold text-slate-800">{user.role}</td>
            <td className="px-6 py-5 text-sm text-slate-600">{user.locale?.toUpperCase?.() ?? "N/A"}</td>
            <td className="px-6 py-5">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${user.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                {user.status}
              </span>
            </td>
            <td className="px-6 py-5 text-sm text-slate-600">{user.joinedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DashboardSection({ data }) {
  const bars = [
    { label: "Users", height: Math.max(20, data.snapshot.studentUsers * 18) },
    { label: "Staff", height: Math.max(18, data.snapshot.staffUsers * 20) },
    { label: "Leads", height: Math.max(16, data.snapshot.totalLeads * 16) },
    { label: "Courses", height: Math.max(15, data.snapshot.totalCourses * 14) },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
        <article className="rounded-[2rem] border border-black/6 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-purple">Platform Growth</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">User and lead overview</h2>
            </div>
            <div className="rounded-full border border-black/8 px-4 py-2 text-sm font-semibold text-slate-700">
              Live from database
            </div>
          </div>
          <InsightBars values={bars} />
        </article>

        <article className="rounded-[2rem] border border-black/6 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-purple">Admin Notes</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">System snapshot</h2>
          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Database</p>
              <p className="mt-2 text-lg font-bold text-slate-900">PostgreSQL via Prisma</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Admin auth</p>
              <p className="mt-2 text-lg font-bold text-slate-900">NextAuth Credentials</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Primary module</p>
              <p className="mt-2 text-lg font-bold text-slate-900">Users management</p>
            </div>
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-sm">
        <div className="border-b border-black/6 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-purple">Recent Accounts</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">Latest registered users</h2>
        </div>
        <div className="overflow-x-auto">
          <RecentUsersTable rows={data.recentUsers} />
        </div>
      </section>
    </div>
  );
}
