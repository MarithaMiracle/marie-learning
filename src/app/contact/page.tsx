import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, MessageSquareText, Users } from "lucide-react";
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
      <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-line bg-linear-to-br from-primary/12 via-white to-white p-6 shadow-[0_24px_60px_rgba(16,38,75,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact us</p>
              <h1 className="mt-3 max-w-xl text-4xl font-black tracking-tight text-navy sm:text-5xl">
                Have questions about learning with us?
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-muted">
                Whether you want to understand the programme better or need help getting started, we would be happy to hear
                from you. Send a short message and your instructor will reply.
              </p>

              <ul className="mt-8 space-y-4">
                {help.map((item) => (
                  <li key={item.title} className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_12px_24px_rgba(16,38,75,0.03)]">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
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

            <div className="rounded-4xl border border-line bg-white p-5 shadow-[0_18px_40px_rgba(16,38,75,0.08)] sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageSquareText className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="text-xl font-black text-navy">Send a message</h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted">
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
