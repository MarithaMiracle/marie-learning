import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { BookOpen, Code2, Database, FolderGit2, GraduationCap, MonitorPlay, PenLine, Server } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { PortalPreview } from "@/components/marketing/portal-preview";
import { PublicFrame, registrationIsOpen } from "@/components/public-frame";
import { buttonClass } from "@/components/ui";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { months, programme, weekCatalogue } from "@/lib/catalogue";
import { jsonValue, withActor } from "@/lib/db/client";

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
    description: "A 16-week beginner programme with live classes, written lessons, assignments, and a guided full-stack project.",
    type: "website",
  },
};

const stages = [
  { name: "Web Foundations", range: "Weeks 1–4", weeks: [1, 2, 3, 4], summary: "Computer fundamentals, HTML, semantic structure, forms, and CSS." },
  { name: "Frontend Foundations", range: "Weeks 5–8", weeks: [5, 6, 7, 8], summary: "Responsive layouts, JavaScript, programming logic, arrays, objects, and problem-solving." },
  { name: "Interactive Development", range: "Weeks 9–12", weeks: [9, 10, 11, 12], summary: "The DOM, Git and GitHub, TypeScript, React, components, props, state, and forms." },
  { name: "Backend and Full-Stack Development", range: "Weeks 13–16", weeks: [13, 14, 15, 16], summary: "Node.js, REST APIs, PostgreSQL, integration, the capstone project, testing, and deployment." },
] as const;

