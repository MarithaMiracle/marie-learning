"use client";

import { useState } from "react";
import type { OperatingSystem, OsGuide } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const tabs = [
  ["windows", "Windows"],
  ["macos", "macOS"],
  ["linux", "Linux"],
  ["identify", "I am not sure"],
] as const;

export function OsInstructions({
  guide,
  preferred,
  stacked = false,
}: {
  guide?: OsGuide;
  preferred?: OperatingSystem | null;
  stacked?: boolean;
}) {
  const available = tabs.filter((tab) => (guide?.[tab[0]]?.length ?? 0) > 0);
  const initial = available.find((tab) => tab[0] === preferred)?.[0] ?? (preferred === "unknown" ? "identify" : available[0]?.[0] ?? "windows");
  const [active, setActive] = useState<(typeof tabs)[number][0]>(available.some((tab) => tab[0] === initial) ? initial : available[0]?.[0] ?? "windows");

  if (!guide || available.length === 0) return null;

  const stepsFor = (key: (typeof tabs)[number][0]) => guide[key] ?? [];

  return (
    <div className="mt-4 rounded-2xl border border-line bg-slate-50 p-4">
      <p className="text-sm font-bold text-navy">Choose your computer</p>
      {guide.sameOnAllPlatforms ? (
        <p className="mt-2 text-sm leading-6 text-slate-700">{guide.sameOnAllPlatforms}</p>
      ) : null}
      {stacked ? (
        <div className="mt-4 space-y-4">
          {available.map(([key, label]) => (
            <section key={key}>
              <h3 className="text-sm font-bold text-ink">{label}</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-700">
                {stepsFor(key).map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Operating system">
            {available.map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active === key}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-semibold",
                  active === key ? "bg-primary text-navy" : "bg-white text-navy/80 ring-1 ring-line",
                )}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700" role="tabpanel">
            {stepsFor(active).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
