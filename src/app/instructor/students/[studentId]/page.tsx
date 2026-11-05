import { notFound } from "next/navigation";
import { StudentAdminForms } from "@/components/instructor-forms";
import { Badge, Card, PageHeader, ProgressBar } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { labelFrom, codingLabels, computerLabels, osLabels, practiceLabels } from "@/lib/labels";
import { isUuid } from "@/lib/ids";
import { percent } from "@/lib/utils";
import { formatWhen } from "@/lib/time";
import { getStudentRecord } from "@/server/instructor-data";

export default async function StudentProfilePage({ params }: { params: Promise<{ studentId: string }> }) {
  const user = await requireUser("instructor");
  const { studentId } = await params;
  if (!isUuid(studentId)) notFound();
  const data = await getStudentRecord(user, studentId);
  if (!data) notFound();
  const profile = data.profile;
  return (
    <div>
      <PageHeader title={data.student.fullName} description={data.student.email} />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <Card className="p-5 text-sm leading-7">
            <p>Preferred name: {data.student.preferredName || "—"}</p>
            <p>Time zone: {data.student.timezone}</p>
            <p>Country: {profile?.country || "—"}</p>
            <p>Operating system: {labelFrom(osLabels, profile?.operatingSystem)} {profile?.osVersion || ""}</p>
            <p>Computer: {labelFrom(computerLabels, profile?.computerExperience)}</p>
            <p>Coding: {labelFrom(codingLabels, profile?.codingExperience)}</p>
            <p>Practice: {labelFrom(practiceLabels, profile?.weeklyPractice)}</p>
            <p>Goals: {profile?.learningGoals || "—"}</p>
            <p>Programme: {data.programme?.title || "Not enrolled"} · {data.enrollment?.status}</p>
            <p>Account: {data.student.isActive ? "Active" : "Inactive"} · {data.student.onboardingCompleted ? "Onboarding complete" : "Onboarding not finished"}</p>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Progress</h2>
            <div className="mt-3 space-y-3">
              {data.journey.map((item) => (
                <div key={item.module.id}>
                  <p className="text-sm font-semibold">Week {item.module.weekNumber}: {item.module.title}</p>
                  <ProgressBar value={percent(item.completed, item.total)} label={`${item.completed}/${item.total}`} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Assignments</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {data.submissions.map((item) => (
                <li key={item.submission.id}>
                  <a className="font-semibold text-primary" href={`/instructor/submissions/${item.submission.id}`}>{item.assignment?.title}</a>
                  {" "}· {item.submission.status} {item.submission.score !== null ? `· ${item.submission.score}` : ""}
                </li>
              ))}
              {data.submissions.length === 0 ? <li className="text-muted">No submissions.</li> : null}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Quizzes</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {data.attempts.map((item) => (
                <li key={item.attempt.id}>{item.quiz?.title}: {item.attempt.totalScore}/{item.attempt.maxScore} · {item.attempt.reviewStatus}</li>
              ))}
              {data.attempts.length === 0 ? <li className="text-muted">No attempts.</li> : null}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Classes</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {data.classes.map((item) => (
                <li key={item.id}>{formatWhen(item.startsAt, user.timezone)} · {item.status} {item.attendance ? `· ${item.attendance}` : ""}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Lesson homework</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {data.homework.map((item) => (
                <li key={item.item.id}>
                  <p className="font-semibold">{item.lesson?.title}</p>
                  <p className="whitespace-pre-wrap">{item.item.response}</p>
                </li>
              ))}
              {data.homework.length === 0 ? <li className="text-muted">No lesson practice submitted.</li> : null}
            </ul>
          </Card>
        </div>
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-bold">Instructor tools</h2>
          <StudentAdminForms studentId={data.student.id} active={data.student.isActive} />
          <h3 className="mb-2 mt-6 font-bold">Private notes</h3>
          <ul className="space-y-2 text-sm">
            {data.notes.map((note) => (
              <li key={note.id} className="rounded-xl bg-slate-50 p-3">{note.body}</li>
            ))}
          </ul>
          {!data.student.isActive ? <Badge tone="danger">Inactive</Badge> : null}
        </Card>
      </div>
    </div>
  );
}
