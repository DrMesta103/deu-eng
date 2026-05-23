import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TeachersPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const { teachers, navigation, shared } = content;

  return (
    <SiteShell locale={locale} content={content}>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {navigation.homeLabel}
        </Link>
        <h1 className="mt-4 text-4xl font-bold text-brand-dark">{navigation.teachers}</h1>
        <p className="mt-3 max-w-2xl text-gray-600">{shared.teachersIntro}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <article key={teacher.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <Image src={teacher.image} alt={teacher.name} width={600} height={700} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold">{teacher.name}</h2>
                  <span className="text-xl" aria-hidden="true">{teacher.flag}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-brand-purple">{teacher.title}</p>
                <p className="mt-3 text-sm text-gray-500">{teacher.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
