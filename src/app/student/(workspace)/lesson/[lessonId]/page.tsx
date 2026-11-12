import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteLessonButton, NoteForm, TouchLesson } from "@/components/lesson-controls";
import { LessonPager, LessonToc, LessonView } from "@/components/lesson-view";
import { LockedContent } from "@/components/locked-content";
import { Badge, Card } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import type { OperatingSystem } from "@/lib/content-types";
import { isUuid } from "@/lib/ids";
import { getLessonDetail } from "@/server/student-data";

export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return { title: isUuid(lessonId) ? "Lesson" : "Lesson" };
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const user = await requireUser("student");
  const { lessonId } = await params;
  if (!isUuid(lessonId)) notFound();
  const data = await getLessonDetail(user, lessonId);
  if (!data) notFound();

  if (data.locked) {
    return (
      <div>
        <p className="text-sm font-semibold text-primary">
          <Link href={`/student/learning/${data.module.id}`}>Week {data.module.weekNumber}</Link>
          {" · "}Session {data.lesson.sessionNumber}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy">{data.lesson.title}</h1>
        <LockedContent
          title="This lesson is locked"
          reason={data.lockReason}
          actionHref={data.requiredLesson ? `/student/lesson/${data.requiredLesson.id}` : `/student/learning/${data.module.id}`}
          actionLabel={data.requiredLesson ? `Open ${data.requiredLesson.title}` : "Back to this week"}
        />
      </div>
    );
  }

  const content = data.lesson.studentContent;
  const completed = data.progress?.status === "completed";

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="no-print xl:sticky xl:top-24 xl:self-start">
        <LessonToc content={content} />
      </aside>
      <div>
        <TouchLesson lessonId={data.lesson.id} completed={completed} />
        <p className="text-sm font-semibold text-primary">
          <Link href={`/student/learning/${data.module.id}`}>Week {data.module.weekNumber}</Link>
          {" · "}Session {data.lesson.sessionNumber}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy">{data.lesson.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="primary">{data.lesson.difficulty}</Badge>
          <Badge>{data.lesson.estimatedMinutes} min</Badge>
          <Badge tone={completed ? "success" : "neutral"}>{completed ? "Finished" : data.progress ? "In progress" : "Not started"}</Badge>
        </div>
        <div className="mt-6">
          <LessonView
            content={content}
            operatingSystem={(data.operatingSystem as OperatingSystem | null) ?? "unknown"}
            knowledgeCheckAnswers={data.knowledgeCheckAnswers}
          />
        </div>
        <Card className="mt-6 p-6">
          <NoteForm lessonId={data.lesson.id} initial={data.note?.body ?? ""} />
        </Card>
        <div className="mt-6">
          <CompleteLessonButton lessonId={data.lesson.id} completed={completed} />
        </div>
        <LessonPager previous={data.previous} next={data.next} />
      </div>
    </div>
  );
}
