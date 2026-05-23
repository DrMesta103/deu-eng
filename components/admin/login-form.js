"use client";

import { useActionState } from "react";
import { authenticateAdmin } from "@/app/admin/login/actions";

const initialState = {
  error: null,
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(authenticateAdmin, initialState);

  return (
    <form action={formAction} className="rounded-[2rem] border border-black/6 bg-white p-8 shadow-xl shadow-black/5">
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
            placeholder="admin@engel-akademie.at"
          />
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
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-purple focus:bg-white"
            placeholder="Enter your password"
          />
        </div>

        {state.error ? (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
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
