import Image from "next/image";
import Link from "next/link";
import mark from "./mark.png";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block h-8 w-8 shrink-0", className)}>
      <Image src={mark} alt="" fill sizes="32px" className="object-contain" />
    </span>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "light" ? "text-white" : "text-navy";

  return (
    <Link href="/#top" className="inline-flex items-center gap-2.5">
      <Mark />
      <span className={`text-[17px] leading-none tracking-[-0.035em] ${ink}`}>
        <span className="font-bold">Marie</span>
        <span className="font-normal"> Learning</span>
      </span>
    </Link>
  );
}
