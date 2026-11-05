import Link from "next/link";
import { LockedBadge } from "@/components/locked-content";
import { Badge, Card, EmptyState, PageHeader, ProgressBar } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { percent } from "@/lib/utils";
import { getLearningCatalogue } from "@/server/student-data";

export const metadata = { title: "Learn" };

export default async function LearningPage() {
  const user = await requireUser("student");
  const modules = await getLearningCatalogue(user);
  return (
    <div>
      <PageHeader
        title="Learn"
        description="Work through the weeks in order. Later lessons stay locked until you finish the ones before them."
      />
      {modules.length === 0 ? (
        <EmptyState title="Lessons are not published yet" body="When your instructor publishes the programme, the 16 weeks will appear here." />
      ) : (
        <div className="space-y-4">
          {modules.map((item) => (
            <Card key={item.module.id} className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">{item.module.monthLabel}</p>
              <h2 className="mt-1 text-xl font-bold text-navy">
                <Link href={`/student/learning/${item.module.id}`}>
                  Week {item.module.weekNumber}: {item.module.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.module.description}</p>
              <div className="mt-3">
                <ProgressBar value={percent(item.completed, item.total)} label={`${item.completed} of ${item.total} lessons finished`} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.lessons.map((lesson) =>
                  lesson.locked ? (
                    <span key={lesson.id} className="inline-flex items-center gap-2">
                      <Badge>Session {lesson.sessionNumber}</Badge>
                      <LockedBadge reason={lesson.lockReason} />
                    </span>
                  ) : (
                    <Link key={lesson.id} href={`/student/lesson/${lesson.id}`}>
                      <Badge>Session {lesson.sessionNumber}</Badge>
                    </Link>
                  ),
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
