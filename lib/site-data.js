export const locales = ["en", "de"];

const images = {
  hero: "/images/hero-students.jpg",
  teachers: {
    sarah: "/images/teacher-sarah.jpg",
    lukas: "/images/teacher-lukas.jpg",
    anna: "/images/teacher-anna.jpg",
    felix: "/images/teacher-felix.jpg",
  },
  students: {
    elena: "/images/student-elena.jpg",
    mark: "/images/student-mark.jpg",
    sarah: "/images/student-sarah.jpg",
  },
  posts: {
    articles: "/images/blog-articles.jpg",
    austria: "/images/blog-austria.jpg",
    exams: "/images/blog-exams.jpg",
  },
};

const english = {
  meta: {
    title: "DeutschAkademie Engel | Learn German in Austria",
    description: "Join Austria's most energetic language institute and learn German with confidence.",
  },
  navigation: {
    homeLabel: "Home",
    courses: "Courses",
    teachers: "Teachers",
    blog: "Blog",
    portal: "Portal",
  },
  hero: {
    badge: "Start Your Journey Today",
    titleStart: "Speak German",
    titleAccent: "With Confidence.",
    description:
      "Join Austria's most energetic language institute. Master German with native experts, modern methods, and a supportive community.",
    primaryCta: "Take Placement Test",
    secondaryCta: "View Courses",
  },
  stats: [
    { value: "50+", label: "Native Teachers" },
    { value: "A1-C2", label: "Full Curriculum" },
    { value: "10k+", label: "Happy Students" },
    { value: "4.9/5", label: "Average Rating" },
  ],
  courses: [
    {
      slug: "beginner-a1",
      level: "A1",
      title: "Beginner",
      summary: "Learn to introduce yourself and navigate daily life.",
      body: "This level builds your first practical German habits, from greetings and introductions to shopping, transport, and simple conversations in Austria.",
      price: "EUR 199",
    },
    {
      slug: "intermediate-b1",
      level: "B1",
      title: "Intermediate",
      summary: "Master complex conversations and prepare for work.",
      body: "The B1 track strengthens confidence in discussions, emails, workplace communication, and everyday situations that require more independent speaking.",
      price: "EUR 249",
    },
    {
      slug: "advanced-c1",
      level: "C1",
      title: "Advanced",
      summary: "Speak fluently in academic and business environments.",
      body: "Designed for ambitious learners who need strong precision, persuasive speaking, and advanced comprehension for study, exams, and professional settings.",
      price: "EUR 299",
    },
  ],
  teachers: [
    { slug: "sarah-mueller", image: images.teachers.sarah, name: "Sarah Mueller", flag: "AT", country: "Austria", title: "Goethe Examiner", description: "Specializes in B2-C1 exam preparation with 10 years of experience." },
    { slug: "lukas-weber", image: images.teachers.lukas, name: "Lukas Weber", flag: "DE", country: "Germany", title: "A1-A2 Specialist", description: "Makes learning grammar fun and engaging for absolute beginners." },
    { slug: "anna-schmidt", image: images.teachers.anna, name: "Anna Schmidt", flag: "AT", country: "Austria", title: "Business German", description: "Helps professionals integrate into the DACH corporate world." },
    { slug: "felix-bauer", image: images.teachers.felix, name: "Felix Bauer", flag: "DE", country: "Germany", title: "Conversation Coach", description: "Focuses on pronunciation and speaking confidence." },
  ],
  testimonials: [
    { text: '"I passed my OeSD B2 exam on the first try. The teachers at Engel are incredibly supportive and the materials are top-notch."', image: images.students.elena, name: "Elena R.", role: "Student Visa Applicant", stars: "full" },
    { text: '"The placement test was very accurate. I started at A2.2 and the pacing of the classes was perfect for someone working full-time."', image: images.students.mark, name: "Mark T.", role: "IT Professional", stars: "full" },
    { text: "\"Love the energy in the online classes. It does not feel like a boring school. It feels like hanging out with friends while learning German.\"", image: images.students.sarah, name: "Sarah J.", role: "University Student", stars: "half" },
  ],
  blogPosts: [
    { slug: "german-articles-hacks", image: images.posts.articles, tagClass: "bg-purple-100 text-brand-purple", tag: "Study Tips", title: "5 Hacks to Remember German Articles", excerpt: "Struggling with noun genders? These simple tricks will save you hours of memorization.", body: "This article explains practical memory systems, pattern recognition, and routine-building strategies to make article memorization less random and more systematic.", date: "Oct 12, 2026" },
    { slug: "meldezettel-vienna", image: images.posts.austria, tagClass: "bg-yellow-100 text-yellow-800", tag: "Life in Austria", title: "How to Register Your Address in Vienna", excerpt: "A step-by-step guide to navigating Austrian bureaucracy as a new student or expat.", body: "We break down the registration process, required documents, timing expectations, and the common mistakes international students make during the first week in Vienna.", date: "Oct 05, 2026" },
    { slug: "osd-vs-goethe", image: images.posts.exams, tagClass: "bg-green-100 text-green-800", tag: "Exams", title: "OeSD vs. Goethe: Which German Exam Should You Take?", excerpt: "Comparing the two most popular German proficiency certificates and helping you choose.", body: "Choosing between OeSD and Goethe depends on your goals, destination, and exam style preference. This guide compares structure, recognition, and preparation strategy.", date: "Sep 28, 2026" },
  ],
  faqItems: [
    { question: "How do I know which level to choose?", answer: "We offer a free 10-minute online placement test. Once completed, our system will recommend the best course for your current proficiency level.", open: false },
    { question: "Are the classes online or in-person?", answer: "We offer both. You can join our campus in Vienna or participate in highly interactive live online classes from anywhere in the world.", open: true },
    { question: "Do you provide certificates after completion?", answer: "Yes. You receive a certificate of attendance, and we also prepare you for official OeSD and Goethe exams.", open: false },
  ],
  cta: {
    title: "Ready to speak German fluently?",
    description: "Join thousands of successful students. Register today and get access to our exclusive learning portal.",
    button: "Create Your Free Account",
  },
  contact: {
    location: "Vienna, Austria",
    phone: "+43 1 234 5678",
    email: "info@engel-akademie.at",
  },
  footer: {
    description: "Making German learning accessible, energetic, and highly effective in the heart of Austria.",
    exploreTitle: "Explore",
    contactTitle: "Contact",
    links: [
      { label: "All Courses", href: "/{locale}/courses" },
      { label: "Placement Test", href: "/{locale}/placement-test" },
      { label: "Student Portal", href: "/{locale}/contact" },
      { label: "Blog and Tips", href: "/{locale}/blog" },
    ],
    socials: [
      { label: "Instagram", href: "#", icon: "fa-brands fa-instagram" },
      { label: "LinkedIn", href: "#", icon: "fa-brands fa-linkedin-in" },
      { label: "YouTube", href: "#", icon: "fa-brands fa-youtube" },
    ],
    location: "Vienna, Austria",
    phone: "+43 1 234 5678",
    email: "info@engel-akademie.at",
    copyright: "Copyright 2026 DeutschAkademie Engel. All rights reserved.",
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Service",
  },
  shared: {
    coursesTitle: "Choose Your Level",
    coursesIntro: "From complete beginners to advanced speakers, we have the right course for you.",
    teachersTitle: "Meet Our Native Experts",
    teachersIntro: "Learn from passionate, certified instructors from Austria and Germany.",
    viewAllTeachers: "View all teachers",
    testimonialsTitle: "Student Success Stories",
    testimonialsIntro: "Do not just take our word for it. Hear from our community.",
    blogTitle: "Latest Tips and News",
    blogIntro: "Resources to help you master the German language faster.",
    readAllArticles: "Read all articles",
    faqTitle: "Frequently Asked Questions",
    faqIntro: "Clear answers about levels, formats, and certificates.",
    popular: "POPULAR",
    perLevel: "level",
    selectCourse: "Select Course",
    viewDetails: "View Details",
    contactTitle: "Contact the Academy",
    contactIntro: "Ask about schedules, visas, course formats, or private guidance from the Engel team.",
    placementTitle: "Request a Placement Test",
    placementIntro: "Tell us about your current German level and goals. We will recommend the right course path.",
    nameLabel: "Full name",
    emailLabel: "Email address",
    phoneLabel: "Phone number",
    messageLabel: "Tell us what you need",
    sendMessage: "Send Message",
    requestPlacement: "Request Placement Test",
  },
};

