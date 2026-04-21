import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-light px-6 text-center text-gray-800">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-purple">404</p>
        <h1 className="mt-4 text-4xl font-bold text-brand-dark">Page not found</h1>
        <Link href="/en" className="mt-8 inline-flex rounded-full bg-brand-purple px-6 py-3 font-bold text-white">
          Back home
        </Link>
      </div>
    </main>
  );
}
