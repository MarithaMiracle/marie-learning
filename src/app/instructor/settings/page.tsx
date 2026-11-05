import { InstructorSettingsForm } from "@/components/instructor-forms";
import { PasswordForm } from "@/components/account-forms";
import { Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";

export const metadata = { title: "Instructor settings" };

export default async function InstructorSettingsPage() {
  const user = await requireUser("instructor");
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <PageHeader title="Settings" description="Your time zone is used when you schedule a class." />
        <Card className="p-5">
          <InstructorSettingsForm name={user.fullName} timezone={user.timezone} />
        </Card>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-3 font-bold">Password</h2>
        <PasswordForm />
      </Card>
    </div>
  );
}
