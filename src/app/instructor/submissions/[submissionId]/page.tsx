import Link from "next/link";
import { notFound } from "next/navigation";
import { ReviewForm } from "@/components/instructor-forms";
import { Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { formatWhen } from "@/lib/time";
import { getSubmissionReview } from "@/server/instructor-data";

export default async function SubmissionPage({ params }: { params: Promise<{ submissionId: string }> }) {
  const user = await requireUser("instructor");
  const { submissionId } = await params;
  if (!isUuid(submissionId)) notFound();
  const data = await getSubmissionReview(user, submissionId);
  if (!data || !data.assignment) notFound();
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <PageHeader title={data.assignment.title} description={data.student?.fullName ?? "Student"} />
        <Card className="p-5 text-sm leading-7">
          <p className="whitespace-pre-wrap">{data.submission.writtenResponse || "No written answer."}</p>
          {data.submission.githubUrl ? <p className="mt-3"><a className="font-semibold text-primary" href={data.submission.githubUrl}>GitHub link</a></p> : null}
          {data.submission.fileName ? <p className="mt-2"><Link className="font-semibold text-primary" href={`/api/submissions/${data.submission.id}/file`}>Download {data.submission.fileName}</Link></p> : null}
          <p className="mt-3 text-muted">Submitted {formatWhen(data.submission.submittedAt, user.timezone)} · {data.submission.status}</p>
        </Card>
        <Card className="mt-4 p-5">
          <h2 className="mb-3 font-bold">Review</h2>
          <ReviewForm submissionId={data.submission.id} points={data.assignment.points} />
          <ul className="mt-4 space-y-2 text-sm">
            {data.feedback.map((item) => (
              <li key={item.id}><span className="font-semibold">{item.statusAfter}</span> · {item.body}</li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="p-5 text-sm leading-6">
        <h2 className="font-bold">Instructor reference</h2>
        <p className="mt-2 whitespace-pre-wrap">{data.solution?.solution || "No reference solution stored."}</p>
        <h3 className="mt-4 font-bold">Rubric · {data.assignment.points} points</h3>
        <ul className="mt-2 list-disc pl-5">
          {data.assignment.rubric.map((item) => (
            <li key={item.criterion}>{item.criterion} ({item.points}): {item.description}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
