import { redirect } from "next/navigation";
import { AppShell, studentNav } from "@/components/shell";
import { displayName, requireUser } from "@/lib/auth";
import { countUnread } from "@/server/student-data";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("student");
  if (!user.onboardingCompleted) redirect("/student/onboarding");
  const notices = await countUnread(user);
  return (
    <AppShell name={displayName(user)} role="student" email={user.email} items={studentNav} noticeCount={notices}>
      {children}
    </AppShell>
  );
}
