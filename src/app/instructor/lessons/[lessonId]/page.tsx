import { notFound } from "next/navigation";
import { GuideView } from "@/components/guide-view";
import { LessonEditor } from "@/components/lesson-editor";
import { LessonView } from "@/components/lesson-view";
import { Badge, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { getLessonEditor } from "@/server/instructor-data";

export default async function InstructorLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const user = await requireUser("instructor");
  const { lessonId } = await params;
  if (!isUuid(lessonId)) notFound();
  const data = await getLessonEditor(user, lessonId);
  if (!data) notFound();
  return (
    <div>
      <PageHeader
        eyebrow={data.module ? `Week ${data.module.weekNumber}` : "Lesson"}
        title={data.lesson.title}
        description={data.lesson.completeness.complete ? "This lesson meets the content checklist." : `Still missing: ${data.lesson.completeness.missing.join(", ")}`}
      />
      <div className="mb-4 flex gap-2">
        <Badge tone={data.lesson.published ? "success" : "warning"}>{data.lesson.published ? "Published" : "Unpublished"}</Badge>
        <Badge>{data.lesson.difficulty}</Badge>
      </div>
      {data.guide ? (
        <section className="mb-8 rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-3 text-lg font-bold">Edit lesson</h2>
          <LessonEditor
            lessonId={data.lesson.id}
            moduleId={data.lesson.moduleId}
            title={data.lesson.title}
            estimatedMinutes={data.lesson.estimatedMinutes}
            difficulty={data.lesson.difficulty}
            published={data.lesson.published}
            content={data.lesson.studentContent}
            guide={data.guide.content}
          />
        </section>
      ) : null}
      <div className="grid gap-8">
        <section>
          <h2 className="mb-3 text-lg font-bold">Student view</h2>
          <LessonView content={data.lesson.studentContent} stackedOs />
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold">Instructor session guide</h2>
          {data.guide ? <GuideView guide={data.guide.content} /> : <p className="text-sm text-muted">No session guide is stored for this lesson.</p>}
        </section>
      </div>
    </div>
  );
}
