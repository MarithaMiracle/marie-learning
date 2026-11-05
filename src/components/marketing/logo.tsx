import Image from "next/image";
import Link from "next/link";
import mark from "./mark.png";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block h-10 w-10 shrink-0 sm:h-11 sm:w-11", className)}>
      <Image src={mark} alt="" fill sizes="44px" className="object-contain" />
    </span>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "light" ? "text-white" : "text-navy";

  return (
    <Link href="/#top" className="inline-flex items-center gap-3">
      <Mark />
      <span className={`text-[20px] font-bold leading-none tracking-[-0.035em] sm:text-[22px] ${ink}`}>
        Marie Learning
      </span>
    </Link>
  );
}
