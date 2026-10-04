"use client";
import { useState } from "react";
import { CalendarCheck, Clock, Phone, Star, Users, Video, Wallet, FileText, Plus, Download, Search, Trash2, Send } from "lucide-react";
import { PortalPage } from "@/components/portal";
import { doctorNav } from "@/components/layout";
import { Card, Badge, Button, StatCard, Field, Input, Select, Textarea, Tabs, EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";
import { patientsSeed } from "@/lib/data";
import { cn } from "@/lib/utils";

function Wrap({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return <PortalPage items={doctorNav} base="/doctor" title={title} subtitle={subtitle}>{children}</PortalPage>;
}

export default function DoctorDashboard() {
  const { appointments, updateStatus, pushToast } = useStore();
  const today = appointments.slice(0, 6);
  return (
    <Wrap title="Good morning, Dr. Hart" subtitle="You have 6 appointments today • 2 pending requests.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<CalendarCheck className="h-5 w-5" />} label="Today's Appointments" value="6" sub="3 completed • 3 remaining" color="#0F6B78" />
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Patients" value="5,200" sub="+38 this month" trend="+8%" color="#19A7A8" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Pending Requests" value="2" sub="Needs your approval" color="#E9A23B" />
        <StatCard icon={<Wallet className="h-5 w-5" />} label="Today's Earnings" value="$510" sub="Payout every Friday" trend="+15%" color="#20A464" />
      </div>
      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between p-5"><h2 className="font-extrabold text-ink">Today&apos;s Schedule</h2><span className="text-[13px] font-bold text-primary">Sep 28, 2026</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">
          <thead><tr className="bg-soft text-xs uppercase tracking-wider text-muted"><th className="px-5 py-3 font-semibold">Time</th><th className="px-5 py-3 font-semibold">Patient</th><th className="px-5 py-3 font-semibold">Type</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold text-right">Action</th></tr></thead>
          <tbody>{today.map((a, i) => (
            <tr key={a.id + i} className="border-t border-line">
              <td className="px-5 py-3.5 font-bold text-ink">{a.time}</td>
              <td className="px-5 py-3.5"><b className="block text-ink">{a.patient}</b><span className="text-xs text-muted">{a.id} • {a.department}</span></td>
              <td className="px-5 py-3.5"><Badge>{a.type}</Badge></td>
              <td className="px-5 py-3.5"><Badge>{a.status}</Badge></td>
              <td className="px-5 py-3.5"><div className="flex justify-end gap-1.5">
                <Button size="sm" variant="outline" onClick={() => pushToast({ title: "Patient chart opened", desc: a.patient, kind: "info" })}>View</Button>
                <Button size="sm" onClick={() => pushToast({ title: "Consultation started", desc: `Room ${a.id}`, kind: "success" })}><Video className="h-3.5 w-3.5" /> Start</Button>
              </div></td>
            </tr>))}
          </tbody></table></div>
      </Card>
    </Wrap>
  );
}

export function SchedulePage() {
  const { appointments, updateStatus, pushToast } = useStore();
  return <Wrap title="Schedule" subtitle="Approve, reschedule or cancel requests.">
    <div className="space-y-3">{appointments.map((a) => <Card key={a.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-sm font-extrabold text-primary">{a.time.split(" ")[0]}</span><div className="flex-1"><b className="text-ink">{a.patient}</b><p className="text-[13px] text-muted">{a.date} • {a.time} • {a.department} • {a.type}</p></div><Badge>{a.status}</Badge><div className="flex gap-1.5"><Button size="sm" variant="outline" onClick={() => pushToast({ title: "Reschedule link sent", desc: a.patient, kind: "info" })}>Reschedule</Button><Button size="sm" onClick={() => { updateStatus(a.id, "Confirmed"); pushToast({ title: "Appointment confirmed", desc: a.id, kind: "success" }); }}>Confirm</Button><Button size="sm" variant="danger" onClick={() => { updateStatus(a.id, "Cancelled"); pushToast({ title: "Appointment cancelled", desc: a.id, kind: "info" }); }}>Cancel</Button></div></Card>)}</div>
  </Wrap>;
}

export function PatientsPage() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const list = patientsSeed.filter((p) => (p.name + p.email + p.id).toLowerCase().includes(q.toLowerCase()));
  const active = patientsSeed.find((p) => p.id === sel);
  return <Wrap title="Patients" subtitle={`${list.length} patients under your care.`}>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-line bg-white px-3"><Search className="h-4 w-4 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patients…" className="h-10 w-full bg-transparent text-sm outline-none" aria-label="Search patients" /></div>
        <Card className="overflow-x-auto p-2"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="text-xs uppercase text-muted"><th className="p-3">Patient</th><th className="p-3">Last visit</th><th className="p-3">Visits</th><th className="p-3">Status</th><th className="p-3"></th></tr></thead><tbody>{list.map((p) => <tr key={p.id} className="border-t border-line"><td className="p-3"><b className="text-ink">{p.name}</b><span className="block text-xs text-muted">{p.id} • {p.age}y • {p.blood}</span></td><td className="p-3 text-muted">{p.lastVisit}</td><td className="p-3 text-muted">{p.appointments}</td><td className="p-3"><Badge>{p.status}</Badge></td><td className="p-3"><Button size="sm" variant="outline" onClick={() => setSel(p.id)}>Open chart</Button></td></tr>)}</tbody></table></Card>
      </div>
      <Card className="h-fit p-5 lg:sticky lg:top-24">
        {!active ? <EmptyState title="Select a patient" desc="Open a chart to see history, prescriptions, labs and notes." /> : (
          <div><div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary font-extrabold text-white">{active.name.split(" ").map((w) => w[0]).join("")}</span><div><b className="text-ink">{active.name}</b><p className="text-xs text-muted">{active.gender} • {active.age}y • {active.blood} • {active.phone}</p></div></div>
          <div className="mt-4"><Tabs tabs={["History", "Rx", "Labs", "Notes"]} value="History" onChange={() => {}} /></div>
          <div className="mt-3 space-y-2 text-[13px]">
            <div className="rounded-xl bg-soft p-3"><b>Sep 12</b> — Cardiology consult, ECG normal. Continue statin.</div>
            <div className="rounded-xl bg-soft p-3"><b>Aug 22</b> — Annual physical, vitals stable, BMI 24.1.</div>
            <div className="rounded-xl bg-soft p-3"><b>Jul 30</b> — Dental cleaning, no caries.</div>
          </div>
          <Field label="Add clinical note"><Textarea rows={2} placeholder="SOAP note…" /></Field>
          <Button size="sm" className="mt-2 w-full">Save Note</Button></div>
        )}
      </Card>
    </div>
  </Wrap>;
}

export function RxBuilderPage() {
  const { pushToast } = useStore();
  const [rows, setRows] = useState([{ name: "Atorvastatin", dosage: "10mg", frequency: "Once daily", duration: "30 days", instructions: "After dinner" }]);
  const [patient, setPatient] = useState("Sarah Mitchell");
  return <Wrap title="New Prescription" subtitle="Add medicines, preview and share instantly.">
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5 sm:p-6">
        <Field label="Patient"><Select value={patient} onChange={(e) => setPatient(e.target.value)}>{patientsSeed.map((p) => <option key={p.id}>{p.name}</option>)}</Select></Field>
        <div className="mt-4 space-y-4">{rows.map((r, i) => (
          <div key={i} className="rounded-2xl border border-line p-4">
            <div className="mb-3 flex items-center justify-between"><b className="text-sm text-ink">Medicine {i + 1}</b>{rows.length > 1 && <button onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-danger hover:underline text-xs font-bold cursor-pointer" aria-label="Remove medicine"><Trash2 className="h-4 w-4" /></button>}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Medicine"><Input value={r.name} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} /></Field>
              <Field label="Dosage"><Input value={r.dosage} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, dosage: e.target.value } : x))} /></Field>
              <Field label="Frequency"><Select value={r.frequency} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, frequency: e.target.value } : x))}><option>Once daily</option><option>Twice daily</option><option>Three times daily</option><option>As needed</option></Select></Field>
              <Field label="Duration"><Select value={r.duration} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, duration: e.target.value } : x))}><option>7 days</option><option>14 days</option><option>30 days</option><option>60 days</option></Select></Field>
            </div>
            <div className="mt-3"><Field label="Instructions"><Input value={r.instructions} onChange={(e) => setRows(rows.map((x, j) => j === i ? { ...x, instructions: e.target.value } : x))} /></Field></div>
          </div>))}
        </div>
        <Button variant="outline" className="mt-3" onClick={() => setRows([...rows, { name: "", dosage: "", frequency: "Once daily", duration: "7 days", instructions: "" }])}><Plus className="h-4 w-4" /> Add Medicine</Button>
      </Card>
      <Card className="h-fit p-6 lg:sticky lg:top-24">
        <div className="border-b-2 border-primary pb-4 text-center"><p className="font-extrabold text-ink">Medicale Heart Center</p><p className="text-xs text-muted">480 Medical Plaza • +1 (415) 555-0100</p></div>
        <div className="flex justify-between py-3 text-sm"><span className="text-muted">Patient</span><b>{patient}</b></div>
        <div className="flex justify-between border-b border-line pb-3 text-sm"><span className="text-muted">Date</span><b>Sep 27, 2026</b></div>
        <div className="py-2">{rows.filter((r) => r.name).map((r, i) => <div key={i} className="flex justify-between py-2 text-sm"><span><b className="text-ink">{i + 1}. {r.name || "—"}</b><span className="block text-xs text-muted">{r.dosage} • {r.frequency} • {r.duration} • {r.instructions}</span></span></div>)}</div>
        <p className="mt-2 text-right font-bold text-ink">Dr. Amelia Hart, MD <span className="block text-xs font-normal text-muted">Cardiology • Reg. #CARD-2214</span></p>
        <div className="mt-4 flex gap-2"><Button className="flex-1" onClick={() => pushToast({ title: "Prescription sent", desc: `Shared with ${patient}`, kind: "success" })}><Send className="h-4 w-4" /> Sign & Send</Button><Button variant="outline" onClick={() => pushToast({ title: "Prescription downloaded", desc: "RX-5522.pdf", kind: "info" })}><Download className="h-4 w-4" /></Button></div>
      </Card>
    </div>
  </Wrap>;
}

export function SimplePortalPage({ title, subtitle, body }: { title: string; subtitle?: string; body: React.ReactNode }) {
  return <Wrap title={title} subtitle={subtitle}><Card className="p-6">{body}</Card></Wrap>;
}
