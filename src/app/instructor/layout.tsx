import { AppShell, instructorNav } from "@/components/shell";
import { displayName, requireUser } from "@/lib/auth";
import { listContactMessages } from "@/server/instructor-data";

export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("instructor");
  const messages = await listContactMessages(user);
  const noticeCount = messages.filter((item) => !item.handled).length;
  return (
    <AppShell
      name={displayName(user)}
      role="instructor"
      email={user.email}
      items={instructorNav}
      noticeCount={noticeCount}
    >
      {children}
    </AppShell>
  );
}
