import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { SiteHeader } from "@/components/site/header";

function StarRow({ half = false }) {
  return (
    <div className="mb-4 flex text-brand-yellow">
      <i className="fa-solid fa-star" />
      <i className="fa-solid fa-star" />
      <i className="fa-solid fa-star" />
      <i className="fa-solid fa-star" />
      <i className={half ? "fa-solid fa-star-half-stroke" : "fa-solid fa-star"} />
    </div>
  );
}

export function LandingPage({ locale, content }) {
  const { navigation, hero, stats, courses, teachers, testimonials, blogPosts, faqItems, cta, footer, shared } = content;

  return (
    <main className="bg-brand-light font-sans text-gray-800">
      <SiteHeader locale={locale} navigation={navigation} portalLabel={navigation.portal} />
      <section className="blob-bg relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 lg:flex-row">
          <div className="z-10 w-full text-center lg:w-1/2 lg:pr-12 lg:text-left section-reveal">
            <div className="mb-6 inline-block animate-bounce rounded-full bg-brand-yellow px-4 py-1 font-bold text-brand-dark">{hero.badge}</div>
            <h1 className="mb-6 text-5xl leading-tight font-extrabold lg:text-7xl">
              {hero.titleStart} <br />
              <span className="gradient-text">{hero.titleAccent}</span>
            </h1>
            <p className="mb-8 text-lg font-light text-gray-600">{hero.description}</p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Link href={`/${locale}/placement-test`} className="rounded-full bg-brand-purple px-8 py-4 text-center font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-purple-700">
                {hero.primaryCta}
              </Link>
              <Link href={`/${locale}/courses`} className="rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-center font-bold text-brand-dark transition-all hover:border-brand-purple hover:text-brand-purple">
                {hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="relative z-10 mt-16 w-full lg:mt-0 lg:w-1/2 section-reveal">
            <Image src="/images/hero-students.jpg" alt="Students" width={1200} height={1000} priority className="h-[500px] w-full rounded-3xl border-8 border-white object-cover shadow-2xl" />
          </div>
        </div>
      </section>
      <section className="bg-brand-dark py-12 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 divide-x divide-gray-700 px-6 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="section-reveal">
              <h3 className="mb-2 text-4xl font-black text-brand-yellow">{stat.value}</h3>
              <p className="font-medium text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="courses" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center section-reveal">
            <h2 className="mb-4 text-4xl font-bold text-brand-dark">{shared.coursesTitle}</h2>
            <p className="mx-auto max-w-2xl text-gray-600">{shared.coursesIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {courses.map((course, index) => (
              <div key={course.slug} className={`relative rounded-3xl p-8 transition-all ${index === 1 ? "transform bg-brand-purple text-white shadow-2xl shadow-purple-500/20 md:-translate-y-4" : "group border border-gray-100 bg-gray-50 hover:border-brand-purple hover:shadow-xl"}`}>
                {index === 1 ? <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-3xl bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-dark">{shared.popular}</div> : null}
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold ${index === 1 ? "bg-white/20" : "bg-brand-purple/10 text-brand-purple"}`}>{course.level}</div>
                <h3 className="mb-3 text-2xl font-bold">{course.title}</h3>
                <p className={index === 1 ? "mb-6 text-purple-100" : "mb-6 text-gray-600"}>{course.summary}</p>
                <div className="mb-6 text-2xl font-black">
                  {course.price} <span className={index === 1 ? "text-sm font-normal text-purple-200" : "text-sm font-normal text-gray-400"}>/ {shared.perLevel}</span>
                </div>
                <Link href={`/${locale}/courses/${course.slug}`} className={`block w-full rounded-xl py-3 text-center font-bold transition-colors ${index === 1 ? "bg-white text-brand-purple hover:bg-gray-100" : "border-2 border-brand-dark hover:bg-brand-dark hover:text-white"}`}>
                  {shared.selectCourse}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="teachers" className="bg-brand-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-end justify-between gap-6 section-reveal">
            <div>
              <h2 className="mb-4 text-4xl font-bold text-brand-dark">{shared.teachersTitle}</h2>
              <p className="text-gray-600">{shared.teachersIntro}</p>
            </div>
            <Link href={`/${locale}/teachers`} className="hidden font-bold text-brand-purple hover:underline md:block">
              {shared.viewAllTeachers}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher) => (
              <div key={teacher.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl">
                <Image src={teacher.image} alt={teacher.name} width={600} height={800} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xl font-bold">{teacher.name}</h4>
                    <span className="text-xl" title={teacher.country}>{teacher.flag}</span>
                  </div>
                  <p className="mb-3 text-sm font-semibold text-brand-purple">{teacher.title}</p>
                  <p className="text-sm text-gray-500">{teacher.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center section-reveal">
            <h2 className="mb-4 text-4xl font-bold text-brand-dark">{shared.testimonialsTitle}</h2>
            <p className="text-gray-600">{shared.testimonialsIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="relative rounded-3xl bg-gray-50 p-8">
                <i className="fa-solid fa-quote-left absolute top-6 right-8 text-4xl text-brand-yellow/30" />
                <StarRow half={item.stars === "half"} />
                <p className="mb-6 italic text-gray-600">{item.text}</p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-300">
                    <Image src={item.image} alt={item.name} width={150} height={150} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold">{item.name}</h5>
                    <span className="text-sm text-gray-500">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="blog" className="bg-brand-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-end justify-between gap-6 section-reveal">
            <div>
              <h2 className="mb-4 text-4xl font-bold text-brand-dark">{shared.blogTitle}</h2>
              <p className="text-gray-600">{shared.blogIntro}</p>
            </div>
            <Link href={`/${locale}/blog`} className="hidden font-bold text-brand-purple hover:underline md:block">
              {shared.readAllArticles}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} width={800} height={600} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex space-x-2">
                    <span className={`${post.tagClass} rounded px-2 py-1 text-xs font-bold`}>{post.tag}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition hover:text-brand-purple">
                    <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>
                  <div className="text-sm text-gray-500"><i className="fa-regular fa-calendar mr-2" />{post.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center section-reveal">
            <h2 className="mb-4 text-4xl font-bold text-brand-dark">{shared.faqTitle}</h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
      <section id="register" className="relative overflow-hidden bg-brand-purple py-20">
        <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-5" />
        <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-brand-yellow opacity-10" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center section-reveal">
          <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl">{cta.title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-100">{cta.description}</p>
          <Link href={`/${locale}/contact`} className="inline-flex rounded-full bg-brand-yellow px-10 py-4 text-lg font-black text-brand-dark shadow-2xl transition-all hover:scale-105 hover:bg-white">
            {cta.button}
          </Link>
        </div>
      </section>
      <footer className="bg-brand-dark pt-20 pb-10 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <h4 className="mb-6 text-2xl font-extrabold">DeutschAkademie <span className="text-brand-purple">Engel</span></h4>
              <p className="mb-6 max-w-sm text-gray-400">{footer.description}</p>
              <div className="flex space-x-4">
                {footer.socials.map((social) => (
                  <a key={social.label} href={social.href} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition hover:bg-brand-purple" aria-label={social.label}>
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold">{footer.exploreTitle}</h4>
              <ul className="space-y-3 text-gray-400">
                {footer.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href.replace("{locale}", locale)} className="transition hover:text-white">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-lg font-bold">{footer.contactTitle}</h4>
              <ul className="space-y-3 text-gray-400">
                <li><i className="fa-solid fa-location-dot w-6" /> {footer.location}</li>
                <li><i className="fa-solid fa-phone w-6" /> {footer.phone}</li>
                <li><i className="fa-solid fa-envelope w-6" /> {footer.email}</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 text-center text-sm text-gray-500 md:flex-row">
            <p>{footer.copyright}</p>
            <div className="mt-4 space-x-4 md:mt-0">
              <Link href={`/${locale}/contact`} className="transition hover:text-white">{footer.privacyLabel}</Link>
              <Link href={`/${locale}/contact`} className="transition hover:text-white">{footer.termsLabel}</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
