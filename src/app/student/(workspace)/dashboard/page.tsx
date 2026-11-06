import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Code2,
  Component,
  Database,
  FileCode2,
  GitBranch,
  GraduationCap,
  LayoutGrid,
  Monitor,
  MousePointerClick,
  Network,
  Palette,
  PanelsTopLeft,
  Plug,
  Rocket,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  Badge,
  Card,
  ProgressBar,
  buttonClass,
} from "@/components/ui";

import { displayName, requireUser } from "@/lib/auth";
import { percent } from "@/lib/utils";
import { formatWhen } from "@/lib/time";
import {
  getProfile,
  getStudentDashboard,
} from "@/server/student-data";
import {
  defaultChecklist,
  mergeChecklist,
} from "@/lib/checklist";
import type { OperatingSystem } from "@/lib/content-types";
import { Checklist } from "@/components/checklist";
import { markNotificationsRead } from "@/server/student-actions";
import { TornEdge } from "@/components/marketing/torn-edge";

export const metadata = {
  title: "Dashboard",
};

/* --------------------------------------------------
   Programme stage configuration
-------------------------------------------------- */

const stages = [
  {
    id: 1,
    title: "Web foundations",
    description: "Learn how the web works and build your first pages.",
    weeks: [1, 2, 3, 4],
    icon: Monitor,
    color: "teal",
    iconBg: "bg-[#E6F3F1]",
    iconColor: "text-[#218C84]",
    accent: "bg-[#35A8A1]",
    softBg: "bg-[#F1F8F7]",
    border: "border-[#DCEFEB]",
  },
  {
    id: 2,
    title: "Frontend foundations",
    description: "Build responsive layouts and develop programming logic.",
    weeks: [5, 6, 7, 8],
    icon: Code2,
    color: "blue",
    iconBg: "bg-[#EAF0FC]",
    iconColor: "text-[#4169B1]",
    accent: "bg-[#557CC2]",
    softBg: "bg-[#F4F6FC]",
    border: "border-[#E0E8F7]",
  },
  {
    id: 3,
    title: "Interactive development",
    description: "Create interactive interfaces and work with modern tools.",
    weeks: [9, 10, 11, 12],
    icon: Component,
    color: "purple",
    iconBg: "bg-[#F3ECFA]",
    iconColor: "text-[#9460AD]",
    accent: "bg-[#9460AD]",
    softBg: "bg-[#F8F5FA]",
    border: "border-[#EDE2F4]",
  },
  {
    id: 4,
    title: "Backend & full-stack",
    description: "Build APIs, work with databases and connect your application.",
    weeks: [13, 14, 15, 16],
    icon: Server,
    color: "orange",
    iconBg: "bg-[#FCEFE6]",
    iconColor: "text-[#C47B45]",
    accent: "bg-[#C47B45]",
    softBg: "bg-[#FCF7F2]",
    border: "border-[#F4E7DA]",
  },
] as const;

/* --------------------------------------------------
   Week-specific icons
-------------------------------------------------- */

const weekIcons: Record<number, LucideIcon> = {
  1: Monitor,
  2: Code2,
  3: FileCode2,
  4: Palette,
  5: PanelsTopLeft,
  6: Code2,
  7: Workflow,
  8: Network,
  9: MousePointerClick,
  10: GitBranch,
  11: Component,
  12: LayoutGrid,
  13: Server,
  14: Plug,
  15: Database,
  16: Rocket,
};

function getStage(weekNumber: number) {
  return (
    stages.find((stage) =>
      (stage.weeks as readonly number[]).includes(weekNumber),
    ) ?? stages[0]
  );
}

/* --------------------------------------------------
   Dashboard
-------------------------------------------------- */

