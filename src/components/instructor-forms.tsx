"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/password-input";
import { Button, Field, SelectInput, TextArea, TextInput } from "@/components/ui";
import { commonTimeZones } from "@/lib/time";
import {
  addInstructorNote,
  createStudentAccount,
  inviteStudent,
  moveLesson,
  moveModule,
  reviewShortAnswer,
  reviewSubmission,
  revokeStudentInvite,
  saveAnnouncement,
  cancelClass,
  saveClass,
  saveModule,
  saveResource,
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

export function ShortAnswerReview({ answerId, max }: { answerId: string; max: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <form
      className="mt-2 flex flex-wrap items-end gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        start(async () => {
          await reviewShortAnswer({
            answerId,
            points: Number(data.get("points") ?? 0),
            comment: String(data.get("comment") ?? ""),
          });
          router.refresh();
        });
      }}
    >
      <Field label={`Points (0–${max})`}><TextInput name="points" type="number" min={0} max={max} defaultValue={max} /></Field>
      <Field label="Comment"><TextInput name="comment" /></Field>
      <Button type="submit" size="sm" disabled={pending}>Save mark</Button>
    </form>
  );
}

export function ClassForm({
  students,
  lessons,
}: {
  students: { id: string; name: string }[];
  lessons: { id: string; title: string }[];
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
          const result = await saveClass({
            studentId: String(data.get("studentId")),
            startsAt: String(data.get("startsAt")),
            durationMinutes: Number(data.get("duration") ?? 90),
            meetingUrl: String(data.get("meetingUrl") ?? ""),
            description: String(data.get("description") ?? ""),
            sharedNotes: String(data.get("sharedNotes") ?? ""),
            privateNotes: String(data.get("privateNotes") ?? ""),
            lessonId: String(data.get("lessonId") ?? ""),
            status: "scheduled",
            attendance: "",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Student">
        <SelectInput name="studentId" required>
          {students.map((student) => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </SelectInput>
      </Field>
      <Field label="Date and time" hint="Interpreted in your time zone."><TextInput name="startsAt" type="datetime-local" required /></Field>
      <Field label="Duration in minutes"><TextInput name="duration" type="number" defaultValue={90} min={15} max={240} /></Field>
      <Field label="Meeting link"><TextInput name="meetingUrl" placeholder="https://" /></Field>
      <Field label="Description"><TextArea name="description" /></Field>
      <Field label="Notes the student can read"><TextArea name="sharedNotes" /></Field>
      <Field label="Private notes"><TextArea name="privateNotes" /></Field>
      <Field label="Related lesson">
        <SelectInput name="lessonId" defaultValue="">
          <option value="">None</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
          ))}
        </SelectInput>
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Saving" : "Schedule class"}</Button>
    </form>
  );
}

export function AnnouncementForm() {
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
          const result = await saveAnnouncement({
            title: String(data.get("title") ?? ""),
            body: String(data.get("body") ?? ""),
            published: data.get("published") === "on",
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Title"><TextInput name="title" required /></Field>
      <Field label="Message"><TextArea name="body" required /></Field>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked /> Publish to students</label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>Save announcement</Button>
    </form>
  );
}

export function ResourceForm({ categories }: { categories: string[] }) {
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
          const result = await saveResource({
            category: String(data.get("category")),
            title: String(data.get("title")),
            url: String(data.get("url")),
            description: String(data.get("description")),
            published: true,
          });
          if (!result.ok) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Field label="Category">
        <SelectInput name="category">{categories.map((item) => <option key={item}>{item}</option>)}</SelectInput>
      </Field>
      <Field label="Title"><TextInput name="title" required /></Field>
      <Field label="Link"><TextInput name="url" type="url" required /></Field>
      <Field label="Description"><TextArea name="description" required /></Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>Add resource</Button>
    </form>
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

export function ModuleForm() {
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
          const result = await saveModule({
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
      <Field label="Title"><TextInput name="title" required /></Field>
      <Field label="Month label"><TextInput name="monthLabel" placeholder="Month 1 — Computer fundamentals, HTML and CSS" required /></Field>
      <Field label="Week number"><TextInput name="weekNumber" type="number" min={1} defaultValue={1} /></Field>
      <Field label="Description"><TextArea name="description" required /></Field>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" /> Published</label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" disabled={pending}>Create module</Button>
    </form>
  );
}

export function CancelClassButton({ classId }: { classId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      type="button"
      size="sm"
      variant="danger"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await cancelClass(classId);
          router.refresh();
        })
      }
    >
      Cancel class
    </Button>
  );
}
