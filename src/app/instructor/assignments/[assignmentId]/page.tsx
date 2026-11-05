import { notFound } from "next/navigation";
import { AssignmentEditor } from "@/components/assignment-editor";
import { PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { getAssignmentEditor } from "@/server/instructor-data";

export const metadata = { title: "Edit assignment" };

export default async function EditAssignmentPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = await params;
  if (!isUuid(assignmentId)) notFound();
  const user = await requireUser("instructor");
  const data = await getAssignmentEditor(user, assignmentId);
  if (!data) notFound();
  return (
    <div>
      <PageHeader
        title={data.assignment.title}
        description="Edit the student brief, the rubric, and the private solution. Saving marks this assignment as customised so a later seed will not overwrite it."
      />
      <AssignmentEditor
        modules={data.moduleRows}
        assignment={{
          id: data.assignment.id,
          moduleId: data.assignment.moduleId,
          title: data.assignment.title,
          summary: data.assignment.summary,
          instructions: data.assignment.instructions,
          objectives: data.assignment.objectives,
          requirements: data.assignment.requirements,
          deliverables: data.assignment.deliverables,
          rubric: data.assignment.rubric,
          published: data.assignment.published,
          solution: data.solution?.solution ?? "",
          projectGuide: data.solution?.projectGuide ?? null,
        }}
      />
    </div>
  );
}