export default async function DashboardPage() {
  const user = await requireUser("student");

  const data = await getStudentDashboard(user);
  const profile = await getProfile(user);

  const os =
    (profile.profile?.operatingSystem as OperatingSystem | null) ?? null;

  const checklist = mergeChecklist(
    profile.profile?.setupChecklist,
    defaultChecklist(os, profile.profile?.osVersion),
  );

  const value = percent(data.completed, data.total);

  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: user.timezone,
      hour: "numeric",
      hourCycle: "h23",
    }).format(new Date()),
  );

  const hello =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : "Good evening";

  const now = new Date();

  const dayNumber = new Intl.DateTimeFormat("en-GB", {
    timeZone: user.timezone,
    day: "numeric",
  }).format(now);

  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: user.timezone,
    weekday: "long",
  }).format(now);

  const month = new Intl.DateTimeFormat("en-GB", {
    timeZone: user.timezone,
    month: "long",
  }).format(now);

  const year = new Intl.DateTimeFormat("en-GB", {
    timeZone: user.timezone,
    year: "numeric",
  }).format(now);

  const currentWeek = data.currentModule?.weekNumber ?? 1;
  const currentStage = getStage(currentWeek);

  const unreadCount = data.updates.filter(
    (item) => !item.readAt,
  ).length;

  return (
    <div className="space-y-8">

      {/* ==========================================
          WELCOME HEADER
      ========================================== */}

      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {hello}, {displayName(user)}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {data.currentModule
              ? "Keep going, one lesson at a time."
              : "Your lessons will appear here when the programme is published."}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="flex items-end gap-3 text-right">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#82909E]">
                {month.slice(0, 3)}
              </span>
              <span className="text-[32px] font-black leading-none tracking-[-0.08em] text-[#10264B]">
                {dayNumber}
              </span>
            </div>

            <div className="pb-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#82909E]">
                {weekday}
              </p>
              <p className="mt-1 text-xs text-[#82909E]">{year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTINUE LEARNING + PROGRESS
      ========================================== */}

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">

        {/* Continue learning */}

        <div className="relative overflow-hidden rounded-[28px]">
          <Card className="relative overflow-hidden rounded-[28px] border-0 bg-[#10264B] p-6 text-white shadow-[0_12px_35px_rgba(16,38,75,0.12)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute -bottom-24 right-24 h-64 w-64 rounded-full bg-[#35A8A1]/10 blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3" />

              <div className="mt-8 max-w-xl">
                <p className="text-sm font-medium text-[#63D2C5]">
                  YOUR NEXT LESSON
                </p>

                <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                  {data.next?.title ?? "You're up to date with your lessons"}
                </h2>

                {data.next ? (
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
                    <span className="flex items-center gap-2">
                      <BookOpen size={16} />
                      Session {data.next.sessionNumber}
                    </span>

                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      About {data.next.estimatedMinutes} minutes
                    </span>
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Check your learning area for available lessons and activities.
                  </p>
                )}
              </div>

              {data.next && (
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <Link
                    href={`/student/lesson/${data.next.id}`}
                    className="inline-flex items-center gap-3 rounded-xl bg-[#35A8A1] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#42B7AF]"
                  >
                    Continue learning
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Progress card */}

        <Card className="flex flex-col justify-between rounded-3xl border border-line p-6 shadow-[0_8px_30px_rgba(16,38,75,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="mt-1 text-xs text-muted">
                Your learning journey so far
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6F3F1] text-primary">
              <GraduationCap size={23} />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-navy">
                {value}%
              </span>

              <span className="text-xs text-muted">completed</span>
            </div>

            <div className="mt-4">
              <ProgressBar value={value} />
            </div>

            <div className="mt-3 flex justify-between text-xs text-muted">
              <span>
                {data.completed} of {data.total} lessons
              </span>
              <span>16 weeks</span>
            </div>
          </div>
        </Card>
      </section>

      {/* ==========================================
          QUICK STATS
      ========================================== */}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">

        <Link
          href="/student/assignments"
          className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4E8] text-[#C47B45]">
            <ClipboardList size={21} />
          </div>

          <div>
            <p className="text-2xl font-bold text-navy">
              {data.pending.length}
            </p>
            <p className="text-xs text-muted">Pending assignments</p>
          </div>

          <ChevronRight
            size={17}
            className="ml-auto text-muted transition group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/student/notifications"
          className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FC] text-[#557CC2]">
            <Bell size={21} />
          </div>

          <div>
            <p className="text-2xl font-bold text-navy">
              {unreadCount}
            </p>
            <p className="text-xs text-muted">Unread updates</p>
          </div>

          <ChevronRight
            size={17}
            className="ml-auto text-muted transition group-hover:translate-x-1"
          />
        </Link>

        <Link
          href="/student/schedule"
          className="group col-span-2 flex items-center gap-3 rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md lg:col-span-1"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3ECFA] text-[#9460AD]">
            <CalendarDays size={21} />
          </div>

          <div>
            <p className="text-sm font-bold text-navy">
              Class schedule
            </p>
            <p className="text-xs text-muted">
              {data.nextClass
                ? formatWhen(data.nextClass.startsAt, user.timezone)
                : "No upcoming class scheduled"}
            </p>
          </div>

          <ChevronRight
            size={17}
            className="ml-auto text-muted transition group-hover:translate-x-1"
          />
        </Link>
      </section>

      {/* ==========================================
          UPCOMING CLASS
      ========================================== */}

      {data.nextClass && (
        <section>
          <Card className="rounded-3xl border border-[#DCEFEB] bg-[#F1F8F7] p-5 shadow-none sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <CalendarDays size={23} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Upcoming live class
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-navy">
                    {formatWhen(data.nextClass.startsAt, user.timezone)}
                  </h2>

                  <p className="mt-1 text-sm text-muted">
                    {data.nextClass.description ||
                      "Your instructor will lead this session."}
                  </p>
                </div>
              </div>

              {data.nextClass.meetingUrl && (
                <a
                  href={data.nextClass.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#35A8A1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#278F88]"
                >
                  Join live class
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </Card>
        </section>
      )}

      {/* ==========================================
          LEARNING JOURNEY / COURSE CARDS
      ========================================== */}

      <section id="learning-journey" className="scroll-mt-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
              Your learning journey
            </h2>
          </div>

          <Link
            href="/student/learning"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            All lessons
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-7">
          {stages.map((stage) => {
            const stageItems = data.journey.filter((item) =>
              (stage.weeks as readonly number[]).includes(
                item.module.weekNumber,
              ),
            );

            if (stageItems.length === 0) return null;

            const StageIcon = stage.icon;

            const stageCompleted = stageItems.reduce(
              (sum, item) => sum + item.completed,
              0,
            );

            const stageTotal = stageItems.reduce(
              (sum, item) => sum + item.total,
              0,
            );

            return (
              <div key={stage.id}>
                {/* Stage heading */}

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stage.iconBg} ${stage.iconColor}`}
                    >
                      <StageIcon size={22} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Stage {stage.id}
                      </p>

                      <h3 className="font-bold text-navy">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-muted">
                    {stageCompleted}/{stageTotal} lessons
                  </span>
                </div>

                <p className="mb-4 text-sm text-muted">
                  {stage.description}
                </p>

                {/* Course cards */}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stageItems.map((item) => {
                    const week = item.module.weekNumber;
                    const WeekIcon = weekIcons[week] ?? Code2;

                    const completed =
                      item.total > 0 &&
                      item.completed >= item.total;

                    const inProgress =
                      item.completed > 0 && !completed;

                    const isCurrent =
                      data.currentModule?.weekNumber === week;

                    const status = completed
                      ? "Completed"
                      : inProgress
                        ? "In progress"
                        : isCurrent
                          ? "Current week"
                          : "Upcoming";

                    return (
                      <Link
                        key={item.module.id}
                        href={`/student/learning/${item.module.id}`}
                        className="group flex min-h-[235px] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_5px_24px_rgba(16,38,75,0.035)] transition duration-200 hover:-translate-y-1 hover:border-[#B8DED8] hover:shadow-[0_12px_30px_rgba(16,38,75,0.09)]"
                      >
                        {/* Card visual area */}

                        <div
                          className={`relative flex min-h-[112px] items-center justify-between overflow-hidden px-5 py-4 ${stage.softBg}`}
                        >
                          <div
                            className={`absolute -right-6 -top-10 h-32 w-32 rounded-full ${stage.accent} opacity-[0.07]`}
                          />

                          <div className="relative">
                            <span className="text-xs font-bold uppercase tracking-widest text-navy/50">
                              WEEK {String(week).padStart(2, "0")}
                            </span>

                            <div
                              className={`mt-3 flex h-14 w-14 items-center justify-center rounded-2xl ${stage.iconBg} ${stage.iconColor} shadow-sm transition duration-200 group-hover:scale-105`}
                            >
                              <WeekIcon size={28} strokeWidth={1.7} />
                            </div>
                          </div>

                          <div className="relative">
                            {completed ? (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#35A8A1] shadow-sm">
                                <CheckCircle2 size={19} />
                              </div>
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy/50 shadow-sm transition group-hover:text-primary">
                                <ArrowRight size={17} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card content */}

                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                              {stage.title}
                            </span>

                            {isCurrent && !completed && (
                              <span className="rounded-full bg-[#E6F3F1] px-2 py-1 text-[10px] font-bold text-[#218C84]">
                                CURRENT
                              </span>
                            )}
                          </div>

                          <h4 className="mt-2 line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-navy transition group-hover:text-primary">
                            {item.module.title}
                          </h4>

                          <div className="mt-auto pt-5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted">
                                {item.completed}/{item.total} lessons
                              </span>

                              <span
                                className={`font-semibold ${
                                  completed
                                    ? "text-[#218C84]"
                                    : inProgress
                                      ? "text-primary"
                                      : "text-muted"
                                }`}
                              >
                                {status}
                              </span>
                            </div>

                            <div className="mt-2">
                              <ProgressBar
                                value={percent(
                                  item.completed,
                                  item.total,
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          ASSIGNMENTS + FEEDBACK
      ========================================== */}

      <section className="grid gap-5 lg:grid-cols-2">

        {/* Assignments */}

        <Card className="rounded-3xl border border-line p-5 shadow-[0_8px_30px_rgba(16,38,75,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF4E8] text-[#C47B45]">
                  <ClipboardList size={19} />
                </div>

                <h2 className="font-bold text-navy">
                  Assignments
                </h2>
              </div>

              <p className="mt-2 text-sm text-muted">
                Work that needs your attention
              </p>
            </div>

            <Link
              href="/student/assignments"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {data.pending.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#F5F8F8] px-4 py-7 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#35A8A1] shadow-sm">
                <CheckCircle2 size={24} />
              </div>

              <p className="mt-3 text-sm font-semibold text-navy">
                You're all caught up
              </p>

              <p className="mt-1 text-xs leading-5 text-muted">
                Nothing is waiting on you right now. New assignments
                will appear here when they're available.
              </p>
            </div>
          ) : (
            <div className="mt-5 divide-y divide-slate-100">
              {data.pending.slice(0, 5).map((item) => (
                <div
                  key={item.assignment.id}
                  className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy">
                      {item.assignment.title}
                    </p>

                    <div className="mt-2">
                      <Badge
                        tone={
                          item.submission ? "warning" : "neutral"
                        }
                      >
                        {item.submission?.status.replaceAll(
                          "_",
                          " ",
                        ) ?? "Not submitted"}
                      </Badge>
                    </div>
                  </div>

                  <Link
                    href={`/student/assignments/${item.assignment.id}`}
                    className="shrink-0 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-navy transition hover:bg-slate-50"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Feedback */}

        <Card className="rounded-3xl border border-line p-5 shadow-[0_8px_30px_rgba(16,38,75,0.04)] sm:p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F3F1] text-[#218C84]">
              <GraduationCap size={20} />
            </div>

            <h2 className="font-bold text-navy">
              Recent feedback
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted">
            Comments and guidance from your instructor
          </p>

          {data.feedback.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#F5F8F8] px-4 py-7 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#35A8A1] shadow-sm">
                <BookOpen size={23} />
              </div>

              <p className="mt-3 text-sm font-semibold text-navy">
                Your feedback will appear here
              </p>

              <p className="mt-1 text-xs leading-5 text-muted">
                Once your instructor reviews your submitted work,
                you'll be able to see their comments here.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {data.feedback.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-[#DCEFEB] bg-[#F1F8F7] p-4"
                >
                  <Link
                    href={`/student/assignments/${item.assignmentId}`}
                    className="text-sm font-bold text-[#218C84] hover:underline"
                  >
                    {item.assignmentTitle}
                  </Link>

                  <p className="mt-2 text-sm leading-6 text-navy/80">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      {/* ==========================================
          ANNOUNCEMENTS + UPDATES
      ========================================== */}

      <section className="grid gap-5 lg:grid-cols-2">

        {/* Announcements */}

        <Card className="rounded-3xl border border-line p-5 shadow-[0_8px_30px_rgba(16,38,75,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF0FC] text-[#557CC2]">
                <Bell size={19} />
              </div>

              <h2 className="font-bold text-navy">
                Announcements
              </h2>
            </div>

            <Link
              href="/student/announcements"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Read all
            </Link>
          </div>

          {data.announcements.length === 0 ? (
            <p className="mt-5 rounded-2xl bg-[#F5F8F8] p-5 text-sm text-muted">
              No announcements yet. Instructor updates will appear here.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {data.announcements.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-line bg-[#FAFBFC] p-4"
                >
                  <p className="text-sm font-bold text-navy">
                    {item.title}
                  </p>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Updates */}

        <Card className="rounded-3xl border border-line p-5 shadow-[0_8px_30px_rgba(16,38,75,0.04)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3ECFA] text-[#9460AD]">
                <Bell size={19} />
              </div>

              <h2 className="font-bold text-navy">
                Your updates
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <form action={markNotificationsRead}>
                  <button
                    type="submit"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Mark as read
                  </button>
                </form>
              )}

              <Link
                href="/student/notifications"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </div>

          {data.updates.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-[#F5F8F8] p-5 text-center">
              <p className="text-sm font-semibold text-navy">
                You're all caught up
              </p>

              <p className="mt-1 text-xs leading-5 text-muted">
                Reviews, class changes and other updates will appear here.
              </p>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-slate-100">
              {data.updates.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      !item.readAt
                        ? "bg-[#35A8A1]"
                        : "bg-slate-200"
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-semibold text-navy hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <p className="text-sm font-semibold text-navy">
                        {item.title}
                      </p>
                    )}

                    <p className="mt-1 text-xs leading-5 text-muted">
                      {item.body}
                    </p>

                    {!item.readAt && (
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        New
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      {/* ==========================================
          SETUP CHECKLIST
      ========================================== */}

      <section>
        <details className="group overflow-hidden rounded-3xl border border-line bg-white shadow-[0_8px_30px_rgba(16,38,75,0.04)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6F3F1] text-primary">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <p className="font-bold text-navy">
                  Getting started
                </p>

                <p className="mt-1 text-xs text-muted">
                  Your initial setup checklist and preparation steps
                </p>
              </div>
            </div>

            <ChevronRight
              size={20}
              className="shrink-0 text-muted transition duration-200 group-open:rotate-90"
            />
          </summary>

          <div className="border-t border-line p-5 sm:p-6">
            <Checklist items={checklist} />
          </div>
        </details>
      </section>

    </div>
  );
}
