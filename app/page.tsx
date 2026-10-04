"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight, Award, Baby, BadgeCheck, BellRing, Bone, Brain, CalendarCheck,
  ChevronLeft, ChevronRight, Clock, FileText, HeartPulse, MapPin, Microscope,
  Phone, Pill, Search, ShieldCheck, Siren, Smile, Star, Stethoscope, Users, Video, Activity,
} from "lucide-react";
import { PageShell } from "@/components/layout";
import { SectionHeading, Card, Button, Badge, Select, Field } from "@/components/ui";
import { DoctorCard, ServiceCard, TrustChip } from "@/components/cards";
import { doctors, services, departments, testimonials, blogs, timeSlots, next7Days } from "@/lib/data";
import { serviceIcon } from "@/components/cards";

export default function HomePage() {
  const router = useRouter();
  const [dept, setDept] = useState("");
  const [doc, setDoc] = useState("");
  const [day, setDay] = useState(next7Days[1].full);
  const [time, setTime] = useState("");
  const [ttype, setTtype] = useState("In-Clinic");
  const [tIdx, setTIdx] = useState(0);

  const findSlots = () => {
    const p = new URLSearchParams();
    if (dept) p.set("department", dept);
    if (doc) p.set("doctor", doc);
    if (day) p.set("date", day);
    if (time) p.set("time", time);
    p.set("type", ttype);
    router.push(`/appointments?${p.toString()}`);
  };

  return (
    <PageShell>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-secondary/10 blur-3xl" aria-hidden />
        <div className="absolute -left-40 top-64 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:pb-24 lg:pt-16">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-card">
              <span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-success opacity-60" /><span className="h-2 w-2 rounded-full bg-success" /></span>
              Trusted Healthcare Platform
            </span>
            <h1 className="mt-5 text-balance text-[38px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
              Better Healthcare.<br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Better Living.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-muted">
              Discover trusted doctors, explore 20+ medical departments and book appointments online in under two minutes — in-clinic or by video, with prescriptions and lab reports in one portal.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/appointments" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-[15px] font-bold text-white shadow-float transition hover:bg-primary-dark active:scale-[0.98]">
                <CalendarCheck className="h-4.5 w-4.5" /> Book an Appointment
              </Link>
              <Link href="/doctors" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-7 text-[15px] font-bold text-ink transition hover:border-primary hover:text-primary">
                <Search className="h-4.5 w-4.5" /> Find a Doctor
              </Link>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-4">
              <TrustChip icon={<Users className="h-5 w-5" />} value="500+" label="Doctors" />
              <TrustChip icon={<Activity className="h-5 w-5" />} value="20+" label="Departments" />
              <TrustChip icon={<BadgeCheck className="h-5 w-5" />} value="50K+" label="Patients" />
              <TrustChip icon={<Clock className="h-5 w-5" />} value="24/7" label="Support" />
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[520px] animate-fade-up">
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary via-primary-dark to-[#062e3a] p-8 text-white shadow-pop">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
              <div className="flex items-center gap-4">
                <div className="grid h-[76px] w-[76px] place-items-center rounded-2xl bg-white/15 text-2xl font-extrabold backdrop-blur">AH</div>
                <div>
                  <p className="flex items-center gap-1.5 font-bold">Dr. Amelia Hart <BadgeCheck className="h-4 w-4 text-accent" /></p>
                  <p className="text-[13px] text-white/70">Cardiologist • 14 yrs experience</p>
                  <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Available today</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[["4.9", "Rating"], ["5.2k", "Patients"], ["98%", "Satisfaction"]].map(([v, l]) => (
                  <div key={l} className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur"><p className="text-lg font-extrabold">{v}</p><p className="text-[11px] text-white/65">{l}</p></div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 text-ink">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Video className="h-5 w-5" /></span>
                <div className="flex-1"><p className="text-[13px] font-bold">Next video slot • Today 4:30 PM</p><p className="text-xs text-muted">Cardiology • $85</p></div>
                <Link href="/appointments?doctor=d1" className="rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-white hover:bg-primary-dark">Book</Link>
              </div>
            </div>

            <div className="absolute -left-4 top-16 hidden animate-float rounded-2xl border border-line bg-white p-3.5 shadow-float sm:block">
              <p className="flex items-center gap-1.5 text-xs font-bold text-ink"><CalendarCheck className="h-4 w-4 text-success" /> Appointment Confirmed</p>
              <p className="mt-0.5 text-[11px] text-muted">APT-90412 • Sep 28, 10:30 AM</p>
            </div>
            <div className="absolute -right-3 bottom-20 hidden animate-float-slow rounded-2xl border border-line bg-white p-3.5 shadow-float sm:block">
              <p className="flex items-center gap-1.5 text-xs font-bold text-ink"><FileText className="h-4 w-4 text-primary" /> Lab report ready</p>
              <p className="mt-0.5 text-[11px] text-muted">Lipid Profile • Review</p>
            </div>
            <div className="absolute -bottom-5 left-10 flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-3 shadow-float">
              <span className="flex -space-x-2">{["RT", "MC", "FA"].map((t) => <span key={t} className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primary/90 text-[10px] font-bold text-white">{t}</span>)}</span>
              <span className="text-xs font-bold text-ink">50K+ happy patients</span>
            </div>
          </div>
        </div>

        {/* ===== QUICK SEARCH ===== */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Card className="relative z-10 -mb-2 p-5 shadow-float sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-ink"><CalendarCheck className="h-5 w-5 text-primary" /> Quick Appointment Search</h2>
              <span className="hidden items-center gap-1.5 text-xs font-semibold text-success sm:inline-flex"><span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" /> 128 slots open today</span>
            </div>
            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              <Field label="Department"><Select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Select department"><option value="">Select Department</option>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</Select></Field>
              <Field label="Doctor"><Select value={doc} onChange={(e) => setDoc(e.target.value)} aria-label="Select doctor"><option value="">Select Doctor</option>{doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</Select></Field>
              <Field label="Date"><Select value={day} onChange={(e) => setDay(e.target.value)} aria-label="Select date">{next7Days.map((d) => <option key={d.full} value={d.full}>{d.day}, {d.full}</option>)}</Select></Field>
              <Field label="Time"><Select value={time} onChange={(e) => setTime(e.target.value)} aria-label="Select time"><option value="">Any time</option>{timeSlots.map((t) => <option key={t}>{t}</option>)}</Select></Field>
              <Field label="Type"><Select value={ttype} onChange={(e) => setTtype(e.target.value)} aria-label="Appointment type"><option>In-Clinic</option><option>Video</option><option>Phone</option></Select></Field>
              <div className="flex items-end"><Button onClick={findSlots} className="w-full"><Search className="h-4 w-4" /> Find Slots</Button></div>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <SectionHeading eyebrow="Our Services" title="Complete care for every stage of life" desc="From primary care to advanced diagnostics — all coordinated in one platform with shared records." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>

      {/* ===== DOCTORS ===== */}
      <section id="doctors" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">Find a Doctor</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Meet our trusted specialists</h2>
            <p className="mt-2 text-[15px] text-muted">Verified credentials, transparent fees and real-time availability.</p>
          </div>
          <Link href="/doctors" className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-primary transition hover:border-primary">View all doctors <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 6).map((d) => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      </section>

      {/* ===== DEPARTMENTS STRIP ===== */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow="Departments" title="20+ specialized departments" desc="Dedicated teams, modern equipment and coordinated treatment plans." />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {departments.map((d) => (
            <Link key={d.id} href="/departments" className="group rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-float">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/[0.07] text-primary transition group-hover:bg-primary group-hover:text-white">{serviceIcon(d.icon)}</span>
              <p className="mt-3 font-bold text-ink">{d.name}</p>
              <p className="text-xs text-muted">{d.doctors} doctors • {d.patients.toLocaleString()} patients</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== EMERGENCY ===== */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#7a1f1d] via-[#a8322f] to-[#d9534f] p-8 text-white sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold"><Siren className="h-4 w-4" /> 24/7 Emergency Response</span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Need Emergency Care?</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85">Our emergency department is staffed around the clock with rapid triage, on-call surgeons and ambulance dispatch in under 8 minutes.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="tel:+18009113456" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-bold text-[#a8322f] transition hover:bg-soft"><Phone className="h-4 w-4" /> +1 (800) 911-3456</a>
                <Link href="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-6 font-bold text-white transition hover:bg-white/10">Contact Emergency</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Ambulance", "8 min avg dispatch", Siren], ["Emergency Dept", "Ground floor, Tower A", HeartPulse], ["Trauma Team", "Always on-call", ShieldCheck], ["24/7 Pharmacy", "Tower A lobby", Pill]].map(([t, s, Icon]) => {
                const I = Icon as typeof Siren;
                return <div key={t as string} className="rounded-2xl bg-white/12 p-4 backdrop-blur"><I className="h-5 w-5" /><p className="mt-2 text-sm font-bold">{t as string}</p><p className="text-xs text-white/70">{s as string}</p></div>;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS + TESTIMONIALS ===== */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow="Patient Stories" title="Loved by 50,000+ patients" />
        <div className="relative mt-8">
          <Card className="mx-auto max-w-3xl p-8 text-center sm:p-10">
            <div className="mx-auto flex justify-center gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
            <blockquote className="mt-4 text-balance text-lg font-medium leading-relaxed text-ink">“{testimonials[tIdx].text}”</blockquote>
            <p className="mt-5 font-bold text-ink">{testimonials[tIdx].name}</p>
            <p className="text-[13px] text-muted">{testimonials[tIdx].role}</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <button onClick={() => setTIdx((tIdx + testimonials.length - 1) % testimonials.length)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-primary hover:text-primary cursor-pointer"><ChevronLeft className="h-4 w-4" /></button>
              {testimonials.map((_, i) => <button key={i} onClick={() => setTIdx(i)} aria-label={`Go to testimonial ${i + 1}`} className={`h-2 rounded-full transition-all cursor-pointer ${i === tIdx ? "w-7 bg-primary" : "w-2 bg-line"}`} />)}
              <button onClick={() => setTIdx((tIdx + 1) % testimonials.length)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-primary hover:text-primary cursor-pointer"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </Card>
        </div>
      </section>

      {/* ===== BLOG ===== */}
      <section id="blog" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex items-end justify-between">
          <div><span className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">Health Journal</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Insights from our doctors</h2></div>
          <Link href="/blog" className="hidden items-center gap-1.5 text-sm font-bold text-primary sm:inline-flex">All articles <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {blogs.map((b) => (
            <Link key={b.id} href="/blog" className="group overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-float">
              <div className="flex h-40 items-end p-5" style={{ background: `linear-gradient(135deg, ${b.color}, ${b.color}99)` }}>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{b.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold leading-snug text-ink transition group-hover:text-primary">{b.title}</h3>
                <p className="mt-3 text-xs text-muted">{b.author} • {b.date} • {b.read}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-col items-center rounded-[28px] bg-primary-deep px-6 py-14 text-center text-white sm:px-12">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10"><BellRing className="h-6 w-6 text-accent" /></span>
          <h2 className="mt-5 max-w-xl text-balance text-3xl font-extrabold">Your health can&apos;t wait. Neither should you.</h2>
          <p className="mt-3 max-w-md text-[15px] text-white/70">Join 50,000+ patients managing visits, prescriptions and reports in one secure portal.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/appointments" className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 font-bold text-primary transition hover:bg-soft">Book Appointment</Link>
            <Link href="/patient" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-7 font-bold text-white transition hover:bg-white/10"><MapPin className="h-4 w-4" /> Open Patient Portal</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
