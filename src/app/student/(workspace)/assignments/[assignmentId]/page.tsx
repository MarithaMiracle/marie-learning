import Link from "next/link";
import { notFound } from "next/navigation";
import { AssignmentForm } from "@/components/assignment-form";
import { LockedContent } from "@/components/locked-content";
import { Badge, Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { formatWhen } from "@/lib/time";
import { getStudentAssignment } from "@/server/student-data";

export default async function AssignmentDetailPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const user = await requireUser("student");
  const { assignmentId } = await params;
  if (!isUuid(assignmentId)) notFound();
  const data = await getStudentAssignment(user, assignmentId);
  if (!data) notFound();

  if (data.locked) {
    return (
      <div>
        <PageHeader
          eyebrow={data.module ? `Week ${data.module.weekNumber}` : "Assignment"}
          title={data.assignment.title}
          description={data.assignment.summary}
        />
        <LockedContent
          title="This assignment is locked"
          reason={data.lockReason}
          actionHref={data.module ? `/student/learning/${data.module.id}` : "/student/learning"}
          actionLabel={data.module ? "Open this week's lessons" : "Back to Learn"}
        />
      </div>
    );
  }

  const { assignment, submission, feedback } = data;
  return (
    <div>
      <PageHeader eyebrow={data.module ? `Week ${data.module.weekNumber}` : "Assignment"} title={assignment.title} description={assignment.summary} />
      {submission ? <Badge tone={submission.status === "accepted" ? "success" : "warning"}>{submission.status.replaceAll("_", " ")}</Badge> : <Badge>Not submitted</Badge>}
      <Card className="mt-4 p-5">
        <h2 className="font-bold text-navy">What to do</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-7">{assignment.instructions}</p>
        <h3 className="mt-4 font-bold">Objectives</h3>
        <ul className="mt-2 list-disc pl-5 text-sm leading-6">{assignment.objectives.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3 className="mt-4 font-bold">Requirements</h3>
        <ul className="mt-2 list-disc pl-5 text-sm leading-6">{assignment.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3 className="mt-4 font-bold">Submit</h3>
        <ul className="mt-2 list-disc pl-5 text-sm leading-6">{assignment.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3 className="mt-4 font-bold">How it will be marked · {assignment.points} points</h3>
        <ul className="mt-2 space-y-2 text-sm leading-6">
          {assignment.rubric.map((item) => (
            <li key={item.criterion}>
              <span className="font-semibold">
                {item.criterion} ({item.points})
              </span>{" "}
              — {item.description}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="mt-4 p-5">
        <h2 className="font-bold text-navy">Your submission</h2>
        {submission?.fileName ? (
          <p className="mt-2 text-sm">
            Current file:{" "}
            <Link className="font-semibold text-primary" href={`/api/submissions/${submission.id}/file`}>
              {submission.fileName}
            </Link>
          </p>
        ) : null}
        <div className="mt-4">
          <AssignmentForm
            assignmentId={assignment.id}
            written={submission?.writtenResponse ?? ""}
            github={submission?.githubUrl ?? ""}
            locked={submission?.status === "accepted"}
          />
        </div>
      </Card>
      <Card className="mt-4 p-5">
        <h2 className="font-bold text-navy">Feedback</h2>
        {submission?.score !== null && submission?.score !== undefined ? (
          <p className="mt-2 text-sm font-semibold">
            Score: {submission.score} / {assignment.points}
          </p>
        ) : null}
        <ul className="mt-3 space-y-3">
          {feedback.map((item) => (
            <li key={item.id} className="text-sm leading-6">
              <p className="text-xs text-muted">
                {formatWhen(item.createdAt, user.timezone)} · {item.statusAfter.replaceAll("_", " ")}
              </p>
              <p>{item.body}</p>
            </li>
          ))}
          {feedback.length === 0 ? <li className="text-sm text-muted">No feedback yet.</li> : null}
        </ul>
      </Card>
    </div>
  );
}
