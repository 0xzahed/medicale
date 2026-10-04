import Link from "next/link";
import { PageShell } from "@/components/layout";
import { SectionHeading, Card } from "@/components/ui";
import { ServiceCard } from "@/components/cards";
import { services, departments } from "@/lib/data";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";

export default function ServicesPage() {
  return (
    <PageShell>
      <div className="border-b border-line bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">Services</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Comprehensive services, one connected platform</h1>
        <p className="mt-3 max-w-xl text-muted">Every service shares one medical record — so your care team always has the full picture.</p>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card className="p-7">
            <h2 className="text-xl font-extrabold text-ink">How it works</h2>
            <ol className="mt-4 space-y-4">
              {[["1", "Find your doctor", "Search by specialty, availability and consultation type."], ["2", "Book in 2 minutes", "Pick a slot, confirm details and pay online or at clinic."], ["3", "Get treated", "In-clinic or video visit with shared records."], ["4", "Follow up digitally", "Prescriptions, labs and reminders in your portal."]].map(([n, t, d]) => (
                <li key={n} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary font-extrabold text-white">{n}</span><span><b className="block text-ink">{t}</b><span className="text-sm text-muted">{d}</span></span></li>
              ))}
            </ol>
            <Link href="/appointments" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark">Book now <ArrowRight className="h-4 w-4" /></Link>
          </Card>
          <Card className="bg-primary-deep p-7 text-white">
            <h2 className="text-xl font-extrabold">Opening hours</h2>
            <div className="mt-4 space-y-2.5 text-sm">
              {[["Mon – Fri", "08:00 – 20:00"], ["Saturday", "09:00 – 18:00"], ["Sunday", "10:00 – 14:00"], ["Emergency", "24 / 7"]].map(([d, h]) => <div key={d} className="flex justify-between border-b border-white/10 pb-2.5"><span className="text-white/70">{d}</span><b>{h}</b></div>)}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-accent" /> +1 (415) 555-0100</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/70"><MapPin className="h-4 w-4" /> 480 Medical Plaza, San Francisco</p>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

export function DepartmentsPageInner() { return null; }
