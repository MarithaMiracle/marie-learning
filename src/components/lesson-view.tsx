import Link from "next/link";
import { Markdown } from "@/components/markdown-view";
import { OsInstructions } from "@/components/os-tabs";
import { CopyButton } from "@/components/copy-button";
import { Badge, Card } from "@/components/ui";
import type { LessonContent, OperatingSystem } from "@/lib/content-types";

export function LessonView({
  content,
  operatingSystem,
  stackedOs = false,
}: {
  content: LessonContent;
  operatingSystem?: OperatingSystem | null;
  stackedOs?: boolean;
}) {
  return (
    <article className="space-y-6">
      <Card className="p-6 sm:p-8" id="overview">
        <h2 className="text-xl font-bold text-navy">Lesson overview</h2>
        <div className="lesson-prose">
          <p>{content.overview.about}</p>
          <h3>Why this matters</h3>
          <p>{content.overview.why}</p>
          <h3>Before you rely on this lesson</h3>
          <p>{content.overview.alreadyKnow}</p>
        </div>
      </Card>

      <Card className="p-6 sm:p-8" id="objectives">
        <h2 className="text-xl font-bold text-navy">Learning objectives</h2>
        <p className="mt-2 text-sm text-muted">By the end of this lesson, you should be able to:</p>
        <ul className="mt-4 space-y-2">
          {content.objectives.map((objective) => (
            <li key={objective} className="flex gap-3 text-[15px] leading-6">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {objective}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6 sm:p-8" id="prerequisites">
        <h2 className="text-xl font-bold text-navy">Prerequisite knowledge</h2>
        <ul className="mt-4 space-y-2 text-[15px] leading-6">
          {content.prerequisites.map((item) => (
            <li key={item.label}>
              {item.lessonSlug ? (
                <span>
                  {item.label}{" "}
                  <span className="text-muted">Look back at the earlier lesson “{item.lessonSlug.replaceAll("-", " ")}” if this feels unfamiliar.</span>
                </span>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </Card>

      {content.teachingNotes.map((section) => (
        <Card key={section.heading} id={anchor(section.heading)} className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-navy">{section.heading}</h2>
          <div className="mt-2">
            <Markdown source={section.markdown} />
          </div>
        </Card>
      ))}

      <Card className="p-6 sm:p-8" id="vocabulary">
        <h2 className="text-xl font-bold text-navy">Vocabulary</h2>
        <dl className="mt-4 space-y-4">
          {content.vocabulary.map((item) => (
            <div key={item.term}>
              <dt className="font-bold text-ink">{item.term}</dt>
              <dd className="mt-1 text-[15px] leading-6 text-slate-700">{item.definition}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {content.demonstrations.map((demo, index) => (
        <Card key={demo.title} id={index === 0 ? "demonstration" : anchor(demo.title)} className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-navy">{index === 0 ? "Step-by-step demonstration" : demo.title}</h2>
          {index > 0 ? null : <h3 className="mt-4 text-lg font-bold">{demo.title}</h3>}
          <p className="mt-3 text-[15px] leading-7 text-slate-700">{demo.intro}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-7">
            {demo.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <OsInstructions guide={demo.os} preferred={operatingSystem} stacked={stackedOs} />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Note title="What you should see" body={demo.expected} />
            <Note title="How to verify it" body={demo.verify} />
            <Note title="If it does not work" body={demo.ifItFails} />
          </div>
        </Card>
      ))}

      <Card className="p-6 sm:p-8" id="examples">
        <h2 className="text-xl font-bold text-navy">Code examples</h2>
        <div className="mt-4 space-y-6">
          {content.codeExamples.map((example) => (
            <section key={`${example.filename}-${example.title}`}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-navy">{example.title}</h3>
                <Badge>{example.level}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">File: {example.filename}</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-line bg-navy">
                <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300">
                  <span>
                    {example.filename} · {example.language}
                  </span>
                  <CopyButton text={example.code} light />
                </div>
                <pre className="overflow-x-auto px-4 pb-4 text-sm leading-6 text-slate-50">
                  <code>{example.code}</code>
                </pre>
              </div>
              <p className="mt-3 text-[15px] leading-7 text-slate-700">{example.explanation}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {example.lineNotes.map((note) => (
                  <li key={note.focus}>
                    <span className="font-bold">{note.focus}: </span>
                    {note.note}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-6">
                <span className="font-bold">Expected output. </span>
                {example.expectedOutput}
              </p>
            </section>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-8" id="exercises">
        <h2 className="text-xl font-bold text-navy">Practical exercises</h2>
        <div className="mt-4 space-y-5">
          {content.exercises.map((exercise) => (
            <section key={exercise.title}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-navy">{exercise.title}</h3>
                <Badge tone="primary">{exercise.difficulty}</Badge>
              </div>
              <p className="mt-2 text-[15px] leading-7">{exercise.prompt}</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
                {exercise.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="mt-2 text-sm leading-6 text-muted">
                <span className="font-bold text-ink">Expected outcome. </span>
                {exercise.expectedOutcome}
              </p>
            </section>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-8" id="troubleshooting">
        <h2 className="text-xl font-bold text-navy">Common errors and troubleshooting</h2>
        <div className="mt-4 space-y-4">
          {content.troubleshooting.map((item) => (
            <section key={item.problem}>
              <h3 className="font-bold text-navy">{item.problem}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">{item.why}</p>
              <p className="mt-1 text-sm leading-6">
                <span className="font-bold">What to do. </span>
                {item.solution}
              </p>
            </section>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-8" id="checks">
        <h2 className="text-xl font-bold text-navy">Knowledge checks</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Use these in class or on paper. They are not scored here. The graded quiz is separate, and your instructor has the answer key.
        </p>
        <ol className="mt-5 list-none space-y-4 p-0">
          {content.knowledgeChecks.map((check, index) => {
            const format = formatLabel(check.format);
            const lettered = format === "Multiple choice" || format === "True or false";
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
                    {check.options.map((option, optionIndex) => (
                      <li
                        key={option}
                        className="flex gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-sm leading-6 text-ink"
                      >
                        <span className="w-5 shrink-0 font-bold text-navy">
                          {lettered ? String.fromCharCode(65 + optionIndex) : "•"}
                        </span>
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 rounded-xl border border-dashed border-line bg-white px-3 py-3 text-sm leading-6 text-muted">
                    Write a short answer in your notes. Do not submit it on this page.
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </Card>

      <Card className="p-6 sm:p-8" id="summary">
        <h2 className="text-xl font-bold text-navy">Lesson summary</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7">
          {content.summary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl bg-primary/10 p-4">
          <h3 className="font-bold text-navy">Next lesson: {content.nextLesson.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-700">{content.nextLesson.why}</p>
        </div>
      </Card>
    </article>
  );
}

export function LessonToc({ content }: { content: LessonContent }) {
  const items = [
    ["overview", "Overview"],
    ["objectives", "Objectives"],
    ["prerequisites", "Prerequisites"],
    ...content.teachingNotes.map((section) => [anchor(section.heading), section.heading] as [string, string]),
    ["vocabulary", "Vocabulary"],
    ["demonstration", "Demonstration"],
    ["examples", "Examples"],
    ["exercises", "Exercises"],
    ["troubleshooting", "Troubleshooting"],
    ["checks", "Knowledge checks"],
    ["homework", "Homework"],
    ["summary", "Summary"],
  ];
  return (
    <nav aria-label="On this lesson" className="no-print space-y-1 text-sm">
      {items.map(([id, label]) => (
        <a key={id} href={`#${id}`} className="block rounded-lg px-2 py-1.5 text-slate-600 hover:bg-slate-50 hover:text-ink">
          {label}
        </a>
      ))}
    </nav>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-sm font-bold text-navy">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{body}</p>
    </div>
  );
}

function formatLabel(format: string) {
  const key = format.trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (key === "multiple_choice" || key === "multiplechoice") return "Multiple choice";
  if (key === "true_false" || key === "trueorfalse" || key === "true_or_false") return "True or false";
  if (key === "short_answer" || key === "shortanswer") return "Short answer";
  if (format === "Multiple choice" || format === "True or false" || format === "Short answer") return format;
  return format;
}

function anchor(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function LessonPager({
  previous,
  next,
}: {
  previous: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}) {
  return (
    <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm font-semibold">
      {previous ? (
        <Link href={`/student/lesson/${previous.id}`} className="text-primary">
          Previous: {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/student/lesson/${next.id}`} className="text-primary">
          Next: {next.title}
        </Link>
      ) : null}
    </div>
  );
}
