import Link from "next/link";
import { CreateStudentForm, InviteStudentForm, PendingInviteRow } from "@/components/instructor-forms";
import { Badge, Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatDay } from "@/lib/time";
import { cn } from "@/lib/utils";
import { listPendingInvites, listStudents } from "@/server/instructor-data";

export const metadata = { title: "Students" };

type Filter = "all" | "onboarding" | "inactive" | "pending";

function matchesFilter(
  item: Awaited<ReturnType<typeof listStudents>>[number],
  filter: Filter,
) {
  if (filter === "onboarding") return !item.student.onboardingCompleted;
  if (filter === "inactive") return !item.student.isActive;
  if (filter === "pending") return item.awaitingReview > 0;
  return true;
}

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const user = await requireUser("instructor");
  const { filter: rawFilter } = await searchParams;
  const filter: Filter =
    rawFilter === "onboarding" || rawFilter === "inactive" || rawFilter === "pending" ? rawFilter : "all";
  const [students, invites] = await Promise.all([listStudents(user), listPendingInvites(user)]);
  const visible = students.filter((item) => matchesFilter(item, filter));
  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: students.length },
    {
      key: "onboarding",
      label: "Needs onboarding",
      count: students.filter((item) => !item.student.onboardingCompleted).length,
    },
    {
      key: "pending",
      label: "Awaiting review",
      count: students.filter((item) => item.awaitingReview > 0).length,
    },
    {
      key: "inactive",
      label: "Inactive",
      count: students.filter((item) => !item.student.isActive).length,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Students"
        description="Invite a student to create their own account, or create one with a temporary password."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((item) => (
          <Link
            key={item.key}
            href={item.key === "all" ? "/instructor/students" : `/instructor/students?filter=${item.key}`}
            className={cn(buttonClass({ size: "sm", variant: filter === item.key ? "primary" : "secondary" }))}
          >
            {item.label} ({item.count})
          </Link>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {visible.map((item) => {
            const displayName = item.student.preferredName || item.student.fullName;
            return (
              <Card key={item.student.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <Link href={`/instructor/students/${item.student.id}`} className="font-bold text-navy">
                    {displayName}
                  </Link>
                  <p className="text-sm text-muted">{item.student.email}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.completed}/{item.total} lessons
                    {item.lastActivityAt
                      ? ` · Last activity ${formatDay(item.lastActivityAt, user.timezone)}`
                      : " · No activity yet"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.student.onboardingCompleted ? "success" : "warning"}>
                    {item.student.onboardingCompleted ? "Onboarded" : "Needs onboarding"}
                  </Badge>
                  {item.awaitingReview > 0 ? (
                    <Badge tone="warning">{item.awaitingReview} to review</Badge>
                  ) : null}
                  {!item.student.isActive ? <Badge tone="danger">Inactive</Badge> : null}
                </div>
              </Card>
            );
          })}
          {visible.length === 0 ? <p className="text-sm text-muted">No students in this view.</p> : null}
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
