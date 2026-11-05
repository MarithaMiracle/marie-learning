export function PortalPreview() {
  return (
    <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-sm">
      <figcaption className="border-b border-line px-5 py-3 text-xs font-semibold text-muted">
        A sample of the student home. No real student is shown.
      </figcaption>
      <div className="grid gap-4 bg-canvas p-5 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-line bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Your learning</p>
          <p className="mt-2 text-lg font-bold text-navy">Good afternoon</p>
          <p className="mt-1 text-sm text-muted">Week 2 · HTML fundamentals</p>
          <p className="mt-4 text-sm font-semibold text-navy">4 of 32 lessons</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[12%] rounded-full bg-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-line bg-white p-4">
            <p className="text-xs font-bold text-muted">Continue</p>
            <p className="mt-1 font-semibold text-navy">Text, links, images, and lists</p>
            <p className="mt-1 text-sm text-muted">Session 4 · about 90 minutes</p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4">
            <p className="text-xs font-bold text-muted">Upcoming class</p>
            <p className="mt-1 text-sm font-semibold text-navy">Tuesday · 16:00 in your time zone</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
