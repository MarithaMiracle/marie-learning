import Link from "next/link";
import { Card, PageHeader, ProgressBar } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { percent } from "@/lib/utils";
import { lessonStatus } from "@/lib/progress";
import { getProgressReport } from "@/server/student-data";

export const metadata = { title: "Progress" };

export default async function ProgressPage() {
  const user = await requireUser("student");
  const report = await getProgressReport(user);
  const lessons = report.catalogue.flatMap((item) => item.lessons);
  const completed = report.catalogue.reduce((sum, item) => sum + item.completed, 0);
  const accepted = report.submissions.filter((item) => item.status === "accepted").length;
  return (
    <div>
      <PageHeader
        title="Progress"
        description="These figures come from your lessons, submissions, and quizzes. Nothing here is estimated."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Lessons finished" value={`${completed}/${lessons.length}`} />
        <Stat label="Assignments accepted" value={String(accepted)} />
        <Stat label="Quiz attempts" value={String(report.attempts.length)} />
        <Stat label="Quizzes passed" value={String(report.passed)} />
      </div>
      <div className="mt-6 space-y-4">
        {report.catalogue.map((item) => (
          <Card key={item.module.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold text-navy">
                Week {item.module.weekNumber}: {item.module.title}
              </h2>
              <span className="text-sm text-muted">
                {item.completed}/{item.total}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar value={percent(item.completed, item.total)} />
            </div>
            <ul className="mt-3 space-y-1 text-sm">
              {item.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link href={`/student/lesson/${lesson.id}`} className="font-semibold text-primary">
                    {lesson.title}
                  </Link>
                  <span className="text-muted"> · {lessonStatus(lesson.id, item.progress).replaceAll("_", " ")}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-navy">{value}</p>
    </Card>
  );
}
