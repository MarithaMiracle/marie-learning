"use client";

import { useState } from "react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

type Check = {
  id: string;
  question: string;
  format: string;
  options?: string[];
};

type Answer = {
  id: string;
  answer: string;
  explanation: string;
};

function formatLabel(format: string) {
  const key = format.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (key === "multiple_choice" || key === "multiplechoice") return "Multiple choice";
  if (key === "true_false" || key === "trueorfalse" || key === "true_or_false") return "True or false";
  if (key === "short_answer" || key === "shortanswer") return "Short answer";
  if (format === "Multiple choice" || format === "True or false" || format === "Short answer") return format;
  return format;
}

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function answersMatch(choice: string, answer: string, options: string[] = []) {
  const needle = normalize(answer);
  const picked = normalize(choice);
  if (picked === needle) return true;

  // Support keys stored as "B" / "b" or "B. option text".
  const letter = needle.match(/^([a-d])(?:[.)]\s*(.*))?$/i);
  if (letter) {
    const index = letter[1].toLowerCase().charCodeAt(0) - 97;
    const option = options[index];
    if (option && normalize(option) === picked) return true;
    if (letter[2] && normalize(letter[2]) === picked) return true;
  }
  return false;
}

export function KnowledgeChecks({
  checks,
  answers,
}: {
  checks: Check[];
  answers: Answer[];
}) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const answerById = Object.fromEntries(answers.map((item) => [item.id, item]));

  return (
    <ol className="mt-5 list-none space-y-4 p-0">
      {checks.map((check, index) => {
        const format = formatLabel(check.format);
        const lettered = format === "Multiple choice" || format === "True or false";
        const key = answerById[check.id];
        const choice = selected[check.id];
        const show = revealed[check.id];
        const correct = Boolean(choice && key && answersMatch(choice, key.answer, check.options));

        return (
          <li key={check.id} className="rounded-2xl border border-line bg-canvas/60 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-navy px-2 text-xs font-bold text-white">
                {index + 1}
              </span>
              <Badge tone="neutral">{format}</Badge>
            </div>
            <p className="mt-3 text-[15px] font-semibold leading-6 text-navy">{check.question}</p>

            {check.options?.length ? (
              <ul className="mt-3 space-y-2">
                {check.options.map((option, optionIndex) => {
                  const active = choice === option;
                  const isAnswer = Boolean(show && key && answersMatch(option, key.answer, check.options));
                  const isWrong = Boolean(show && active && !correct);
                  return (
                    <li key={option}>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full gap-3 rounded-xl border px-3 py-2.5 text-left text-sm leading-6 transition",
                          active && !show ? "border-primary bg-primary/10 text-navy" : "border-line bg-white text-ink",
                          isAnswer ? "border-emerald-500 bg-emerald-50 text-navy" : null,
                          isWrong ? "border-danger/40 bg-red-50 text-navy" : null,
                        )}
                        onClick={() => {
                          setSelected((current) => ({ ...current, [check.id]: option }));
                          setRevealed((current) => ({ ...current, [check.id]: false }));
                        }}
                      >
                        <span className="w-5 shrink-0 font-bold text-navy">
                          {lettered ? String.fromCharCode(65 + optionIndex) : "•"}
                        </span>
                        <span>{option}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 rounded-xl border border-dashed border-line bg-white px-3 py-3 text-sm leading-6 text-muted">
                This check is for discussion in class or your notes. Graded quizzes use multiple choice only.
              </p>
            )}

            {check.options?.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!choice}
                  onClick={() => setRevealed((current) => ({ ...current, [check.id]: true }))}
                >
                  Check answer
                </button>
                {show && key ? (
                  <p className={cn("text-sm font-semibold", correct ? "text-emerald-700" : "text-danger")}>
                    {correct ? "Correct" : "Not quite"}
                  </p>
                ) : null}
                {show && !key ? (
                  <p className="text-sm text-muted">Answer key is not available for this check yet.</p>
                ) : null}
              </div>
            ) : null}

            {show && key ? (
              <div className="mt-3 rounded-xl bg-white px-3 py-3 text-sm leading-6 text-slate-700">
                <p>
                  <span className="font-bold text-navy">Answer. </span>
                  {key.answer}
                </p>
                <p className="mt-1">{key.explanation}</p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
