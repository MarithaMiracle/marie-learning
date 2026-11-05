import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "drizzle-orm";
import {
  BookOpen,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  FileCode2,
  FolderGit2,
  GraduationCap,
  Layout,
  MonitorPlay,
  PenLine,
  Route,
  Server,
  Terminal,
} from "lucide-react";
import { AboutVisual } from "@/components/marketing/about-visual";
import { HeroDoodles } from "@/components/marketing/hero-doodles";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { SiteNav } from "@/components/marketing/site-nav";
import { TornEdge } from "@/components/marketing/torn-edge";
import { PublicFrame, registrationIsOpen } from "@/components/public-frame";
import { buttonClass } from "@/components/ui";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { months, weekCatalogue } from "@/lib/catalogue";
import { jsonValue, withActor } from "@/lib/db/client";
import Image from "next/image";

type CatalogueItem = {
  week: number;
  title: string;
  description: string;
  lessons: number;
};

export const metadata: Metadata = {
  title: { absolute: "Marie Learning | Learn to Build with Confidence" },
  description: "Learn software development through structured lessons, guided instruction, practical exercises and real-world projects.",
  openGraph: {
    title: "Marie Learning | Learn to Build with Confidence",
    description: "A beginner programme with live classes, written lessons, assignments, and a guided full-stack project.",
    type: "website",
  },
};

const stages = [
  {
    name: "Web Foundations",
    tag: "Foundations",
    range: "Weeks 1–4",
    weeks: [1, 2, 3, 4],
    lessons: 8,
    summary: "Computer fundamentals, HTML, semantic structure, forms, and CSS.",
    icon: Layout,
    image: "/marketing/stage-web.jpg",
  },
  {
    name: "Frontend Foundations",
    tag: "Frontend",
    range: "Weeks 5–8",
    weeks: [5, 6, 7, 8],
    lessons: 8,
    summary: "Responsive layouts, JavaScript, programming logic, arrays, objects, and problem-solving.",
    icon: Code2,
    image: "/marketing/stage-frontend.jpg",
  },
  {
    name: "Interactive Development",
    tag: "React",
    range: "Weeks 9–12",
    weeks: [9, 10, 11, 12],
    lessons: 8,
    summary: "The DOM, Git and GitHub, TypeScript, React, components, props, state, and forms.",
    icon: MonitorPlay,
    image: "/marketing/stage-react.jpg",
  },
  {
    name: "Backend and Full-Stack",
    tag: "Full-stack",
    range: "Weeks 13–16",
    weeks: [13, 14, 15, 16],
    lessons: 8,
    summary: "Node.js, REST APIs, PostgreSQL, integration, the capstone project, testing, and deployment.",
    icon: Server,
    image: "/marketing/stage-fullstack.jpg",
  },
] as const;

const skills = [
  { icon: FileCode2, title: "HTML" },
  { icon: Layout, title: "CSS" },
  { icon: Braces, title: "JavaScript" },
  { icon: Code2, title: "TypeScript" },
  { icon: MonitorPlay, title: "React" },
  { icon: Server, title: "Node.js" },
  { icon: Database, title: "PostgreSQL" },
  { icon: FolderGit2, title: "Git & GitHub" },
] as const;

const approach = [
  { icon: Route, title: "A set path", text: "You can see the week you are on and the week that follows." },
  { icon: BookOpen, title: "Beginner instruction", text: "Lessons explain the idea before they ask you to type it." },
  { icon: PenLine, title: "Learning by doing", text: "Each class has exercises, and each week has work to hand in." },
  { icon: CheckCircle2, title: "Your own progress", text: "The portal records lessons, assignments, quizzes, and classes for your account." },
] as const;

const classRhythm = [
  { icon: GraduationCap, title: "Written lessons", text: "Two lessons each week with steps for your operating system." },
  { icon: MonitorPlay, title: "Live classes", text: "Two guided sessions a week with the instructor." },
  { icon: PenLine, title: "Weekly work", text: "One assignment and one quiz to practise what you learned." },
  { icon: Terminal, title: "Capstone project", text: "Finish with a task manager using React, an API, and PostgreSQL." },
] as const;

