import { OnboardingWizard } from "@/components/account-forms";
import { requireUser } from "@/lib/auth";
import { defaultChecklist, mergeChecklist } from "@/lib/checklist";
import type { OperatingSystem } from "@/lib/content-types";
import { getProfile } from "@/server/student-data";
import { Checklist } from "@/components/checklist";
import Link from "next/link";

export const metadata = { title: "Welcome" };

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ done?: string }> }) {
  const user = await requireUser("student");
  const { done } = await searchParams;
  const data = await getProfile(user);
  const os = (data.profile?.operatingSystem as OperatingSystem | null) ?? null;
  const checklist = mergeChecklist(data.profile?.setupChecklist, defaultChecklist(os, data.profile?.osVersion));

  if (user.onboardingCompleted || done) {
    return (
      <div className="space-y-12 pb-20">
        <div className="pt-8 text-center md:pt-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">You are ready to start</h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-white/80">
            You do not need to install every development tool today. The setup below is the only thing that matters before Week 1.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-sm md:p-12">
          <Checklist items={checklist} />
          <div className="mt-10 flex justify-center">
            <Link href="/student/dashboard" className="inline-flex h-14 items-center justify-center rounded-full bg-navy px-10 text-base font-bold text-white shadow-lg transition-all hover:bg-navy/90 hover:shadow-xl active:scale-[0.98]">
              Go to my dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="pt-8 text-center md:pt-12">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Welcome</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-white/80">
          A few questions help your instructor teach at the right pace. There are no wrong answers.
        </p>
      </div>
      <div className="rounded-3xl border border-line bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:p-12">
        <OnboardingWizard
          email={user.email}
          defaults={{
            fullName: user.fullName,
            preferredName: user.preferredName ?? "",
            country: data.profile?.country ?? "",
            timezone: user.timezone,
            operatingSystem: os ?? "unknown",
            osVersion: data.profile?.osVersion ?? "",
            computerExperience: (data.profile?.computerExperience as "browse") ?? "browse",
            codingExperience: (data.profile?.codingExperience as "never") ?? "never",
            learningGoals: data.profile?.learningGoals ?? "",
            weeklyPractice: (data.profile?.weeklyPractice as "h2to4") ?? "h2to4",
          }}
        />
      </div>
    </div>
  );
}
