import Link from "next/link";
import { AssignmentEditor } from "@/components/assignment-editor";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { getCurriculum, listModuleOptions } from "@/server/instructor-data";
import { withActor } from "@/lib/db/client";
import { assignments } from "@/lib/db/schema";

export const metadata = { title: "Assignments" };

export default async function InstructorAssignmentsPage() {
  const user = await requireUser("instructor");
  const curriculum = await getCurriculum(user);
  const moduleOptions = await listModuleOptions(user);
  const rows = await withActor(user, async (tx) => tx.select().from(assignments));
  const modulesWithAssignment = new Set(rows.map((item) => item.moduleId));
  const freeModules = moduleOptions.filter((module) => !modulesWithAssignment.has(module.id));
  return (
    <div>
      <PageHeader
        title="Assignments"
        description="One assignment is seeded for each week. Prefer editing an existing week assignment. Students never see the instructor solution."
      />
      {freeModules.length > 0 ? (
        <details className="mb-6 rounded-2xl border border-line bg-white p-5">
          <summary className="cursor-pointer font-bold text-navy">New assignment for a week without one</summary>
          <p className="mt-2 text-sm text-muted">
            Only weeks that do not already have an assignment are listed. Most weeks already have a seeded assignment to edit.
          </p>
          <div className="mt-4">
            <AssignmentEditor
              modules={freeModules.map((module) => ({ id: module.id, title: `Week ${module.number}: ${module.title}` }))}
              assignment={{
                moduleId: freeModules[0]?.id ?? "",
                title: "",
                summary: "",
                instructions: "",
                objectives: [],
                requirements: [],
                deliverables: [],
                rubric: [{ criterion: "", points: 10, description: "" }],
                published: false,
                solution: "",
                projectGuide: null,
              }}
            />
          </div>
        </details>
      ) : null}
      <div className="space-y-3">
        {rows
          .sort(
            (a, b) =>
              (curriculum.modules.find((item) => item.id === a.moduleId)?.sortOrder ?? 0) -
              (curriculum.modules.find((item) => item.id === b.moduleId)?.sortOrder ?? 0),
          )
          .map((assignment) => {
            const courseModule = curriculum.modules.find((item) => item.id === assignment.moduleId);
            return (
              <Card key={assignment.id} className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-bold">{assignment.title}</h2>
                  <Badge tone={assignment.published ? "success" : "neutral"}>
                    {assignment.published ? "Published" : "Hidden"}
                  </Badge>
                </div>
                <p className="text-sm text-muted">
                  {courseModule ? `Week ${courseModule.weekNumber}` : "Module"} · {assignment.points} points
                </p>
                <p className="mt-2 text-sm leading-6">{assignment.summary}</p>
                <div className="mt-2 flex gap-4 text-sm font-semibold">
                  <Link href={`/instructor/assignments/${assignment.id}`} className="text-primary">
                    Edit assignment
                  </Link>
                  <Link href={`/instructor/submissions?assignment=${assignment.id}`} className="text-primary">
                    Review submissions
                  </Link>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
