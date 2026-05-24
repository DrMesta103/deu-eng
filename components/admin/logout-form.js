import { signOut } from "@/auth";

export function LogoutForm({ compact = false }) {
  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        title="Log out"
        className={compact
          ? "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-sm font-semibold text-white transition hover:bg-white/12"
          : "flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"}
      >
        <i className="fa-solid fa-arrow-right-from-bracket" />
        {!compact ? <span>Log out</span> : null}
      </button>
    </form>
  );
}