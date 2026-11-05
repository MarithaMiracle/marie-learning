"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { publicNavLinks } from "@/components/marketing/nav-links";
import { buttonClass } from "@/components/ui";

export function SiteNav({
  signedInHref,
  registrationOpen,
}: {
  signedInHref?: string | null;
  registrationOpen: boolean;
}) {
  const [open, setOpen] = useState(false);
  const startHref = signedInHref ?? "/register";
  const startLabel = signedInHref ? "Go to dashboard" : "Get Started";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Public">
          {publicNavLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-ink hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {signedInHref ? null : (
            <Link href="/login" className={buttonClass({ variant: "ghost", size: "sm" })}>
              Log In
            </Link>
          )}
          <Link href={startHref} className={buttonClass({ size: "sm" })}>
            {startLabel}
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="public-menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <div id="public-menu" className="border-t border-line bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6" aria-label="Public mobile">
            {publicNavLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg px-2 py-3 text-sm font-semibold text-ink hover:bg-slate-50" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line py-3">
              {signedInHref ? null : (
                <Link href="/login" className={buttonClass({ variant: "secondary" })} onClick={() => setOpen(false)}>
                  Log In
                </Link>
              )}
              <Link href={startHref} className={buttonClass()} onClick={() => setOpen(false)}>
                {startLabel}
              </Link>
              {registrationOpen ? null : (
                <p className="px-1 text-sm leading-6 text-muted">Open registration is off. Your instructor creates the account, then you log in.</p>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
