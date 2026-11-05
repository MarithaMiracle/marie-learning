import Link from "next/link";
import { Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatWhen } from "@/lib/time";
import { getInstructorDashboard } from "@/server/instructor-data";

export const metadata = { title: "Instructor dashboard" };

export default async function InstructorDashboardPage() {
  const user = await requireUser("instructor");
  const data = await getInstructorDashboard(user);
  const onboarded = data.students.filter((item) => item.student.onboardingCompleted).length;
  return (
    <div>
      <PageHeader title="Instructor dashboard" description="A live view of students, lessons, submissions, and classes." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Students" value={String(data.students.length)} />
        <Stat label="Onboarding complete" value={`${onboarded}/${data.students.length}`} />
        <Stat label="Modules" value={String(data.moduleCount)} />
        <Stat label="Published lessons" value={String(data.publishedLessons)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link className={buttonClass({ size: "sm" })} href="/instructor/students">Add or view students</Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/submissions">Review submissions</Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/schedule">Schedule a class</Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/announcements">Publish announcement</Link>
        <Link className={buttonClass({ size: "sm", variant: "secondary" })} href="/instructor/curriculum">Manage curriculum</Link>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold">Submissions awaiting review</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.waiting.slice(0, 6).map((item) => (
              <li key={item.id}>
                <Link className="font-semibold text-primary" href={`/instructor/submissions/${item.id}`}>Open submission</Link>
              </li>
            ))}
            {data.waiting.length === 0 ? <li className="text-muted">None waiting.</li> : null}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-bold">Upcoming classes</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.upcoming.map((item) => (
              <li key={item.id}>{formatWhen(item.startsAt, user.timezone)} · {item.description || "Class"}</li>
            ))}
            {data.upcoming.length === 0 ? <li className="text-muted">No upcoming classes.</li> : null}
          </ul>
        </Card>
      </div>
      <Card className="mt-4 p-5">
        <h2 className="font-bold">Recent activity</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {data.recentProgress.map((item) => (
            <li key={item.id}>
              Lesson {item.status.replaceAll("_", " ")} · {data.lessonTitles.find((lesson) => lesson.id === item.lessonId)?.title ?? "Lesson"}
            </li>
          ))}
          {data.recentAttempts.map((item) => (
            <li key={item.id}>Quiz submitted · {data.quizTitles.find((quiz) => quiz.id === item.quizId)?.title ?? "Quiz"} · {item.totalScore}/{item.maxScore}</li>
          ))}
          {data.recentProgress.length + data.recentAttempts.length === 0 ? <li className="text-muted">No student activity yet.</li> : null}
        </ul>
      </Card>
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
