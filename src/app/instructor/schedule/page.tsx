import { CancelClassButton, ClassForm } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { displayName, requireUser } from "@/lib/auth";
import { formatWhen, utcToZonedInputValue } from "@/lib/time";
import { getCurriculum, listClasses, listStudentOptions } from "@/server/instructor-data";

export const metadata = { title: "Schedule" };

export default async function InstructorSchedulePage() {
  const user = await requireUser("instructor");
  const classes = await listClasses(user);
  const students = await listStudentOptions(user);
  const curriculum = await getCurriculum(user);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div>
        <PageHeader title="Schedule" description={`New classes use your time zone, ${user.timezone}. Students see the same moment in their own time zone.`} />
        <div className="space-y-3">
          {classes.map((row) => (
            <Card key={row.item.id} className="p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{formatWhen(row.item.startsAt, user.timezone)}</h2>
                <Badge>{row.item.status}</Badge>
              </div>
              <p className="mt-1">{row.student ? displayName(row.student) : "Student"} · {row.item.durationMinutes} minutes</p>
              <p>{row.item.description}</p>
              {row.item.meetingUrl ? <p>{row.item.meetingUrl}</p> : null}
              {row.privateNotes ? <p className="mt-2 text-muted">Private: {row.privateNotes}</p> : null}
              {row.item.status !== "cancelled" ? (
                <div className="mt-3">
                  <CancelClassButton classId={row.item.id} />
                </div>
              ) : null}
              <p className="sr-only">{utcToZonedInputValue(row.item.startsAt, user.timezone)}</p>
            </Card>
          ))}
        </div>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-3 font-bold">Schedule a class</h2>
        {students.length === 0 ? <p className="text-sm text-muted">Create a student first.</p> : (
          <ClassForm
            students={students.map((student) => ({ id: student.id, name: student.preferredName || student.fullName }))}
            lessons={curriculum.lessons.map((lesson) => ({ id: lesson.id, title: `${lesson.sessionNumber}. ${lesson.title}` }))}
          />
        )}
      </Card>
    </div>
  );
}
