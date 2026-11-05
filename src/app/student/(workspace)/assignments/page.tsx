import { AssignmentList } from "@/components/assignment-list";
import { PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { listStudentAssignments } from "@/server/student-data";

export const metadata = { title: "Assignments" };

export default async function AssignmentsPage() {
  const user = await requireUser("student");
  const rows = await listStudentAssignments(user);
  return (
    <div>
      <PageHeader
        title="Assignments"
        description="Each week has one assignment. It unlocks after you finish that week's lessons. You can update it until your instructor accepts it."
      />
      <AssignmentList
        rows={rows.map((row) => ({
          id: row.assignment.id,
          title: row.assignment.title,
          summary: row.assignment.summary,
          week: row.module ? `Week ${row.module.weekNumber}` : "Module",
          status: row.submission?.status ?? "not_submitted",
          locked: row.locked,
          lockReason: row.lockReason,
        }))}
      />
    </div>
  );
}
