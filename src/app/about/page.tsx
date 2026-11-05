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
      <article>
        <header className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">About the programme</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{programme.title}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-muted">{programme.description}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-line bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-wide text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-bold text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">What the programme is</h2>
            <p className="mt-4 leading-7 text-muted">
              Marie Learning is one instructor-led programme for people who have never written code. It builds one
              idea at a time, from how computers and the web work, through to a small full-stack application. The
              portal keeps the lessons, live classes, assignments, and feedback in one place, so you always know what
              to do next.
            </p>
            <p className="mt-4 leading-7 text-muted">
              The pace is deliberate. Each week introduces a topic, explains it before asking you to type anything,
              and gives you exercises to practise with. By the final week you are building a project that connects a
              React page, an API, and a database.
            </p>
          </div>
        </section>

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">What you need to start</h2>
            <ul className="mt-6 space-y-3">
              {prerequisites.map((item) => (
                <li key={item} className="flex gap-3">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="leading-7 text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">How the programme runs</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {structure.map((item) => (
                <li key={item.title} className="rounded-2xl border border-line bg-canvas p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-bold text-navy">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">The 16-week curriculum</h2>
            <p className="mt-4 leading-7 text-muted">
              Four stages, two lessons a week, 32 sessions in total. Here is what each week covers.
            </p>
            <div className="mt-10 space-y-10">
              {months.map((month) => (
                <div key={month.label}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-bold text-navy">{month.label}</h3>
                    <p className="text-sm font-semibold text-primary">{month.title}</p>
                  </div>
                  <ol className="mt-4 space-y-3 border-l border-line pl-5">
                    {month.weeks.map((weekNumber) => {
                      const entry = byWeek.get(weekNumber) ?? {
                        week: weekNumber,
                        title: weekCatalogue[weekNumber - 1][0],
                        description: weekCatalogue[weekNumber - 1][1],
                        lessons: 2,
                      };
                      return (
                        <li key={weekNumber} className="relative">
                          <span className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
                          <p className="font-semibold text-navy">
                            Week {weekNumber} · {entry.title}
                          </p>
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
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">The technology you will use</h2>
            <p className="mt-4 leading-7 text-muted">
              These are the tools of the trade, introduced one at a time as the weeks need them.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {technologies.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-2xl border border-line bg-canvas p-5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
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
        </section>

        <section className="border-b border-line bg-canvas">
          <div className="mx-auto grid max-w-4xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">Assignments and assessment</h2>
              <ul className="mt-6 space-y-3">
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
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">What you will be able to do</h2>
              <ul className="mt-6 space-y-3">
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
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Rocket className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">The capstone project</h2>
                <p className="mt-4 leading-7 text-muted">
                  The last week is a guided task manager. You build the frontend with React and TypeScript, the backend
                  with Node.js and Express, and store the tasks in PostgreSQL. Along the way you connect the pieces,
                  handle basic errors, test the result, and write a README that explains what you built.
                </p>
                <p className="mt-4 leading-7 text-muted">
                  It is deliberately beginner-sized: view, add, edit, delete, and complete a task, and save it to the
                  database. The point is to finish with one project you understand and can explain.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">Ready to see it in action?</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/80">
              Start with the first week, or get in touch if you have a question about the programme.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/register" className={buttonClass({ size: "lg", className: "bg-navy text-white hover:bg-navy/90" })}>
                Get Started
              </Link>
              <Link
                href="/contact"
                className={buttonClass({
                  variant: "secondary",
                  size: "lg",
                  className: "border-navy/15 bg-white/80 text-navy hover:bg-white",
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
