import { notFound } from "next/navigation";
import { LandingPage } from "@/components/site/landing-page";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const content = getLandingContent(locale);

  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function LocaleHomePage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <LandingPage locale={locale} content={getLandingContent(locale)} />;
}
