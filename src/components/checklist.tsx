"use client";

import { useState, useTransition } from "react";
import type { ChecklistItem } from "@/lib/content-types";
import { toggleChecklistItem } from "@/server/student-actions";

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const [rows, setRows] = useState(items);
  const [, start] = useTransition();
  return (
    <ul className="space-y-3">
      {rows.map((item) => (
        <li key={item.id} className="rounded-2xl border border-line bg-white p-4">
          <label className="flex gap-3">
            <input
              type="checkbox"
              className="mt-1"
              checked={item.done}
              onChange={(event) => {
                const done = event.target.checked;
                setRows((current) => current.map((row) => (row.id === item.id ? { ...row, done } : row)));
                start(() => {
                  void toggleChecklistItem(item.id, done);
                });
              }}
            />
            <span>
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block text-sm leading-6 text-muted">{item.detail}</span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
