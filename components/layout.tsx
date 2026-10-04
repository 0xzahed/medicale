"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Activity, Bell, CalendarCheck, ChevronDown, Cross, HeartPulse, LayoutDashboard,
  LogOut, Menu, Microscope, Search, Settings, Stethoscope, User, Users, Wallet,
  FileText, Pill, MessageSquare, ClipboardList, BarChart3, Building2, Star, X,
  Video, Phone, MapPin, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { doctors, departments, services, blogs } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "./ui";

const nav = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Departments", href: "/departments" },
  { label: "Appointments", href: "/appointments" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ================= NAVBAR ================= */
export function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const { notifications, markAllRead } = useStore();
  const unread = notifications.filter((n) => n.unread).length;
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) { setShowSearch(false); setShowNotif(false); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const results = q.trim() ? [
    ...doctors.filter((d) => (d.name + d.specialty + d.department).toLowerCase().includes(q.toLowerCase())).slice(0, 3).map((d) => ({ kind: "Doctor", title: d.name, sub: `${d.specialty} • ${d.department}`, href: `/doctors/${d.id}` })),
    ...departments.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).slice(0, 2).map((d) => ({ kind: "Department", title: d.name, sub: `${d.doctors} doctors`, href: "/departments" })),
    ...services.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())).slice(0, 2).map((s) => ({ kind: "Service", title: s.name, sub: s.description.slice(0, 42) + "…", href: "/services" })),
    ...blogs.filter((b) => b.title.toLowerCase().includes(q.toLowerCase())).slice(0, 2).map((b) => ({ kind: "Article", title: b.title, sub: b.category, href: "/#blog" })),
  ] : [];

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Medicale home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-card">
            <Cross className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-tight text-ink">Medicale</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">Care Platform</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.label} href={n.href} className={cn("rounded-lg px-3 py-2 text-[13.5px] font-semibold transition", path === n.href ? "bg-primary/8 text-primary" : "text-muted hover:bg-soft hover:text-ink")}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2" ref={boxRef}>
          <div className="relative hidden md:block">
            <button onClick={() => setShowSearch((s) => !s)} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-muted transition hover:border-primary hover:text-primary cursor-pointer">
              <Search className="h-[18px] w-[18px]" />
            </button>
            {showSearch && (
              <div className="absolute right-0 top-12 w-[340px] rounded-2xl border border-line bg-white p-3 shadow-pop animate-fade-up">
                <div className="flex items-center gap-2 rounded-xl bg-soft px-3">
                  <Search className="h-4 w-4 text-muted" />
                  <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search doctors, departments…" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted/70" aria-label="Global search" />
                </div>
                <div className="mt-2 max-h-72 overflow-auto">
                  {q.trim() === "" && <p className="px-2 py-3 text-xs text-muted">Try “cardio”, “Amelia”, “dental”…</p>}
                  {q.trim() !== "" && results.length === 0 && <p className="px-2 py-3 text-xs text-muted">No results for “{q}”.</p>}
                  {results.map((r, i) => (
                    <button key={i} onClick={() => { router.push(r.href); setShowSearch(false); setQ(""); }} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-soft cursor-pointer">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Search className="h-4 w-4" /></span>
                      <span className="min-w-0"><span className="block truncate text-[13px] font-bold text-ink">{r.title}</span><span className="block truncate text-xs text-muted">{r.kind} • {r.sub}</span></span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => { setShowNotif((s) => !s); }} aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-muted transition hover:border-primary hover:text-primary cursor-pointer">
              <Bell className="h-[18px] w-[18px]" />
              {unread > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">{unread}</span>}
            </button>
            {showNotif && (
              <div className="absolute right-0 top-12 w-[340px] rounded-2xl border border-line bg-white shadow-pop animate-fade-up">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <p className="text-sm font-bold text-ink">Notifications</p>
                  <button onClick={markAllRead} className="text-xs font-bold text-primary hover:underline cursor-pointer">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-auto p-2">
                  {notifications.map((n) => (
                    <div key={n.id} className={cn("flex gap-3 rounded-xl p-3 transition hover:bg-soft", n.unread && "bg-primary/[0.04]")}>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Bell className="h-4 w-4" /></span>
                      <div className="min-w-0"><p className="text-[13px] font-bold text-ink">{n.title}</p><p className="truncate text-xs text-muted">{n.desc}</p><p className="mt-0.5 text-[11px] text-muted/70">{n.time}</p></div>
                      {n.unread && <span className="ml-auto mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />}
                    </div>
                  ))}
                </div>
                <Link href="/patient" onClick={() => setShowNotif(false)} className="block border-t border-line px-4 py-3 text-center text-[13px] font-bold text-primary hover:bg-soft rounded-b-2xl">View all in portal</Link>
              </div>
            )}
          </div>

          <Link href="/patient" className="hidden h-10 items-center rounded-xl px-3 text-[13.5px] font-semibold text-muted transition hover:text-primary sm:inline-flex">Login</Link>
          <Link href="/appointments" className="hidden h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-[13.5px] font-bold text-white shadow-card transition hover:bg-primary-dark sm:inline-flex">
            <CalendarCheck className="h-4 w-4" /> Book Appointment
          </Link>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden cursor-pointer"><Menu className="h-5 w-5" /></button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-primary-deep/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-pop animate-fade-up">
            <div className="flex items-center justify-between border-b border-line p-4">
              <span className="flex items-center gap-2 font-extrabold text-ink"><span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white"><Cross className="h-4 w-4" /></span>Medicale</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full bg-soft text-muted cursor-pointer"><X className="h-4 w-4" /></button>
            </div>
            <nav className="flex-1 overflow-auto p-3" aria-label="Mobile">
              {nav.map((n) => (
                <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className={cn("mb-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold", path === n.href ? "bg-primary/8 text-primary" : "text-ink hover:bg-soft")}>
                  {n.label}<ChevronDown className="h-4 w-4 -rotate-90 text-muted" />
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-3 gap-2 px-1">
                {[["Patient", "/patient", User], ["Doctor", "/doctor", Stethoscope], ["Admin", "/admin", LayoutDashboard]].map(([label, href, Icon]) => {
                  const I = Icon as typeof User;
                  return <Link key={label as string} href={href as string} onClick={() => setOpen(false)} className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-soft/60 py-3 text-xs font-bold text-ink"><I className="h-4 w-4 text-primary" />{label as string}</Link>;
                })}
              </div>
            </nav>
            <div className="border-t border-line p-4">
              <Link href="/appointments" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-bold text-white"><CalendarCheck className="h-4 w-4" />Book Appointment</Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

/* ================= FOOTER ================= */
export function Footer() {
  return (
    <footer className="mt-20 bg-primary-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><Cross className="h-5 w-5" /></span>
            <span className="text-lg font-extrabold">Medicale</span>
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">A premium healthcare technology platform connecting patients with trusted doctors, modern diagnostics and seamless appointment care — online and in-clinic.</p>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-danger/90 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Phone className="h-5 w-5" /></span>
            <div><p className="text-[11px] font-bold uppercase tracking-widest text-white/80">Emergency Hotline 24/7</p><p className="text-lg font-extrabold">+1 (800) 911-3456</p></div>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-white/50">Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {["Find a Doctor|/doctors", "Book Appointment|/appointments", "Services|/services", "Departments|/departments", "About Us|/about", "Contact|/contact"].map((l) => { const [t, h] = l.split("|"); return <li key={t}><Link href={h} className="transition hover:text-white">{t}</Link></li>; })}
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-white/50">Departments</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {departments.slice(0, 6).map((d) => <li key={d.id}><Link href="/departments" className="transition hover:text-white">{d.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-widest text-white/50">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" /> 480 Medical Plaza, San Francisco, CA</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /> +1 (415) 555-0100</li>
            <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-accent" /> Mon–Sat 8:00–20:00 • ER 24/7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>© 2026 Medicale Care Platform. Prototype for client demo.</p>
          <p className="flex gap-4"><Link href="#" className="hover:text-white">Privacy Policy</Link><Link href="#" className="hover:text-white">Terms & Conditions</Link><Link href="#" className="hover:text-white">HIPAA Notice</Link></p>
        </div>
      </div>
    </footer>
  );
}

/* ================= DASHBOARD SHELL ================= */
export interface SideItem { label: string; href: string; icon: React.ReactNode; badge?: string; }

export function DashboardShell({ items, title, subtitle, children, base }: { items: SideItem[]; title: string; subtitle?: string; children: React.ReactNode; base: string }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex gap-6">
        {/* sidebar desktop */}
        <aside className="sticky top-[88px] hidden h-[calc(100vh-110px)] w-60 shrink-0 overflow-auto rounded-2xl border border-line bg-white p-3 lg:block" aria-label="Dashboard navigation">
          <PortalSwitcher base={base} />
          <nav className="mt-2 space-y-0.5">
            {items.map((it) => {
              const active = path === it.href;
              return (
                <Link key={it.label} href={it.href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition", active ? "bg-primary text-white shadow-card" : "text-muted hover:bg-soft hover:text-ink")}>
                  <span className={cn(active ? "text-white" : "text-muted")}>{it.icon}</span>
                  <span className="flex-1">{it.label}</span>
                  {it.badge && <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", active ? "bg-white/20 text-white" : "bg-danger/10 text-danger")}>{it.badge}</span>}
                </Link>
              );
            })}
          </nav>
          <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-muted transition hover:bg-red-50 hover:text-danger cursor-pointer"><LogOut className="h-[18px] w-[18px]" /> Logout</button>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white lg:hidden cursor-pointer" aria-label="Open dashboard menu"><Menu className="h-5 w-5" /></button>
            <div><h1 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h1>{subtitle && <p className="text-[13px] text-muted">{subtitle}</p>}</div>
          </div>
          {children}
          {/* mobile bottom nav */}
          <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-2xl border border-line bg-white/95 p-2 shadow-pop backdrop-blur lg:hidden" aria-label="Mobile dashboard">
            {items.slice(0, 5).map((it) => (
              <Link key={it.label} href={it.href} aria-label={it.label} className={cn("grid h-11 w-11 place-items-center rounded-xl transition", path === it.href ? "bg-primary text-white" : "text-muted")}>{it.icon}</Link>
            ))}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-primary-deep/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[80%] max-w-xs overflow-auto bg-white p-3 shadow-pop">
            <PortalSwitcher base={base} />
            {items.map((it) => (
              <Link key={it.label} href={it.href} onClick={() => setMobileOpen(false)} className={cn("mt-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold", path === it.href ? "bg-primary text-white" : "text-muted hover:bg-soft")}>{it.icon}{it.label}</Link>
            ))}
          </aside>
        </div>
      )}
    </div>
  );
}

function PortalSwitcher({ base }: { base: string }) {
  const links = [
    { label: "Patient", href: "/patient", icon: <User className="h-4 w-4" /> },
    { label: "Doctor", href: "/doctor", icon: <Stethoscope className="h-4 w-4" /> },
    { label: "Admin", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
  ];
  return (
    <div className="grid grid-cols-3 gap-1 rounded-xl bg-soft p-1">
      {links.map((l) => (
        <Link key={l.label} href={l.href} className={cn("flex items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-bold transition", base === l.href ? "bg-white text-primary shadow-card" : "text-muted hover:text-ink")}>{l.icon}{l.label}</Link>
      ))}
    </div>
  );
}

export const patientNav: SideItem[] = [
  { label: "Dashboard", href: "/patient", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
  { label: "My Appointments", href: "/patient/appointments", icon: <CalendarCheck className="h-[18px] w-[18px]" />, badge: "2" },
  { label: "Find a Doctor", href: "/doctors", icon: <Search className="h-[18px] w-[18px]" /> },
  { label: "Medical Records", href: "/patient/records", icon: <FileText className="h-[18px] w-[18px]" /> },
  { label: "Prescriptions", href: "/patient/prescriptions", icon: <Pill className="h-[18px] w-[18px]" /> },
  { label: "Lab Reports", href: "/patient/labs", icon: <Microscope className="h-[18px] w-[18px]" /> },
  { label: "Payments", href: "/patient/payments", icon: <Wallet className="h-[18px] w-[18px]" /> },
  { label: "Messages", href: "/patient/messages", icon: <MessageSquare className="h-[18px] w-[18px]" />, badge: "3" },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-[18px] w-[18px]" /> },
  { label: "Settings", href: "/patient/settings", icon: <Settings className="h-[18px] w-[18px]" /> },
];

export const doctorNav: SideItem[] = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
  { label: "Schedule", href: "/doctor/schedule", icon: <CalendarCheck className="h-[18px] w-[18px]" /> },
  { label: "Patients", href: "/doctor/patients", icon: <Users className="h-[18px] w-[18px]" /> },
  { label: "Prescriptions", href: "/doctor/prescriptions", icon: <Pill className="h-[18px] w-[18px]" /> },
  { label: "Messages", href: "/doctor/messages", icon: <MessageSquare className="h-[18px] w-[18px]" />, badge: "5" },
  { label: "Earnings", href: "/doctor/earnings", icon: <Wallet className="h-[18px] w-[18px]" /> },
  { label: "Reviews", href: "/doctor/reviews", icon: <Star className="h-[18px] w-[18px]" /> },
  { label: "Settings", href: "/doctor/settings", icon: <Settings className="h-[18px] w-[18px]" /> },
];

export const adminNav: SideItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
  { label: "Doctors", href: "/admin/doctors", icon: <Stethoscope className="h-[18px] w-[18px]" /> },
  { label: "Patients", href: "/admin/patients", icon: <Users className="h-[18px] w-[18px]" /> },
  { label: "Appointments", href: "/admin/appointments", icon: <CalendarCheck className="h-[18px] w-[18px]" /> },
  { label: "Departments", href: "/admin/departments", icon: <Building2 className="h-[18px] w-[18px]" /> },
  { label: "Services", href: "/admin/services", icon: <Activity className="h-[18px] w-[18px]" /> },
  { label: "Records", href: "/admin/records", icon: <ClipboardList className="h-[18px] w-[18px]" /> },
  { label: "Payments", href: "/admin/payments", icon: <Wallet className="h-[18px] w-[18px]" /> },
  { label: "Reports", href: "/admin/reports", icon: <BarChart3 className="h-[18px] w-[18px]" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-[18px] w-[18px]" /> },
];

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// re-export icons used elsewhere
export { HeartPulse, Video, Phone };
