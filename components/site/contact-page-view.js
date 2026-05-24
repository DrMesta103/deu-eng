import Link from "next/link";

function getContactPageCopy(locale, shared) {
  if (locale === "de") {
    return {
      badge: "Kontakt und Beratung",
      intro:
        "Frage nach Kursen, Einstufung, Pruefungsvorbereitung oder dem besten Start fuer dein Deutschziel. Die Seite ist aktuell statisch und noch nicht mit dem Admin-Panel verbunden.",
      panelTitle: "Direkter Kontakt",
      panelText: "Wenn du lieber direkt schreibst oder anrufst, findest du hier die schnellsten Kontaktwege zur Akademie.",
      availabilityTitle: "Erreichbarkeit",
      availability: [
        { label: "Mo - Fr", value: "08:30 - 18:00" },
        { label: "Sa", value: "09:00 - 13:00" },
      ],
      highlights: [
        "Antwort meist innerhalb eines Werktags",
        "Beratung auf Deutsch oder Englisch",
        "Online- und Vor-Ort-Kurse",
      ],
      formTitle: "Schreib uns kurz",
      formText: "Die Formularansicht ist bewusst statisch, damit das finale Layout schon steht.",
      goalLabel: "Anliegen",
      submit: "Nachricht senden",
      goals: ["Intensivkurs", "Abendkurs", "Pruefungsvorbereitung", "Privatunterricht"],
      ctaTitle: "Noch nicht sicher, welcher Kurs zu dir passt?",
      ctaText: "Starte mit dem Einstufungstest oder sieh dir zuerst die Kursstufen an.",
      ctaPrimary: "Einstufungstest",
      ctaSecondary: "Kurse ansehen",
    };
  }

  return {
    badge: "Contact and guidance",
    intro:
      "Ask about courses, placement, exam preparation, or the best starting point for your German goals. This page is static for now and not connected to the admin panel yet.",
    panelTitle: "Direct contact",
    panelText: "If you prefer to email or call directly, here are the fastest ways to reach the academy.",
    availabilityTitle: "Availability",
    availability: [
      { label: "Mon - Fri", value: "08:30 - 18:00" },
      { label: "Sat", value: "09:00 - 13:00" },
    ],
    highlights: [
      "Usually answered within one business day",
      "Guidance available in German or English",
      "Online and in-person course formats",
    ],
    formTitle: "Send us a quick message",
    formText: "The form is intentionally static for now so the final layout is already in place.",
    goalLabel: "Topic",
    submit: "Send message",
    goals: ["Intensive course", "Evening course", "Exam preparation", "Private lessons"],
    ctaTitle: "Not sure which course fits you yet?",
    ctaText: "Start with the placement test or explore the course levels first.",
    ctaPrimary: "Placement test",
    ctaSecondary: "View courses",
  };
}

export function ContactPageView({ locale, contact, shared }) {
  const copy = getContactPageCopy(locale, shared);

  return (
    <>
      <section className="blob-bg overflow-hidden pb-14 lg:pb-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl py-8 text-center section-reveal md:py-12">
            <div className="mb-5 inline-block rounded-full bg-brand-yellow px-4 py-1 font-bold text-brand-dark">
              {copy.badge}
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-brand-dark md:text-5xl">{shared.contactTitle}</h1>
            <p className="mt-5 text-base leading-8 text-gray-600 md:text-lg">{copy.intro}</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl bg-gray-50 p-8">
              <h2 className="text-3xl font-bold text-brand-dark">{copy.panelTitle}</h2>
              <p className="mt-4 leading-8 text-gray-600">{copy.panelText}</p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-500">Location</p>
                  <p className="mt-2 text-lg font-bold text-brand-dark">{contact.location}</p>
                </div>
                <a href={`tel:${contact.phone}`} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-semibold text-gray-500">Phone</p>
                  <p className="mt-2 text-lg font-bold text-brand-dark">{contact.phone}</p>
                </a>
                <a href={`mailto:${contact.email}`} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                  <p className="text-sm font-semibold text-gray-500">Email</p>
                  <p className="mt-2 text-lg font-bold text-brand-dark">{contact.email}</p>
                </a>
              </div>

              <div className="mt-8 rounded-2xl bg-brand-dark p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">{copy.availabilityTitle}</p>
                <div className="mt-4 space-y-3">
                  {copy.availability.map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-sm text-gray-300">{item.label}</span>
                      <span className="text-sm font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="text-3xl font-bold text-brand-dark">{copy.formTitle}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-gray-600">{copy.formText}</p>

              <form className="mt-8 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                    placeholder={shared.nameLabel}
                  />
                  <input
                    type="email"
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                    placeholder={shared.emailLabel}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                    placeholder={shared.phoneLabel}
                  />
                  <select className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white">
                    <option>{copy.goalLabel}</option>
                    {copy.goals.map((goal) => (
                      <option key={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  rows={6}
                  className="min-h-36 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                  placeholder={shared.messageLabel}
                />
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-full bg-brand-purple px-8 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-purple-700 md:w-auto"
                >
                  {copy.submit}
                </button>
              </form>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {copy.highlights.map((item) => (
                  <div key={item} className="rounded-2xl bg-brand-light p-4 text-sm font-medium text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-16">
        <div className="site-container">
          <div className="rounded-3xl bg-brand-purple px-8 py-10 text-center text-white section-reveal">
            <h2 className="text-3xl font-extrabold md:text-4xl">{copy.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-purple-100">{copy.ctaText}</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={`/${locale}/placement-test`} className="rounded-full bg-brand-yellow px-8 py-4 font-bold text-brand-dark transition hover:bg-white">
                {copy.ctaPrimary}
              </Link>
              <Link href={`/${locale}/courses`} className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white hover:text-brand-purple">
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
