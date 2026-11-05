import Link from "next/link";
import { MoveButtons } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCurriculum } from "@/server/instructor-data";

export const metadata = { title: "Lessons" };

export default async function LessonsPage() {
  const user = await requireUser("instructor");
  const data = await getCurriculum(user);
  return (
    <div>
      <PageHeader title="Lessons" description="Open a lesson to read the student text and the instructor session guide." />
      <div className="space-y-3">
        {data.lessons.map((lesson) => {
          const courseModule = data.modules.find((item) => item.id === lesson.moduleId);
          return (
            <Card key={lesson.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="text-xs text-muted">{courseModule ? `Week ${courseModule.weekNumber}` : "Module"}</p>
                <Link href={`/instructor/lessons/${lesson.id}`} className="font-bold text-navy">
                  {lesson.sessionNumber}. {lesson.title}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={lesson.completeness.complete ? "success" : "warning"}>
                  {lesson.completeness.complete ? "Complete" : "Incomplete"}
                </Badge>
                <MoveButtons id={lesson.id} kind="lesson" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
