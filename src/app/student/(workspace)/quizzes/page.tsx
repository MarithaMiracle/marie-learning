import Link from "next/link";
import { LockedBadge } from "@/components/locked-content";
import { Badge, Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { listStudentQuizzes } from "@/server/student-data";

export const metadata = { title: "Quizzes" };

export default async function QuizzesPage() {
  const user = await requireUser("student");
  const rows = await listStudentQuizzes(user);
  return (
    <div>
      <PageHeader
        title="Quizzes"
        description="One quiz for each week. A quiz unlocks after you finish that week's lessons. Objective questions are marked immediately. Short answers wait for your instructor."
      />
      <div className="space-y-3">
        {rows.map((row) => {
          const best = row.attempts.reduce(
            (max, attempt) => Math.max(max, attempt.maxScore ? Math.round((attempt.totalScore / attempt.maxScore) * 100) : 0),
            0,
          );
          const passed = row.attempts.some((attempt) => attempt.passed);
          return (
            <Card key={row.quiz.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="text-xs font-bold text-muted">{row.module ? `Week ${row.module.weekNumber}` : "Quiz"}</p>
                <h2 className="font-bold text-navy">{row.quiz.title}</h2>
                <p className="text-sm text-muted">
                  {row.locked
                    ? row.lockReason
                    : `${row.attempts.length} attempts · pass mark ${row.quiz.passingScore}%`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {row.locked ? (
                  <LockedBadge reason={row.lockReason} />
                ) : (
                  <>
                    {row.attempts.length > 0 ? (
                      <Badge tone={passed ? "success" : "warning"}>{passed ? "Passed" : `Best ${best}%`}</Badge>
                    ) : (
                      <Badge>Not started</Badge>
                    )}
                    <Link href={`/student/quizzes/${row.quiz.id}`} className={buttonClass({ size: "sm" })}>
                      Open
                    </Link>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
