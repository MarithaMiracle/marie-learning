"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/password-input";
import { Button, Badge, Card, Field, SelectInput, TextArea, TextInput } from "@/components/ui";
import { commonTimeZones } from "@/lib/time";
import {
  addInstructorNote,
  createStudentAccount,
  deleteAnnouncement,
  deleteContactMessage,
  deleteResource,
  inviteStudent,
  moveLesson,
  moveModule,
  reviewSubmission,
  revokeStudentInvite,
  saveAnnouncement,
  saveModule,
  saveQuizMeta,
  saveQuizQuestion,
  saveResource,
  setContactMessageHandled,
  setStudentActive,
  setStudentPassword,
  updateInstructorSettings,
} from "@/server/instructor-actions";

export function CreateStudentForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await createStudentAccount({
            fullName: String(data.get("fullName") ?? ""),
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
          });
          if (!result.ok) setError(result.error);
          else {
            setError(null);
            setDone(true);
            router.refresh();
          }
        });
      }}
    >
      <Field label="Full name"><TextInput name="fullName" required /></Field>
      <Field label="Email"><TextInput name="email" type="email" required /></Field>
      <Field label="Temporary password" hint="Share this with the student. They can change it in Settings.">
        <PasswordInput name="password" required minLength={8} autoComplete="new-password" />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {done ? <p className="text-sm text-success">Student account created and enrolled.</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Creating" : "Create student"}</Button>
    </form>
  );
}

export function InviteStudentForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = String(new FormData(form).get("email") ?? "");
        start(async () => {
          const result = await inviteStudent({ email });
          if (!result.ok) {
            setError(result.error);
            setInviteUrl(null);
          } else {
            setError(null);
            setCopied(false);
            setInviteUrl(result.data?.inviteUrl ?? null);
            form.reset();
            router.refresh();
          }
        });
      }}
    >
      <Field label="Student email" hint="Send the link to this address yourself. No email is sent for you yet.">
        <TextInput name="email" type="email" required />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Creating invite" : "Create invite link"}</Button>
      {inviteUrl ? (
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-sm font-semibold text-ink">Share this link with the student</p>
          <p className="mt-1 break-all text-xs text-muted">{inviteUrl}</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(inviteUrl);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Copied" : "Copy link"}
          </Button>
          <p className="mt-2 text-xs text-muted">The link expires in 7 days and can be used once.</p>
        </div>
      ) : null}
    </form>
  );
}

export function PendingInviteRow({ inviteId, email }: { inviteId: string; email: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-2 first:border-t-0">
      <p className="min-w-0 flex-1 truncate text-sm text-muted">{email}</p>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await revokeStudentInvite(inviteId);
            router.refresh();
          })
        }
      >
        {pending ? "Revoking" : "Revoke"}
      </Button>
    </div>
  );
}

export function ContactMessageRow({
  id,
  name,
  email,
  message,
  handled,
  created,
}: {
  id: string;
  name: string;
  email: string;
  message: string;
  handled: boolean;
  created: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold text-navy">{name}</p>
          <a href={`mailto:${email}`} className="text-sm text-primary hover:underline">
            {email}
          </a>
          <p className="mt-0.5 text-xs text-muted">{created}</p>
        </div>
        {handled ? <Badge tone="success">Handled</Badge> : <Badge tone="warning">New</Badge>}
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink">{message}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await setContactMessageHandled(id, !handled);
              router.refresh();
            })
          }
        >
          {handled ? "Mark as new" : "Mark as handled"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await deleteContactMessage(id);
              router.refresh();
            })
          }
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export function StudentAdminForms({ studentId, active }: { studentId: string; active: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="space-y-4">
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          const password = String(new FormData(event.currentTarget).get("password") ?? "");
          start(async () => {
            const result = await setStudentPassword(studentId, password);
            setMessage(result.ok ? "Password updated. Tell the student the new password." : result.error);
          });
        }}
      >
        <Field label="Set a new password">
          <PasswordInput name="password" minLength={8} required autoComplete="new-password" />
        </Field>
        <Button type="submit" variant="secondary" disabled={pending}>Update password</Button>
      </form>
      <Button
        type="button"
        variant={active ? "danger" : "primary"}
        onClick={() =>
          start(async () => {
            const result = await setStudentActive(studentId, !active);
            setMessage(result.ok ? (active ? "Student deactivated." : "Student activated.") : result.error);
            if (result.ok) router.refresh();
          })
        }
      >
        {active ? "Deactivate account" : "Activate account"}
      </Button>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          const body = String(new FormData(event.currentTarget).get("body") ?? "");
          start(async () => {
            const result = await addInstructorNote(studentId, body);
            setMessage(result.ok ? "Private note saved." : result.error);
            if (result.ok) router.refresh();
          });
        }}
      >
        <Field label="Private instructor note" hint="Students cannot see this."><TextArea name="body" /></Field>
        <Button type="submit" variant="secondary">Save note</Button>
      </form>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}

