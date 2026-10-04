import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarCheck, Clock, GraduationCap, Languages, MapPin, Star, Video, Building2 } from "lucide-react";
import { PageShell } from "@/components/layout";
import { Card, Badge, Button } from "@/components/ui";
import { DoctorCard } from "@/components/cards";
import { doctors, timeSlots, next7Days } from "@/lib/data";

export default async function DoctorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) notFound();
  const others = doctors.filter((d) => d.id !== id && d.department === doctor.department).slice(0, 3);

  return (
    <PageShell>
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-xs text-muted"><Link href="/" className="hover:text-primary">Home</Link> / <Link href="/doctors" className="hover:text-primary">Doctors</Link> / <span className="font-semibold text-ink">{doctor.name}</span></p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-1 items-start gap-5">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl text-2xl font-extrabold text-white sm:h-28 sm:w-28" style={{ background: `linear-gradient(135deg, ${doctor.color}, ${doctor.color}BB)` }}>{doctor.initials}</div>
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-extrabold text-ink sm:text-3xl">{doctor.name} <BadgeCheck className="h-6 w-6 text-secondary" /></h1>
                <p className="mt-1 font-semibold text-primary">{doctor.specialty} • {doctor.department}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
                  <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> <b className="text-ink">{doctor.rating}</b> ({doctor.reviews} reviews)</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {doctor.experience} yrs experience</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {doctor.hospital}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge>{doctor.available ? "Available" : "On leave"} — {doctor.nextAvailable}</Badge>
                  {doctor.consultTypes.map((t) => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>
            </div>
            <Card className="w-full p-5 lg:w-80">
              <div className="flex items-baseline justify-between"><p className="text-sm text-muted">Consultation fee</p><p className="text-2xl font-extrabold text-ink">${doctor.fee}</p></div>
              <div className="mt-3 space-y-2 text-[13px] text-muted">
                <p className="flex gap-2"><GraduationCap className="h-4 w-4 shrink-0 text-primary" /> {doctor.education}</p>
                <p className="flex gap-2"><Languages className="h-4 w-4 shrink-0 text-primary" /> {doctor.languages.join(", ")}</p>
                <p className="flex gap-2"><Building2 className="h-4 w-4 shrink-0 text-primary" /> {doctor.hospital}</p>
              </div>
              <Link href={`/appointments?doctor=${doctor.id}`} className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-white transition hover:bg-primary-dark"><CalendarCheck className="h-4 w-4" /> Book Appointment</Link>
              <Link href={`/appointments?doctor=${doctor.id}&type=Video`} className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-line font-bold text-ink transition hover:border-primary hover:text-primary"><Video className="h-4 w-4" /> Video Visit</Link>
            </Card>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6"><h2 className="font-extrabold text-ink">About Doctor</h2><p className="mt-2 text-[14.5px] leading-relaxed text-muted">{doctor.about}</p></Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-6"><h3 className="font-extrabold text-ink">Qualifications</h3><ul className="mt-3 space-y-2 text-sm text-muted"><li>• {doctor.education}</li><li>• Board Certified Specialist</li><li>• {doctor.patients.toLocaleString()}+ patients treated</li></ul></Card>
            <Card className="p-6"><h3 className="font-extrabold text-ink">Specializations</h3><div className="mt-3 flex flex-wrap gap-2">{[doctor.specialty, doctor.department, "Preventive Care", "Second Opinions"].map((s) => <Badge key={s}>{s}</Badge>)}</div></Card>
          </div>
          <Card className="p-6">
            <h3 className="font-extrabold text-ink">Patient Reviews</h3>
            {[["Rachel T.", 5, "Thorough, kind and never rushed. Explained every test clearly."], ["Michael C.", 5, "Accurate diagnosis on the first visit. Highly recommended."], ["Fatima A.", 4, "Slight wait, but excellent consultation and follow-up."]].map(([n, r, t]) => (
              <div key={n as string} className="mt-4 border-t border-line pt-4 first:border-0 first:pt-0">
                <p className="flex items-center justify-between text-sm font-bold text-ink">{n as string}<span className="flex gap-0.5">{Array.from({ length: r as number }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</span></p>
                <p className="mt-1 text-sm text-muted">{t as string}</p>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <Card className="sticky top-24 p-6">
            <h3 className="font-extrabold text-ink">Available Schedule</h3>
            <p className="mt-1 text-xs text-muted">Next 7 days • {doctor.hospital}</p>
            <div className="mt-4 space-y-2">
              {next7Days.slice(0, 5).map((d, i) => (
                <div key={d.full} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-sm">
                  <span className="font-semibold text-ink">{i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.day}<span className="ml-1.5 font-normal text-muted">{d.full}</span></span>
                  <span className={`text-xs font-bold ${i < 3 ? "text-success" : "text-muted"}`}>{i < 3 ? `${4 - i} slots` : "Full"}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">{timeSlots.slice(0, 8).map((t) => <span key={t} className="rounded-lg bg-soft px-2.5 py-1.5 text-xs font-semibold text-ink">{t}</span>)}</div>
            <Link href={`/appointments?doctor=${doctor.id}`}><Button className="mt-5 w-full">Book Appointment</Button></Link>
          </Card>
        </div>
      </div>

      {others.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
          <h2 className="text-xl font-extrabold text-ink">More in {doctor.department}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{others.map((d) => <DoctorCard key={d.id} doctor={d} />)}</div>
        </div>
      )}
    </PageShell>
  );
}
