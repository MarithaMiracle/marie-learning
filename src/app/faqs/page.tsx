import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/marketing/faq-list";
import { PublicFrame } from "@/components/public-frame";
import { buttonClass } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Common questions about the Marie Learning beginner programme.",
};

export default function FaqsPage() {
  return (
    <PublicFrame>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">FAQs</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Questions before you join
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">
          Straight answers about the programme, what you need, and how to get started.
        </p>
        <div className="mt-10">
          <FaqList />
        </div>
        <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-10">
          <Link href="/register" className={buttonClass({ size: "lg" })}>
            Get Started
          </Link>
          <Link href="/#programme" className={buttonClass({ variant: "secondary", size: "lg" })}>
            Explore the Programme
          </Link>
        </div>
      </article>
    </PublicFrame>
  );
}
