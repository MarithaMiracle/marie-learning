import Link from "next/link";
import { Badge, Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { formatWhen } from "@/lib/time";
import { isUuid } from "@/lib/ids";
import { listSubmissions } from "@/server/instructor-data";

export const metadata = { title: "Submissions" };

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; assignment?: string }>;
}) {
  const user = await requireUser("instructor");
  const { status, assignment } = await searchParams;
  const assignmentId = assignment && isUuid(assignment) ? assignment : undefined;
  const activeStatus = status || "all";
  const rows = await listSubmissions(user, activeStatus === "all" ? undefined : activeStatus, assignmentId);
  const filters = [
    { href: assignmentId ? `/instructor/submissions?assignment=${assignmentId}` : "/instructor/submissions", label: "All", key: "all" },
    {
      href: `/instructor/submissions?status=submitted${assignmentId ? `&assignment=${assignmentId}` : ""}`,
      label: "Awaiting review",
      key: "submitted",
    },
    {
      href: `/instructor/submissions?status=revision_requested${assignmentId ? `&assignment=${assignmentId}` : ""}`,
      label: "Revisions",
      key: "revision_requested",
    },
    {
      href: `/instructor/submissions?status=accepted${assignmentId ? `&assignment=${assignmentId}` : ""}`,
      label: "Accepted",
      key: "accepted",
    },
  ];
  return (
    <div>
      <PageHeader title="Submissions" description="Review written answers, GitHub links, and uploaded files." />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.key}
            href={filter.href}
            className={cn(
              buttonClass({ size: "sm", variant: activeStatus === filter.key ? "primary" : "secondary" }),
            )}
          >
            {filter.label}
          </Link>
        ))}
        {assignmentId ? (
          <Link href="/instructor/submissions" className={buttonClass({ size: "sm", variant: "ghost" })}>
            Clear assignment filter
          </Link>
        ) : null}
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <Card key={row.submission.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <Link href={`/instructor/submissions/${row.submission.id}`} className="font-bold text-navy">
                {row.assignment?.title ?? "Assignment"}
              </Link>
              <p className="text-sm text-muted">
                {row.student?.fullName} · {formatWhen(row.submission.submittedAt, user.timezone)}
              </p>
            </div>
            <Badge tone={row.submission.status === "accepted" ? "success" : "warning"}>
              {row.submission.status.replaceAll("_", " ")}
            </Badge>
          </Card>
        ))}
        {rows.length === 0 ? <p className="text-sm text-muted">No submissions in this view.</p> : null}
      </div>
    </div>
  );
}
