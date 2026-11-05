import { PasswordForm, OnboardingWizard } from "@/components/account-forms";
import { Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import type { OperatingSystem } from "@/lib/content-types";
import { getProfile } from "@/server/student-data";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireUser("student");
  const data = await getProfile(user);
  const profile = data.profile;
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Update how we greet you, your computer, and your password." />
      <Card className="p-5">
        <h2 className="mb-4 font-bold text-navy">Profile</h2>
        <OnboardingWizard
          mode="settings"
          email={user.email}
          defaults={{
            fullName: user.fullName,
            preferredName: user.preferredName ?? "",
            country: profile?.country ?? "",
            timezone: user.timezone,
            operatingSystem: (profile?.operatingSystem as OperatingSystem | null) ?? "unknown",
            osVersion: profile?.osVersion ?? "",
            computerExperience: (profile?.computerExperience as "browse") ?? "browse",
            codingExperience: (profile?.codingExperience as "never") ?? "never",
            learningGoals: profile?.learningGoals ?? "",
            weeklyPractice: (profile?.weeklyPractice as "h2to4") ?? "h2to4",
          }}
        />
      </Card>
      <Card className="p-5">
        <h2 className="mb-4 font-bold text-navy">Password</h2>
        <PasswordForm />
      </Card>
    </div>
  );
}
