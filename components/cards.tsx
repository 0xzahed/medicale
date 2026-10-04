"use client";
import Link from "next/link";
import {
  CalendarCheck, Clock, MapPin, ShieldCheck, Star, Video,
} from "lucide-react";
import type { Doctor, Service } from "@/lib/types";
import { Card, Badge, Button } from "./ui";
import { serviceIcon } from "@/lib/icons";
export { serviceIcon };

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-float">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/[0.07] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {serviceIcon(service.icon)}
      </div>
      <h3 className="mt-4 font-bold text-ink">{service.name}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{service.description}</p>
      <Link href="/services" className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:gap-2 transition-all">
        Learn More <span aria-hidden>→</span>
      </Link>
    </Card>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="flex items-start gap-4 p-5">
        <div className="relative">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white" style={{ background: `linear-gradient(135deg, ${doctor.color}, ${doctor.color}CC)` }} aria-hidden>
            {doctor.initials}
          </div>
          <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${doctor.available ? "bg-success" : "bg-warning"}`} title={doctor.available ? "Available" : "Busy"} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-ink">{doctor.name}</h3>
          <p className="text-[13px] font-medium text-primary">{doctor.specialty}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted"><MapPin className="h-3 w-3" />{doctor.hospital}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-600"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{doctor.rating} <span className="font-medium text-amber-600/70">({doctor.reviews})</span></span>
            <span className="inline-flex items-center gap-1 rounded-full bg-soft px-2 py-0.5 text-[11px] font-semibold text-muted"><Clock className="h-3 w-3" />{doctor.experience} yrs</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-soft/50 px-5 py-3">
        <div>
          <p className="text-[11px] font-medium text-muted">{doctor.available ? "Available" : "Next available"}</p>
          <p className={`text-[12.5px] font-bold ${doctor.available ? "text-success" : "text-warning"}`}>{doctor.nextAvailable}</p>
        </div>
        <p className="text-right"><span className="text-lg font-extrabold text-ink">${doctor.fee}</span><span className="block text-[11px] text-muted">consultation</span></p>
      </div>
      <div className="flex gap-2 p-4 pt-3">
        <Link href={`/doctors/${doctor.id}`} className="flex h-10 flex-1 items-center justify-center rounded-xl border border-line text-[13px] font-bold text-ink transition hover:border-primary hover:text-primary">View Profile</Link>
        <Link href={`/appointments?doctor=${doctor.id}`} className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-[13px] font-bold text-white transition hover:bg-primary-dark"><CalendarCheck className="h-4 w-4" />Book</Link>
      </div>
    </Card>
  );
}

export function TrustChip({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-primary shadow-card">{icon}</span>
      <span><span className="block text-[17px] font-extrabold leading-none text-ink">{value}</span><span className="mt-1 block text-xs font-medium text-muted">{label}</span></span>
    </div>
  );
}

export { Badge, Button, Video, ShieldCheck, Card };
