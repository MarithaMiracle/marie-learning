"use client";

import { useState, useTransition } from "react";
import { Button, Field, TextArea, TextInput } from "@/components/ui";
import type { InstructorGuide, LessonContent } from "@/lib/content-types";
import { saveLesson } from "@/server/instructor-actions";

export function LessonEditor({
  lessonId,
  moduleId,
  title,
  estimatedMinutes,
  difficulty,
  published,
  content,
  guide,
}: {
  lessonId: string;
  moduleId: string;
  title: string;
  estimatedMinutes: number;
  difficulty: string;
  published: boolean;
  content: LessonContent;
  guide: InstructorGuide;
}) {
  const [state, setState] = useState({ title, published, content, guide });
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function updateNote(index: number, markdown: string) {
    setState((current) => ({
      ...current,
      content: {
        ...current.content,
        teachingNotes: current.content.teachingNotes.map((section, sectionIndex) =>
          sectionIndex === index ? { ...section, markdown } : section,
        ),
      },
    }));
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveLesson({
            id: lessonId,
            moduleId,
            title: state.title,
            estimatedMinutes,
            difficulty,
            published: state.published,
            content: state.content,
            guide: state.guide,
          });
          setMessage(result.ok ? "Lesson saved. Students see it only while it is published." : result.error);
        });
      }}
    >
      <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-muted">
        Quick edits: title, publish state, overview, teaching-note markdown, and guide recap. Full session guide sections stay in the printed guide view.
      </p>
      <Field label="Title">
        <TextInput value={state.title} onChange={(event) => setState((current) => ({ ...current, title: event.target.value }))} />
      </Field>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={state.published}
          onChange={(event) => setState((current) => ({ ...current, published: event.target.checked }))}
        />
        Published for students
      </label>
      <Field label="What the lesson is about">
        <TextArea
          value={state.content.overview.about}
          onChange={(event) =>
            setState((current) => ({ ...current, content: { ...current.content, overview: { ...current.content.overview, about: event.target.value } } }))
          }
        />
      </Field>
      <Field label="Why it matters">
        <TextArea
          value={state.content.overview.why}
          onChange={(event) =>
            setState((current) => ({ ...current, content: { ...current.content, overview: { ...current.content.overview, why: event.target.value } } }))
          }
        />
      </Field>
      {state.content.teachingNotes.map((section, index) => (
        <Field key={`${section.heading}-${index}`} label={section.heading}>
          <TextArea className="min-h-40 font-mono text-sm" value={section.markdown} onChange={(event) => updateNote(index, event.target.value)} />
        </Field>
      ))}
      <Field label="Session guide recap">
        <TextArea
          value={state.guide.recap}
          onChange={(event) => setState((current) => ({ ...current, guide: { ...current.guide, recap: event.target.value } }))}
        />
      </Field>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save lesson"}</Button>
    </form>
  );
}
