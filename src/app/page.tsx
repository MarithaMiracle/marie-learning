import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Layout,
  MonitorPlay,
  PenLine,
  Route,
  Server,
} from "lucide-react";
import { AboutVisual } from "@/components/marketing/about-visual";
import { HeroDoodles } from "@/components/marketing/hero-doodles";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { PortalPreview } from "@/components/marketing/portal-preview";
import { TechMarquee } from "@/components/marketing/tech-marquee";
import { SiteNav } from "@/components/marketing/site-nav";
import { TornEdge } from "@/components/marketing/torn-edge";
import { PublicFrame, registrationIsOpen } from "@/components/public-frame";
import { buttonClass } from "@/components/ui";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { months } from "@/lib/catalogue";
import { getPublicCatalogue } from "@/server/public-data";
import Image from "next/image";

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

const approach = [
  { icon: Route, title: "A set path", text: "You can see the week you are on and the week that follows." },
  { icon: BookOpen, title: "Beginner instruction", text: "Lessons explain the idea before they ask you to type it." },
  { icon: PenLine, title: "Learning by doing", text: "Each class has exercises, and each week has work to hand in." },
  { icon: CheckCircle2, title: "Your own progress", text: "The portal records lessons, assignments, quizzes, and classes for your account." },
] as const;


export default async function HomePage() {
  const user = await getCurrentUser();
  const registrationOpen = registrationIsOpen();
  const signedInHref = user ? homeFor(user.role) : null;
  const weeks = await getPublicCatalogue();
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

        <section className="border-y border-line bg-canvas/50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-primary">What you learn</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  The tools of modern web development.
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-8 text-muted">
                  One practical skill at a time — from the first HTML page to a small full-stack application.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "JavaScript",
                    "TypeScript",
                    "Next.js",
                    "React",
                    "Node.js",
                    "PostgreSQL",
                    "Git & GitHub",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <TechMarquee />
              </div>
            </div>
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
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-navy"
              >
                Explore the full 16-week curriculum
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">The student portal</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">A structured learning experience.</h2>
              <p className="mt-3 leading-7 text-muted">
                Lessons, assignments, quizzes, progress tracking, and instructor guidance live in one place, so you always know what to do next.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl border border-line shadow-[0_18px_40px_rgba(6,44,39,0.08)]">
              <PortalPreview />
            </div>
          </div>
        </section>


        <section className="bg-primary">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Ready to take your first step?
            </h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-navy/80">
              Discover the programme in detail, or speak with us if you have questions before you start.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={startHref} className={buttonClass({ size: "lg", className: "bg-navy text-white hover:bg-navy/90" })}>
                {signedInHref ? "Go to dashboard" : "Get Started"}
              </Link>
              <Link
                href="/about"
                className={buttonClass({
                  variant: "secondary",
                  size: "lg",
                  className: "border-navy/15 bg-white/80 text-navy hover:bg-white",
                })}
              >
                Explore the Programme
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
            {registrationOpen || signedInHref ? null : (
              <p className="mt-5 text-sm text-navy/80">
                Open registration is off. Ask your instructor for an account, then log in.
              </p>
            )}
          </div>
        </section>
      </div>
    </PublicFrame>
  );
}
