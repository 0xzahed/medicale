 "use client";
import Link from "next/link";
import { PageShell } from "@/components/layout";
import { Card } from "@/components/ui";
import { blogs } from "@/lib/data";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogPage() {
  return (
    <PageShell>
      <div className="border-b border-line bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">Health Journal</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Evidence-based health insights</h1>
        <div className="mt-4 flex flex-wrap gap-2">{["All", "Health Tips", "Nutrition", "Mental Wellness", "Medical News", "Preventive Care"].map((c, i) => <span key={c} className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${i === 0 ? "border-primary bg-primary text-white" : "border-line bg-white text-muted"}`}>{c}</span>)}</div>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[...blogs, ...blogs.map((b) => ({ ...b, id: b.id + "-2", title: b.title + " — Part 2" }))].map((b) => (
            <article key={b.id} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-float">
              <div className="flex h-44 items-end justify-between p-5" style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}88)` }}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{b.category}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-white"><Clock className="h-3 w-3" />{b.read}</span>
              </div>
              <div className="p-5">
                <h2 className="font-bold leading-snug text-ink group-hover:text-primary">{b.title}</h2>
                <p className="mt-3 text-xs text-muted">{b.author} • {b.date}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-primary">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </article>
          ))}
        </div>
        <Card className="mt-10 flex flex-col items-center p-8 text-center">
          <h2 className="text-xl font-extrabold text-ink">Get weekly health tips in your inbox</h2>
          <form className="mt-4 flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input required type="email" placeholder="you@mail.com" className="h-11 flex-1 rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" aria-label="Email for newsletter" />
            <button className="h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">Subscribe</button>
          </form>
        </Card>
        <p className="mt-6 text-center text-sm"><Link href="/" className="font-bold text-primary">← Back to home</Link></p>
      </div>
    </PageShell>
  );
}
