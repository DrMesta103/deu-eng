import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { getCourseBySlug, getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

const courseSlugs = ["beginner-a1", "intermediate-b1", "advanced-c1"];

export function generateStaticParams() {
  return locales.flatMap((locale) => courseSlugs.map((slug) => ({ locale, slug })));
}

export default async function CourseDetailPage({ params }) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const course = getCourseBySlug(locale, slug);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell locale={locale} content={content}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link href={`/${locale}/courses`} className="text-sm font-semibold text-brand-purple">
          {locale === "de" ? "Zurueck zu Kursen" : "Back to courses"}
        </Link>
        <div className="mt-8 rounded-3xl bg-white p-10 shadow-sm ring-1 ring-gray-100">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-purple text-2xl font-bold text-white">
            {course.level}
          </div>
          <h1 className="text-4xl font-bold text-brand-dark">{course.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{course.summary}</p>
          <p className="mt-8 leading-8 text-gray-700">{course.body}</p>
          <div className="mt-8 text-2xl font-black text-brand-dark">{course.price}</div>
        </div>
      </div>
    </SiteShell>
  );
}
