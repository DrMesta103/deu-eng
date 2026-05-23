import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-shell";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const content = getLandingContent(locale);
  const { blogPosts, navigation, shared } = content;

  return (
    <SiteShell locale={locale} content={content}>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {navigation.homeLabel}
        </Link>
        <h1 className="mt-4 text-4xl font-bold text-brand-dark">{navigation.blog}</h1>
        <p className="mt-3 max-w-2xl text-gray-600">{shared.blogIntro}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-48 overflow-hidden">
                <Image src={post.image} alt={post.title} width={800} height={600} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
              </div>
              <div className="p-6">
                <span className={`${post.tagClass} rounded px-2 py-1 text-xs font-bold`}>{post.tag}</span>
                <h2 className="mt-4 text-xl font-bold">
                  <Link href={`/${locale}/blog/${post.slug}`} className="transition hover:text-brand-purple">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-4 text-sm text-gray-500">{post.date}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
