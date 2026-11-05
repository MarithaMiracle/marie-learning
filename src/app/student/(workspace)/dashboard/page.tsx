import Link from "next/link";
import { Badge, Card, PageHeader, ProgressBar, buttonClass } from "@/components/ui";
import { displayName, requireUser } from "@/lib/auth";
import { percent } from "@/lib/utils";
import { formatWhen } from "@/lib/time";
import { getProfile, getStudentDashboard } from "@/server/student-data";
import { defaultChecklist, mergeChecklist } from "@/lib/checklist";
import type { OperatingSystem } from "@/lib/content-types";
import { Checklist } from "@/components/checklist";
import { markNotificationsRead } from "@/server/student-actions";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser("student");
  const data = await getStudentDashboard(user);
  const profile = await getProfile(user);
  const os = (profile.profile?.operatingSystem as OperatingSystem | null) ?? null;
  const checklist = mergeChecklist(profile.profile?.setupChecklist, defaultChecklist(os, profile.profile?.osVersion));
  const value = percent(data.completed, data.total);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { timeZone: user.timezone, hour: "numeric", hourCycle: "h23" }).format(new Date()),
  );
  const hello = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <PageHeader
        eyebrow="Your learning"
        title={`${hello}, ${displayName(user)}`}
        description={
          data.currentModule
            ? `You are on Week ${data.currentModule.weekNumber}: ${data.currentModule.title}.`
            : "Your lessons will appear here when the programme is published."
        }
      />
      <Card className="p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted">Overall progress</p>
            <p className="text-2xl font-bold text-navy">
              {data.completed} of {data.total} lessons finished
            </p>
          </div>
          <p className="text-sm font-semibold text-primary">{value}%</p>
        </div>
        <div className="mt-3">
          <ProgressBar value={value} label="Counted from lessons you have marked finished." />
        </div>
      </Card>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <p className="text-sm font-semibold text-muted">Continue</p>
          {data.next ? (
            <>
              <h2 className="mt-1 text-xl font-bold text-navy">{data.next.title}</h2>
              <p className="mt-1 text-sm text-muted">Session {data.next.sessionNumber} · about {data.next.estimatedMinutes} minutes</p>
              <Link href={`/student/lesson/${data.next.id}`} className={`${buttonClass()} mt-4`}>
                Continue learning
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm leading-6">You have marked every published lesson finished. Check assignments and quizzes that are still open.</p>
          )}
        </Card>
        <Card className="p-5">
          <p className="text-sm font-semibold text-muted">Upcoming live class</p>
          {data.nextClass ? (
            <>
              <h2 className="mt-1 text-xl font-bold text-navy">{formatWhen(data.nextClass.startsAt, user.timezone)}</h2>
              <p className="mt-2 text-sm leading-6">{data.nextClass.description || "Your instructor will lead this session."}</p>
              {data.nextClass.meetingUrl ? (
                <a href={data.nextClass.meetingUrl} className="mt-3 inline-block font-semibold text-primary" target="_blank" rel="noreferrer">
                  Open meeting link
                </a>
              ) : null}
            </>
          ) : (
            <p className="mt-2 text-sm leading-6">No upcoming class is on your schedule yet.</p>
          )}
        </Card>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold text-navy">Pending assignments</h2>
          <ul className="mt-3 space-y-3">
            {data.pending.slice(0, 4).map((item) => (
              <li key={item.assignment.id} className="flex items-center justify-between gap-3 text-sm">
                <Link href={`/student/assignments/${item.assignment.id}`} className="font-semibold text-primary">
                  {item.assignment.title}
                </Link>
                <Badge tone={item.submission ? "warning" : "neutral"}>{item.submission?.status.replaceAll("_", " ") ?? "Not submitted"}</Badge>
              </li>
            ))}
            {data.pending.length === 0 ? <li className="text-sm text-muted">Nothing is waiting on you right now.</li> : null}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="font-bold text-navy">Recent feedback</h2>
          <ul className="mt-3 space-y-3">
            {data.feedback.map((item) => (
              <li key={item.id} className="text-sm leading-6">
                <Link href={`/student/assignments/${item.assignmentId}`} className="font-semibold text-primary">
                  {item.assignmentTitle}
                </Link>
                <p>{item.body}</p>
              </li>
            ))}
            {data.feedback.length === 0 ? <li className="text-sm text-muted">Feedback appears here after your instructor reviews work.</li> : null}
          </ul>
        </Card>
      </div>
      <Card className="mt-5 p-5">
        <h2 className="font-bold text-navy">Learning journey</h2>
        <ol className="mt-4 space-y-3">
          {data.journey.map((item) => (
            <li key={item.module.id}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <Link href={`/student/learning/${item.module.id}`} className="font-semibold">
                  Week {item.module.weekNumber}: {item.module.title}
                </Link>
                <span className="text-muted">
                  {item.completed}/{item.total}
                </span>
              </div>
              <ProgressBar value={percent(item.completed, item.total)} />
            </li>
          ))}
        </ol>
      </Card>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-bold text-navy">Announcements</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {data.announcements.map((item) => (
              <li key={item.id}>
                <p className="font-semibold">{item.title}</p>
                <p className="text-muted">{item.body}</p>
              </li>
            ))}
            {data.announcements.length === 0 ? <li className="text-muted">No announcements yet.</li> : null}
          </ul>
          <Link href="/student/announcements" className="mt-3 inline-block text-sm font-semibold text-primary">
            Read all
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-bold text-navy">Quick links</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm font-semibold">
            <Link href="/student/learning" className="text-primary">All lessons</Link>
            <Link href="/student/quizzes" className="text-primary">Quizzes</Link>
            <Link href="/student/schedule" className="text-primary">Class schedule</Link>
            <Link href="/student/resources" className="text-primary">Learning resources</Link>
            <Link href="/student/profile" className="text-primary">Profile and notes</Link>
          </div>
        </Card>
      </div>
      <Card className="mt-5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-bold text-navy">Updates</h2>
          <div className="flex items-center gap-3 text-sm font-semibold">
            {data.updates.some((item) => !item.readAt) ? (
              <form action={markNotificationsRead}>
                <button className="text-primary" type="submit">
                  Mark as read
                </button>
              </form>
            ) : null}
            <Link href="/student/notifications" className="text-primary">
              View all
            </Link>
          </div>
        </div>
        <ul className="mt-3 space-y-3 text-sm">
          {data.updates.map((item) => (
            <li key={item.id}>
              {item.href ? (
                <Link href={item.href} className="font-semibold text-primary">
                  {item.title}
                </Link>
              ) : (
                <p className="font-semibold text-navy">{item.title}</p>
              )}
              <p className="text-muted">{item.body}</p>
              {!item.readAt ? <p className="mt-0.5 text-xs font-semibold text-primary">New</p> : null}
            </li>
          ))}
          {data.updates.length === 0 ? (
            <li className="text-muted">No updates yet. Reviews, class changes, and announcements will show up here.</li>
          ) : null}
        </ul>
      </Card>
      <div className="mt-5">
        <h2 className="mb-3 text-lg font-bold text-navy">Setup checklist</h2>
        <Checklist items={checklist} />
      </div>
    </div>
  );
}
