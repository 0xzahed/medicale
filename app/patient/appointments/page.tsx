"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, Clock, MapPin, Search, Video } from "lucide-react";
import { PortalPage } from "@/components/portal";
import { patientNav } from "@/components/layout";
import { Card, Badge, Button, Tabs, EmptyState, Input } from "@/components/ui";
import { useStore } from "@/lib/store";

export default function PatientAppointments() {
  const { appointments, updateStatus, pushToast } = useStore();
  const [tab, setTab] = useState("Upcoming");
  const [q, setQ] = useState("");
  const mine = appointments.filter((a) => a.patient === "Sarah Mitchell" && (a.doctor + a.department + a.id).toLowerCase().includes(q.toLowerCase()));
  const list = mine.filter((a) => tab === "Upcoming" ? (a.status === "Confirmed" || a.status === "Pending") : tab === "Completed" ? a.status === "Completed" : a.status === "Cancelled");

  return (
    <PortalPage items={patientNav} base="/patient" title="My Appointments" subtitle="Manage, reschedule or join your visits.">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Tabs tabs={["Upcoming", "Completed", "Cancelled"]} value={tab} onChange={setTab} />
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 sm:max-w-xs sm:ml-auto"><Search className="h-4 w-4 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search appointments…" className="h-10 w-full bg-transparent text-sm outline-none" aria-label="Search appointments" /></div>
        <Link href="/appointments"><Button><CalendarCheck className="h-4 w-4" /> New Booking</Button></Link>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {list.length === 0 && <div className="md:col-span-2"><EmptyState title={`No ${tab.toLowerCase()} appointments`} desc={tab === "Upcoming" ? "Your schedule is clear. Book your next visit whenever you're ready." : "Nothing here yet."} action={<Link href="/appointments"><Button>Book Appointment</Button></Link>} /></div>}
        {list.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-start justify-between gap-2"><div><p className="font-bold text-ink">{a.doctor}</p><p className="text-[13px] text-muted">{a.department} • {a.id}</p></div><Badge>{a.status}</Badge></div>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted"><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.date} • {a.time}</span><span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{a.location}</span></p>
            <div className="mt-2 flex gap-2"><Badge>{a.type}</Badge><Badge>{a.payment}</Badge><Badge>${a.fee}</Badge></div>
            <div className="mt-4 flex gap-2">
              {a.type === "Video" && a.status === "Confirmed" && <Button size="sm" onClick={() => pushToast({ title: "Joining consultation", desc: "Secure room opening…", kind: "info" })}><Video className="h-3.5 w-3.5" /> Join</Button>}
              {a.status !== "Cancelled" && a.status !== "Completed" && (<>
                <Button size="sm" variant="outline" onClick={() => pushToast({ title: "Reschedule requested", desc: "Choose a new slot", kind: "info" })}>Reschedule</Button>
                <Button size="sm" variant="danger" onClick={() => { updateStatus(a.id, "Cancelled"); pushToast({ title: "Appointment cancelled", desc: a.id, kind: "info" }); }}>Cancel</Button>
              </>)}
              {a.status === "Completed" && <Button size="sm" variant="outline" onClick={() => pushToast({ title: "Receipt downloaded", desc: `${a.id}.pdf`, kind: "info" })}>Receipt</Button>}
            </div>
          </Card>
        ))}
      </div>
    </PortalPage>
  );
}
