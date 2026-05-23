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

function EmptyState({ message }) {
  return <div className="px-6 py-10 text-sm text-slate-500">{message}</div>;
}

function SectionCard({ eyebrow, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-sm">
      <div className="border-b border-black/6 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">{eyebrow}</p>
        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

function AdminUsersTable({ rows }) {
  if (!rows.length) {
    return <EmptyState message="No admin or editor accounts found in the database." />;
  }

  return (
    <table className="min-w-full text-left">
      <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
        <tr>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Email</th>
          <th className="px-6 py-4">Role</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Last Seen</th>
          <th className="px-6 py-4">Created</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black/6">
        {rows.map((user) => (
          <tr key={user.id} className="hover:bg-slate-50/70">
            <td className="px-6 py-5">
              <div className="font-bold text-slate-900">{user.name}</div>
              <div className="mt-1 text-xs text-slate-500">{user.id}</div>
            </td>
            <td className="px-6 py-5 text-sm text-slate-700">{user.email}</td>
            <td className="px-6 py-5 text-sm font-semibold text-slate-800">{user.role}</td>
            <td className="px-6 py-5"><StatusBadge status={user.status} /></td>
            <td className="px-6 py-5 text-sm text-slate-600">{user.lastSeen}</td>
            <td className="px-6 py-5 text-sm text-slate-600">{user.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StudentUsersTable({ rows }) {
  if (!rows.length) {
    return <EmptyState message="No student accounts have been registered yet." />;
  }

  return (
    <table className="min-w-full text-left">
      <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
        <tr>
          <th className="px-6 py-4">Student</th>
          <th className="px-6 py-4">Email</th>
          <th className="px-6 py-4">Locale</th>
          <th className="px-6 py-4">Phone</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Last Seen</th>
          <th className="px-6 py-4">Joined</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-black/6">
        {rows.map((user) => (
          <tr key={user.id} className="hover:bg-slate-50/70">
            <td className="px-6 py-5">
              <div className="font-bold text-slate-900">{user.name}</div>
              <div className="mt-1 text-xs text-slate-500">{user.id}</div>
            </td>
            <td className="px-6 py-5 text-sm text-slate-700">{user.email}</td>
            <td className="px-6 py-5 text-sm font-semibold text-slate-800">{user.locale}</td>
            <td className="px-6 py-5 text-sm text-slate-700">{user.phone}</td>
            <td className="px-6 py-5"><StatusBadge status={user.status} /></td>
            <td className="px-6 py-5 text-sm text-slate-600">{user.lastSeen}</td>
            <td className="px-6 py-5 text-sm text-slate-600">{user.joinedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function UsersSection({ data }) {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Admin Users" value={data.overview.totalAdmins} tone="dark" />
        <MetricCard label="Student Users" value={data.overview.totalStudents} tone="purple" />
        <MetricCard label="Active Students" value={data.overview.activeStudents} tone="white" />
        <MetricCard label="Inactive Students" value={data.overview.pendingReview} tone="sand" />
      </section>

      <SectionCard
        eyebrow="Team Access"
        title="Admin Users"
        description="Internal accounts with access to the secure admin panel are listed here separately from student accounts."
      >
        <AdminUsersTable rows={data.adminUsers} />
      </SectionCard>

      <SectionCard
        eyebrow="Registered Students"
        title="Student Users"
        description="All learner accounts that have registered in the site should appear here in their own table."
      >
        <StudentUsersTable rows={data.studentUsers} />
      </SectionCard>
    </div>
  );
}
