import Link from "next/link";
import { notFound } from "next/navigation";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PlacementTestPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const { courses, shared } = getLandingContent(locale);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {locale === "de" ? "Startseite" : "Home"}
        </Link>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold text-brand-dark">{shared.placementTitle}</h1>
            <p className="mt-4 text-gray-600">{shared.placementIntro}</p>
          </div>
          <form className="rounded-3xl bg-brand-light p-8 shadow-sm ring-1 ring-gray-100">
            <div className="grid gap-4">
              <input className="rounded-xl border border-gray-200 px-4 py-3" placeholder={shared.nameLabel} />
              <input className="rounded-xl border border-gray-200 px-4 py-3" placeholder={shared.emailLabel} />
              <select className="rounded-xl border border-gray-200 px-4 py-3">
                {courses.map((course) => (
                  <option key={course.slug}>{course.level}</option>
                ))}
              </select>
              <textarea className="min-h-36 rounded-xl border border-gray-200 px-4 py-3" placeholder={shared.messageLabel} />
              <button className="rounded-xl bg-brand-purple px-5 py-3 font-bold text-white transition hover:bg-purple-700">
                {shared.requestPlacement}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
