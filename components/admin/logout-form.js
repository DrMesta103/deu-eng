import { signOut } from "@/auth";

export function LogoutForm() {
  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
      >
        <i className="fa-solid fa-arrow-right-from-bracket" />
        <span>Log out</span>
      </button>
    </form>
  );
}
