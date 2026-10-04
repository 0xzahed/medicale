import Link from "next/link";
import { PageShell } from "@/components/layout";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary"><SearchX className="h-8 w-8" /></span>
        <h1 className="mt-6 text-4xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get you back to care.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="inline-flex h-11 items-center rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark">Back to Home</Link>
          <Link href="/doctors" className="inline-flex h-11 items-center rounded-xl border border-line bg-white px-5 font-bold text-ink hover:border-primary hover:text-primary">Find a Doctor</Link>
        </div>
      </div>
    </PageShell>
  );
}