const german = {
  ...english,
  meta: {
    title: "DeutschAkademie Engel | Deutsch lernen in Oesterreich",
    description: "Lerne Deutsch mit Selbstvertrauen in einer energiegeladenen Sprachakademie in Oesterreich.",
  },
  navigation: {
    homeLabel: "Startseite",
    courses: "Kurse",
    teachers: "Lehrkraefte",
    blog: "Blog",
    portal: "Portal",
  },
  hero: {
    badge: "Starte noch heute",
    titleStart: "Sprich Deutsch",
    titleAccent: "mit Selbstvertrauen.",
    description: "Lerne an einer energiegeladenen Sprachakademie in Oesterreich. Beherrsche Deutsch mit muttersprachlichen Expertinnen und Experten, modernen Methoden und einer starken Community.",
    primaryCta: "Einstufungstest starten",
    secondaryCta: "Kurse ansehen",
  },
  stats: [
    { value: "50+", label: "Muttersprachliche Lehrkraefte" },
    { value: "A1-C2", label: "Kompletter Lehrplan" },
    { value: "10k+", label: "Zufriedene Lernende" },
    { value: "4.9/5", label: "Durchschnittsbewertung" },
  ],
  courses: [
    { ...english.courses[0], title: "Anfaenger", summary: "Lerne, dich vorzustellen und den Alltag sicher zu meistern.", body: "Dieses Niveau vermittelt dir die ersten praktischen Gewohnheiten auf Deutsch: Begruessungen, Vorstellen, Einkaufen, Verkehr und einfache Gespraeche in Oesterreich." },
    { ...english.courses[1], title: "Mittelstufe", summary: "Fuehre komplexere Gespraeche und bereite dich auf den Beruf vor.", body: "Der B1-Kurs staerkt deine Sicherheit in Gespraechen, E-Mails, Arbeitskontexten und Alltagssituationen, in denen eigenstaendiges Sprechen gefragt ist." },
    { ...english.courses[2], title: "Fortgeschritten", summary: "Sprich fliessend im akademischen und beruflichen Umfeld.", body: "Fuer ambitionierte Lernende, die Praezision, ueberzeugendes Sprechen und fortgeschrittenes Verstaendnis fuer Studium, Pruefungen und Karriere brauchen." },
  ],
  teachers: [
    { ...english.teachers[0], title: "Goethe-Prueferin", country: "Oesterreich", description: "Spezialisiert auf B2-C1 Pruefungsvorbereitung mit 10 Jahren Erfahrung." },
    { ...english.teachers[1], title: "A1-A2 Spezialist", description: "Macht Grammatik fuer absolute Anfaenger verstaendlich und motivierend." },
    { ...english.teachers[2], title: "Wirtschaftsdeutsch", country: "Oesterreich", description: "Unterstuetzt Fachkraefte beim Einstieg in die DACH-Unternehmenswelt." },
    { ...english.teachers[3], title: "Konversationstrainer", description: "Fokussiert auf Aussprache und sicheres freies Sprechen." },
  ],
  testimonials: [
    { ...english.testimonials[0], text: '"Ich habe meine OeSD-B2-Pruefung direkt beim ersten Versuch bestanden. Die Lehrkraefte bei Engel sind unglaublich unterstuetzend und die Materialien sind erstklassig."', role: "Visumsbewerberin" },
    { ...english.testimonials[1], text: '"Der Einstufungstest war sehr praezise. Ich bin auf A2.2 gestartet und das Lerntempo war perfekt fuer jemanden mit Vollzeitjob."', role: "IT-Fachkraft" },
    { ...english.testimonials[2], text: '"Ich liebe die Energie in den Online-Kursen. Es fuehlt sich nicht wie eine langweilige Schule an, sondern wie gemeinsames Lernen mit Freunden."', role: "Studentin" },
  ],
  blogPosts: [
    { ...english.blogPosts[0], tag: "Lerntipps", title: "5 Tricks, um deutsche Artikel besser zu behalten", excerpt: "Du kaempfst mit Nomen und Artikeln? Diese einfachen Methoden sparen dir viel Auswendiglernen.", body: "Dieser Beitrag zeigt praktische Merkhilfen, Mustererkennung und Routinen, mit denen sich Artikel systematischer und nachhaltiger lernen lassen.", date: "12. Okt 2026" },
    { ...english.blogPosts[1], tag: "Leben in Oesterreich", title: "So meldest du deinen Wohnsitz in Wien an", excerpt: "Eine Schritt-fuer-Schritt-Anleitung fuer neue Studierende und Expats in Oesterreich.", body: "Wir erklaeren den Ablauf, die noetigen Unterlagen, typische Fristen und die haeufigsten Fehler bei der ersten Anmeldung in Wien.", date: "05. Okt 2026" },
    { ...english.blogPosts[2], tag: "Pruefungen", title: "OeSD oder Goethe: Welche Deutschpruefung passt zu dir?", excerpt: "Ein Vergleich der beliebtesten Deutschzertifikate und eine Hilfe bei deiner Entscheidung.", body: "Ob OeSD oder Goethe besser passt, haengt von deinem Ziel, deinem Wohnort und deinem bevorzugten Pruefungsstil ab. Dieser Leitfaden vergleicht Anerkennung, Struktur und Vorbereitung.", date: "28. Sep 2026" },
  ],
  faqItems: [
    { question: "Wie finde ich das richtige Niveau?", answer: "Wir bieten einen kostenlosen Online-Einstufungstest in nur 10 Minuten an. Danach empfehlen wir automatisch den passenden Kurs fuer dein aktuelles Sprachniveau.", open: false },
    { question: "Sind die Kurse online oder vor Ort?", answer: "Beides. Du kannst unseren Standort in Wien besuchen oder an interaktiven Live-Online-Kursen von ueberall auf der Welt teilnehmen.", open: true },
    { question: "Bekomme ich nach Abschluss ein Zertifikat?", answer: "Ja. Du erhaeltst ein Teilnahmezertifikat. Ausserdem bereiten wir dich gezielt auf offizielle OeSD- und Goethe-Pruefungen vor.", open: false },
  ],
  cta: {
    title: "Bereit, fliessend Deutsch zu sprechen?",
    description: "Werde Teil von tausenden erfolgreichen Lernenden. Registriere dich noch heute und erhalte Zugang zu unserem exklusiven Lernportal.",
    button: "Kostenloses Konto erstellen",
  },
  contact: {
    location: "Wien, Oesterreich",
    phone: "+43 1 234 5678",
    email: "info@engel-akademie.at",
  },
  footer: {
    ...english.footer,
    description: "Wir machen Deutschlernen zugaenglich, energiegeladen und wirkungsvoll im Herzen Oesterreichs.",
    exploreTitle: "Entdecken",
    contactTitle: "Kontakt",
    links: [
      { label: "Alle Kurse", href: "/{locale}/courses" },
      { label: "Einstufungstest", href: "/{locale}/placement-test" },
      { label: "Studentenportal", href: "/{locale}/contact" },
      { label: "Blog und Tipps", href: "/{locale}/blog" },
    ],
    location: "Wien, Oesterreich",
    copyright: "Copyright 2026 DeutschAkademie Engel. Alle Rechte vorbehalten.",
    privacyLabel: "Datenschutz",
    termsLabel: "AGB",
  },
  shared: {
    coursesTitle: "Waehle dein Niveau",
    coursesIntro: "Vom absoluten Anfaenger bis zur fortgeschrittenen Sprachkompetenz: Wir haben den passenden Kurs fuer dich.",
    teachersTitle: "Unsere muttersprachlichen Expertinnen und Experten",
    teachersIntro: "Lerne mit leidenschaftlichen, zertifizierten Lehrkraeften aus Oesterreich und Deutschland.",
    viewAllTeachers: "Alle Lehrkraefte ansehen",
    testimonialsTitle: "Erfolgsgeschichten unserer Lernenden",
    testimonialsIntro: "Nicht nur wir sagen das. Hoere direkt von unserer Community.",
    blogTitle: "Neueste Tipps und News",
    blogIntro: "Ressourcen, mit denen du Deutsch schneller und gezielter lernst.",
    readAllArticles: "Alle Artikel lesen",
    faqTitle: "Haeufig gestellte Fragen",
    faqIntro: "Klare Antworten zu Niveaus, Formaten und Zertifikaten.",
    popular: "BELIEBT",
    perLevel: "Niveau",
    selectCourse: "Kurs waehlen",
    viewDetails: "Details ansehen",
    contactTitle: "Kontaktiere die Akademie",
    contactIntro: "Frage nach Terminen, Visa, Kursformaten oder individueller Beratung durch das Engel-Team.",
    placementTitle: "Einstufungstest anfragen",
    placementIntro: "Erzaehl uns mehr ueber dein aktuelles Deutschniveau und deine Ziele. Wir empfehlen dir den passenden Kursweg.",
    nameLabel: "Vollstaendiger Name",
    emailLabel: "E-Mail-Adresse",
    phoneLabel: "Telefonnummer",
    messageLabel: "Wobei brauchst du Hilfe?",
    sendMessage: "Nachricht senden",
    requestPlacement: "Einstufung anfragen",
  },
};

const baseData = { en: english, de: german };

export function isSupportedLocale(locale) {
  return locales.includes(locale);
}

export function getLandingContent(locale) {
  return baseData[locale] ?? baseData.en;
}

export function getCourseBySlug(locale, slug) {
  return getLandingContent(locale).courses.find((course) => course.slug === slug);
}

export function getBlogPostBySlug(locale, slug) {
  return getLandingContent(locale).blogPosts.find((post) => post.slug === slug);
}
