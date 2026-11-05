import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";

export function registrationIsOpen() {
  return process.env.ALLOW_STUDENT_REGISTRATION === "true";
}

export function PublicFrame({
  children,
  signedInHref,
}: {
  children: React.ReactNode;
  signedInHref?: string | null;
}) {
  const registrationOpen = registrationIsOpen();
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <SiteNav signedInHref={signedInHref} registrationOpen={registrationOpen} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter signedInHref={signedInHref} registrationOpen={registrationOpen} />
    </div>
  );
}
