import Link from "next/link";
import { RegisterForm } from "@/components/account-forms";
import { PublicFrame, registrationIsOpen } from "@/components/public-frame";
import { HeroDoodles } from "@/components/marketing/hero-doodles";
import { TornEdge } from "@/components/marketing/torn-edge";

export const metadata = { title: "Create a student account" };

export default function RegisterPage() {
  const open = registrationIsOpen();
  return (
    <PublicFrame chrome="hero">
      <div className="relative isolate overflow-hidden bg-navy pb-48 pt-10 text-white md:pb-64">
        <HeroDoodles />
        <div className="relative z-10 mx-auto max-w-2xl px-4">
          <header className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Marie Learning
            </Link>
            <Link href="/" className="text-sm font-semibold text-white/75 hover:text-white">
              Back to home
            </Link>
          </header>
          <div className="mt-20 text-center md:mt-24">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Create account</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-white/80">
              Registration creates a student account and enrols you on the programme.
            </p>
          </div>
        </div>
        <TornEdge className="pointer-events-none absolute inset-x-0 bottom-0 z-20" />
      </div>

      <div className="relative z-30 mx-auto -mt-40 max-w-2xl px-4 pb-20 md:-mt-52">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:p-12">
          {open ? (
            <>
              <RegisterForm />
              <p className="mt-10 border-t border-line pt-8 text-center text-sm text-muted">
                Already have an account? <Link href="/login" className="font-bold text-primary hover:text-primary/80">Log in</Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold text-navy">Open registration is turned off.</p>
              <p className="mt-4 text-base leading-7 text-muted">
                New students receive an account directly from the instructor. If you already have one, you can <Link href="/login" className="font-bold text-primary hover:text-primary/80">log in here</Link>.
              </p>
            </div>
          )}
        </div>
      </div>
    </PublicFrame>
  );
}
