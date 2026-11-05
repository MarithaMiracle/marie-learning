import Link from "next/link";
import { CreateStudentForm } from "@/components/instructor-forms";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { percent } from "@/lib/utils";
import { listStudents } from "@/server/instructor-data";

export const metadata = { title: "Students" };

export default async function StudentsPage() {
  const user = await requireUser("instructor");
  const students = await listStudents(user);
  return (
    <div>
      <PageHeader title="Students" description="Create an account, then the student signs in and completes onboarding." />
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
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-bold">Add a student</h2>
          <CreateStudentForm />
        </Card>
      </div>
    </div>
  );
}
