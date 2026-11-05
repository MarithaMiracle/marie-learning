import { OnboardingWizard } from "@/components/account-forms";
import { Card } from "@/components/ui";
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-navy">You are ready to start</h1>
          <p className="mt-3 text-base leading-7 text-slate-700">
            You do not need to install every development tool today. The checklist below is the only setup that matters before Week 1. Visual Studio Code, Git, Node.js, and PostgreSQL arrive in the lessons that use them.
          </p>
        </div>
        <Checklist items={checklist} />
        <Link href="/student/dashboard" className="inline-flex h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-navy">
          Go to my dashboard
        </Link>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-navy">Welcome</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        A few questions help your instructor teach at the right pace. There are no wrong answers.
      </p>
      <div className="mt-6">
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
    </Card>
  );
}
