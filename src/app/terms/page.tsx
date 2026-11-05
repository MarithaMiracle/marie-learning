import type { Metadata } from "next";
import { PublicFrame } from "@/components/public-frame";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <PublicFrame>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold text-navy">Terms of Service</h1>
        <p className="mt-4 leading-7 text-muted">
          These are the rules for using Marie Learning. They describe how the programme works. They are not a promise of employment or of mastery after 16 weeks.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">The programme</h2>
        <p className="mt-2 leading-7">
          The programme is 16 weeks, with two instructor-led sessions each week, written lessons, one assignment and one quiz each week, and a guided task manager at the end. Your instructor teaches the class and marks the written work.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">Accounts</h2>
        <p className="mt-2 leading-7">
          Use your own account. Keep the password private. When open registration is turned off, the instructor creates the student account. You can be signed out, and an instructor can deactivate a student account.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">Your work</h2>
        <p className="mt-2 leading-7">
          Submit work that is yours to share. Do not include another person’s private information. Files are limited to 2 MB. Accepted work stays as it was marked unless the instructor asks for a revision before accepting it.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">The limit of the course</h2>
        <p className="mt-2 leading-7">
          Completing the weeks gives you a foundation and a project you can explain. It does not confer a qualification, a job, or a claim that you know every tool in the field.
        </p>
      </article>
    </PublicFrame>
  );
}
