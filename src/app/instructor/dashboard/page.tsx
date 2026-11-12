import Link from "next/link";
import { Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getInstructorDashboard } from "@/server/instructor-data";

export const metadata = { title: "Instructor dashboard" };

export default async function InstructorDashboardPage() {
  const user = await requireUser("instructor");
  const data = await getInstructorDashboard(user);
  const onboarded = data.students.filter((item) => item.student.onboardingCompleted).length;
  return (
    <div>
      <PageHeader title="Instructor dashboard" description="Review queues, student activity, and curriculum at a glance." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Students" value={String(data.students.length)} />
        <Stat label="Onboarding complete" value={`${onboarded}/${data.students.length}`} />
        <Stat label="Awaiting review" value={String(data.waiting.length)} />
        <Stat label="Published lessons" value={String(data.publishedLessons)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link className={buttonClass({ size: "sm" })} href="/instructor/students">Add or view students</Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/submissions?status=submitted">
          Review submissions
        </Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/announcements">
          Publish announcement
        </Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/curriculum">
          Open curriculum
        </Link>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold">Submissions awaiting review</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.waiting.slice(0, 6).map((item) => (
              <li key={item.submission.id}>
                <Link className="font-semibold text-primary" href={`/instructor/submissions/${item.submission.id}`}>
                  {item.assignment?.title ?? "Assignment"}
                </Link>
                <span className="text-muted"> · {item.student?.fullName ?? "Student"}</span>
              </li>
            ))}
            {data.waiting.length === 0 ? <li className="text-muted">None waiting.</li> : null}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-bold">Quiz attempts</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.pendingQuizReviews.slice(0, 6).map((item) => (
              <li key={item.attempt.id}>
                <Link
                  className="font-semibold text-primary"
                  href={`/instructor/quizzes/${item.attempt.quizId}?attempt=${item.attempt.id}`}
                >
                  {data.quizTitles.find((quiz) => quiz.id === item.attempt.quizId)?.title ?? "Quiz"}
                </Link>
                <span className="text-muted"> · {item.student?.fullName ?? "Student"} · needs review</span>
              </li>
            ))}
            {data.pendingQuizReviews.length === 0
              ? data.recentAttempts.slice(0, 6).map((item) => (
                  <li key={item.id}>
                    <Link className="font-semibold text-primary" href={`/instructor/quizzes/${item.quizId}?attempt=${item.id}`}>
                      {data.quizTitles.find((quiz) => quiz.id === item.quizId)?.title ?? "Quiz"}
                    </Link>
                    <span className="text-muted">
                      {" "}
                      · {item.totalScore}/{item.maxScore}
                    </span>
                  </li>
                ))
              : null}
            {data.pendingQuizReviews.length === 0 && data.recentAttempts.length === 0 ? (
              <li className="text-muted">No quiz attempts yet.</li>
            ) : null}
          </ul>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold">Students needing attention</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.attentionStudents.slice(0, 6).map((item) => (
              <li key={item.student.id}>
                <Link className="font-semibold text-primary" href={`/instructor/students/${item.student.id}`}>
                  {item.student.preferredName || item.student.fullName}
                </Link>
                <span className="text-muted"> · {item.reasons.join(" · ")}</span>
              </li>
            ))}
            {data.attentionStudents.length === 0 ? (
              <li className="text-muted">Everyone looks clear right now.</li>
            ) : null}
          </ul>
          {data.attentionStudents.length > 0 ? (
            <Link className="mt-3 inline-block text-sm font-semibold text-primary" href="/instructor/students?filter=pending">
              Open student roster
            </Link>
          ) : null}
        </Card>
        <Card className="p-5">
          <h2 className="font-bold">Recent lesson activity</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.recentProgress.map((item) => {
              const student = data.students.find((row) => row.student.id === item.studentId)?.student;
              return (
                <li key={item.id}>
                  {student ? (
                    <Link className="font-semibold text-primary" href={`/instructor/students/${student.id}`}>
                      {student.preferredName || student.fullName}
                    </Link>
                  ) : (
                    <span className="font-semibold">Student</span>
                  )}
                  <span className="text-muted">
                    {" "}
                    · {data.lessonTitles.find((lesson) => lesson.id === item.lessonId)?.title ?? "Lesson"} ·{" "}
                    {item.status.replaceAll("_", " ")}
                  </span>
                </li>
              );
            })}
            {data.recentProgress.length === 0 ? <li className="text-muted">No student activity yet.</li> : null}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-2xl font-bold text-navy">{value}</p>
    </Card>
  );
}
