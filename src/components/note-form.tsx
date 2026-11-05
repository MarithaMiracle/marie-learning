"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, TextArea, TextInput } from "@/components/ui";
import { saveGeneralNote } from "@/server/student-actions";

export function GeneralNoteForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        start(async () => {
          const result = await saveGeneralNote({ title, body });
          if (!result.ok) setError(result.error);
          else {
            setTitle("");
            setBody("");
            setError(null);
            router.refresh();
          }
        });
      }}
    >
      <Field label="Title">
        <TextInput value={title} onChange={(event) => setTitle(event.target.value)} />
      </Field>
      <Field label="Note">
        <TextArea value={body} onChange={(event) => setBody(event.target.value)} />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save note"}</Button>
    </form>
  );
}
