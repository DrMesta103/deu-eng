import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { getPagesData } from "@/lib/admin-data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const [session, data] = await Promise.all([auth(), getPagesData()]);

  return (
    <AdminShell
      title="Pages"
      description="Manage editable public pages from one place. Each page can expose a focused editing workflow instead of a generic CMS screen."
      activePath="/admin/pages"
      user={session?.user}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {data.pages.map((page) => (
          <article key={page.slug} className="rounded-[2rem] border border-black/6 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f55b2a]">Page Builder</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">{page.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{page.description}</p>
            <Link
              href={page.href}
              className="mt-6 inline-flex rounded-full bg-[#f55b2a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df4b1d]"
            >
              Edit page
            </Link>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
