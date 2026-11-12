import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizMetaForm, QuizQuestionForm } from "@/components/instructor-forms";
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
  const autoQuestions = data.questions.filter((item) => item.question.type !== "short_answer");
  return (
    <div>
      <PageHeader
        title={data.quiz.title}
        description={`Pass mark ${data.quiz.passingScore}%. Retakes ${data.quiz.allowRetakes ? "are allowed" : "are off"}. Quizzes are auto-marked multiple choice.`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold">Quiz settings</h2>
          <div className="mt-3">
            <QuizMetaForm quiz={data.quiz} />
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-bold">Add question</h2>
          <p className="mt-1 text-sm text-muted">Only multiple choice, true/false, and code reading.</p>
          <div className="mt-3">
            <QuizQuestionForm quizId={quizId} />
          </div>
        </Card>
      </div>
      <Card className="mt-4 p-5">
        <h2 className="font-bold">Answer key</h2>
        <ul className="mt-3 space-y-3 text-sm leading-6">
          {autoQuestions.map((item, index) => (
            <li key={item.question.id}>
              <p className="font-semibold">
                {index + 1}. [{item.question.type.replaceAll("_", " ")}] {item.question.prompt}
              </p>
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
              {" "}
              · {item.attempt.totalScore}/{item.attempt.maxScore} · {item.attempt.reviewStatus.replaceAll("_", " ")}
            </li>
          ))}
          {data.attempts.length === 0 ? <li className="text-muted">No attempts yet.</li> : null}
        </ul>
      </Card>
      {review ? (
        <Card className="mt-4 p-5">
          <h2 className="font-bold">Review {review.student?.fullName}</h2>
          <ul className="mt-3 space-y-4 text-sm">
            {review.answers
              .filter((answer) => {
                const question = review.questions.find((item) => item.id === answer.questionId);
                return question?.type !== "short_answer";
              })
              .map((answer) => {
                const question = review.questions.find((item) => item.id === answer.questionId);
                return (
                  <li key={answer.id}>
                    <p className="font-semibold">{question?.prompt}</p>
                    <p>Response: {describeAnswer(answer.response.value, question?.options)}</p>
                    <p>
                      {answer.pointsAwarded === null ? "Not marked" : `${answer.pointsAwarded}/${answer.maxPoints}`}
                      {answer.isCorrect === true ? " · Correct" : answer.isCorrect === false ? " · Incorrect" : ""}
                    </p>
                  </li>
                );
              })}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
