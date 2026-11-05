import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatWhen } from "@/lib/time";
import { listSchedule } from "@/server/student-data";

export const metadata = { title: "Schedule" };

export default async function SchedulePage() {
  const user = await requireUser("student");
  const rows = await listSchedule(user);
  const upcoming = rows.filter((row) => row.item.status === "scheduled" && row.item.startsAt.getTime() >= Date.now() - 15 * 60 * 1000);
  const previous = rows.filter((row) => !upcoming.includes(row));
  return (
    <div>
      <PageHeader title="Schedule" description={`Times are shown in ${user.timezone}.`} />
      <h2 className="mb-3 font-bold text-navy">Upcoming</h2>
      <ClassList rows={upcoming} timeZone={user.timezone} empty="No upcoming classes." />
      <h2 className="mb-3 mt-6 font-bold text-navy">Earlier classes</h2>
      <ClassList rows={previous} timeZone={user.timezone} empty="No earlier classes." />
    </div>
  );
}

function ClassList({
  rows,
  timeZone,
  empty,
}: {
  rows: Awaited<ReturnType<typeof listSchedule>>;
  timeZone: string;
  empty: string;
}) {
  if (rows.length === 0) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <div className="space-y-3">
      {rows.map(({ item, lessonTitle }) => (
        <Card key={item.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-navy">{formatWhen(item.startsAt, timeZone)}</h3>
            <Badge tone={item.status === "cancelled" ? "danger" : item.status === "completed" ? "success" : "primary"}>{item.status}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6">{item.description || "Live class"} · {item.durationMinutes} minutes</p>
          {lessonTitle ? <p className="text-sm text-muted">Related lesson: {lessonTitle}</p> : null}
          {item.meetingUrl && item.status !== "cancelled" ? (
            <a className="mt-2 inline-block text-sm font-semibold text-primary" href={item.meetingUrl} target="_blank" rel="noreferrer">
              Open meeting link
            </a>
          ) : null}
          {item.sharedNotes ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6">{item.sharedNotes}</p> : null}
          {item.attendance ? <p className="mt-2 text-sm">Attendance: {item.attendance}</p> : null}
        </Card>
      ))}
    </div>
  );
}
