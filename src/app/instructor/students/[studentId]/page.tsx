import Link from "next/link";
import { notFound } from "next/navigation";
import { StudentAdminForms } from "@/components/instructor-forms";
import { Badge, Card, PageHeader, ProgressBar, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { labelFrom, codingLabels, computerLabels, osLabels, practiceLabels } from "@/lib/labels";
import { isUuid } from "@/lib/ids";
import { formatDay, formatWhen } from "@/lib/time";
import { percent } from "@/lib/utils";
import { getStudentRecord } from "@/server/instructor-data";

function statusLabel(value: string) {
  return value.replaceAll("_", " ");
}

export default async function StudentProfilePage({ params }: { params: Promise<{ studentId: string }> }) {
  const user = await requireUser("instructor");
  const { studentId } = await params;
  if (!isUuid(studentId)) notFound();
  const data = await getStudentRecord(user, studentId);
  if (!data) notFound();
  const profile = data.profile;
  const displayName = data.student.preferredName || data.student.fullName;
  const attention: string[] = [];
  if (!data.student.isActive) attention.push("Account is inactive");
  if (!data.student.onboardingCompleted) attention.push("Onboarding is not finished");
  if (data.awaitingSubmissions.length > 0) {
    attention.push(`${data.awaitingSubmissions.length} assignment${data.awaitingSubmissions.length === 1 ? "" : "s"} awaiting review`);
  }
  if (data.pendingQuizReviews.length > 0) {
    attention.push(`${data.pendingQuizReviews.length} quiz attempt${data.pendingQuizReviews.length === 1 ? "" : "s"} pending review`);
  }

  return (
    <div>
      <div className="mb-3">
        <Link href="/instructor/students" className={buttonClass({ size: "sm", variant: "ghost" })}>
          ← All students
        </Link>
      </div>
      <PageHeader title={displayName} description={data.student.email} />
      {attention.length > 0 ? (
        <Card className="mb-4 border-amber-200 bg-amber-50 p-4">
          <h2 className="font-bold text-navy">Needs your attention</h2>
          <ul className="mt-2 space-y-1 text-sm text-ink">
            {attention.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          {data.awaitingSubmissions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {data.awaitingSubmissions.slice(0, 3).map((item) => (
                <Link
                  key={item.submission.id}
                  href={`/instructor/submissions/${item.submission.id}`}
                  className={buttonClass({ size: "sm", variant: "secondary" })}
                >
                  Review {item.assignment?.title ?? "assignment"}
                </Link>
              ))}
            </div>
          ) : null}
        </Card>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <Card className="p-5 text-sm leading-7">
            <p>Full name: {data.student.fullName}</p>
            <p>Preferred name: {data.student.preferredName || "—"}</p>
            <p>Time zone: {data.student.timezone}</p>
            <p>Country: {profile?.country || "—"}</p>
            <p>
              Operating system: {labelFrom(osLabels, profile?.operatingSystem)} {profile?.osVersion || ""}
            </p>
            <p>Computer: {labelFrom(computerLabels, profile?.computerExperience)}</p>
            <p>Coding: {labelFrom(codingLabels, profile?.codingExperience)}</p>
            <p>Practice: {labelFrom(practiceLabels, profile?.weeklyPractice)}</p>
            <p>Goals: {profile?.learningGoals || "—"}</p>
            <p>
              Programme: {data.programme?.title || "Not enrolled"}
              {data.enrollment ? ` · ${statusLabel(data.enrollment.status)}` : ""}
            </p>
            <p>
              Account: {data.student.isActive ? "Active" : "Inactive"} ·{" "}
              {data.student.onboardingCompleted ? "Onboarding complete" : "Onboarding not finished"}
            </p>
            <p>
              Lessons: {data.completedLessons}/{data.totalLessons}
              {data.lastActivityAt ? ` · Last activity ${formatDay(data.lastActivityAt, user.timezone)}` : ""}
            </p>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Progress</h2>
            <div className="mt-3 space-y-3">
              {data.journey.map((item) => (
                <div key={item.module.id}>
                  <p className="text-sm font-semibold">
                    Week {item.module.weekNumber}: {item.module.title}
                  </p>
                  <ProgressBar value={percent(item.completed, item.total)} label={`${item.completed}/${item.total}`} />
                </div>
              ))}
              {data.journey.length === 0 ? <p className="text-sm text-muted">No weeks published yet.</p> : null}
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Assignments</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {data.submissions.map((item) => (
                <li key={item.submission.id}>
                  <Link className="font-semibold text-primary" href={`/instructor/submissions/${item.submission.id}`}>
                    {item.assignment?.title}
                  </Link>
                  {" "}
                  · {statusLabel(item.submission.status)}
                  {item.submission.score !== null ? ` · ${item.submission.score}` : ""}
                </li>
              ))}
              {data.submissions.length === 0 ? <li className="text-muted">No submissions.</li> : null}
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">Quizzes</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {data.attempts.map((item) => (
                <li key={item.attempt.id}>
                  <Link
                    className="font-semibold text-primary"
                    href={`/instructor/quizzes/${item.attempt.quizId}?attempt=${item.attempt.id}`}
                  >
                    {item.quiz?.title ?? "Quiz"}
                  </Link>
                  : {item.attempt.totalScore}/{item.attempt.maxScore}
                  {item.attempt.passed === true ? " · Passed" : item.attempt.passed === false ? " · Not passed" : ""}
                  {" · "}
                  {statusLabel(item.attempt.reviewStatus)}
                </li>
              ))}
              {data.attempts.length === 0 ? <li className="text-muted">No attempts.</li> : null}
            </ul>
          </Card>
        </div>
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-bold">Instructor tools</h2>
          <StudentAdminForms studentId={data.student.id} active={data.student.isActive} />
          <h3 className="mb-2 mt-6 font-bold">Private notes</h3>
          <ul className="space-y-2 text-sm">
            {data.notes.map((note) => (
              <li key={note.id} className="rounded-xl bg-slate-50 p-3">
                <p className="whitespace-pre-wrap">{note.body}</p>
                <p className="mt-2 text-xs text-muted">{formatWhen(note.createdAt, user.timezone)}</p>
              </li>
            ))}
            {data.notes.length === 0 ? <li className="text-muted">No private notes yet.</li> : null}
          </ul>
          {!data.student.isActive ? (
            <div className="mt-4">
              <Badge tone="danger">Inactive</Badge>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
