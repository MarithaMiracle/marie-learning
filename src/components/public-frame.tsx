import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";

export function registrationIsOpen() {
  return process.env.ALLOW_STUDENT_REGISTRATION === "true";
}

export function PublicFrame({
  children,
  signedInHref,
  chrome = "default",
}: {
  children: React.ReactNode;
  signedInHref?: string | null;
  /** `hero` skips the outer sticky nav so the home page can place it inside the full-bleed hero. */
  chrome?: "default" | "hero";
}) {
  const registrationOpen = registrationIsOpen();
  return (
    <div className="theme-skillnest flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      {chrome === "default" ? (
        <SiteNav signedInHref={signedInHref} registrationOpen={registrationOpen} />
      ) : null}
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter signedInHref={signedInHref} registrationOpen={registrationOpen} />
    </div>
  );
}
