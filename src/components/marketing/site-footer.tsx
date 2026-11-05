import Link from "next/link";
import { Logo } from "@/components/marketing/logo";
import { publicNavLinks } from "@/components/marketing/nav-links";
import { programme } from "@/lib/catalogue";

export function SiteFooter({
  signedInHref,
  registrationOpen,
}: {
  signedInHref?: string | null;
  registrationOpen: boolean;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{programme.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-bold text-navy">On this page</p>
          <ul className="mt-3 space-y-2 text-sm">
            {publicNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-muted hover:text-primary">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Account and policies">
          <p className="text-sm font-bold text-navy">Account</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              {signedInHref ? (
                <Link href={signedInHref} className="text-muted hover:text-primary">Go to dashboard</Link>
              ) : (
                <Link href="/login" className="text-muted hover:text-primary">Log in</Link>
              )}
            </li>
            {signedInHref ? null : (
              <li>
                <Link href="/register" className="text-muted hover:text-primary">
                  {registrationOpen ? "Get Started" : "Registration"}
                </Link>
              </li>
            )}
            <li><Link href="/privacy" className="text-muted hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-muted hover:text-primary">Terms of Service</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted sm:px-6">
          © {year} Marie Learning. Questions about a place on the programme go to your instructor.
        </p>
      </div>
    </footer>
  );
}