export function MoveButtons({ id, kind }: { id: string; kind: "module" | "lesson" }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  function move(direction: "up" | "down") {
    start(async () => {
      if (kind === "module") await moveModule(id, direction);
      else await moveLesson(id, direction);
      router.refresh();
    });
  }
  return (
    <div className="flex gap-2">
      <Button type="button" size="sm" variant="secondary" disabled={pending} onClick={() => move("up")}>Up</Button>
      <Button type="button" size="sm" variant="secondary" disabled={pending} onClick={() => move("down")}>Down</Button>
    </div>
  );
}

export function ReviewForm({ submissionId, points }: { submissionId: string; points: number }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await reviewSubmission({
            submissionId,
            score: Number(data.get("score") ?? 0),
            feedback: String(data.get("feedback") ?? ""),
            decision: String(data.get("decision")) === "accepted" ? "accepted" : "revision_requested",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label={`Score out of ${points}`}><TextInput name="score" type="number" min={0} max={points} defaultValue={0} /></Field>
      <Field label="Feedback"><TextArea name="feedback" required /></Field>
      <Field label="Decision">
        <SelectInput name="decision" defaultValue="accepted">
          <option value="accepted">Accept</option>
          <option value="revision_requested">Request revision</option>
        </SelectInput>
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save review"}</Button>
    </form>
  );
}

export function AnnouncementForm({
  announcement,
}: {
  announcement?: { id: string; title: string; body: string; published: boolean };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const editing = Boolean(announcement?.id);
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await saveAnnouncement({
            id: announcement?.id,
            title: String(data.get("title") ?? ""),
            body: String(data.get("body") ?? ""),
            published: data.get("published") === "on",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Title"><TextInput name="title" required defaultValue={announcement?.title} /></Field>
      <Field label="Message"><TextArea name="body" required defaultValue={announcement?.body} /></Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={announcement?.published ?? true} /> Publish to students
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : editing ? "Update announcement" : "Save announcement"}</Button>
    </form>
  );
}

export function DeleteAnnouncementButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await deleteAnnouncement(id);
          router.refresh();
        })
      }
    >
      {pending ? "Deleting" : "Delete"}
    </Button>
  );
}

export function ResourceForm({
  categories,
  resource,
}: {
  categories: string[];
  resource?: { id: string; category: string; title: string; url: string; description: string; published: boolean };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const editing = Boolean(resource?.id);
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await saveResource({
            id: resource?.id,
            category: String(data.get("category")),
            title: String(data.get("title")),
            url: String(data.get("url")),
            description: String(data.get("description")),
            published: data.get("published") === "on",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Category">
        <SelectInput name="category" defaultValue={resource?.category}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Title"><TextInput name="title" required defaultValue={resource?.title} /></Field>
      <Field label="Link"><TextInput name="url" type="url" required defaultValue={resource?.url} /></Field>
      <Field label="Description"><TextArea name="description" required defaultValue={resource?.description} /></Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={resource?.published ?? true} /> Visible to students
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : editing ? "Update resource" : "Add resource"}</Button>
    </form>
  );
}

export function DeleteResourceButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await deleteResource(id);
          router.refresh();
        })
      }
    >
      {pending ? "Deleting" : "Delete"}
    </Button>
  );
}

export function InstructorSettingsForm({ name, timezone }: { name: string; timezone: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await updateInstructorSettings({
            fullName: String(data.get("fullName") ?? ""),
            timezone: String(data.get("timezone") ?? "UTC"),
          });
          setMessage(result.ok ? "Settings saved." : result.error);
        });
      }}
    >
      <Field label="Name"><TextInput name="fullName" defaultValue={name} /></Field>
      <Field label="Time zone">
        <SelectInput name="timezone" defaultValue={timezone}>
          {commonTimeZones.map((zone) => <option key={zone}>{zone}</option>)}
        </SelectInput>
      </Field>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
      <Button type="submit" disabled={pending}>Save</Button>
    </form>
  );
}

