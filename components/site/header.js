"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader({ locale, navigation, portalLabel }) {
  const [open, setOpen] = useState(false);
  const alternateLocale = locale === "en" ? "de" : "en";

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-2xl font-extrabold tracking-tighter text-brand-dark">
          DeutschAkademie <span className="text-brand-purple">Engel</span>
        </Link>

        <nav className="hidden items-center space-x-8 font-semibold lg:flex">
          <Link href={`/${locale}/courses`} className="transition hover:text-brand-purple">
            {navigation.courses}
          </Link>
          <Link href={`/${locale}/teachers`} className="transition hover:text-brand-purple">
            {navigation.teachers}
          </Link>
          <Link href={`/${locale}/blog`} className="transition hover:text-brand-purple">
            {navigation.blog}
          </Link>
          <div className="flex items-center space-x-2 border-l-2 pl-4">
            <Link href="/en" className={locale === "en" ? "font-bold text-brand-purple" : "text-gray-500 transition hover:text-brand-dark"}>
              EN
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/de" className={locale === "de" ? "font-bold text-brand-purple" : "text-gray-500 transition hover:text-brand-dark"}>
              DE
            </Link>
          </div>
          <Link
            href={`/${alternateLocale}`}
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
            <Link href={`/${locale}/courses`} onClick={() => setOpen(false)}>
              {navigation.courses}
            </Link>
            <Link href={`/${locale}/teachers`} onClick={() => setOpen(false)}>
              {navigation.teachers}
            </Link>
            <Link href={`/${locale}/blog`} onClick={() => setOpen(false)}>
              {navigation.blog}
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
