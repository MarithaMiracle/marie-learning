import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleHelp } from "lucide-react";
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
      <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-line bg-linear-to-br from-primary/10 via-white to-white p-6 shadow-[0_24px_60px_rgba(16,38,75,0.05)] sm:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CircleHelp className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">FAQs</p>
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight text-navy sm:text-5xl">
            Questions before you join
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            Straight answers about the programme, what you need, and how to get started.
          </p>

          <div className="mt-8">
            <FaqList />
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
            <Link href="/register" className={buttonClass({ size: "lg" })}>
              Get Started
            </Link>
            <Link href="/#programme" className={buttonClass({ variant: "secondary", size: "lg" })}>
              Explore the Programme
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Need something more specific? Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </PublicFrame>
  );
}
