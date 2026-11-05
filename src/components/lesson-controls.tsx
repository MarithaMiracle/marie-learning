"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, fieldClass } from "@/components/ui";
import { saveLessonHomework, saveLessonNote, setLessonProgress } from "@/server/student-actions";

export function TouchLesson({ lessonId, completed }: { lessonId: string; completed: boolean }) {
  useEffect(() => {
    if (!completed) void setLessonProgress(lessonId, "in_progress");
  }, [lessonId, completed]);
  return null;
}

export function CompleteLessonButton({ lessonId, completed }: { lessonId: string; completed: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <Button
        type="button"
        variant={completed ? "secondary" : "primary"}
        disabled={pending}
        onClick={() =>
          start(async () => {
            const result = await setLessonProgress(lessonId, completed ? "in_progress" : "completed", completed);
            if (!result.ok) setError(result.error);
            else {
              setError(null);
              router.refresh();
            }
          })
        }
      >
        {completed ? "Mark as still in progress" : "I have finished this lesson"}
      </Button>
      {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}

export function NoteForm({ lessonId, initial }: { lessonId: string; initial: string }) {
  const [body, setBody] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveLessonNote(lessonId, body);
          setMessage(result.ok ? "Notes saved. Only you can see them." : result.error);
        });
      }}
    >
      <label className="block text-sm font-semibold" htmlFor="lesson-note">
        Your private notes
      </label>
      <textarea id="lesson-note" className={fieldClass} value={body} onChange={(event) => setBody(event.target.value)} />
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Saving" : "Save notes"}
      </Button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}

export function HomeworkForm({ lessonId, initial }: { lessonId: string; initial: string }) {
  const [body, setBody] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveLessonHomework(lessonId, body);
          setMessage(result.ok ? "Practice submitted. Your instructor can read it." : result.error);
        });
      }}
    >
      <label className="block text-sm font-semibold" htmlFor="homework-response">
        Your answer
      </label>
      <textarea id="homework-response" className={fieldClass} value={body} onChange={(event) => setBody(event.target.value)} />
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting" : "Submit practice"}
      </Button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}
