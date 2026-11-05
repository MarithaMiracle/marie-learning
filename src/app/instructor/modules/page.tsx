import { ModuleForm, MoveButtons } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCurriculum } from "@/server/instructor-data";

export const metadata = { title: "Modules" };

export default async function ModulesPage() {
  const user = await requireUser("instructor");
  const data = await getCurriculum(user);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div>
        <PageHeader title="Modules" description="Reorder weeks or add a module of your own. Edited modules are kept when the course is seeded again." />
        <div className="space-y-3">
          {data.modules.map((module) => (
            <Card key={module.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <h2 className="font-bold">{module.title}</h2>
                <p className="text-sm text-muted">Week {module.weekNumber} · {module.monthLabel}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={module.published ? "success" : "neutral"}>{module.published ? "Published" : "Hidden"}</Badge>
                <MoveButtons id={module.id} kind="module" />
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-3 font-bold">New module</h2>
        <ModuleForm />
      </Card>
    </div>
  );
}
