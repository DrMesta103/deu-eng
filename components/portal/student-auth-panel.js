"use client";

import { useActionState, useState } from "react";
import { loginStudent, registerStudent } from "@/app/[locale]/portal/actions";

const loginInitialState = {
  success: null,
  error: null,
  fieldErrors: { email: null, password: null },
  values: { email: "" },
};

const registerInitialState = {
  success: null,
  error: null,
  fieldErrors: {
    firstName: null,
    lastName: null,
    countryCode: null,
    phone: null,
    email: null,
    password: null,
    confirmPassword: null,
    acceptTerms: null,
  },
  values: {
    firstName: "",
    lastName: "",
    countryCode: "+43",
    phone: "",
    email: "",
  },
};

const countryCodes = ["+43", "+49", "+90", "+98", "+971", "+44", "+1"];

function FieldError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm font-medium text-rose-700">
      {message}
    </p>
  );
}

export function StudentAuthPanel({ locale, copy }) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginState, loginAction, loginPending] = useActionState(loginStudent, loginInitialState);
  const [registerState, registerAction, registerPending] = useActionState(registerStudent, registerInitialState);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="rounded-[2rem] bg-brand-dark p-8 text-white shadow-2xl shadow-brand-dark/20">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-yellow">{copy.badge}</p>
        <h2 className="mt-5 text-3xl font-bold leading-tight">{copy.title}</h2>
        <p className="mt-4 text-base leading-8 text-white/72">{copy.description}</p>
        <div className="mt-8 grid gap-4">
          {copy.highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4">
              <p className="font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-4 shadow-xl shadow-black/5 ring-1 ring-black/5">
        <div className="grid grid-cols-2 rounded-[1.35rem] bg-brand-light p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeTab === "login" ? "bg-white text-brand-dark shadow-sm" : "text-gray-500"}`}
          >
            {copy.loginTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeTab === "register" ? "bg-white text-brand-dark shadow-sm" : "text-gray-500"}`}
          >
            {copy.registerTab}
          </button>
        </div>

        {activeTab === "login" ? (
          <form action={loginAction} aria-busy={loginPending} className="grid gap-5 p-5 sm:p-6">
            <input type="hidden" name="locale" value={locale} />
            <div>
              <label htmlFor="student-login-email" className="mb-2 block text-sm font-semibold text-slate-700">
                {copy.emailLabel}
              </label>
              <input
                id="student-login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={loginState.values.email}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                placeholder="student@example.com"
              />
              <FieldError id="student-login-email-error" message={loginState.fieldErrors.email} />
            </div>
            <div>
              <label htmlFor="student-login-password" className="mb-2 block text-sm font-semibold text-slate-700">
                {copy.passwordLabel}
              </label>
              <input
                id="student-login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                placeholder="••••••••"
              />
              <FieldError id="student-login-password-error" message={loginState.fieldErrors.password} />
            </div>

            {loginState.error ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{loginState.error}</div>
            ) : null}

            <button
              type="submit"
              disabled={loginPending}
              className="rounded-2xl bg-brand-purple px-5 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loginPending ? copy.loginPending : copy.loginButton}
            </button>
          </form>
        ) : (
          <form action={registerAction} aria-busy={registerPending} className="grid gap-5 p-5 sm:p-6">
            <input type="hidden" name="locale" value={locale} />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.firstNameLabel}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  defaultValue={registerState.values.firstName}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                <FieldError id="firstName-error" message={registerState.fieldErrors.firstName} />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.lastNameLabel}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  defaultValue={registerState.values.lastName}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                <FieldError id="lastName-error" message={registerState.fieldErrors.lastName} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
              <div>
                <label htmlFor="countryCode" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.countryCodeLabel}
                </label>
                <select
                  id="countryCode"
                  name="countryCode"
                  defaultValue={registerState.values.countryCode}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <FieldError id="countryCode-error" message={registerState.fieldErrors.countryCode} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.phoneLabel}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  defaultValue={registerState.values.phone}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                  placeholder="660 123 4567"
                />
                <FieldError id="phone-error" message={registerState.fieldErrors.phone} />
              </div>
            </div>

            <div>
              <label htmlFor="registerEmail" className="mb-2 block text-sm font-semibold text-slate-700">
                {copy.emailLabel}
              </label>
              <input
                id="registerEmail"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={registerState.values.email}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
              />
              <FieldError id="registerEmail-error" message={registerState.fieldErrors.email} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="registerPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.passwordLabel}
                </label>
                <input
                  id="registerPassword"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                <FieldError id="registerPassword-error" message={registerState.fieldErrors.password} />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">
                  {copy.confirmPasswordLabel}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
                />
                <FieldError id="confirmPassword-error" message={registerState.fieldErrors.confirmPassword} />
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <input name="acceptTerms" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-purple" />
              <span>{copy.termsLabel}</span>
            </label>
            <FieldError id="acceptTerms-error" message={registerState.fieldErrors.acceptTerms} />

            {registerState.error ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{registerState.error}</div>
            ) : null}

            <button
              type="submit"
              disabled={registerPending}
              className="rounded-2xl bg-[#f55b2a] px-5 py-3 font-bold text-white transition hover:bg-[#df4b1d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {registerPending ? copy.registerPending : copy.registerButton}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
