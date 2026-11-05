"use client";

const codeLines = [
  { text: "const path = ['html', 'css', 'js']", tone: "slate" },
  { text: "path.push('react', 'node')", tone: "mint" },
  { text: "build(path) // week by week", tone: "amber" },
];

const terminalLines = ["$ npm run learn", "✓ lesson unlocked", "→ week 2 ready"];

/**
 * Animated abstract workspace for the hero — no portraits, no circular frames.
 * Tilted editor + terminal + floating shards with continuous motion.
 */
export function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto h-[24rem] w-full max-w-[30rem] sm:h-[28rem]" aria-hidden>
      {/* Soft rectangular glow fields */}
      <div className="hero-ambient pointer-events-none absolute left-[12%] top-[8%] h-40 w-40 rounded-3xl bg-primary/20 blur-2xl" />
      <div className="hero-ambient-delay pointer-events-none absolute bottom-[10%] right-[8%] h-32 w-32 rounded-3xl bg-primary/15 blur-2xl" />

      {/* Back panel — lesson strip */}
      <div className="hero-panel-back absolute right-0 top-6 w-[78%] -rotate-6 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Learning path</p>
          <p className="text-[10px] font-semibold text-white/50">16 weeks</p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="hero-path-bar h-1.5 flex-1 rounded-full bg-white/15"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["HTML", "CSS", "JavaScript", "React"].map((label, i) => (
            <div
              key={label}
              className="hero-tag rounded-lg border border-white/10 bg-navy/40 px-2.5 py-2 text-xs font-semibold text-white/85"
              style={{ animationDelay: `${200 + i * 120}ms` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Main editor panel */}
      <div className="hero-panel-main absolute left-0 top-16 w-[86%] rotate-[-2.5deg] overflow-hidden rounded-2xl border border-white/15 bg-[#041f1b]/95 shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-2 text-[11px] font-medium tracking-wide text-white/45">build.tsx</span>
          <span className="hero-cursor ml-auto h-4 w-0.5 bg-primary" />
        </div>
        <pre className="space-y-2.5 px-4 py-5 font-mono text-[12px] leading-6 sm:text-[13px]">
          {codeLines.map((line, index) => (
            <code
              key={line.text}
              className={`hero-type-line block whitespace-pre ${
                line.tone === "mint" ? "text-primary" : line.tone === "amber" ? "text-amber-200/90" : "text-white/80"
              }`}
              style={{ animationDelay: `${400 + index * 700}ms` }}
            >
              {line.text}
            </code>
          ))}
        </pre>
      </div>

      {/* Terminal panel */}
      <div className="hero-panel-term absolute bottom-2 right-2 w-[72%] rotate-[3deg] overflow-hidden rounded-2xl border border-primary/30 bg-navy shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="border-b border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          terminal
        </div>
        <div className="space-y-1.5 px-3 py-3 font-mono text-[11px] text-white/75 sm:text-xs">
          {terminalLines.map((line, index) => (
            <p key={line} className="hero-term-line" style={{ animationDelay: `${900 + index * 550}ms` }}>
              {line}
            </p>
          ))}
          <p className="hero-term-blink text-primary">▋</p>
        </div>
      </div>
    </div>
  );
}
