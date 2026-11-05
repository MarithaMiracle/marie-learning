"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import { describeAnswer } from "@/lib/utils";
import { submitQuiz, type QuizSubmitResult } from "@/server/student-actions";

type Question = {
  id: string;
  type: "multiple_choice" | "true_false" | "short_answer" | "code_reading";
  prompt: string;
  codeSnippet: string | null;
  options: { id: string; text: string }[] | null;
  points: number;
};

type Result = QuizSubmitResult;

export function QuizTaker({ quizId, questions }: { quizId: string; questions: Question[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [review, setReview] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const question = questions[index];

  if (result) {
    return (
      <div className="space-y-4">
        <Card className="p-5">
          <h2 className="text-xl font-bold text-navy">
            Score so far: {result.totalScore} / {result.maxScore}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {result.reviewStatus === "pending_review"
              ? "Some written answers are waiting for your instructor. The pass mark is not final until those are reviewed."
              : result.passed
                ? `You reached the ${result.passingScore}% pass mark.`
                : `The pass mark is ${result.passingScore}%. You can retake this quiz if retakes are allowed.`}
          </p>
        </Card>
        {result.questions.map((item, number) => (
          <Card key={item.questionId} className="p-5">
            <p className="text-sm font-semibold text-muted">Question {number + 1}</p>
            <p className="mt-1 font-semibold">{item.prompt}</p>
            <p className="mt-2 text-sm">Your answer: {describeAnswer(item.response, questions.find((question) => question.id === item.questionId)?.options)}</p>
            <p className="mt-1 text-sm font-semibold">
              {item.pending ? "Waiting for review" : item.isCorrect ? "Correct" : "Not correct"} · {item.pointsAwarded ?? 0}/{item.maxPoints}
            </p>
            <p className="mt-2 text-sm leading-6">{item.explanation}</p>
          </Card>
        ))}
        <Button type="button" variant="secondary" onClick={() => router.refresh()}>
          Back to quiz summary
        </Button>
      </div>
    );
  }

  if (review) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-navy">Review your answers</h2>
        <ul className="space-y-2 text-sm">
          {questions.map((item, number) => (
            <li key={item.id}>
              <button type="button" className="text-left font-semibold text-primary" onClick={() => { setReview(false); setIndex(number); }}>
                {number + 1}. {item.prompt}
              </button>
              <p className="text-muted">{describeAnswer(answers[item.id], item.options)}</p>
            </li>
          ))}
        </ul>
        {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
        <Button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              const payload = questions.map((item) => ({ questionId: item.id, value: answers[item.id] ?? "" }));
              const response = await submitQuiz(quizId, payload);
              if (!response.ok) setError(response.error);
              else if (response.data) setResult(response.data);
            })
          }
        >
          {pending ? "Submitting" : "Submit quiz"}
        </Button>
      </div>
    );
  }

  if (!question) return null;
  return (
    <Card className="p-5">
      <p className="text-sm font-semibold text-muted">
        Question {index + 1} of {questions.length} · {question.points} {question.points === 1 ? "point" : "points"}
      </p>
      <h2 className="mt-2 text-lg font-bold text-navy">{question.prompt}</h2>
      {question.codeSnippet ? (
        <pre className="mt-3 overflow-x-auto rounded-xl bg-navy p-4 text-sm text-slate-50">
          <code>{question.codeSnippet}</code>
        </pre>
      ) : null}
      <div className="mt-4 space-y-2">
        {question.type === "true_false" ? (
          ["true", "false"].map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={question.id}
                checked={answers[question.id] === value}
                onChange={() => setAnswers((current) => ({ ...current, [question.id]: value }))}
              />
              {value === "true" ? "True" : "False"}
            </label>
          ))
        ) : question.type === "short_answer" ? (
          <textarea
            className="min-h-28 w-full rounded-xl border border-line px-3 py-2.5"
            value={answers[question.id] ?? ""}
            onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
          />
        ) : (
          (question.options ?? []).map((option) => (
            <label key={option.id} className="flex items-start gap-2 text-sm leading-6">
              <input
                type="radio"
                name={question.id}
                className="mt-1"
                checked={answers[question.id] === option.id}
                onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
              />
              {option.text}
            </label>
          ))
        )}
      </div>
      <div className="mt-5 flex gap-2">
        <Button type="button" variant="secondary" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>
          Back
        </Button>
        {index < questions.length - 1 ? (
          <Button type="button" onClick={() => setIndex((value) => value + 1)}>
            Next
          </Button>
        ) : (
          <Button type="button" onClick={() => setReview(true)}>
            Review before submitting
          </Button>
        )}
      </div>
    </Card>
  );
}
