import Link from "next/link";
import { CreateStudentForm, InviteStudentForm, PendingInviteRow } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { percent } from "@/lib/utils";
import { listPendingInvites, listStudents } from "@/server/instructor-data";

export const metadata = { title: "Students" };

export default async function StudentsPage() {
  const user = await requireUser("instructor");
  const [students, invites] = await Promise.all([listStudents(user), listPendingInvites(user)]);
  return (
    <div>
      <PageHeader title="Students" description="Invite a student to create their own account, or create one with a temporary password." />
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {students.map((item) => (
            <Card key={item.student.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <Link href={`/instructor/students/${item.student.id}`} className="font-bold text-navy">
                  {item.student.preferredName || item.student.fullName}
                </Link>
                <p className="text-sm text-muted">{item.student.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={item.student.onboardingCompleted ? "success" : "warning"}>
                  {item.student.onboardingCompleted ? "Onboarded" : "Needs onboarding"}
                </Badge>
                <Badge>{percent(item.completed, item.total)}%</Badge>
                {!item.student.isActive ? <Badge tone="danger">Inactive</Badge> : null}
              </div>
            </Card>
          ))}
          {students.length === 0 ? <p className="text-sm text-muted">No students yet.</p> : null}
        </div>
        <div className="space-y-4">
          <Card className="h-fit p-5">
            <h2 className="mb-3 font-bold">Invite a student</h2>
            <InviteStudentForm />
          </Card>
          {invites.length > 0 ? (
            <Card className="h-fit p-5">
              <h2 className="mb-2 font-bold">Pending invites</h2>
              <div>
                {invites.map((invite) => (
                  <PendingInviteRow key={invite.id} inviteId={invite.id} email={invite.email} />
                ))}
              </div>
            </Card>
          ) : null}
          <Card className="h-fit p-5">
            <h2 className="mb-3 font-bold">Add a student</h2>
            <CreateStudentForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
