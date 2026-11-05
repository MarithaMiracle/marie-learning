import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { listQuizzesAdmin } from "@/server/instructor-data";

export const metadata = { title: "Quizzes" };

export default async function InstructorQuizzesPage() {
  const user = await requireUser("instructor");
  const rows = await listQuizzesAdmin(user);
  return (
    <div>
      <PageHeader title="Quizzes" description="Open a quiz to see attempts and mark short answers. Correct answers stay on the instructor side until a student submits." />
      <div className="space-y-3">
        {rows.map((row) => (
          <Card key={row.quiz.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <Link href={`/instructor/quizzes/${row.quiz.id}`} className="font-bold text-navy">{row.quiz.title}</Link>
              <p className="text-sm text-muted">{row.module ? `Week ${row.module.weekNumber}` : "Quiz"} · {row.attempts} attempts · pass {row.quiz.passingScore}%</p>
            </div>
            <div className="flex gap-2">
              {row.pending > 0 ? <Badge tone="warning">{row.pending} to review</Badge> : null}
              <Badge tone={row.quiz.published ? "success" : "neutral"}>{row.quiz.published ? "Published" : "Hidden"}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
