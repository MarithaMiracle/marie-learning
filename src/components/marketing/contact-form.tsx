"use client";

import { useState, useTransition } from "react";
import { Button, Field, TextArea, TextInput } from "@/components/ui";
import { submitContactMessage } from "@/server/instructor-actions";

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-canvas p-6 text-center">
        <h3 className="text-lg font-bold text-navy">Message sent</h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          Thanks for getting in touch. Your instructor will reply to the email you gave.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        start(async () => {
          const result = await submitContactMessage({
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
            company: String(data.get("company") ?? ""),
          });
          if (!result.ok) {
            setError(result.error);
          } else {
            setError(null);
            setSent(true);
            form.reset();
          }
        });
      }}
    >
      <Field label="Your name">
        <TextInput name="name" required maxLength={120} autoComplete="name" />
      </Field>
      <Field label="Email">
        <TextInput name="email" type="email" required autoComplete="email" />
      </Field>
      <Field label="Message" hint="Tell us what you would like to know about the programme.">
        <TextArea name="message" required minLength={5} maxLength={4000} />
      </Field>
      <div className="hidden" aria-hidden>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