const subjects = [
  { icon: Code2, title: "Frontend Development", text: "Learn to create the structure, design, and interactive behaviour of websites.", tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React"] },
  { icon: Server, title: "Backend Development", text: "Understand how applications work behind the scenes, process requests, and manage data.", tags: ["Node.js", "REST APIs"] },
  { icon: FolderGit2, title: "Developer Tools", text: "Learn the tools and workflows used to write, manage, and share code.", tags: ["Git", "GitHub", "Terminal", "Editor"] },
  { icon: Database, title: "Databases and Projects", text: "Learn to store information and connect a page to a server.", tags: ["PostgreSQL", "SQL", "Full-stack"] },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const registrationOpen = registrationIsOpen();
  const signedInHref = user ? homeFor(user.role) : null;
  const weeks = await loadWeeks();
  const startHref = signedInHref ?? "/register";

  return (
    <PublicFrame signedInHref={signedInHref}>
      <div id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Your journey into tech starts here</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">Learn to build. Think like a developer. Create with confidence.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Go from complete beginner to building a small web application through structured lessons, practical exercises, and guided learning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#programme" className={buttonClass({ size: "lg" })}>Explore the Programme</a>
              <a href="#how" className={buttonClass({ variant: "secondary", size: "lg" })}>How It Works</a>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section aria-label="Learning highlights" className="border-y border-line bg-white">
          <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {[
              [GraduationCap, "Beginner-friendly curriculum"],
              [MonitorPlay, "Live guided sessions"],
              [PenLine, "Practical assignments"],
              [BookOpen, "Real-world projects"],
            ].map(([Icon, label]) => (
              <li key={String(label)} className="flex items-center gap-3 text-sm font-semibold text-navy">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                {String(label)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-navy">Everything you need to start building for the web.</h2>
            <p className="mt-3 leading-7 text-muted">Develop the foundations of modern web development, one practical skill at a time.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {subjects.map((subject) => (
              <article key={subject.title} className="rounded-2xl border border-line bg-white p-5 transition hover:border-primary/40">
                <subject.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-3 font-bold text-navy">{subject.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{subject.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {subject.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-navy">{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="scroll-mt-24 border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy">A practical approach to learning software development.</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["01", "Learn the fundamentals", "Start with how computers, websites, and applications work, even if you have never written a line of code."],
                ["02", "Practise with guidance", "Follow the written lessons, attend two live classes each week, and work through the exercises."],
                ["03", "Build a real project", "Finish with a guided task manager that connects a React page, an API, and PostgreSQL."],
              ].map(([step, title, text]) => (
                <li key={step}>
                  <p className="text-sm font-bold text-primary">{step}</p>
                  <h3 className="mt-2 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="programme" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-navy">Your learning journey, structured from start to finish.</h2>
              <p className="mt-3 leading-7 text-muted">{programme.description}</p>
            </div>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["16", "weeks"],
                ["32", "live sessions"],
                ["2", "sessions a week"],
                ["48", "guided hours"],
                ["1", "full-stack project"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-line bg-white px-4 py-5">
                  <dt className="text-3xl font-bold text-navy">{value}</dt>
                  <dd className="mt-1 text-sm text-muted">{label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {stages.map((stage, index) => (
                <article key={stage.name} className="rounded-2xl border border-line bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">Stage {index + 1} · {stage.range}</p>
                  <h3 className="mt-2 text-lg font-bold text-navy">{stage.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{stage.summary}</p>
                  <ul className="mt-4 space-y-1 text-sm text-ink">
                    {stage.weeks.map((week) => {
                      const item = weeks.find((entry) => entry.week === week);
                      return <li key={week}>Week {week} · {item?.title ?? months[index].title}</li>;
                    })}
                  </ul>
                </article>
              ))}
            </div>
            <a href="#weeks" className={`${buttonClass({ size: "lg" })} mt-8`}>Explore the Learning Programme</a>
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

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-navy">More than lessons. A complete learning experience.</h2>
            <p className="mt-3 leading-7 text-muted">The portal keeps the lessons, the work, and your progress in one place between classes.</p>
            <ul className="mt-6 space-y-4 text-sm leading-6">
              <li><span className="font-semibold text-navy">Structured lessons.</span> <span className="text-muted">Explanations, examples, and steps for your operating system.</span></li>
              <li><span className="font-semibold text-navy">Assignments and quizzes.</span> <span className="text-muted">One of each per week. The instructor marks the written work.</span></li>
              <li><span className="font-semibold text-navy">Progress tracking.</span> <span className="text-muted">Finished lessons, upcoming work, and the class on your calendar.</span></li>
              <li><span className="font-semibold text-navy">Instructor guidance.</span> <span className="text-muted">Feedback on your assignments and a review of written quiz answers.</span></li>
            </ul>
          </div>
          <PortalPreview />
        </section>

        <section id="about" className="scroll-mt-24 border-t border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-line bg-canvas p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">The capstone</p>
              <div className="mt-4 rounded-2xl border border-line bg-white p-4">
                <p className="text-sm font-semibold text-navy">Tasks</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li className="flex justify-between border-b border-line pb-2"><span>Write the README</span><span>Open</span></li>
                  <li className="flex justify-between border-b border-line pb-2"><span>Add a task</span><span>Done</span></li>
                  <li className="flex justify-between"><span>Save it in PostgreSQL</span><span>Open</span></li>
                </ul>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">A sample of the project students build. It is a task list, not a picture of a student.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-navy">Learning that moves beyond theory.</h2>
              <p className="mt-3 leading-7 text-muted">Marie Learning is the home of one instructor-led programme for people starting from the beginning.</p>
              <ul className="mt-6 space-y-3 text-sm leading-6">
                {[
                  ["A set path", "You can see the week you are on and the week that follows."],
                  ["Beginner instruction", "Lessons explain the idea before they ask you to type it."],
                  ["Learning by doing", "Each class has exercises, and each week has work to hand in."],
                  ["Your own progress", "The portal records lessons, assignments, quizzes, and classes for your account."],
                  ["One application at the end", "The last week joins the frontend, the API, and the database."],
                ].map(([title, text]) => (
                  <li key={title}><span className="font-semibold text-navy">{title}.</span> <span className="text-muted">{text}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="faqs" className="scroll-mt-24">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-navy">Questions before you join</h2>
            <div className="mt-8">
              <FaqList />
            </div>
          </div>
        </section>

        <section className="bg-navy">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">Your journey into software development starts here.</h2>
            <p className="mt-3 leading-7 text-slate-300">Build the foundation, practise every week, and leave with a small application you can explain.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={startHref} className={buttonClass({ size: "lg", className: "bg-white text-navy hover:bg-slate-100" })}>
                {signedInHref ? "Go to dashboard" : "Get Started"}
              </Link>
              <a href="#programme" className={buttonClass({ variant: "secondary", size: "lg", className: "border-white/20 bg-transparent text-white hover:bg-white/10" })}>
                Explore the Programme
              </a>
            </div>
            {registrationOpen || signedInHref ? null : (
              <p className="mt-4 text-sm text-slate-300">Open registration is off. Ask your instructor for an account, then log in.</p>
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
