"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, TextArea, TextInput } from "@/components/ui";
import { submitAssignment } from "@/server/student-actions";

export function AssignmentForm({
  assignmentId,
  written,
  github,
  locked,
}: {
  assignmentId: string;
  written: string;
  github: string;
  locked: boolean;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  if (locked) return <p className="text-sm text-muted">This submission has been accepted. It stays as it is.</p>;
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await submitAssignment(data);
          if (!result.ok) setError(result.error);
          else {
            setError(null);
            router.refresh();
          }
        });
      }}
    >
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <Field label="Written answer" hint="Explain what you did in your own words. Paste code if the assignment asks for it.">
        <TextArea name="written" defaultValue={written} />
      </Field>
      <Field label="GitHub link" hint="Optional. Use https://github.com/your-name/your-project.">
        <TextInput name="github" defaultValue={github} placeholder="https://github.com/" />
      </Field>
      <Field label="File" hint="Optional. Up to 2 MB. txt, md, pdf, png, jpg, zip, json, html, css, or js.">
        <TextInput name="file" type="file" />
      </Field>
      {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting" : "Submit assignment"}
      </Button>
    </form>
  );
}
