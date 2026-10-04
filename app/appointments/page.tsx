"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarCheck, Check, CheckCircle2, Clock, MapPin, PartyPopper, User, Video } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Card, Button, Badge, Field, Input, Textarea, Select, EmptyState } from "@/components/ui";
import { doctors, departments, timeSlots, next7Days } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const steps = ["Department", "Doctor", "Date & Time", "Patient Info", "Summary"];

function Flow() {
  const params = useSearchParams();
  const { addAppointment, pushToast } = useStore();
  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState(params.get("department") ?? "");
  const [doctorId, setDoctorId] = useState(params.get("doctor") ?? "");
  const [date, setDate] = useState(params.get("date") ?? next7Days[1].full);
  const [time, setTime] = useState(params.get("time") ?? "");
  const [ctype, setCtype] = useState<string>((params.get("type") as string) ?? "In-Clinic");
  const [form, setForm] = useState({ name: "Sarah Mitchell", phone: "+1 (415) 555-0132", email: "sarah.m@mail.com", dob: "1992-04-18", gender: "Female", reason: "", notes: "" });
  const [done, setDone] = useState<string | null>(null);
  const [bookedSlot, setBookedSlot] = useState("");

  const filteredDoctors = useMemo(() => doctors.filter((d) => !department || d.department === department), [department]);
  const doctor = doctors.find((d) => d.id === doctorId);
  const fee = doctor?.fee ?? 60;

  const canNext = step === 0 ? !!department : step === 1 ? !!doctorId : step === 2 ? !!(date && (time || bookedSlot)) : step === 3 ? !!(form.name && form.phone && form.email) : true;

  const confirm = () => {
    const id = `APT-${Math.floor(90000 + Math.random() * 9999)}`;
    addAppointment({ id, patient: form.name, doctor: doctor?.name ?? "General Physician", doctorId: doctor?.id ?? "d6", department: department || doctor?.department || "General Medicine", date, time: time || bookedSlot || "10:30 AM", type: ctype as "In-Clinic" | "Video" | "Phone", fee, status: "Confirmed", payment: "Paid", location: ctype === "Video" ? "Video Consultation" : `${doctor?.hospital ?? "Medicale Center"}`, reason: form.reason });
    setDone(id);
    pushToast({ title: "Appointment confirmed", desc: `${id} • ${date}`, kind: "success" });
  };

  if (done && doctor) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-success"><PartyPopper className="h-9 w-9" /></span>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Appointment Confirmed</h1>
        <p className="mt-2 text-muted">A confirmation has been sent to {form.email}. Please arrive 10 minutes early.</p>
        <Card className="mt-8 p-6 text-left">
          <div className="flex items-center justify-between border-b border-dashed border-line pb-4"><span className="text-sm text-muted">Appointment ID</span><span className="font-extrabold text-primary">{done}</span></div>
          {[["Doctor", doctor.name], ["Department", doctor.department], ["Date", date], ["Time", time || bookedSlot || "10:30 AM"], ["Type", ctype], ["Location", ctype === "Video" ? "Video Consultation" : doctor.hospital], ["Fee", `$${fee} • Paid`]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2.5 text-sm"><span className="text-muted">{k}</span><span className="font-bold text-ink">{v}</span></div>
          ))}
        </Card>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => pushToast({ title: "Added to calendar", desc: "ICS file downloaded", kind: "info" })}>Add to Calendar</Button>
          <Button variant="outline" onClick={() => pushToast({ title: "Confirmation downloaded", desc: `${done}.pdf`, kind: "info" })}>Download Confirmation</Button>
          <Button variant="ghost" onClick={() => { setDone(null); setStep(0); }}>Book Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Book an Appointment</h1>
      <p className="mt-1 text-sm text-muted">Six quick steps — most patients finish in under two minutes.</p>

      {/* stepper */}
      <ol className="mt-6 flex items-center gap-1 overflow-x-auto no-scrollbar" aria-label="Booking progress">
        {steps.map((s, i) => (
          <li key={s} className="flex shrink-0 items-center gap-2">
            <button onClick={() => i < step && setStep(i)} className={cn("flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] font-bold transition cursor-pointer", i === step ? "bg-primary text-white" : i < step ? "bg-emerald-50 text-success" : "bg-white text-muted border border-line")}>
              <span className={cn("grid h-7 w-7 place-items-center rounded-full text-xs", i === step ? "bg-white/20" : i < step ? "bg-success text-white" : "bg-soft")}>{i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>{s}
            </button>
            {i < steps.length - 1 && <span className="mx-1 h-px w-4 bg-line" />}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 0 && (
            <Card className="p-6">
              <h2 className="font-extrabold text-ink">Step 1 — Choose Department</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {departments.map((d) => (
                  <button key={d.id} onClick={() => setDepartment(d.name)} className={cn("rounded-2xl border p-4 text-left transition cursor-pointer", department === d.name ? "border-primary bg-primary/[0.05] ring-2 ring-primary/15" : "border-line hover:border-primary/40")}>
                    <p className="font-bold text-ink">{d.name}</p><p className="mt-0.5 text-xs text-muted">{d.doctors} doctors • {d.description.slice(0, 52)}…</p>
                  </button>
                ))}
              </div>
            </Card>
          )}
          {step === 1 && (
            <Card className="p-6">
              <h2 className="font-extrabold text-ink">Step 2 — Choose Doctor</h2>
              {filteredDoctors.length === 0 && <div className="mt-4"><EmptyState title="No doctors in this department" desc="Please go back and choose another department." /></div>}
              <div className="mt-4 space-y-3">
                {filteredDoctors.map((d) => (
                  <button key={d.id} onClick={() => setDoctorId(d.id)} className={cn("flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition cursor-pointer", doctorId === d.id ? "border-primary bg-primary/[0.05] ring-2 ring-primary/15" : "border-line hover:border-primary/40")}>
                    <span className="grid h-12 w-12 place-items-center rounded-xl font-extrabold text-white" style={{ background: d.color }}>{d.initials}</span>
                    <span className="flex-1"><span className="block font-bold text-ink">{d.name}</span><span className="block text-[13px] text-muted">{d.specialty} • {d.experience} yrs • ${d.fee}</span></span>
                    <span className={cn("grid h-6 w-6 place-items-center rounded-full border", doctorId === d.id ? "border-primary bg-primary text-white" : "border-line text-transparent")}><Check className="h-3.5 w-3.5" /></span>
                  </button>
                ))}
              </div>
            </Card>
          )}
          {step === 2 && (
            <Card className="p-6">
              <h2 className="font-extrabold text-ink">Step 3 — Choose Date & Time</h2>
              <p className="mt-1 text-[13px] font-semibold text-muted">Consultation type</p>
              <div className="mt-2 flex gap-2">
                {["In-Clinic", "Video", "Phone"].map((t) => (
                  <button key={t} onClick={() => setCtype(t)} className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[13px] font-bold transition cursor-pointer", ctype === t ? "border-primary bg-primary text-white" : "border-line text-muted hover:text-ink")}>
                    {t === "Video" ? <Video className="h-4 w-4" /> : t === "In-Clinic" ? <MapPin className="h-4 w-4" /> : <User className="h-4 w-4" />}{t}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-[13px] font-semibold text-muted">Select date</p>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {next7Days.map((d) => (
                  <button key={d.full} onClick={() => setDate(d.full)} className={cn("rounded-xl border py-2.5 text-center transition cursor-pointer", date === d.full ? "border-primary bg-primary text-white" : "border-line bg-white hover:border-primary/50")}>
                    <span className="block text-[11px] font-semibold opacity-70">{d.label}</span><span className="block text-lg font-extrabold">{d.num}</span>
                  </button>
                ))}
              </div>
              <p className="mt-5 text-[13px] font-semibold text-muted">Available times — {date}</p>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {timeSlots.map((t, i) => {
                  const taken = i % 5 === 3;
                  const active = (time || bookedSlot) === t;
                  return <button key={t} disabled={taken} onClick={() => { setTime(t); setBookedSlot(t); }} className={cn("rounded-xl border py-2.5 text-[13px] font-bold transition", taken ? "cursor-not-allowed border-line bg-soft text-muted/40 line-through" : active ? "border-primary bg-primary text-white cursor-pointer" : "border-line hover:border-primary hover:text-primary cursor-pointer")}>{t}</button>;
                })}
              </div>
            </Card>
          )}
          {step === 3 && (
            <Card className="p-6">
              <h2 className="font-extrabold text-ink">Step 4 — Patient Information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
                <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
                <Field label="Email"><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
                <Field label="Date of Birth"><Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} /></Field>
                <Field label="Gender"><Select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option>Female</option><option>Male</option><option>Other</option></Select></Field>
                <Field label="Reason for Visit"><Input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="e.g. Chest discomfort, annual checkup" /></Field>
              </div>
              <div className="mt-4"><Field label="Additional Notes"><Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Allergies, current medication, symptoms…" /></Field></div>
            </Card>
          )}
          {step === 4 && (
            <Card className="p-6">
              <h2 className="flex items-center gap-2 font-extrabold text-ink"><CheckCircle2 className="h-5 w-5 text-success" /> Step 5 — Appointment Summary</h2>
              <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
                {[["Doctor", doctor?.name ?? "—"], ["Department", department || doctor?.department], ["Date", date], ["Time", time || bookedSlot || "10:30 AM"], ["Consultation type", ctype], ["Patient", `${form.name} • ${form.phone}`], ["Fee", `$${fee} • Pay at clinic / online`]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-3 text-sm"><span className="text-muted">{k}</span><span className="font-bold text-ink">{v}</span></div>
                ))}
              </div>
              <Button onClick={confirm} className="mt-5 w-full" size="lg"><BadgeCheck className="h-4 w-4" /> Confirm Appointment • ${fee}</Button>
              <p className="mt-2 text-center text-xs text-muted">Free cancellation up to 4 hours before your visit.</p>
            </Card>
          )}

          {step < 4 && (
            <div className="mt-5 flex gap-3">
              {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" /> Back</Button>}
              <Button onClick={() => setStep(step + 1)} disabled={!canNext} className="flex-1">Continue <ArrowRight className="h-4 w-4" /></Button>
            </div>
          )}
          {step === 4 && <Button variant="ghost" onClick={() => setStep(3)} className="mt-3"><ArrowLeft className="h-4 w-4" /> Edit patient info</Button>}
        </div>

        {/* summary rail */}
        <aside>
          <Card className="sticky top-24 p-5">
            <p className="text-[13px] font-extrabold uppercase tracking-wider text-muted">Your selection</p>
            <div className="mt-3 space-y-3 text-sm">
              <p className="flex gap-2"><CalendarCheck className="h-4 w-4 shrink-0 text-primary" /><span><b className="text-ink">{department || "—"}</b><br /><span className="text-muted">{doctor?.name ?? "No doctor selected"}</span></span></p>
              <p className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" /><span className="text-muted">{date}{time || bookedSlot ? ` • ${time || bookedSlot}` : ""}</span></p>
              <p className="flex gap-2"><User className="h-4 w-4 shrink-0 text-primary" /><span className="text-muted">{form.name}</span></p>
            </div>
            <div className="mt-4 rounded-xl bg-soft p-3.5"><div className="flex justify-between text-sm"><span className="text-muted">Consultation fee</span><b className="text-ink">${fee}</b></div><div className="mt-1 flex justify-between text-sm"><span className="text-muted">Platform fee</span><b className="text-success">Free</b></div></div>
            <Badge className="mt-3">{ctype} Consultation</Badge>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  return <PageShell><Suspense fallback={<div className="p-10 text-center text-muted">Loading booking…</div>}><Flow /></Suspense></PageShell>;
}
