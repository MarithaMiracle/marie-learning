import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Braces,
  ClipboardCheck,
  Code2,
  Database,
  FileCode2,
  FolderGit2,
  GraduationCap,
  Layout,
  MonitorPlay,
  PenLine,
  Rocket,
  Route,
  Server,
  Sparkles,
  Users,
} from "lucide-react";
import { PublicFrame } from "@/components/public-frame";
import { buttonClass } from "@/components/ui";
import { months, programme, weekCatalogue } from "@/lib/catalogue";
import { getPublicCatalogue } from "@/server/public-data";

export const metadata: Metadata = {
  title: "About the Programme",
  description: programme.description,
};

const facts = [
  { label: "Duration", value: "16 weeks" },
  { label: "Format", value: "Instructor-led, online" },
  { label: "Live classes", value: "Two sessions a week" },
  { label: "Finish with", value: "One guided full-stack project" },
];

const prerequisites = [
  "No previous programming experience. The programme starts with what a computer is and what software means.",
  "A laptop or desktop you can install software on and practise with between classes. Lessons include separate steps for Windows, macOS, and Linux.",
  "Time each week for two live sessions, the written lessons, and the homework.",
  "Willingness to ask questions. You are not expected to know the answers in advance.",
];

const structure = [
  { icon: Users, title: "Two live sessions a week", text: "32 instructor-led sessions across the 16 weeks, with time for questions in each one." },
  { icon: BookOpen, title: "A written lesson behind each class", text: "Every session has notes, examples, and exercises you can revisit at any time in the portal." },
  { icon: PenLine, title: "One assignment and one quiz a week", text: "Practise what you learned, then check your understanding before the next week begins." },
  { icon: Route, title: "Your progress in one place", text: "The portal records lessons, assignments, quizzes, and classes against your account." },
];

const technologies = [
  { icon: FileCode2, title: "HTML", text: "Structure pages with headings, text, links, images, lists, and forms." },
  { icon: Layout, title: "CSS", text: "Style and lay out pages that work on small and large screens." },
  { icon: Braces, title: "JavaScript", text: "Write the logic that makes a page respond to the person using it." },
  { icon: Code2, title: "TypeScript", text: "Add types to JavaScript so mistakes are easier to catch." },
  { icon: MonitorPlay, title: "React", text: "Build a user interface from reusable components, props, and state." },
  { icon: Server, title: "Node.js and Express", text: "Run JavaScript on the server and answer requests over HTTP." },
  { icon: Database, title: "PostgreSQL and SQL", text: "Store information in tables and read it back with SQL." },
  { icon: FolderGit2, title: "Git and GitHub", text: "Save versions of your work and publish your projects." },
];

const outcomes = [
  "Read and write HTML, CSS, and JavaScript with confidence.",
  "Build type-safe interfaces with TypeScript and React.",
  "Create a small backend and a REST API, and connect it to a frontend.",
  "Store and query data in a relational PostgreSQL database.",
  "Use Git and GitHub to version, share, and present your work.",
  "Explain and demonstrate one full-stack project from start to finish.",
];

export default async function AboutPage() {
  const weeks = await getPublicCatalogue();
  const byWeek = new Map(weeks.map((entry) => [entry.week, entry]));

  return (
    <PublicFrame>
      <article className="bg-canvas text-ink">
        <header className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">About the programme</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-navy sm:text-5xl">{programme.title}</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{programme.description}</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Beginner-friendly, guided step by step
              </div>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-3xl border border-line bg-canvas p-5 shadow-[0_16px_30px_rgba(16,38,75,0.04)]">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{fact.label}</dt>
                  <dd className="mt-2 text-lg font-black text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">What it is</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">A calm, practical path into software development.</h2>
              </div>
              <div className="space-y-4 text-base leading-7 text-muted">
                <p>
                  Marie Learning is a beginner-friendly programme for people who want to understand how software is built,
                  without feeling overwhelmed by jargon.
                </p>
                <p>
                  The programme introduces one idea at a time, explains it clearly, and gives you time to practise in the portal,
                  before moving on to the next concept.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">What you need to start</h2>
            <ul className="mt-8 space-y-4">
              {prerequisites.map((item) => (
                <li key={item} className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_10px_25px_rgba(16,38,75,0.03)]">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ClipboardCheck className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="leading-7 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">How the programme runs</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {structure.map((item) => (
                <li key={item.title} className="rounded-3xl border border-line bg-canvas p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-lg font-black text-navy">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">The 16-week curriculum</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Four stages, two lessons a week, 32 sessions in total. This is the path from beginner concepts to a full-stack project.
            </p>
            <div className="mt-10 space-y-8">
              {months.map((month) => (
                <div key={month.label} className="rounded-3xl border border-line bg-white p-6 shadow-[0_16px_30px_rgba(16,38,75,0.04)]">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl font-black text-navy">{month.label}</h3>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{month.title}</p>
                  </div>
                  <ol className="mt-5 space-y-3 border-l border-line pl-5">
                    {month.weeks.map((weekNumber) => {
                      const entry = byWeek.get(weekNumber) ?? {
                        week: weekNumber,
                        title: weekCatalogue[weekNumber - 1][0],
                        description: weekCatalogue[weekNumber - 1][1],
                        lessons: 2,
                      };
                      return (
                        <li key={weekNumber} className="relative">
                          <span className="absolute -left-6.5 top-2.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
                          <p className="font-bold text-navy">Week {weekNumber} · {entry.title}</p>
                          <p className="mt-1 text-sm leading-6 text-muted">{entry.description}</p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">The technology you will use</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              These tools are introduced as the weeks need them, so you build confidence before moving to the next layer.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {technologies.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-3xl border border-line bg-canvas p-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-black text-navy">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">Assignments and assessment</h2>
              <ul className="mt-7 space-y-4">
                <li className="flex gap-3">
                  <PenLine className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="leading-7 text-muted">One assignment each week, usually a written response or a small piece of work you build.</span>
                </li>
                <li className="flex gap-3">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="leading-7 text-muted">One quiz each week to check your understanding before moving on.</span>
                </li>
                <li className="flex gap-3">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="leading-7 text-muted">Your instructor marks the written work and leaves feedback you can act on.</span>
                </li>
                <li className="flex gap-3">
                  <Route className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="leading-7 text-muted">Submitted work is yours to keep. Written responses and files are accepted up to 2 MB.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">What you will be able to do</h2>
              <ul className="mt-7 space-y-4">
                {outcomes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span className="leading-7 text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 rounded-4xl border border-line bg-canvas p-6 sm:p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Rocket className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">The capstone project</h2>
                <p className="mt-4 leading-8 text-muted">
                  The last week is a guided task manager. You build the frontend with React and TypeScript, the backend with Node.js and Express,
                  and store the tasks in PostgreSQL. Along the way you connect the pieces, handle basic errors, test the result, and write a README
                  that explains what you built.
                </p>
                <p className="mt-4 leading-8 text-muted">
                  It is deliberately beginner-sized: view, add, edit, delete, and complete a task, and save it to the database. The point is to finish with one project you understand and can explain.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy">
          <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Ready to see it in action?</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/80">
              Start with the first week, or get in touch if you have a question about the programme.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/register" className={buttonClass({ size: "lg", className: "bg-primary text-navy hover:bg-primary-hover" })}>
                Get Started
              </Link>
              <Link
                href="/contact"
                className={buttonClass({
                  variant: "secondary",
                  size: "lg",
                  className: "border-white/15 bg-white/5 text-white hover:bg-white/10",
                })}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </article>
    </PublicFrame>
  );
}
