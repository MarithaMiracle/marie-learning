/**
 * Sparse hero atmosphere: web-sourced CC0/MIT doodles (not Lucide).
 * Book + cap + code sit in gutters so they never fight the headline or workspace.
 */
export function HeroDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Open book — left gutter */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marketing/doodles/book-open.png"
        alt=""
        className="absolute left-[1.5%] top-[26%] hidden h-14 w-[4.5rem] -rotate-[12deg] opacity-[0.12] sm:block lg:left-[3%] lg:top-[30%] lg:h-[4.5rem] lg:w-24"
        width={120}
        height={96}
        decoding="async"
      />

      {/* Graduation cap — right gutter, upper (clear of workspace panels) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marketing/doodles/graduation-cap.png"
        alt=""
        className="absolute right-[6%] top-[14%] hidden h-14 w-[4.25rem] rotate-[12deg] opacity-[0.12] sm:block lg:right-[8%] lg:top-[15%] lg:h-[4.5rem] lg:w-24"
        width={120}
        height={96}
        decoding="async"
      />

      {/* Code brackets — middle bottom of hero */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marketing/doodles/code-bracket.svg"
        alt=""
        className="absolute bottom-[18%] left-1/2 hidden h-14 w-16 -translate-x-1/2 -rotate-[8deg] opacity-[0.05] sm:block lg:bottom-[20%] lg:h-16 lg:w-20"
        width={120}
        height={100}
        decoding="async"
      />
    </div>
  );
}
