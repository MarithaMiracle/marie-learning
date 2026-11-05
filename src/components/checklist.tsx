"use client";

import { useState, useTransition } from "react";
import type { ChecklistItem } from "@/lib/content-types";
import { toggleChecklistItem } from "@/server/student-actions";

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const [rows, setRows] = useState(items);
  const [, start] = useTransition();
  return (
    <ul className="divide-y divide-line">
      {rows.map((item) => (
        <li key={item.id} className="py-5 first:pt-0 last:pb-0">
          <label className="group flex cursor-pointer gap-4">
            <div className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-line bg-white transition-all checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                checked={item.done}
                onChange={(event) => {
                  const done = event.target.checked;
                  setRows((current) => current.map((row) => (row.id === item.id ? { ...row, done } : row)));
                  start(() => {
                    void toggleChecklistItem(item.id, done);
                  });
                }}
              />
              <svg
                className="pointer-events-none absolute h-3.5 w-3.5 text-navy opacity-0 transition-opacity peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="flex-1">
              <span className={`block text-lg font-bold leading-tight text-navy transition-colors ${item.done ? "text-navy/50 line-through decoration-primary/30" : ""}`}>
                {item.label}
              </span>
              <span className={`mt-1.5 block text-sm leading-relaxed text-muted transition-colors ${item.done ? "text-muted/60" : ""}`}>
                {item.detail}
              </span>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}
