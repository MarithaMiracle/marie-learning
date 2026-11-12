import Link from "next/link";
import { notFound } from "next/navigation";
import { LockedBadge } from "@/components/locked-content";
import { Badge, Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { lessonStatus } from "@/lib/progress";
import { getModuleDetail } from "@/server/student-data";

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const user = await requireUser("student");
  const { moduleId } = await params;
  if (!isUuid(moduleId)) notFound();
  const data = await getModuleDetail(user, moduleId);
  if (!data) notFound();
  return (
    <div>
      <PageHeader eyebrow={`Week ${data.module.weekNumber}`} title={data.module.title} description={data.module.description} />
      <div className="space-y-3">
        {data.lessons.map((lesson) => {
          const status = lessonStatus(lesson.id, data.progress);
          return (
            <Card key={lesson.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="text-xs font-bold text-muted">Session {lesson.sessionNumber}</p>
                <h2 className="text-lg font-bold text-navy">{lesson.title}</h2>
                <p className="text-sm text-muted">
                  {lesson.estimatedMinutes} minutes · {lesson.difficulty}
                  {lesson.locked && lesson.lockReason ? ` · ${lesson.lockReason}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {lesson.locked ? (
                  <LockedBadge reason={lesson.lockReason} />
                ) : (
                  <>
                    <Badge tone={status === "completed" ? "success" : status === "in_progress" ? "warning" : "neutral"}>
                      {status === "completed" ? "Finished" : status === "in_progress" ? "In progress" : "Not started"}
                    </Badge>
                    <Link href={`/student/lesson/${lesson.id}`} className={buttonClass({ size: "sm" })}>
                      Open
                    </Link>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <p className="mt-5 text-sm leading-6 text-muted">
        Week assignments and quizzes are in the Assignments and Quizzes sections once you finish this week&apos;s lessons.
      </p>
    </div>
  );
}
