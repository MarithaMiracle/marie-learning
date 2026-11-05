import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";
import { displayName, requireUser } from "@/lib/auth";
import { labelFrom, codingLabels, computerLabels, osLabels, practiceLabels } from "@/lib/labels";
import { getProfile } from "@/server/student-data";
import { GeneralNoteForm } from "@/components/note-form";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await requireUser("student");
  const data = await getProfile(user);
  const profile = data.profile;
  return (
    <div>
      <PageHeader title={displayName(user)} description={user.email} action={<Link href="/student/settings" className="text-sm font-semibold text-primary">Edit settings</Link>} />
      <Card className="p-5 text-sm leading-7">
        <p><span className="font-semibold">Country:</span> {profile?.country || "Not provided"}</p>
        <p><span className="font-semibold">Time zone:</span> {user.timezone}</p>
        <p><span className="font-semibold">Operating system:</span> {labelFrom(osLabels, profile?.operatingSystem)} {profile?.osVersion ? `(${profile.osVersion})` : ""}</p>
        <p><span className="font-semibold">Computer experience:</span> {labelFrom(computerLabels, profile?.computerExperience)}</p>
        <p><span className="font-semibold">Coding experience:</span> {labelFrom(codingLabels, profile?.codingExperience)}</p>
        <p><span className="font-semibold">Practice time:</span> {labelFrom(practiceLabels, profile?.weeklyPractice)}</p>
        <p><span className="font-semibold">Goals:</span> {profile?.learningGoals || "Not provided"}</p>
        {data.programme ? <p><span className="font-semibold">Programme:</span> {data.programme.title}</p> : null}
      </Card>
      <Card className="mt-4 p-5">
        <h2 className="font-bold text-navy">Private notes</h2>
        <p className="mt-1 text-sm text-muted">These notes are only visible to you. Lesson notes also appear on each lesson.</p>
        <div className="mt-4">
          <GeneralNoteForm />
        </div>
        <ul className="mt-4 space-y-3">
          {data.notes.map((note) => (
            <li key={note.id} className="rounded-xl bg-slate-50 p-3 text-sm">
              <p className="font-semibold">{note.title || "Note"}</p>
              <p className="mt-1 whitespace-pre-wrap leading-6">{note.body}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
