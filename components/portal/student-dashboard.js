"use client";

import { useActionState } from "react";
import { enrollCourse, logoutStudent, saveStudentProfile } from "@/app/[locale]/portal/actions";

const profileInitialState = {
  success: null,
  error: null,
  fieldErrors: {
    firstName: null,
    lastName: null,
    countryCode: null,
    phone: null,
  },
};

const countryCodes = ["+43", "+49", "+90", "+98", "+971", "+44", "+1"];

export function StudentDashboard({ locale, copy, data }) {
  const [profileState, profileAction, profilePending] = useActionState(saveStudentProfile, profileInitialState);

  return (
    <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
      <aside className="space-y-8">
        <section className="rounded-[2rem] bg-brand-dark p-8 text-white shadow-2xl shadow-brand-dark/20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">{copy.dashboardBadge}</p>
          <h2 className="mt-4 text-3xl font-bold">{copy.dashboardTitle}</h2>
          <p className="mt-3 text-white/72">{copy.dashboardIntro}</p>
          <div className="mt-8 rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
            <p className="text-sm text-white/60">{copy.memberSince}</p>
            <p className="mt-1 text-lg font-semibold">{data.student.joinedAt}</p>
          </div>
          <form action={logoutStudent} className="mt-8">
            <input type="hidden" name="locale" value={locale} />
            <button
              type="submit"
              className="w-full rounded-2xl border border-white/15 bg-white/8 px-5 py-3 font-semibold text-white transition hover:bg-white/14"
            >
              {copy.logoutButton}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-brand-dark">{copy.myCoursesTitle}</h3>
            <p className="mt-1 text-sm text-gray-500">{copy.myCoursesIntro}</p>
          </div>
          <div className="grid gap-3">
            {data.enrollments.length ? (
              data.enrollments.map((course) => (
                <div key={course.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">{course.level}</p>
                      <h4 className="mt-1 font-bold text-brand-dark">{course.title}</h4>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{course.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">{course.price}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-gray-500">
                {copy.noCourses}
              </div>
            )}
          </div>
        </section>
      </aside>

      <div className="space-y-8">
        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">{copy.profileBadge}</p>
              <h3 className="mt-2 text-2xl font-bold text-brand-dark">{copy.profileTitle}</h3>
            </div>
            <p className="text-sm text-gray-500">{data.student.email}</p>
          </div>

          <form action={profileAction} aria-busy={profilePending} className="grid gap-5">
            <input type="hidden" name="locale" value={locale} />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="profile-firstName" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.firstNameLabel}
                </label>
                <input
                  id="profile-firstName"
                  name="firstName"
                  type="text"
                  defaultValue={data.student.firstName}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                {profileState.fieldErrors.firstName ? <p className="mt-2 text-sm font-medium text-rose-700">{profileState.fieldErrors.firstName}</p> : null}
              </div>
              <div>
                <label htmlFor="profile-lastName" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.lastNameLabel}
                </label>
                <input
                  id="profile-lastName"
                  name="lastName"
                  type="text"
                  defaultValue={data.student.lastName}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                {profileState.fieldErrors.lastName ? <p className="mt-2 text-sm font-medium text-rose-700">{profileState.fieldErrors.lastName}</p> : null}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
              <div>
                <label htmlFor="profile-countryCode" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.countryCodeLabel}
                </label>
                <select
                  id="profile-countryCode"
                  name="countryCode"
                  defaultValue={data.student.countryCode}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                {profileState.fieldErrors.countryCode ? <p className="mt-2 text-sm font-medium text-rose-700">{profileState.fieldErrors.countryCode}</p> : null}
              </div>
              <div>
                <label htmlFor="profile-phone" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.phoneLabel}
                </label>
                <input
                  id="profile-phone"
                  name="phone"
                  type="tel"
                  defaultValue={data.student.phone.replace(`${data.student.countryCode} `, "")}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                {profileState.fieldErrors.phone ? <p className="mt-2 text-sm font-medium text-rose-700">{profileState.fieldErrors.phone}</p> : null}
              </div>
            </div>

            {profileState.error ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{profileState.error}</div>
            ) : null}
            {profileState.success ? (
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{profileState.success}</div>
            ) : null}

            <button
              type="submit"
              disabled={profilePending}
              className="justify-self-start rounded-2xl bg-brand-purple px-5 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {profilePending ? copy.profilePending : copy.profileButton}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-purple">{copy.enrollBadge}</p>
            <h3 className="mt-2 text-2xl font-bold text-brand-dark">{copy.enrollTitle}</h3>
            <p className="mt-2 text-gray-500">{copy.enrollIntro}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {data.courses.map((course) => (
              <article key={course.slug} className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-sm font-bold text-brand-purple">{course.level}</span>
                  <span className="text-sm font-semibold text-gray-500">{course.price}</span>
                </div>
                <h4 className="mt-4 text-xl font-bold text-brand-dark">{course.title}</h4>
                <p className="mt-3 text-sm leading-7 text-gray-600">{course.summary}</p>
                {course.enrolled ? (
                  <div className="mt-6 rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">{copy.enrolledLabel}</div>
                ) : (
                  <form action={enrollCourse} className="mt-6">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="courseSlug" value={course.slug} />
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-[#f55b2a] px-5 py-3 font-bold text-white transition hover:bg-[#df4b1d]"
                    >
                      {copy.enrollButton}
                    </button>
                  </form>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
