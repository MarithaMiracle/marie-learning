/**
 * Real torn-paper seam using a jagged SVG asset (not a smooth wave / filter).
 * Sits at the bottom of the dark hero; fill matches the page canvas.
 */
export function TornEdge({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative edge asset must stretch without Next Image constraints */}
      <img
        src="/torn-edge.svg"
        alt=""
        className="block h-16 w-full object-fill drop-shadow-[0_-6px_10px_rgba(0,0,0,0.18)] sm:h-[5.5rem]"
        width={2400}
        height={200}
        decoding="async"
      />
    </div>
  );
}