export default async function HomePage() {
  const user = await getCurrentUser();
  const registrationOpen = registrationIsOpen();
  const signedInHref = user ? homeFor(user.role) : null;
  const weeks = await loadWeeks();
  const startHref = signedInHref ?? "/register";

  return (
    <PublicFrame signedInHref={signedInHref} chrome="hero">
      <div id="top">
        <SiteNav signedInHref={signedInHref} registrationOpen={registrationOpen} tone="dark" />
        <section className="relative isolate -mt-[5.75rem] overflow-hidden bg-navy pt-[5.75rem] text-white">
          <HeroDoodles />
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pb-36 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-44 lg:pt-24">
            <div className="hero-copy max-w-xl">
              <h1 className="text-[clamp(2.5rem,5.5vw,3.65rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                Master new skills, advance with confidence.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                A beginner programme with live classes, written lessons, and a guided full-stack project.
              </p>
              <div className="mt-8">
                <Link href={startHref} className={buttonClass({ size: "lg", className: "min-w-[12rem] rounded-full" })}>
                  {signedInHref ? "Go to dashboard" : "Get Started Now"}
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-center">
              <HeroVisual />
            </div>
          </div>
          <TornEdge className="pointer-events-none absolute inset-x-0 bottom-0 z-20" />
        </section>

        <section id="about" className="scroll-mt-24 bg-canvas">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <AboutVisual />
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-primary">About the programme</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                A clear strategy for starting from zero.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Marie Learning is one instructor-led programme for people who have never written code. The portal keeps lessons, classes, and feedback in one place.
              </p>
              <ul className="mt-8 space-y-4">
                {approach.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-bold text-navy">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">What you learn</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">The tools of modern web development.</h2>
              <p className="mt-3 leading-7 text-muted">One practical skill at a time — from the first HTML page to a small full-stack application.</p>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {skills.map((skill) => (
                <li
                  key={skill.title}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-primary/[0.07] px-4 py-6 text-center transition hover:border-primary/35 hover:bg-primary/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <skill.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-sm font-bold text-navy">{skill.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="programme" className="scroll-mt-24 bg-navy text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">The programme</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A journey built on knowledge, practice, and a real project.
              </h2>
              <p className="mt-3 leading-7 text-white/70">
                One path in four stages — 16 weeks from first HTML page to a full-stack task manager.
              </p>
            </div>

            <div className="mt-12 flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const firstWeek = weeks.find((entry) => entry.week === stage.weeks[0]);
                return (
                  <article
                    key={stage.name}
                    className="flex w-[min(18.5rem,78vw)] shrink-0 flex-col overflow-hidden rounded-2xl bg-white text-ink shadow-[0_18px_40px_rgba(0,0,0,0.22)] lg:w-auto"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={stage.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 78vw, 25vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/15 to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                        {stage.tag}
                      </span>
                      <Icon className="absolute bottom-4 right-4 h-10 w-10 text-white/80" aria-hidden />
                      <p className="absolute bottom-4 left-5 text-xs font-semibold text-white">
                        Stage {index + 1}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold leading-snug text-navy">{stage.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{stage.summary}</p>
                      <p className="mt-3 text-xs leading-5 text-muted">
                        Starts with {firstWeek?.title ?? months[index].title}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
                        <span className="font-semibold text-navy">{stage.range}</span>
                        <span className="text-muted">{stage.lessons} lessons</span>
                      </div>
                      <a href="#weeks" className={`${buttonClass({ size: "sm", className: "mt-4 w-full rounded-full" })}`}>
                        View details
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        <section id="how" className="scroll-mt-24 bg-canvas">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">How it works</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">A practical week, every week.</h2>
              <p className="mt-3 leading-7 text-muted">
                Read the lessons, join the live classes, hand in the work, and track your progress in the portal.
              </p>
            </div>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ["01", "Learn the fundamentals", "Start with how computers, websites, and applications work, even if you have never written a line of code."],
                ["02", "Practise with guidance", "Follow the written lessons, attend two live classes each week, and work through the exercises."],
                ["03", "Build a real project", "Finish with a guided task manager that connects a React page, an API, and PostgreSQL."],
              ].map(([step, title, text]) => (
                <li key={step} className="rounded-2xl border border-line bg-white p-6">
                  <p className="text-sm font-bold text-primary">{step}</p>
                  <h3 className="mt-2 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {classRhythm.map((item) => (
                <li key={item.title} className="rounded-2xl border border-line bg-white p-5">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden />
                  <p className="mt-3 font-bold text-navy">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="weeks" className="scroll-mt-24 border-t border-line bg-white">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-bold text-navy">The 16 weeks</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Published titles from the programme. Each week has two lessons.</p>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {weeks.map((week) => (
                <li key={week.week} className="grid gap-1 py-4 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
                  <p className="text-sm font-bold text-primary">Week {week.week}</p>
                  <div>
                    <h3 className="font-semibold text-navy">{week.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{week.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-primary">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Ready to start building with confidence?
              </h2>
              <p className="mt-2 leading-7 text-navy/80">
                Join the programme, open Week 1, and take the first step with guided lessons and live classes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={startHref} className={buttonClass({ size: "lg", className: "bg-navy text-white hover:bg-navy/90" })}>
                {signedInHref ? "Go to dashboard" : "Get Started"}
              </Link>
              <a
                href="#programme"
                className={buttonClass({
                  variant: "secondary",
                  size: "lg",
                  className: "border-navy/15 bg-white/80 text-navy hover:bg-white",
                })}
              >
                Explore the Programme
              </a>
            </div>
            {registrationOpen || signedInHref ? null : (
              <p className="text-sm text-navy/80 md:basis-full">
                Open registration is off. Ask your instructor for an account, then log in.
              </p>
            )}
          </div>
        </section>
      </div>
    </PublicFrame>
  );
}

async function loadWeeks(): Promise<CatalogueItem[]> {
  try {
    const live = await withActor(null, async (tx) => {
      const result = await tx.execute(sql`select public_catalogue() as catalogue`);
      return jsonValue<CatalogueItem[]>(result) ?? [];
    });
    if (live?.length) return live;
  } catch {
    // The written catalogue below is the fallback when the database is unavailable.
  }
  return weekCatalogue.map(([title, description], index) => ({
    week: index + 1,
    title,
    description,
    lessons: 2,
  }));
}
