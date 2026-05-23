import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/site-footer";

export function SiteShell({ locale, content, children }) {
  return (
    <main className="min-h-screen bg-brand-light font-sans text-gray-800">
      <SiteHeader locale={locale} navigation={content.navigation} portalLabel={content.navigation.portal} />
      <div className="pt-24">{children}</div>
      <SiteFooter locale={locale} footer={content.footer} />
    </main>
  );
}
