import type { Metadata } from "next";
import { PublicFrame } from "@/components/public-frame";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PublicFrame>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold text-navy">Privacy Policy</h1>
        <p className="mt-4 leading-7 text-muted">
          Marie Learning stores the information needed to run the programme. This page describes that information. It is not a notice from a separate company, and the site does not publish a postal address.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">Account</h2>
        <p className="mt-2 leading-7">
          An account stores your name, email address, a hashed password, role, time zone, and whether onboarding is complete. A session cookie named for this site keeps you signed in. The cookie is HTTP-only.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">Student profile</h2>
        <p className="mt-2 leading-7">
          After you join, the profile can store your country, operating system, computer experience, coding experience, goals, weekly practice time, and setup checklist. Your instructor can see that profile because they teach you.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">Learning records</h2>
        <p className="mt-2 leading-7">
          The platform stores lesson progress, assignment submissions, quiz attempts, class bookings, announcements you can read, and notes you write. Instructor notes and answer keys are not shown on student pages.
        </p>
        <h2 className="mt-8 text-xl font-bold text-navy">What this site does not do</h2>
        <p className="mt-2 leading-7">
          The site does not sell accounts, and it does not add advertising trackers. Password reset email is sent only when email delivery is configured. Otherwise your instructor can set a new password.
        </p>
      </article>
    </PublicFrame>
  );
}