export function ModuleForm({
  module,
}: {
  module?: {
    id: string;
    title: string;
    description: string;
    monthLabel: string;
    weekNumber: number;
    published: boolean;
  };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const editing = Boolean(module?.id);
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await saveModule({
            id: module?.id,
            title: String(data.get("title") ?? ""),
            description: String(data.get("description") ?? ""),
            monthLabel: String(data.get("monthLabel") ?? ""),
            weekNumber: Number(data.get("weekNumber") ?? 1),
            published: data.get("published") === "on",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Title"><TextInput name="title" required defaultValue={module?.title} /></Field>
      <Field label="Month label">
        <TextInput
          name="monthLabel"
          placeholder="Month 1 — Computer fundamentals, HTML and CSS"
          required
          defaultValue={module?.monthLabel}
        />
      </Field>
      <Field label="Week number">
        <TextInput name="weekNumber" type="number" min={1} defaultValue={module?.weekNumber ?? 1} />
      </Field>
      <Field label="Description"><TextArea name="description" required defaultValue={module?.description} /></Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={module?.published} /> Published
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : editing ? "Save week" : "Create week"}</Button>
    </form>
  );
}

export function PublishModuleButton({
  id,
  title,
  description,
  monthLabel,
  weekNumber,
  published,
}: {
  id: string;
  title: string;
  description: string;
  monthLabel: string;
  weekNumber: number;
  published: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await saveModule({ id, title, description, monthLabel, weekNumber, published: !published });
          router.refresh();
        })
      }
    >
      {pending ? "Updating" : published ? "Unpublish" : "Publish"}
    </Button>
  );
}

export function QuizMetaForm({
  quiz,
}: {
  quiz: { id: string; title: string; passingScore: number; allowRetakes: boolean; published: boolean };
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          const result = await saveQuizMeta({
            id: quiz.id,
            title: String(data.get("title") ?? ""),
            passingScore: Number(data.get("passingScore") ?? quiz.passingScore),
            allowRetakes: data.get("allowRetakes") === "on",
            published: data.get("published") === "on",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Title"><TextInput name="title" required defaultValue={quiz.title} /></Field>
      <Field label="Pass mark (%)"><TextInput name="passingScore" type="number" min={1} max={100} defaultValue={quiz.passingScore} /></Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="allowRetakes" defaultChecked={quiz.allowRetakes} /> Allow retakes
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={quiz.published} /> Published for students
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Save quiz settings"}</Button>
    </form>
  );
}

export function QuizQuestionForm({ quizId }: { quizId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const type = String(data.get("type") ?? "multiple_choice") as "multiple_choice" | "true_false" | "code_reading";
        const options = ["a", "b", "c", "d"]
          .map((id) => ({ id, text: String(data.get(`option-${id}`) ?? "").trim() }))
          .filter((item) => item.text.length > 0);
        const correctOption = String(data.get("correct") ?? "a");
        start(async () => {
          const result = await saveQuizQuestion({
            quizId,
            type,
            prompt: String(data.get("prompt") ?? ""),
            codeSnippet: String(data.get("codeSnippet") ?? "") || undefined,
            options: type === "true_false" ? [{ id: "true", text: "True" }, { id: "false", text: "False" }] : options,
            correct:
              type === "true_false"
                ? { value: correctOption === "true" }
                : { optionId: correctOption },
            explanation: String(data.get("explanation") ?? ""),
            points: Number(data.get("points") ?? 1),
          });
          if (!result.ok) setError(result.error);
          else {
            setError(null);
            form.reset();
            router.refresh();
          }
        });
      }}
    >
      <Field label="Question type">
        <SelectInput name="type" defaultValue="multiple_choice">
          <option value="multiple_choice">Multiple choice</option>
          <option value="true_false">True or false</option>
          <option value="code_reading">Code reading</option>
        </SelectInput>
      </Field>
      <Field label="Prompt"><TextArea name="prompt" required /></Field>
      <Field label="Code snippet (optional)"><TextArea name="codeSnippet" className="font-mono text-sm" /></Field>
      <Field label="Option A"><TextInput name="option-a" /></Field>
      <Field label="Option B"><TextInput name="option-b" /></Field>
      <Field label="Option C"><TextInput name="option-c" /></Field>
      <Field label="Option D"><TextInput name="option-d" /></Field>
      <Field label="Correct answer" hint="For true/false use true or false. For MCQ use a, b, c, or d.">
        <TextInput name="correct" defaultValue="a" required />
      </Field>
      <Field label="Explanation"><TextArea name="explanation" required /></Field>
      <Field label="Points"><TextInput name="points" type="number" min={1} max={20} defaultValue={1} /></Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Adding" : "Add question"}</Button>
    </form>
  );
}
