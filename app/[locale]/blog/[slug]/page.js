import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { getBlogPostBySlug, getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

const blogSlugs = ["german-articles-hacks", "meldezettel-vienna", "osd-vs-goethe"];

export function generateStaticParams() {
  return locales.flatMap((locale) => blogSlugs.map((slug) => ({ locale, slug })));
}

export default async function BlogDetailPage({ params }) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const post = getBlogPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell locale={locale} content={content}>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link href={`/${locale}/blog`} className="text-sm font-semibold text-brand-purple">
          {locale === "de" ? "Zurueck zum Blog" : "Back to blog"}
        </Link>
        <div className="mt-6 inline-flex rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple">
          {post.tag}
        </div>
        <h1 className="mt-6 text-4xl font-bold text-brand-dark">{post.title}</h1>
        <div className="mt-4 text-sm text-gray-500">{post.date}</div>
        <div className="mt-10 rounded-3xl bg-white p-10 text-lg leading-8 text-gray-700 shadow-sm ring-1 ring-gray-100">
          <p>{post.body}</p>
        </div>
      </article>
    </SiteShell>
  );
}
