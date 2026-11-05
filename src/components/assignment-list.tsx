"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock } from "lucide-react";
import { Badge } from "@/components/ui";

export function AssignmentList({
  rows,
}: {
  rows: {
    id: string;
    title: string;
    summary: string;
    week: string;
    status: string;
    locked?: boolean;
    lockReason?: string | null;
  }[];
}) {
  const [filter, setFilter] = useState("all");
  const visible = rows.filter((row) => {
    if (filter === "locked") return row.locked;
    if (filter === "all") return true;
    if (row.locked) return false;
    return row.status === filter;
  });
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter assignments">
        {[
          ["all", "All"],
          ["not_submitted", "Not submitted"],
          ["submitted", "Submitted"],
          ["revision_requested", "Needs revision"],
          ["accepted", "Accepted"],
          ["locked", "Locked"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${filter === value ? "bg-primary text-navy" : "bg-white ring-1 ring-line"}`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {visible.map((row) =>
          row.locked ? (
            <div key={row.id} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-navy">{row.title}</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Locked
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{row.week}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{row.lockReason ?? "Available after you finish this week's lessons."}</p>
            </div>
          ) : (
            <Link key={row.id} href={`/student/assignments/${row.id}`} className="block rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-navy">{row.title}</h2>
                <Badge>{row.status.replaceAll("_", " ")}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">{row.week}</p>
              <p className="mt-2 text-sm leading-6">{row.summary}</p>
            </Link>
          ),
        )}
        {visible.length === 0 ? <p className="text-sm text-muted">No assignments in this filter.</p> : null}
      </div>
    </div>
  );
}
