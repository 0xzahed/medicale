"use client";
import Link from "next/link";
import { Download, FileText, Microscope, Pill, CreditCard, MessageSquare, User, Settings, Wallet } from "lucide-react";
import { PortalPage } from "@/components/portal";
import { patientNav } from "@/components/layout";
import { Card, Badge, Button, Field, Input, Textarea } from "@/components/ui";
import { useStore } from "@/lib/store";
import { labsSeed, prescriptionsSeed, recordsSeed } from "@/lib/data";

function Wrap({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return <PortalPage items={patientNav} base="/patient" title={title} subtitle={subtitle}>{children}</PortalPage>;
}

export function RecordsPage() {
  const { pushToast } = useStore();
  return <Wrap title="Medical Records" subtitle="Every visit, diagnosis and note — in one timeline.">
    <div className="space-y-3">{recordsSeed.map((r) => <Card key={r.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><FileText className="h-5 w-5" /></span><div className="flex-1"><p className="font-bold text-ink">{r.type}</p><p className="text-[13px] text-muted">{r.doctor} • {r.date}</p><p className="mt-1 text-[13px] text-muted">{r.summary}</p></div><div className="flex gap-2"><Badge>{r.status}</Badge><Button size="sm" variant="outline" onClick={() => pushToast({ title: "Record downloaded", desc: `${r.id}.pdf`, kind: "info" })}><Download className="h-3.5 w-3.5" /></Button></div></Card>)}</div>
  </Wrap>;
}
export function PrescriptionsPage() {
  const { pushToast } = useStore();
  return <Wrap title="Prescriptions" subtitle="Active medications with dosage guidance.">
    <div className="grid gap-4 md:grid-cols-2">{prescriptionsSeed.map((p) => <Card key={p.id} className="p-5"><div className="flex justify-between"><p className="font-bold text-ink">{p.id}</p><Badge>{p.status}</Badge></div><p className="text-[13px] text-muted">{p.doctor} • {p.date}</p>{p.medicines.map((m) => <div key={m.name} className="mt-3 rounded-xl bg-soft p-3.5"><p className="flex items-center gap-2 text-sm font-bold text-ink"><Pill className="h-4 w-4 text-primary" />{m.name} <span className="font-medium text-muted">{m.dosage}</span></p><p className="mt-1 text-xs text-muted">{m.frequency} • {m.duration} • {m.instructions}</p></div>)}<Button size="sm" className="mt-4 w-full" variant="outline" onClick={() => pushToast({ title: "Prescription downloaded", desc: `${p.id}.pdf`, kind: "info" })}><Download className="h-3.5 w-3.5" /> Download Prescription</Button></Card>)}</div>
  </Wrap>;
}
export function LabsPage() {
  const { pushToast } = useStore();
  return <Wrap title="Lab Reports" subtitle="Results appear here as soon as the lab signs them.">
    <Card className="overflow-x-auto p-2"><table className="w-full min-w-[640px] text-left text-sm"><thead><tr className="text-xs uppercase text-muted"><th className="p-3">Test</th><th className="p-3">Doctor</th><th className="p-3">Date</th><th className="p-3">Result</th><th className="p-3"></th></tr></thead><tbody>{labsSeed.map((l) => <tr key={l.id} className="border-t border-line"><td className="p-3 font-semibold text-ink"><span className="inline-flex items-center gap-2"><Microscope className="h-4 w-4 text-primary" />{l.test}</span><span className="block text-xs font-normal text-muted">{l.id}</span></td><td className="p-3 text-muted">{l.doctor}</td><td className="p-3 text-muted">{l.date}</td><td className="p-3"><Badge>{l.status}</Badge></td><td className="p-3"><Button size="sm" variant="outline" onClick={() => pushToast({ title: "Report downloaded", desc: `${l.id}.pdf`, kind: "info" })}><Download className="h-3.5 w-3.5" /></Button></td></tr>)}</tbody></table></Card>
  </Wrap>;
}
export function PaymentsPage() {
  const { appointments, pushToast } = useStore();
  return <Wrap title="Payments" subtitle="Invoices, receipts and refunds.">
    <div className="grid gap-4 sm:grid-cols-3"><Card className="p-5"><p className="text-[13px] text-muted">Total paid (2026)</p><p className="text-2xl font-extrabold text-ink">$340</p></Card><Card className="p-5"><p className="text-[13px] text-muted">Pending</p><p className="text-2xl font-extrabold text-warning">$95</p></Card><Card className="p-5"><p className="text-[13px] text-muted">Insurance claims</p><p className="text-2xl font-extrabold text-success">2 approved</p></Card></div>
    <Card className="mt-4 overflow-x-auto p-2"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="text-xs uppercase text-muted"><th className="p-3">Invoice</th><th className="p-3">Doctor</th><th className="p-3">Amount</th><th className="p-3">Status</th><th className="p-3"></th></tr></thead><tbody>{appointments.slice(0, 5).map((a) => <tr key={a.id} className="border-t border-line"><td className="p-3 font-semibold text-ink">{a.id}</td><td className="p-3 text-muted">{a.doctor}</td><td className="p-3 font-bold text-ink">${a.fee}</td><td className="p-3"><Badge>{a.payment}</Badge></td><td className="p-3"><Button size="sm" variant="outline" onClick={() => pushToast({ title: a.payment === "Paid" ? "Receipt downloaded" : "Payment link sent", desc: a.id, kind: "info" })}>{a.payment === "Paid" ? "Receipt" : "Pay now"}</Button></td></tr>)}</tbody></table></Card>
  </Wrap>;
}
export function MessagesPage() {
  const { pushToast } = useStore();
  const threads = [["Dr. Amelia Hart", "Your ECG looks great — keep up the routine.", "10:24 AM", true], ["Care Team", "Reminder: fasting required before lipid test.", "Yesterday", true], ["Dr. Marcus Webb", "Refill approved for Vitamin D3.", "Mon", false]];
  return <Wrap title="Messages" subtitle="Secure chat with your care team.">
    <div className="grid gap-6 lg:grid-cols-3"><Card className="p-3 lg:col-span-1">{threads.map(([n, m, t, u], i) => <button key={n as string} className={`flex w-full gap-3 rounded-xl p-3 text-left ${i === 0 ? "bg-primary/[0.06]" : "hover:bg-soft"}`}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">{(n as string)[0]}</span><span className="min-w-0 flex-1"><b className="flex justify-between text-[13px] text-ink">{n as string}<span className="font-normal text-muted">{t as string}</span></b><span className="block truncate text-xs text-muted">{m as string}</span></span>{u ? <span className="h-2 w-2 rounded-full bg-secondary" /> : null}</button>)}</Card>
    <Card className="flex flex-col p-5 lg:col-span-2"><div className="flex-1 space-y-3"><div className="max-w-[80%] rounded-2xl rounded-tl-md bg-soft p-3.5 text-sm text-ink">Hi Sarah — your ECG looks great. Continue the statin and we&apos;ll recheck lipids in 6 weeks.</div><div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-primary p-3.5 text-sm text-white">Thank you, doctor! Should I fast before the next test?</div><div className="max-w-[80%] rounded-2xl rounded-tl-md bg-soft p-3.5 text-sm text-ink">Yes — 10 hours fasting, water is fine.</div></div>
    <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); pushToast({ title: "Message sent", kind: "success" }); }}><input required placeholder="Type a message…" className="h-11 flex-1 rounded-xl border border-line px-3.5 text-sm outline-none focus:border-primary" aria-label="Type a message" /><Button>Send</Button></form></Card></div>
  </Wrap>;
}
export function ProfilePage() {
  const { pushToast } = useStore();
  return <Wrap title="Profile" subtitle="Keep your details and emergency contacts current.">
    <div className="grid gap-6 lg:grid-cols-3"><Card className="p-6 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-primary text-2xl font-extrabold text-white">SM</span><p className="mt-3 text-lg font-extrabold text-ink">Sarah Mitchell</p><p className="text-sm text-muted">P-10231 • O+ • 34 yrs</p><div className="mt-4 space-y-2 text-left text-sm"><p className="flex justify-between border-t border-line pt-2"><span className="text-muted">Phone</span><b>+1 (415) 555-0132</b></p><p className="flex justify-between border-t border-line pt-2"><span className="text-muted">Email</span><b>sarah.m@mail.com</b></p><p className="flex justify-between border-t border-line pt-2"><span className="text-muted">Insurance</span><b>BlueShield •••4521</b></p></div></Card>
    <Card className="p-6 lg:col-span-2"><h2 className="font-extrabold text-ink">Edit information</h2><form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); pushToast({ title: "Profile updated", kind: "success" }); }}><Field label="Full name"><Input defaultValue="Sarah Mitchell" /></Field><Field label="Phone"><Input defaultValue="+1 (415) 555-0132" /></Field><Field label="Email"><Input defaultValue="sarah.m@mail.com" /></Field><Field label="Emergency contact"><Input defaultValue="+1 (415) 555-9999" /></Field><div className="sm:col-span-2"><Field label="Address"><Textarea rows={2} defaultValue="12 Rosewood Ave, San Francisco, CA" /></Field></div><Button className="sm:col-span-2 sm:w-fit">Save changes</Button></form></Card></div>
  </Wrap>;
}
export function SettingsPage() {
  const { pushToast } = useStore();
  const rows = [["Email reminders", true], ["SMS reminders", true], ["Lab result alerts", true], ["Marketing updates", false]];
  return <Wrap title="Settings" subtitle="Notifications, privacy and preferences.">
    <Card className="max-w-2xl p-6">{rows.map(([t, on]) => <div key={t as string} className="flex items-center justify-between border-b border-line py-3.5 last:border-0"><span className="text-sm font-semibold text-ink">{t as string}</span><button role="switch" aria-checked={on as boolean} onClick={() => pushToast({ title: "Preference saved", kind: "success" })} className={`h-6 w-11 rounded-full p-0.5 transition ${(on as boolean) ? "bg-success" : "bg-line"}`}><span className={`block h-5 w-5 rounded-full bg-white shadow transition ${(on as boolean) ? "translate-x-5" : ""}`} /></button></div>)}
    <div className="mt-4 flex gap-2"><Button variant="outline" onClick={() => pushToast({ title: "Data exported", desc: "health-record.zip", kind: "info" })}><Download className="h-4 w-4" /> Export data</Button><Button variant="ghost"> <Link href="/">Back to site</Link></Button></div></Card>
  </Wrap>;
}
export { CreditCard, MessageSquare, User, Settings, Wallet };
