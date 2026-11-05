"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { markNotificationRead } from "@/server/student-actions";
import { cn } from "@/lib/utils";

export function NotificationItem({
  id,
  href,
  title,
  body,
  when,
  unread,
}: {
  id: string;
  href: string | null;
  title: string;
  body: string;
  when: string;
  unread: boolean;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function open() {
    start(async () => {
      if (unread) await markNotificationRead(id);
      if (href) router.push(href);
      else router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={open}
      disabled={pending}
      className={cn(
        "w-full rounded-2xl border border-line bg-white p-4 text-left shadow-sm transition hover:border-primary/40",
        unread ? "ring-1 ring-primary/20" : "opacity-90",
        pending ? "opacity-60" : "",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-bold text-navy">{title}</p>
        <span className="text-xs font-semibold text-muted">{unread ? "New" : "Read"}</span>
      </div>
      <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-xs text-muted">{when}</span>
        {href ? <span className="font-semibold text-primary">Open</span> : null}
      </div>
    </button>
  );
}
