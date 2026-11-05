import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteLessonButton, HomeworkForm, NoteForm, TouchLesson } from "@/components/lesson-controls";
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
          <LessonView content={content} operatingSystem={(data.operatingSystem as OperatingSystem | null) ?? "unknown"} />
        </div>
        <Card className="mt-6 p-6" id="homework">
          <h2 className="text-xl font-bold text-navy">Homework</h2>
          <p className="mt-3 text-[15px] leading-7">{content.homework.description}</p>
          <h3 className="mt-4 font-bold">Requirements</h3>
          <ul className="mt-2 list-disc pl-5 text-sm leading-6">
            {content.homework.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mt-4 font-bold">Deliverables</h3>
          <ul className="mt-2 list-disc pl-5 text-sm leading-6">
            {content.homework.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6">
            <span className="font-bold">How to submit. </span>
            {content.homework.submission}
          </p>
          <h3 className="mt-4 font-bold">How it will be judged</h3>
          <ul className="mt-2 list-disc pl-5 text-sm leading-6">
            {content.homework.criteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {content.homework.submissionKind === "module_assignment" && data.assignment ? (
            data.assignment.locked ? (
              <p className="mt-4 text-sm text-muted">
                Week assignment: {data.assignment.title}. {data.assignment.lockReason}
              </p>
            ) : (
              <Link href={`/student/assignments/${data.assignment.id}`} className="mt-4 inline-block font-semibold text-primary">
                Open the week assignment: {data.assignment.title}
              </Link>
            )
          ) : (
            <div className="mt-4">
              <HomeworkForm lessonId={data.lesson.id} initial={data.homework?.response ?? ""} />
            </div>
          )}
        </Card>
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
