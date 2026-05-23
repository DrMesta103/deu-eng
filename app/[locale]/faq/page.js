import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { SiteShell } from "@/components/site/site-shell";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FaqPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const { faqItems, shared, navigation } = content;

  return (
    <SiteShell locale={locale} content={content}>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {navigation.homeLabel}
        </Link>
        <h1 className="mt-4 text-4xl font-bold text-brand-dark">{shared.faqTitle}</h1>
        <p className="mt-3 max-w-2xl text-gray-600">{shared.faqIntro}</p>
        <div className="mt-10">
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </SiteShell>
  );
}
