import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-navy">That page is not available</h1>
      <p className="mt-3 text-sm leading-6 text-muted">The link may be wrong, or you may not have permission to open it.</p>
      <Link href="/" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-navy">
        Back to the start
      </Link>
    </main>
  );
}
