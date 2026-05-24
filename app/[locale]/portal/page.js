import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { SiteShell } from "@/components/site/site-shell";
import { StudentAuthPanel } from "@/components/portal/student-auth-panel";
import { StudentDashboard } from "@/components/portal/student-dashboard";
import { getStudentPortalData } from "@/lib/portal-data";
import { getLandingContent, isSupportedLocale, locales } from "@/lib/site-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic";

function getPortalCopy(locale) {
  if (locale === "de") {
    return {
      badge: "Privater Zugang",
      title: "Ein professionelles, reduziertes Studentenportal",
      description: "Melde dich an oder registriere dich in derselben visuellen Sprache wie der Rest der Academy-Site. Nach dem Login erscheinen Profil, Kursanmeldung und deine Kurse direkt auf dieser Seite.",
      highlights: ["Login und Registrierung", "Willkommensmail nach Registrierung", "Profilbearbeitung", "Kursanmeldung und Kursuebersicht"],
      loginTab: "Anmelden",
      registerTab: "Registrieren",
      loginButton: "Ins Portal einloggen",
      loginPending: "Anmeldung laeuft...",
      registerButton: "Konto erstellen",
      registerPending: "Konto wird erstellt...",
      firstNameLabel: "Vorname",
      lastNameLabel: "Nachname",
      countryCodeLabel: "Laendervorwahl",
      phoneLabel: "Telefonnummer",
      emailLabel: "E-Mail-Adresse",
      passwordLabel: "Passwort",
      confirmPasswordLabel: "Passwort wiederholen",
      termsLabel: "Ich akzeptiere die Nutzungsbedingungen und die Datenschutzhinweise der Akademie.",
      dashboardBadge: "Studentenbereich",
      dashboardTitle: "Willkommen zurueck",
      dashboardIntro: "Verwalte deine Stammdaten und deine Kursanfragen in einer klaren Ansicht.",
      memberSince: "Mitglied seit",
      logoutButton: "Abmelden",
      myCoursesTitle: "Meine Kurse",
      myCoursesIntro: "Aktive Einschreibungen und angefragte Kurse.",
      noCourses: "Noch keine Kursanmeldung vorhanden.",
      profileBadge: "Profil",
      profileTitle: "Persoenliche Daten bearbeiten",
      profileButton: "Profil speichern",
      profilePending: "Wird gespeichert...",
      enrollBadge: "Kurse",
      enrollTitle: "Fuer weitere Kurse anmelden",
      enrollIntro: "Waehle direkt aus den angebotenen Kursstufen und fuege sie deinem Portal hinzu.",
      enrollButton: "Diesen Kurs waehlen",
      enrolledLabel: "Bereits hinzugefuegt",
    };
  }

  return {
    badge: "Private Access",
    title: "A professional, minimal student portal",
    description: "Students can sign in or register inside the same visual language as the main academy site. After login, profile editing, course enrollment, and enrolled courses appear directly on this page.",
    highlights: ["Student login and registration", "Welcome email after registration", "Editable student profile", "Course enrollment and personal course list"],
    loginTab: "Login",
    registerTab: "Register",
    loginButton: "Sign in to portal",
    loginPending: "Signing in...",
    registerButton: "Create account",
    registerPending: "Creating account...",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    countryCodeLabel: "Country code",
    phoneLabel: "Phone number",
    emailLabel: "Email address",
    passwordLabel: "Password",
    confirmPasswordLabel: "Repeat password",
    termsLabel: "I accept the academy terms and privacy policy.",
    dashboardBadge: "Student Area",
    dashboardTitle: "Welcome back",
    dashboardIntro: "Manage your personal details and course enrollments from one clean dashboard.",
    memberSince: "Member since",
    logoutButton: "Log out",
    myCoursesTitle: "My courses",
    myCoursesIntro: "Your active enrollments and submitted course requests.",
    noCourses: "You have not enrolled in any courses yet.",
    profileBadge: "Profile",
    profileTitle: "Edit personal details",
    profileButton: "Save profile",
    profilePending: "Saving...",
    enrollBadge: "Courses",
    enrollTitle: "Register for a course",
    enrollIntro: "Choose directly from the available academy levels and add them to your portal.",
    enrollButton: "Register for this course",
    enrolledLabel: "Already added",
  };
}

export default async function PortalPage({ params }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const session = await auth();
  const content = getLandingContent(locale);
  const { navigation } = content;
  const copy = getPortalCopy(locale);
  const portalData =
    session?.user?.id && session.user.role === "STUDENT"
      ? await getStudentPortalData(session.user.id, locale)
      : null;

  return (
    <SiteShell locale={locale} content={content}>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link href={`/${locale}`} className="text-sm font-semibold text-brand-purple">
          {navigation.homeLabel}
        </Link>
        <div className="mt-6">
          {portalData ? <StudentDashboard locale={locale} copy={copy} data={portalData} /> : <StudentAuthPanel locale={locale} copy={copy} />}
        </div>
      </section>
    </SiteShell>
  );
}
