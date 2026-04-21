import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, isSupportedLocale, locales } from "@/lib/site-data";

const blogSlugs = ["german-articles-hacks", "meldezettel-vienna", "osd-vs-goethe"];

export function generateStaticParams() {
  return locales.flatMap((locale) => blogSlugs.map((slug) => ({ locale, slug })));
}

export default async function BlogDetailPage({ params }) {
  const { locale, slug } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const post = getBlogPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link href={`/${locale}/blog`} className="text-sm font-semibold text-brand-purple">
          ← {locale === "de" ? "Zurück zum Blog" : "Back to blog"}
        </Link>
        <div className="mt-6 inline-flex rounded-full bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-purple">
          {post.tag}
        </div>
        <h1 className="mt-6 text-4xl font-bold text-brand-dark">{post.title}</h1>
        <div className="mt-4 text-sm text-gray-500">{post.date}</div>
        <div className="mt-10 text-lg leading-8 text-gray-700">
          <p>{post.body}</p>
        </div>
      </article>
    </main>
  );
}
