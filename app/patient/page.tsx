"use client";
import Link from "next/link";
import { CalendarCheck, Clock, Download, FileText, MapPin, Microscope, Pill, Video, Wallet } from "lucide-react";
import { PortalPage } from "@/components/portal";
import { patientNav } from "@/components/layout";
import { Card, Badge, Button, StatCard, EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";
import { labsSeed, prescriptionsSeed, recordsSeed } from "@/lib/data";

export default function PatientDashboard() {
  const { appointments, updateStatus, pushToast } = useStore();
  const mine = appointments.filter((a) => a.patient === "Sarah Mitchell");
  const upcoming = mine.filter((a) => a.status === "Confirmed" || a.status === "Pending").slice(0, 3);

  return (
    <PortalPage items={patientNav} base="/patient" title="Good morning, Sarah" subtitle="Here's your health overview for today, Sep 27, 2026.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={<CalendarCheck className="h-5 w-5" />} label="Upcoming" value={String(upcoming.length)} sub="Next: Sep 28, 10:30 AM" color="#0F6B78" />
        <StatCard icon={<FileText className="h-5 w-5" />} label="Visits Completed" value="6" sub="+2 this quarter" trend="+12%" color="#19A7A8" />
        <StatCard icon={<Pill className="h-5 w-5" />} label="Prescriptions" value="2" sub="1 active refill" color="#36CFC9" />
        <StatCard icon={<Microscope className="h-5 w-5" />} label="Lab Reports" value="4" sub="1 needs review" color="#E9A23B" />
        <StatCard icon={<Wallet className="h-5 w-5" />} label="Outstanding" value="$0" sub="All bills settled" color="#20A464" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between"><h2 className="font-extrabold text-ink">Upcoming Appointment</h2><Link href="/patient/appointments" className="text-[13px] font-bold text-primary">View all</Link></div>
            {upcoming.length === 0 ? <div className="mt-4"><EmptyState title="No upcoming appointments" desc="Book your next visit in under two minutes." action={<Link href="/appointments"><Button>Book Appointment</Button></Link>} /></div> : (
              <div className="mt-4 space-y-3">
                {upcoming.map((a) => (
                  <div key={a.id} className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary font-extrabold text-white">{a.date.slice(0, 2)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-ink">{a.doctor} <span className="ml-1 font-medium text-muted">• {a.department}</span></p>
                      <p className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[13px] text-muted"><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.date} • {a.time}</span><span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{a.location}</span></p>
                      <div className="mt-2 flex gap-2"><Badge>{a.status}</Badge><Badge>{a.type}</Badge></div>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      {a.type === "Video" && <Button size="sm" onClick={() => pushToast({ title: "Joining consultation", desc: "Secure video room opening…", kind: "info" })}><Video className="h-3.5 w-3.5" /> Join</Button>}
                      <Button size="sm" variant="outline" onClick={() => { updateStatus(a.id, "Cancelled"); pushToast({ title: "Appointment cancelled", desc: a.id, kind: "info" }); }}>Cancel</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between"><h2 className="font-extrabold text-ink">Recent Medical Records</h2><Link href="/patient/records" className="text-[13px] font-bold text-primary">View all</Link></div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead><tr className="text-xs uppercase tracking-wider text-muted"><th className="pb-2 font-semibold">Record</th><th className="pb-2 font-semibold">Doctor</th><th className="pb-2 font-semibold">Date</th><th className="pb-2 font-semibold">Status</th></tr></thead>
                <tbody>{recordsSeed.map((r) => <tr key={r.id} className="border-t border-line"><td className="py-3 font-semibold text-ink">{r.type}</td><td className="py-3 text-muted">{r.doctor}</td><td className="py-3 text-muted">{r.date}</td><td className="py-3"><Badge>{r.status}</Badge></td></tr>)}</tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between"><h2 className="font-extrabold text-ink">Prescriptions</h2><Link href="/patient/prescriptions" className="text-[13px] font-bold text-primary">All</Link></div>
            {prescriptionsSeed.slice(0, 1).map((p) => (
              <div key={p.id} className="mt-3 rounded-2xl bg-soft p-4">
                <p className="text-xs font-bold text-muted">{p.id} • {p.doctor}</p>
                {p.medicines.map((m) => <div key={m.name} className="mt-2 border-t border-line pt-2 first:border-0"><p className="text-sm font-bold text-ink">{m.name} <span className="font-medium text-muted">{m.dosage}</span></p><p className="text-xs text-muted">{m.frequency} • {m.duration} • {m.instructions}</p></div>)}
                <Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => pushToast({ title: "Prescription downloaded", desc: `${p.id}.pdf`, kind: "info" })}><Download className="h-3.5 w-3.5" /> Download</Button>
              </div>
            ))}
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between"><h2 className="font-extrabold text-ink">Lab Reports</h2><Link href="/patient/labs" className="text-[13px] font-bold text-primary">All</Link></div>
            <div className="mt-3 space-y-2">
              {labsSeed.slice(0, 3).map((l) => (
                <div key={l.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><Microscope className="h-4 w-4" /></span>
                  <span className="min-w-0 flex-1"><b className="block truncate text-[13px] text-ink">{l.test}</b><span className="text-xs text-muted">{l.date}</span></span>
                  <Badge>{l.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <Link href="/appointments" className="flex items-center justify-center gap-2 rounded-2xl bg-primary p-4 font-bold text-white shadow-card transition hover:bg-primary-dark lg:sticky lg:bottom-6"><CalendarCheck className="h-5 w-5" /> Book Appointment</Link>
        </div>
      </div>
    </PortalPage>
  );
}
