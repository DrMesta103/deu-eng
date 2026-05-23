import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TermsPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const { shared, navigation } = content;

  return (
    <SiteShell locale={locale} content={content}>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {navigation.homeLabel}
        </Link>
        <h1 className="mt-4 text-4xl font-bold text-brand-dark">{shared.termsTitle}</h1>
        <p className="mt-4 max-w-3xl text-gray-600">{shared.termsIntro}</p>
        <div className="mt-10 grid gap-6">
          {shared.termsSections.map((section) => (
            <article key={section.title} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-2xl font-bold text-brand-dark">{section.title}</h2>
              <p className="mt-4 leading-8 text-gray-700">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
