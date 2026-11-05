import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCurriculum } from "@/server/instructor-data";

export const metadata = { title: "Curriculum" };

export default async function CurriculumPage() {
  const user = await requireUser("instructor");
  const data = await getCurriculum(user);
  return (
    <div>
      <PageHeader
        title={data.programme?.title ?? "Curriculum"}
        description="The seeded programme has 16 weeks and 32 sessions. Completeness shows whether a lesson still has the required teaching material."
      />
      <div className="space-y-4">
        {data.modules.map((module) => (
          <Card key={module.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-navy">Week {module.weekNumber}: {module.title}</h2>
              <Badge tone={module.published ? "success" : "warning"}>{module.published ? "Published" : "Unpublished"}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{module.monthLabel}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {data.lessons.filter((lesson) => lesson.moduleId === module.id).map((lesson) => (
                <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-2">
                  <Link href={`/instructor/lessons/${lesson.id}`} className="font-semibold text-primary">
                    Session {lesson.sessionNumber}: {lesson.title}
                  </Link>
                  <span className="text-muted">
                    {lesson.published ? "Published" : "Hidden"} · {lesson.completeness.complete ? "Complete" : `${lesson.completeness.score}% · ${lesson.completeness.missing[0] ?? "Missing pieces"}`}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
