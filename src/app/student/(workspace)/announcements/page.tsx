import { Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatWhen } from "@/lib/time";
import { listVisibleAnnouncements } from "@/server/student-data";

export const metadata = { title: "Announcements" };

export default async function AnnouncementsPage() {
  const user = await requireUser("student");
  const rows = await listVisibleAnnouncements(user);
  return (
    <div>
      <PageHeader title="Announcements" description="Messages from your instructor for the whole class." />
      <div className="space-y-3">
        {rows.map((item) => (
          <Card key={item.id} className="p-5">
            <p className="text-xs text-muted">{formatWhen(item.createdAt, user.timezone)}</p>
            <h2 className="mt-1 text-lg font-bold text-navy">{item.title}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{item.body}</p>
          </Card>
        ))}
        {rows.length === 0 ? <p className="text-sm text-muted">No announcements yet.</p> : null}
      </div>
    </div>
  );
}
