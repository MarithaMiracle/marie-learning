import Link from "next/link";
import { logoutAction } from "@/server/auth-actions";
import { HeroDoodles } from "@/components/marketing/hero-doodles";
import { TornEdge } from "@/components/marketing/torn-edge";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="relative isolate overflow-hidden bg-navy pb-48 pt-10 text-white md:pb-64">
        <HeroDoodles />
        <header className="relative z-10 mx-auto flex max-w-2xl items-center justify-between px-4">
          <Link href="/student/onboarding" className="text-xl font-bold tracking-tight">
            Marie Learning
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-semibold text-white/75 hover:text-white">
              Log out
            </button>
          </form>
        </header>
        <TornEdge className="pointer-events-none absolute inset-x-0 bottom-0 z-20" />
      </div>
      <main className="relative z-30 mx-auto -mt-40 max-w-2xl px-4 pb-20 md:-mt-52">
        {children}
      </main>
    </div>
  );
}
