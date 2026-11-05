import Link from "next/link";
import { notFound } from "next/navigation";
import { ShortAnswerReview } from "@/components/instructor-forms";
import { Card, PageHeader } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { getAttemptReview, getQuizAdmin } from "@/server/instructor-data";
import { describeAnswer, describeKey } from "@/lib/utils";

export default async function InstructorQuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{ attempt?: string }>;
}) {
  const user = await requireUser("instructor");
  const { quizId } = await params;
  const { attempt } = await searchParams;
  if (!isUuid(quizId)) notFound();
  const data = await getQuizAdmin(user, quizId);
  if (!data) notFound();
  const review = attempt && isUuid(attempt) ? await getAttemptReview(user, attempt) : null;
  return (
    <div>
      <PageHeader title={data.quiz.title} description={`Pass mark ${data.quiz.passingScore}%. Retakes ${data.quiz.allowRetakes ? "are allowed" : "are off"}.`} />
      <Card className="p-5">
        <h2 className="font-bold">Answer key</h2>
        <ul className="mt-3 space-y-3 text-sm leading-6">
          {data.questions.map((item, index) => (
            <li key={item.question.id}>
              <p className="font-semibold">{index + 1}. {item.question.prompt}</p>
              <p>Answer: {describeKey(item.key?.correctAnswer, item.question.options)}</p>
              <p>{item.key?.explanation}</p>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="mt-4 p-5">
        <h2 className="font-bold">Attempts</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {data.attempts.map((item) => (
            <li key={item.attempt.id}>
              <Link className="font-semibold text-primary" href={`/instructor/quizzes/${quizId}?attempt=${item.attempt.id}`}>
                {item.student?.fullName ?? "Student"}
              </Link>
              {" "}· {item.attempt.totalScore}/{item.attempt.maxScore} · {item.attempt.reviewStatus}
            </li>
          ))}
        </ul>
      </Card>
      {review ? (
        <Card className="mt-4 p-5">
          <h2 className="font-bold">Review {review.student?.fullName}</h2>
          <ul className="mt-3 space-y-4 text-sm">
            {review.answers.map((answer) => {
              const question = review.questions.find((item) => item.id === answer.questionId);
              return (
                <li key={answer.id}>
                  <p className="font-semibold">{question?.prompt}</p>
                  <p>Response: {describeAnswer(answer.response.value, question?.options)}</p>
                  <p>{answer.pointsAwarded === null ? "Not marked" : `${answer.pointsAwarded}/${answer.maxPoints}`}</p>
                  {question?.type === "short_answer" ? <ShortAnswerReview answerId={answer.id} max={answer.maxPoints} /> : null}
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
