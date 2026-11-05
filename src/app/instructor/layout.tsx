import { AppShell, instructorNav } from "@/components/shell";
import { displayName, requireUser } from "@/lib/auth";

export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("instructor");
  return (
    <AppShell name={displayName(user)} role="instructor" email={user.email} items={instructorNav}>
      {children}
    </AppShell>
  );
}
