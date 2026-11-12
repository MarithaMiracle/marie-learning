import Link from "next/link";
import { ModuleForm, MoveButtons, PublishModuleButton } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCurriculum } from "@/server/instructor-data";

export const metadata = { title: "Curriculum" };

export default async function CurriculumPage() {
  const user = await requireUser("instructor");
  const data = await getCurriculum(user);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div>
        <PageHeader
          title={data.programme?.title ?? "Curriculum"}
          description="Weeks, sessions, publish state, and completeness in one place. Open a session to edit the student lesson and instructor guide."
        />
        <div className="space-y-4">
          {data.modules.map((module) => {
            const moduleLessons = data.lessons.filter((lesson) => lesson.moduleId === module.id);
            return (
              <Card key={module.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-navy">
                        Week {module.weekNumber}: {module.title}
                      </h2>
                      <Badge tone={module.published ? "success" : "warning"}>
                        {module.published ? "Published" : "Unpublished"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted">{module.monthLabel}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <PublishModuleButton
                      id={module.id}
                      title={module.title}
                      description={module.description}
                      monthLabel={module.monthLabel}
                      weekNumber={module.weekNumber}
                      published={module.published}
                    />
                    <MoveButtons id={module.id} kind="module" />
                  </div>
                </div>
                <details className="mt-3 rounded-xl border border-line bg-canvas/50 p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-navy">Edit week details</summary>
                  <div className="mt-3">
                    <ModuleForm
                      module={{
                        id: module.id,
                        title: module.title,
                        description: module.description,
                        monthLabel: module.monthLabel,
                        weekNumber: module.weekNumber,
                        published: module.published,
                      }}
                    />
                  </div>
                </details>
                <ul className="mt-4 space-y-2 text-sm">
                  {moduleLessons.map((lesson) => (
                    <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
                      <Link href={`/instructor/lessons/${lesson.id}`} className="font-semibold text-primary">
                        Session {lesson.sessionNumber}: {lesson.title}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-muted">
                          {lesson.published ? "Published" : "Hidden"} ·{" "}
                          {lesson.completeness.complete
                            ? "Complete"
                            : `${lesson.completeness.score}% · ${lesson.completeness.missing[0] ?? "Missing pieces"}`}
                        </span>
                        <MoveButtons id={lesson.id} kind="lesson" />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-3 font-bold">New week</h2>
        <p className="mb-3 text-sm text-muted">Add a custom week. Edited weeks are kept when the course is seeded again.</p>
        <ModuleForm />
      </Card>
    </div>
  );
}
