import Link from "next/link";

function FooterLinkList({ links, locale }) {
  return (
    <ul className="space-y-3 text-sm text-gray-400">
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href.replace("{locale}", locale)} className="transition hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter({ locale, footer }) {
  return (
    <footer className="bg-brand-dark pt-20 pb-10 text-white">
      <div className="site-container">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h4 className="mb-6 text-2xl font-extrabold">
              DeutschAkademie <span className="text-brand-purple">Engel</span>
            </h4>
            <p className="mb-6 max-w-md text-gray-400">{footer.description}</p>
            <div className="grid gap-3 text-sm text-gray-400">
              <p><i className="fa-solid fa-location-dot mr-3 w-4 text-brand-yellow" />{footer.location}</p>
              <p><i className="fa-solid fa-phone mr-3 w-4 text-brand-yellow" />{footer.phone}</p>
              <p><i className="fa-solid fa-envelope mr-3 w-4 text-brand-yellow" />{footer.email}</p>
            </div>
            <div className="mt-6 flex space-x-4">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-brand-purple"
                  aria-label={social.label}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="mb-6 text-lg font-bold">{footer.exploreTitle}</h4>
            <FooterLinkList links={footer.links} locale={locale} />
          </div>
          <div className="md:col-span-2">
            <h4 className="mb-6 text-lg font-bold">{footer.supportTitle}</h4>
            <FooterLinkList links={footer.supportLinks} locale={locale} />
          </div>
          <div className="md:col-span-3">
            <h4 className="mb-6 text-lg font-bold">{footer.legalTitle}</h4>
            <FooterLinkList links={footer.legalLinks} locale={locale} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-center text-sm text-gray-500 md:flex-row">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {footer.legalLinks.map((link) => (
              <Link key={link.label} href={link.href.replace("{locale}", locale)} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
