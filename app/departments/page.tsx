import Link from "next/link";
import { PageShell } from "@/components/layout";
import { Card, Badge } from "@/components/ui";
import { serviceIcon } from "@/lib/icons";
import { departments } from "@/lib/data";
import { ArrowRight, Users } from "lucide-react";

export default function DepartmentsPage() {
  return (
    <PageShell>
      <div className="border-b border-line bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">Departments</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Specialized departments, expert teams</h1>
        <p className="mt-3 max-w-xl text-muted">Each department is led by senior consultants with dedicated nursing, diagnostics and rehab support.</p>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d) => (
            <Card key={d.id} className="group p-6 transition-all hover:-translate-y-1 hover:shadow-float">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/[0.07] text-primary transition group-hover:bg-primary group-hover:text-white">{serviceIcon(d.icon)}</span>
              <h2 className="mt-4 font-extrabold text-ink">{d.name}</h2>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{d.description}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted"><span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {d.doctors} doctors</span><span>{d.patients.toLocaleString()} patients</span></div>
              <div className="mt-3 flex items-center justify-between"><Badge>{d.status}</Badge><Link href={`/doctors`} className="inline-flex items-center gap-1 text-[13px] font-bold text-primary">Doctors <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
