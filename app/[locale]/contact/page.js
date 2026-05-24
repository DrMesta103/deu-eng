import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { ContactPageView } from "@/components/site/contact-page-view";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const { contact, shared, navigation } = content;

  return (
    <SiteShell locale={locale} content={content}>
      <section className="py-6">
        <div className="site-container">
          <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
            {navigation.homeLabel}
          </Link>
        </div>
        <div className="mt-4">
          <ContactPageView locale={locale} contact={contact} shared={shared} />
        </div>
      </section>
    </SiteShell>
  );
}
