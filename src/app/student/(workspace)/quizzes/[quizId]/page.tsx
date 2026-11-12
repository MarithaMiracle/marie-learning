import Link from "next/link";
import { notFound } from "next/navigation";
import { LockedContent } from "@/components/locked-content";
import { QuizTaker } from "@/components/quiz-taker";
import { Badge, Card, PageHeader, buttonClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { isUuid } from "@/lib/ids";
import { formatWhen } from "@/lib/time";
import { describeAnswer } from "@/lib/utils";
import { getStudentQuiz } from "@/server/student-data";

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ quizId: string }>;
  searchParams: Promise<{ take?: string }>;
}) {
  const user = await requireUser("student");
  const { quizId } = await params;
  const { take } = await searchParams;
  if (!isUuid(quizId)) notFound();
  const data = await getStudentQuiz(user, quizId);
  if (!data) notFound();

  if (data.locked) {
    return (
      <div>
        <PageHeader
          eyebrow={data.module ? `Week ${data.module.weekNumber}` : "Quiz"}
          title={data.quiz.title}
          description="This quiz unlocks after you finish the lessons for its week."
        />
        <LockedContent
          title="This quiz is locked"
          reason={data.lockReason}
          actionHref={data.module ? `/student/learning/${data.module.id}` : "/student/learning"}
          actionLabel={data.module ? "Open this week's lessons" : "Back to Learn"}
        />
      </div>
    );
  }

  const canTake = data.attempts.length === 0 || data.quiz.allowRetakes;
  const mcqQuestions = data.questions.filter(
    (question) => question.type === "multiple_choice" || question.type === "true_false" || question.type === "code_reading",
  );
  if (take === "1" && canTake) {
    return (
      <div>
        <PageHeader
          title={data.quiz.title}
          description="Multiple-choice quiz. Untimed — move back and forth before you submit. A refresh clears answers that have not been submitted."
        />
        <QuizTaker
          quizId={data.quiz.id}
          questions={mcqQuestions.map((question) => ({
            id: question.id,
            type: question.type as "multiple_choice" | "true_false" | "code_reading",
            prompt: question.prompt,
            codeSnippet: question.codeSnippet,
            options: question.options,
            points: question.points,
          }))}
        />
      </div>
    );
  }
  return (
    <div>
      <PageHeader
        eyebrow={data.module ? `Week ${data.module.weekNumber}` : "Quiz"}
        title={data.quiz.title}
        description={`Pass mark ${data.quiz.passingScore}%. ${data.quiz.allowRetakes ? "You can retake this quiz." : "Retakes are turned off."}`}
      />
      {canTake ? (
        <Link href={`/student/quizzes/${data.quiz.id}?take=1`} className={buttonClass()}>
          {data.attempts.length ? "Retake quiz" : "Start quiz"}
        </Link>
      ) : (
        <p className="text-sm text-muted">You have used your attempt.</p>
      )}
      <div className="mt-5 space-y-3">
        {data.attempts.map((attempt) => (
          <Card key={attempt.id} className="p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{formatWhen(attempt.submittedAt, user.timezone)}</p>
              <Badge tone={attempt.passed ? "success" : attempt.reviewStatus === "pending_review" ? "warning" : "neutral"}>
                {attempt.totalScore}/{attempt.maxScore}{" "}
                {attempt.passed ? "· passed" : attempt.reviewStatus === "pending_review" ? "· waiting for review" : ""}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
      {data.latest ? (
        <div className="mt-5 space-y-3">
          <h2 className="text-lg font-bold text-navy">Latest explanations</h2>
          {data.answers.map((answer) => {
            const question = data.questions.find((item) => item.id === answer.questionId);
            return (
              <Card key={answer.id} className="p-4 text-sm leading-6">
                <p className="font-semibold">{question?.prompt}</p>
                <p className="mt-1">Your answer: {describeAnswer(answer.response.value, question?.options)}</p>
                <p>{answer.pointsAwarded === null ? "Waiting for review" : answer.isCorrect ? "Correct" : "Not correct"}</p>
                <p className="mt-2">{answer.explanation}</p>
                {answer.instructorComment ? <p className="mt-2">Instructor: {answer.instructorComment}</p> : null}
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
