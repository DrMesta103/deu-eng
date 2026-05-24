"use client";

import { useActionState } from "react";
import { authenticateAdmin } from "@/app/admin/login/actions";

const initialState = {
  error: null,
  fieldErrors: {
    email: null,
    password: null,
  },
  values: {
    email: "",
  },
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(authenticateAdmin, initialState);

  return (
    <form
      action={formAction}
      aria-busy={isPending}
      className="rounded-[2rem] border border-black/6 bg-white p-8 shadow-xl shadow-black/5"
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            autoFocus
            defaultValue={state.values.email}
            aria-invalid={Boolean(state.fieldErrors.email)}
            aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
            readOnly={isPending}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white aria-[invalid=true]:border-rose-400 aria-[invalid=true]:bg-rose-50"
            placeholder="admin@engel-akademie.at"
          />
          {state.fieldErrors.email ? (
            <p id="email-error" className="mt-2 text-sm font-medium text-rose-700">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            aria-invalid={Boolean(state.fieldErrors.password)}
            aria-describedby={state.fieldErrors.password ? "password-error" : undefined}
            readOnly={isPending}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white aria-[invalid=true]:border-rose-400 aria-[invalid=true]:bg-rose-50"
            placeholder="Enter your password"
          />
          {state.fieldErrors.password ? (
            <p id="password-error" className="mt-2 text-sm font-medium text-rose-700">
              {state.fieldErrors.password}
            </p>
          ) : null}
        </div>

        {state.error ? (
          <div aria-live="polite" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {state.error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-[#f55b2a] px-5 py-3 font-bold text-white transition hover:bg-[#df4b1d] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Signing in..." : "Sign in to admin"}
        </button>
      </div>
    </form>
  );
}
