import Image from "next/image";

/** Circular stock portrait for the About section (SkillNest-style). */
export function AboutVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute -inset-3 rounded-full bg-primary/20" aria-hidden />
      <div className="relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-[0_24px_50px_rgba(6,44,39,0.18)]">
        <Image
          src="/marketing/about-learner.jpg"
          alt="Learners collaborating on a project"
          fill
          sizes="(max-width: 1024px) 90vw, 420px"
          className="object-cover"
        />
      </div>
      <div className="absolute -bottom-2 left-6 rounded-2xl border border-line bg-white px-4 py-3 shadow-sm sm:left-8">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Beginner path</p>
        <p className="mt-1 text-sm font-semibold text-navy">16 weeks · live + written</p>
      </div>
    </div>
  );
}
