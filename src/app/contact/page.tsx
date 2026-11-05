import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, Users } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { PublicFrame } from "@/components/public-frame";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Marie Learning about the beginner software development programme.",
};

const help = [
  {
    icon: BookOpen,
    title: "Questions about the programme",
    text: "Not sure whether it is right for you, or what a typical week looks like? Ask us anything.",
  },
  {
    icon: Users,
    title: "Getting started",
    text: "Enrolment is invitation-based. Tell us who you are and we can arrange an account for you.",
  },
  {
    icon: Calendar,
    title: "Current students",
    text: "Already enrolled? Your instructor answers questions in class and through the portal.",
  },
  {
    icon: Clock,
    title: "What happens next",
    text: "Your message goes straight to your instructor, who replies to the email you give.",
  },
];

export default function ContactPage() {
  return (
    <PublicFrame>
      <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Contact us</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Have questions about learning with us?
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Whether you want to understand the programme better or need help getting started, we would be happy to hear
          from you. Send a short message and your instructor will reply.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-5">
            {help.map((item) => (
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

          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_18px_40px_rgba(6,44,39,0.08)] sm:p-8">
            <h2 className="text-lg font-bold text-navy">Send a message</h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted">
          Want the details first? Read{" "}
          <Link href="/about" className="font-semibold text-primary hover:underline">
            About the Programme
          </Link>{" "}
          or the{" "}
          <Link href="/faqs" className="font-semibold text-primary hover:underline">
            FAQs
          </Link>
          .
        </p>
      </article>
    </PublicFrame>
  );
}
