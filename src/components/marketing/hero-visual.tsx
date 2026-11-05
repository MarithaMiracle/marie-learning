const lines = [
  [
    { text: "function", tone: "text-[#b7ebe6]" },
    { text: " TaskList() {", tone: "text-slate-100" },
  ],
  [
    { text: "  const", tone: "text-[#b7ebe6]" },
    { text: " [tasks, setTasks] = useState([])", tone: "text-slate-100" },
  ],
  [{ text: "", tone: "text-slate-100" }],
  [
    { text: "  return", tone: "text-[#b7ebe6]" },
    { text: " (", tone: "text-slate-100" },
  ],
  [
    { text: "    <form", tone: "text-emerald-300" },
    { text: " onSubmit={addTask}>", tone: "text-slate-100" },
  ],
  [
    { text: "      <input", tone: "text-emerald-300" },
    { text: " name=\"title\" />", tone: "text-amber-200" },
  ],
  [{ text: "    </form>", tone: "text-emerald-300" }],
  [{ text: "  )", tone: "text-slate-100" }],
  [{ text: "}", tone: "text-slate-100" }],
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-16 pt-8 sm:pb-8" aria-hidden>
      <div className="rounded-[1.75rem] border border-line bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2 px-2 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="ml-2 text-xs font-medium text-muted">task-list.tsx</span>
        </div>
        <pre className="overflow-hidden rounded-2xl bg-navy p-5 text-[13px] leading-6">
          <code>
            {lines.map((line, index) => (
              <span key={index} className="block">
                {line.map((part) => (
                  <span key={part.text || "blank"} className={part.tone}>{part.text || " "}</span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="absolute bottom-0 left-0 w-44 rounded-2xl border border-line bg-white p-3 shadow-sm sm:left-[-1rem]">
        <p className="text-xs font-bold text-primary">Lesson</p>
        <p className="mt-1 text-sm font-semibold text-navy">Week 2 · HTML</p>
        <p className="mt-1 text-xs leading-5 text-muted">Headings, links, and lists.</p>
      </div>
      <div className="absolute right-0 top-0 w-40 rounded-2xl border border-line bg-white p-3 shadow-sm sm:right-[-0.5rem]">
        <p className="text-xs font-bold text-primary">Assignment</p>
        <p className="mt-1 text-sm font-semibold text-navy">Waiting for review</p>
        <p className="mt-1 text-xs leading-5 text-muted">Your instructor marks it.</p>
      </div>
    </div>
  );
}
