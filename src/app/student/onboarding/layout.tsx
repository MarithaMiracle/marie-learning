import Link from "next/link";
import { logoutAction } from "@/server/auth-actions";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link href="/student/onboarding" className="font-bold text-navy">
            Marie Learning
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-semibold text-slate-700">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
