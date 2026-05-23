"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader({ locale, navigation, portalLabel }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: `/${locale}/courses`, label: navigation.courses },
    { href: `/${locale}/blog`, label: navigation.blog },
    { href: `/${locale}/contact`, label: navigation.contact },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="site-container flex items-center justify-between gap-6 py-4">
        <Link href={`/${locale}`} className="shrink-0 text-2xl font-extrabold tracking-tighter text-brand-dark">
          DeutschAkademie <span className="text-brand-purple">Engel</span>
        </Link>

        <nav className="hidden items-center gap-6 font-semibold lg:flex">
          <div className="flex items-center gap-6 text-sm xl:text-base">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-brand-purple">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2 border-l border-r border-gray-200 px-4">
            <Link href="/en" className={locale === "en" ? "font-bold text-brand-purple" : "text-gray-500 transition hover:text-brand-dark"}>
              EN
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/de" className={locale === "de" ? "font-bold text-brand-purple" : "text-gray-500 transition hover:text-brand-dark"}>
              DE
            </Link>
          </div>
          <Link
            href={`/${locale}/placement-test`}
            className="rounded-full border border-brand-purple px-5 py-2 text-brand-purple transition-all hover:-translate-y-0.5 hover:bg-brand-purple hover:text-white"
          >
            {navigation.placementTest}
          </Link>
          <Link
            href={`/${locale}/portal`}
            className="rounded-full bg-brand-purple px-6 py-2 text-white transition-all hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-lg"
          >
            {portalLabel}
          </Link>
        </nav>

        <button
          type="button"
          className="text-2xl text-brand-dark lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {open ? (
        <div className="border-t border-gray-100 bg-white px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4 font-semibold">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href={`/${locale}/placement-test`} onClick={() => setOpen(false)}>
              {navigation.placementTest}
            </Link>
            <Link href={`/${locale}/portal`} onClick={() => setOpen(false)}>
              {portalLabel}
            </Link>
            <Link href="/en" onClick={() => setOpen(false)}>
              English
            </Link>
            <Link href="/de" onClick={() => setOpen(false)}>
              Deutsch
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
