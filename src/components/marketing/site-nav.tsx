"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { publicNavLinks } from "@/components/marketing/nav-links";
import { buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

export function SiteNav({
  signedInHref,
  registrationOpen,
  tone = "light",
}: {
  signedInHref?: string | null;
  registrationOpen: boolean;
  /** `dark` sits on the navy hero as a floating frosted pill. */
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const startHref = signedInHref ?? "/register";
  const startLabel = signedInHref ? "Go to dashboard" : "Get Started";
  const onDark = tone === "dark";
  const lightInk = onDark;

  useEffect(() => {
    if (tone !== "dark") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tone]);

  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-6 sm:px-4 sm:pt-7">
      <div className="pointer-events-auto mx-auto max-w-5xl">
        <div
          className={cn(
            "flex h-14 items-center justify-between gap-3 rounded-full border px-3 pl-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-4",
            onDark
              ? scrolled || open
                ? "border-white/15 bg-navy/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
                : "border-transparent bg-transparent shadow-none"
              : "border-line bg-white/90 shadow-[0_10px_30px_rgba(6,44,39,0.08)] backdrop-blur-md",
          )}
        >
          <Logo tone={lightInk ? "light" : "dark"} />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Public">
            {publicNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                  lightInk
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-ink hover:bg-slate-100 hover:text-primary",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            {signedInHref ? null : (
              <Link
                href="/login"
                className={buttonClass({
                  variant: "ghost",
                  size: "sm",
                  className: cn(
                    "rounded-full",
                    lightInk ? "text-white hover:bg-white/10" : undefined,
                  ),
                })}
              >
                Log In
              </Link>
            )}
            <Link href={startHref} className={buttonClass({ size: "sm", className: "rounded-full" })}>
              {startLabel}
            </Link>
          </div>
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              lightInk ? "text-white hover:bg-white/10" : "text-navy hover:bg-slate-100",
            )}
            aria-expanded={open}
            aria-controls="public-menu"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {open ? (
          <div
            id="public-menu"
            className={cn(
              "mt-2 overflow-hidden rounded-3xl border lg:hidden",
              lightInk
                ? "border-white/15 bg-navy/95 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
                : "border-line bg-white shadow-[0_16px_40px_rgba(6,44,39,0.1)]",
            )}
          >
            <nav className="flex flex-col px-3 py-3" aria-label="Public mobile">
              {publicNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-3 py-3 text-sm font-semibold",
                    lightInk ? "text-white/90 hover:bg-white/10" : "text-ink hover:bg-slate-50",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div
                className={cn(
                  "mt-2 flex flex-col gap-2 border-t px-1 py-3",
                  lightInk ? "border-white/10" : "border-line",
                )}
              >
                {signedInHref ? null : (
                  <Link
                    href="/login"
                    className={buttonClass({
                      variant: "secondary",
                      className: cn(
                        "rounded-full",
                        lightInk ? "border-white/20 bg-white/10 text-white hover:bg-white/15" : undefined,
                      ),
                    })}
                    onClick={() => setOpen(false)}
                  >
                    Log In
                  </Link>
                )}
                <Link
                  href={startHref}
                  className={buttonClass({ className: "rounded-full" })}
                  onClick={() => setOpen(false)}
                >
                  {startLabel}
                </Link>
                {registrationOpen ? null : (
                  <p className={cn("px-2 text-sm leading-6", lightInk ? "text-white/65" : "text-muted")}>
                    Open registration is off. Your instructor creates the account, then you log in.
                  </p>
                )}
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
