import Link from "next/link";
import { PageShell } from "@/components/layout";
import { Card, SectionHeading } from "@/components/ui";
import { Award, HeartPulse, ShieldCheck, Users, Target, Eye, Building2 } from "lucide-react";
import { doctors } from "@/lib/data";

export default function AboutPage() {
  return (
    <PageShell>
      <div className="relative overflow-hidden bg-primary-deep text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">About Medicale</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">Healthcare that puts patients first — powered by technology.</h1>
          <p className="mt-4 max-w-xl text-white/70">Since 2012, Medicale has combined private-hospital excellence with a modern digital platform: one record, one portal, zero paperwork chaos.</p>
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[["500+", "Doctors"], ["50K+", "Patients"], ["20+", "Departments"], ["4.9", "Avg. rating"]].map(([v, l]) => <div key={l} className="rounded-2xl bg-white/10 p-4 text-center"><p className="text-2xl font-extrabold">{v}</p><p className="text-xs text-white/65">{l}</p></div>)}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Our Story", "Founded by physicians and engineers, Medicale started as a single clinic and grew into a multi-specialty platform serving 50,000+ patients.", Target], ["Our Mission", "Make quality healthcare accessible, transparent and coordinated — with honest pricing and same-week appointments.", HeartPulse], ["Our Vision", "A world where every patient owns their health data and every doctor has the full clinical picture.", Eye]].map(([t, d, Icon]) => {
            const I = Icon as typeof Target;
            return <Card key={t as string} className="p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5" /></span><h2 className="mt-4 font-extrabold text-ink">{t as string}</h2><p className="mt-2 text-sm leading-relaxed text-muted">{d as string}</p></Card>;
          })}
        </div>
        <SectionHeading eyebrow="Why Choose Us" title="The Medicale standard of care" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Verified specialists", "Board-certified doctors with published outcomes.", ShieldCheck], ["Zero-wait scheduling", "Real-time slots with SMS + portal reminders.", Award], ["One health record", "Visits, labs, prescriptions — unified and portable.", Building2], ["Transparent pricing", "Upfront fees, no surprise billing, ever.", Users]].map(([t, d, Icon]) => {
            const I = Icon as typeof ShieldCheck;
            return <Card key={t as string} className="p-5"><I className="h-5 w-5 text-secondary" /><p className="mt-3 font-bold text-ink">{t as string}</p><p className="mt-1 text-[13px] text-muted">{d as string}</p></Card>;
          })}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-extrabold text-ink">Meet our medical experts</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.slice(0, 4).map((d) => (
              <Link key={d.id} href={`/doctors/${d.id}`} className="rounded-2xl border border-line bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-float">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl font-extrabold text-white" style={{ background: d.color }}>{d.initials}</span>
                <p className="mt-3 font-bold text-ink">{d.name}</p><p className="text-[13px] text-primary">{d.specialty}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
