import Link from "next/link";
import { Lock } from "lucide-react";
import { Card, buttonClass } from "@/components/ui";

export function LockedContent({
  title,
  reason,
  actionHref,
  actionLabel,
}: {
  title: string;
  reason: string;
  actionHref?: string | null;
  actionLabel?: string | null;
}) {
  return (
    <Card className="mt-4 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-navy">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{reason}</p>
          {actionHref && actionLabel ? (
            <Link href={actionHref} className={`${buttonClass({ size: "sm" })} mt-4`}>
              {actionLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function LockedBadge({ reason }: { reason?: string | null }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
      title={reason ?? "Locked"}
    >
      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
      Locked
    </span>
  );
}
