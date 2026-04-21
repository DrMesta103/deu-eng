import Link from "next/link";
import { notFound } from "next/navigation";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CoursesPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const { courses, navigation, shared } = getLandingContent(locale);

  return (
    <main className="min-h-screen bg-brand-light text-gray-800">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
            {navigation.homeLabel}
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-brand-dark">{navigation.courses}</h1>
          <p className="mt-3 max-w-2xl text-gray-600">{shared.coursesIntro}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
        {courses.map((course) => (
          <article key={course.slug} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple/10 text-2xl font-bold text-brand-purple">
              {course.level}
            </div>
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <p className="mt-3 text-gray-600">{course.summary}</p>
            <div className="mt-6 text-2xl font-black text-brand-dark">
              {course.price} <span className="text-sm font-normal text-gray-400">/ {shared.perLevel}</span>
            </div>
            <Link href={`/${locale}/courses/${course.slug}`} className="mt-6 inline-flex rounded-xl border-2 border-brand-dark px-5 py-3 font-bold transition hover:bg-brand-dark hover:text-white">
              {shared.viewDetails}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
