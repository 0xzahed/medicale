"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageShell } from "@/components/layout";
import { DoctorCard } from "@/components/cards";
import { Input, Select, Field, EmptyState, Button } from "@/components/ui";
import { doctors, departments } from "@/lib/data";

export default function DoctorsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");
  const [gender, setGender] = useState("");
  const [avail, setAvail] = useState("");
  const [ctype, setCtype] = useState("");
  const [exp, setExp] = useState("");

  const list = useMemo(() => doctors.filter((d) => {
    if (q && !(d.name + d.specialty + d.department + d.hospital).toLowerCase().includes(q.toLowerCase())) return false;
    if (dept && d.department !== dept) return false;
    if (gender && d.gender !== gender) return false;
    if (avail === "available" && !d.available) return false;
    if (ctype && !d.consultTypes.includes(ctype as "In-Clinic" | "Video" | "Phone")) return false;
    if (exp === "10+" && d.experience < 10) return false;
    if (exp === "5-10" && (d.experience < 5 || d.experience > 10)) return false;
    return true;
  }), [q, dept, gender, avail, ctype, exp]);

  return (
    <PageShell>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">Find a Doctor</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Search doctors by name, specialty or location</h1>
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-line bg-soft px-4 focus-within:border-primary focus-within:bg-white">
            <Search className="h-5 w-5 shrink-0 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “cardiologist”, “Amelia”, “Dental”…" className="h-12 w-full bg-transparent text-[15px] outline-none placeholder:text-muted/70" aria-label="Search doctors" />
            {q && <button onClick={() => setQ("")} className="text-xs font-bold text-primary cursor-pointer">Clear</button>}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
            <Field label="Department"><Select value={dept} onChange={(e) => setDept(e.target.value)}><option value="">All</option>{departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}</Select></Field>
            <Field label="Gender"><Select value={gender} onChange={(e) => setGender(e.target.value)}><option value="">Any</option><option>Male</option><option>Female</option></Select></Field>
            <Field label="Availability"><Select value={avail} onChange={(e) => setAvail(e.target.value)}><option value="">Any</option><option value="available">Available now</option></Select></Field>
            <Field label="Consult Type"><Select value={ctype} onChange={(e) => setCtype(e.target.value)}><option value="">Any</option><option>In-Clinic</option><option>Video</option><option>Phone</option></Select></Field>
            <Field label="Experience"><Select value={exp} onChange={(e) => setExp(e.target.value)}><option value="">Any</option><option value="10+">10+ years</option><option value="5-10">5–10 years</option></Select></Field>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="mb-5 flex items-center gap-2 text-sm text-muted"><SlidersHorizontal className="h-4 w-4" /> {list.length} doctor{list.length !== 1 && "s"} found</p>
        {list.length === 0 ? (
          <EmptyState title="No doctors match your filters" desc="Try a different specialty, clear the search, or check availability for another day." action={<Button onClick={() => { setQ(""); setDept(""); setGender(""); setAvail(""); setCtype(""); setExp(""); }}>Clear all filters</Button>} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((d) => <DoctorCard key={d.id} doctor={d} />)}</div>
        )}
      </section>
    </PageShell>
  );
}
