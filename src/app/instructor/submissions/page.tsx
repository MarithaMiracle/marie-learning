import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { formatWhen } from "@/lib/time";
import { listSubmissions } from "@/server/instructor-data";

export const metadata = { title: "Submissions" };

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const user = await requireUser("instructor");
  const { status } = await searchParams;
  const rows = await listSubmissions(user, status);
  return (
    <div>
      <PageHeader title="Submissions" description="Review written answers, GitHub links, and uploaded files." />
      <div className="mb-4 flex flex-wrap gap-3 text-sm font-semibold">
        <Link href="/instructor/submissions">All</Link>
        <Link href="/instructor/submissions?status=submitted">Awaiting review</Link>
        <Link href="/instructor/submissions?status=revision_requested">Revisions</Link>
        <Link href="/instructor/submissions?status=accepted">Accepted</Link>
      </div>
      <div className="space-y-3">
        {rows.map((row) => (
          <Card key={row.submission.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <Link href={`/instructor/submissions/${row.submission.id}`} className="font-bold text-navy">
                {row.assignment?.title ?? "Assignment"}
              </Link>
              <p className="text-sm text-muted">{row.student?.fullName} · {formatWhen(row.submission.submittedAt, user.timezone)}</p>
            </div>
            <Badge tone={row.submission.status === "accepted" ? "success" : "warning"}>{row.submission.status.replaceAll("_", " ")}</Badge>
          </Card>
        ))}
        {rows.length === 0 ? <p className="text-sm text-muted">No submissions in this view.</p> : null}
      </div>
    </div>
  );
}
