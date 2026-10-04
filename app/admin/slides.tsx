"use client";
import { useMemo, useState } from "react";
import { Building2, CalendarCheck, CreditCard, Plus, Search, Stethoscope, Users, Wallet, Pencil, Power, Eye, Download } from "lucide-react";
import { PortalPage } from "@/components/portal";
import { adminNav } from "@/components/layout";
import { Card, Badge, Button, StatCard, Field, Input, Select, Modal, Tabs, Pagination, EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";
import { doctors, departments, patientsSeed, services } from "@/lib/data";
import { serviceIcon } from "@/components/cards";

function Wrap({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return <PortalPage items={adminNav} base="/admin" title={title} subtitle={subtitle}>{children}</PortalPage>;
}

function Bars({ values, color = "#0F6B78", labels }: { values: number[]; color?: string; labels?: string[] }) {
  const max = Math.max(...values);
  return <div className="flex h-36 items-end gap-2">{values.map((v, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1.5"><div className="w-full rounded-t-lg transition-all hover:opacity-80" style={{ height: `${(v / max) * 100}%`, background: color, minHeight: 8 }} title={String(v)} /><span className="text-[10px] font-semibold text-muted">{labels ? labels[i] : ""}</span></div>)}</div>;
}

export default function AdminDashboard() {
  const { appointments } = useStore();
  return (
    <Wrap title="Admin Overview" subtitle="Network performance for September 2026.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Total Patients" value="52,418" sub="Active patient base" trend="+6.2%" color="#0F6B78" />
        <StatCard icon={<Stethoscope className="h-5 w-5" />} label="Total Doctors" value="512" sub="Across 20 departments" trend="+3.1%" color="#19A7A8" />
        <StatCard icon={<CalendarCheck className="h-5 w-5" />} label="Appointments" value="8,240" sub="This month" trend="+11%" color="#36CFC9" />
        <StatCard icon={<Wallet className="h-5 w-5" />} label="Revenue" value="$486K" sub="Collected this month" trend="+9.4%" color="#20A464" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2"><div className="flex justify-between"><h2 className="font-extrabold text-ink">Appointment Statistics</h2><Badge>Last 12 weeks</Badge></div><div className="mt-4"><Bars values={[42, 58, 50, 66, 72, 61, 78, 84, 70, 88, 94, 102]} labels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (i % 2 === 0 ? m : ""))} /></div>
          <div className="mt-3 flex gap-4 text-xs text-muted"><span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-primary" /> Confirmed</span><span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-line" /> Cancelled</span></div></Card>
        <Card className="p-5"><h2 className="font-extrabold text-ink">Patient Growth</h2><div className="mt-4"><Bars values={[30, 44, 52, 48, 63, 71, 82]} color="#19A7A8" labels={["M", "T", "W", "T", "F", "S", "S"]} /></div><p className="mt-3 text-xs text-muted">+1,240 new patients this week.</p></Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2"><h2 className="font-extrabold text-ink">Revenue Overview</h2><div className="mt-4"><Bars values={[22, 28, 25, 34, 38, 33, 42, 46]} color="#20A464" labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]} /></div></Card>
        <Card className="p-5"><h2 className="font-extrabold text-ink">Department Performance</h2><div className="mt-4 space-y-3">{[["Cardiology", 92], ["Pediatrics", 84], ["Orthopedics", 71], ["Dermatology", 64], ["Dental", 58]].map(([n, v]) => <div key={n as string}><div className="flex justify-between text-[13px]"><b className="text-ink">{n as string}</b><span className="text-muted">{v}% capacity</span></div><div className="mt-1 h-2 rounded-full bg-soft"><div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${v}%` }} /></div></div>)}</div></Card>
      </div>
      <Card className="mt-6 overflow-x-auto p-2"><div className="flex items-center justify-between p-3"><h2 className="font-extrabold text-ink">Latest Appointments</h2><Badge>{appointments.length} total</Badge></div>
        <table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="bg-soft text-xs uppercase text-muted"><th className="px-4 py-2.5">Patient</th><th className="px-4 py-2.5">Doctor</th><th className="px-4 py-2.5">Date</th><th className="px-4 py-2.5">Type</th><th className="px-4 py-2.5">Payment</th><th className="px-4 py-2.5">Status</th></tr></thead><tbody>{appointments.slice(0, 5).map((a) => <tr key={a.id} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{a.patient}</td><td className="px-4 py-3 text-muted">{a.doctor}</td><td className="px-4 py-3 text-muted">{a.date} • {a.time}</td><td className="px-4 py-3"><Badge>{a.type}</Badge></td><td className="px-4 py-3"><Badge>{a.payment}</Badge></td><td className="px-4 py-3"><Badge>{a.status}</Badge></td></tr>)}</tbody></table></Card>
    </Wrap>
  );
}

export function DoctorsAdmin() {
  const { pushToast } = useStore();
  const [q, setQ] = useState("");
  const [modal, setModal] = useState<null | { mode: "add" | "edit"; name?: string }>(null);
  const [page, setPage] = useState(1);
  const list = doctors.filter((d) => (d.name + d.specialty + d.department).toLowerCase().includes(q.toLowerCase()));
  return <Wrap title="Doctor Management" subtitle={`${doctors.length} doctors • 96% active`}>
    <div className="flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3"><Search className="h-4 w-4 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search doctors…" className="h-10 w-full bg-transparent text-sm outline-none" aria-label="Search doctors" /></div><Button onClick={() => setModal({ mode: "add" })}><Plus className="h-4 w-4" /> Add Doctor</Button></div>
    <Card className="mt-4 overflow-x-auto p-2"><table className="w-full min-w-[820px] text-left text-sm"><thead><tr className="bg-soft text-xs uppercase text-muted"><th className="px-4 py-2.5">Doctor</th><th className="px-4 py-2.5">Department</th><th className="px-4 py-2.5">Exp.</th><th className="px-4 py-2.5">Patients</th><th className="px-4 py-2.5">Rating</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5 text-right">Actions</th></tr></thead><tbody>
      {list.map((d) => <tr key={d.id} className="border-t border-line"><td className="px-4 py-3"><span className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl text-xs font-extrabold text-white" style={{ background: d.color }}>{d.initials}</span><span><b className="block text-ink">{d.name}</b><span className="text-xs text-muted">{d.specialty}</span></span></span></td><td className="px-4 py-3 text-muted">{d.department}</td><td className="px-4 py-3 text-muted">{d.experience} yrs</td><td className="px-4 py-3 text-muted">{d.patients.toLocaleString()}</td><td className="px-4 py-3 font-bold text-ink">★ {d.rating}</td><td className="px-4 py-3"><Badge>{d.status}</Badge></td><td className="px-4 py-3"><div className="flex justify-end gap-1"><button onClick={() => pushToast({ title: "Doctor profile", desc: d.name, kind: "info" })} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-primary cursor-pointer" aria-label="View doctor"><Eye className="h-3.5 w-3.5" /></button><button onClick={() => setModal({ mode: "edit", name: d.name })} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-primary cursor-pointer" aria-label="Edit doctor"><Pencil className="h-3.5 w-3.5" /></button><button onClick={() => pushToast({ title: d.status === "Active" ? "Doctor deactivated" : "Doctor activated", desc: d.name, kind: "info" })} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-danger cursor-pointer" aria-label="Toggle status"><Power className="h-3.5 w-3.5" /></button></div></td></tr>)}
    </tbody></table><div className="p-3"><Pagination page={page} total={3} onPage={setPage} /></div></Card>
    <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "add" ? "Add Doctor" : `Edit — ${modal?.name ?? ""}`} wide>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setModal(null); pushToast({ title: modal?.mode === "add" ? "Doctor added" : "Doctor updated", kind: "success" }); }}>
        <Field label="Full name"><Input required defaultValue={modal?.name ?? ""} placeholder="Dr. Jane Smith" /></Field>
        <Field label="Specialization"><Select><option>Cardiologist</option><option>Neurologist</option><option>Pediatrician</option><option>Dermatologist</option></Select></Field>
        <Field label="Department"><Select>{departments.map((d) => <option key={d.id}>{d.name}</option>)}</Select></Field>
        <Field label="Experience (years)"><Input type="number" defaultValue={10} /></Field>
        <Field label="Consultation fee ($)"><Input type="number" defaultValue={75} /></Field>
        <Field label="Weekly schedule"><Input defaultValue="Mon–Fri, 9:00–18:00" /></Field>
        <div className="flex gap-2 sm:col-span-2"><Button className="flex-1">{modal?.mode === "add" ? "Add Doctor" : "Save Changes"}</Button><Button variant="outline" type="button" onClick={() => setModal(null)}>Cancel</Button></div>
      </form>
    </Modal>
  </Wrap>;
}

export function PatientsAdmin() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const [checked, setChecked] = useState<string[]>([]);
  const { pushToast } = useStore();
  const list = patientsSeed.filter((p) => (tab === "All" || p.status === tab) && (p.name + p.email + p.phone).toLowerCase().includes(q.toLowerCase()));
  return <Wrap title="Patient Management" subtitle={`${patientsSeed.length} patients shown • demo sample`}>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center"><Tabs tabs={["All", "Active", "Inactive"]} value={tab} onChange={setTab} /><div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 sm:max-w-xs sm:ml-auto"><Search className="h-4 w-4 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="h-10 w-full bg-transparent text-sm outline-none" aria-label="Search patients" /></div></div>
    {checked.length > 0 && <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/[0.06] p-3 text-sm"><b>{checked.length} selected</b><Button size="sm" variant="outline" onClick={() => pushToast({ title: "Reminder sent", desc: `${checked.length} patients`, kind: "success" })}>Send reminder</Button><Button size="sm" variant="ghost" onClick={() => setChecked([])}>Clear</Button></div>}
    <Card className="mt-3 overflow-x-auto p-2"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="bg-soft text-xs uppercase text-muted"><th className="px-4 py-2.5"><input type="checkbox" aria-label="Select all" onChange={(e) => setChecked(e.target.checked ? list.map((p) => p.id) : [])} /></th><th className="px-4 py-2.5">Patient</th><th className="px-4 py-2.5">Phone</th><th className="px-4 py-2.5">Last visit</th><th className="px-4 py-2.5">Visits</th><th className="px-4 py-2.5">Status</th></tr></thead><tbody>
      {list.length === 0 ? <tr><td colSpan={6} className="p-6"><EmptyState title="No patients found" desc="Try a different search or filter." /></td></tr> : list.map((p) => <tr key={p.id} className="border-t border-line"><td className="px-4 py-3"><input type="checkbox" aria-label={`Select ${p.name}`} checked={checked.includes(p.id)} onChange={() => setChecked(checked.includes(p.id) ? checked.filter((x) => x !== p.id) : [...checked, p.id])} /></td><td className="px-4 py-3"><b className="text-ink">{p.name}</b><span className="block text-xs text-muted">{p.email}</span></td><td className="px-4 py-3 text-muted">{p.phone}</td><td className="px-4 py-3 text-muted">{p.lastVisit}</td><td className="px-4 py-3 text-muted">{p.appointments}</td><td className="px-4 py-3"><Badge>{p.status}</Badge></td></tr>)}
    </tbody></table></Card>
  </Wrap>;
}

export function AppointmentsAdmin() {
  const { appointments, updateStatus, pushToast } = useStore();
  const [tab, setTab] = useState("All");
  const list = appointments.filter((a) => tab === "All" || a.status === tab);
  return <Wrap title="Appointment Management" subtitle="All bookings across departments.">
    <Tabs tabs={["All", "Confirmed", "Pending", "Completed", "Cancelled"]} value={tab} onChange={setTab} />
    <Card className="mt-4 overflow-x-auto p-2"><table className="w-full min-w-[860px] text-left text-sm"><thead><tr className="bg-soft text-xs uppercase text-muted"><th className="px-4 py-2.5">Patient</th><th className="px-4 py-2.5">Doctor</th><th className="px-4 py-2.5">Dept</th><th className="px-4 py-2.5">Date</th><th className="px-4 py-2.5">Type</th><th className="px-4 py-2.5">Payment</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5"></th></tr></thead><tbody>
      {list.map((a) => <tr key={a.id} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{a.patient}<span className="block text-xs font-normal text-muted">{a.id}</span></td><td className="px-4 py-3 text-muted">{a.doctor}</td><td className="px-4 py-3 text-muted">{a.department}</td><td className="px-4 py-3 text-muted">{a.date} • {a.time}</td><td className="px-4 py-3"><Badge>{a.type}</Badge></td><td className="px-4 py-3"><Badge>{a.payment}</Badge></td><td className="px-4 py-3"><Badge>{a.status}</Badge></td><td className="px-4 py-3"><Select aria-label={`Update ${a.id}`} value={a.status} onChange={(e) => { updateStatus(a.id, e.target.value as typeof a.status); pushToast({ title: `Marked ${e.target.value}`, desc: a.id, kind: "success" }); }} className="h-9 text-xs"><option>Confirmed</option><option>Pending</option><option>Completed</option><option>Cancelled</option></Select></td></tr>)}
    </tbody></table></Card>
  </Wrap>;
}

export function DepartmentsAdmin() {
  const { pushToast } = useStore();
  return <Wrap title="Departments" subtitle="8 active departments.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{departments.map((d) => <Card key={d.id} className="p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">{serviceIcon(d.icon)}</span><b className="mt-3 block text-ink">{d.name}</b><p className="mt-1 text-[13px] text-muted">{d.description}</p><p className="mt-3 text-xs text-muted">{d.doctors} doctors • {d.patients.toLocaleString()} patients</p><div className="mt-3 flex items-center justify-between"><Badge>{d.status}</Badge><Button size="sm" variant="outline" onClick={() => pushToast({ title: "Department editor opened", desc: d.name, kind: "info" })}><Pencil className="h-3.5 w-3.5" /> Manage</Button></div></Card>)}</div>
  </Wrap>;
}

export function MiscAdmin({ kind }: { kind: string }) {
  const { pushToast } = useStore();
  const titles: Record<string, [string, string]> = {
    services: ["Services", "8 published services across care, diagnostics and pharmacy."],
    records: ["Medical Records", "24,180 signed records • 99.2% signed within 48h."],
    payments: ["Payments", "$486K collected in September • 98.4% success rate."],
    reports: ["Reports & Analytics", "Export operational, financial and clinical reports."],
    settings: ["Settings", "Roles, notifications, branding and integrations."],
  };
  const [t, s] = titles[kind] ?? ["Section", ""];
  if (kind === "services") return <Wrap title={t} subtitle={s}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map((sv) => <Card key={sv.id} className="p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">{serviceIcon(sv.icon)}</span><b className="mt-3 block">{sv.name}</b><p className="text-[13px] text-muted">{sv.description}</p><Button size="sm" variant="outline" className="mt-3" onClick={() => pushToast({ title: "Service editor opened", desc: sv.name, kind: "info" })}>Edit</Button></Card>)}</div></Wrap>;
  return <Wrap title={t} subtitle={s}><Card className="p-6"><div className="grid gap-3 sm:grid-cols-3">{[["Export CSV", "Download the current view"], ["Monthly summary", "September 2026 digest"], ["Audit log", "Who changed what, when"]].map(([a, d]) => <button key={a} onClick={() => pushToast({ title: `${a} started`, desc: d, kind: "info" })} className="rounded-2xl border border-line p-4 text-left transition hover:border-primary cursor-pointer"><b className="flex items-center gap-2 text-sm text-ink"><Download className="h-4 w-4 text-primary" />{a}</b><p className="mt-1 text-xs text-muted">{d}</p></button>)}</div>
    <div className="mt-5 flex h-28 items-end gap-2">{[35, 52, 44, 66, 58, 74, 69, 82, 90].map((h, i) => <div key={i} className="flex-1 rounded-t-lg bg-secondary/70" style={{ height: `${h}%` }} />)}</div>
    <p className="mt-2 text-xs text-muted">Placeholder analytics — connect your BI source for live charts.</p></Card></Wrap>;
}

export { Building2, CreditCard };
