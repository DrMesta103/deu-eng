import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PortalPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const { shared, navigation } = content;
  const featureLabels = locale === "de"
    ? ["Kursplaene", "Hausaufgaben und Dateien", "Anwesenheit und Fortschritt", "Rechnungen und Support"]
    : ["Course schedules", "Homework and files", "Attendance and progress", "Invoices and support"];

  return (
    <SiteShell locale={locale} content={content}>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {navigation.homeLabel}
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">{navigation.portal}</p>
            <h1 className="mt-4 text-4xl font-bold text-brand-dark">{shared.portalTitle}</h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">{shared.portalIntro}</p>
            <p className="mt-8 leading-8 text-gray-700">{shared.portalDescription}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="rounded-full bg-brand-purple px-6 py-3 font-bold text-white transition hover:bg-purple-700">
                {shared.portalPrimaryCta}
              </Link>
              <Link href={`/${locale}/placement-test`} className="rounded-full border border-gray-300 px-6 py-3 font-bold text-brand-dark transition hover:border-brand-purple hover:text-brand-purple">
                {navigation.placementTest}
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-brand-dark p-10 text-white shadow-2xl">
            <h2 className="text-2xl font-bold">{navigation.portal}</h2>
            <div className="mt-8 grid gap-4">
              {featureLabels.map((item) => (
                <div key={item} className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="font-semibold text-brand-yellow">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
