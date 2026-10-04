"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, Loader2, SearchX, X } from "lucide-react";
import { useStore } from "@/lib/store";

/* ---------- Button ---------- */
export function Button({
  children, variant = "primary", size = "md", className, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "white"; size?: "sm" | "md" | "lg"; }) {
  const styles = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-[0_8px_20px_-8px_rgba(15,107,120,0.6)]",
    secondary: "bg-secondary/10 text-primary hover:bg-secondary/20",
    outline: "border border-line bg-white text-ink hover:border-primary hover:text-primary",
    ghost: "text-muted hover:text-primary hover:bg-primary/5",
    danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white",
    white: "bg-white text-primary hover:bg-soft shadow-card",
  }[variant];
  const sizes = { sm: "h-9 px-3.5 text-[13px]", md: "h-11 px-5 text-sm", lg: "h-12 px-7 text-[15px]" }[size];
  return (
    <button {...props} className={cn("inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer", styles, sizes, className)}>
      {children}
    </button>
  );
}

/* ---------- Badge ---------- */
const badgeMap: Record<string, string> = {
  Confirmed: "bg-emerald-50 text-success border-emerald-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
  Pending: "bg-amber-50 text-warning border-amber-200",
  Cancelled: "bg-red-50 text-danger border-red-200",
  Paid: "bg-emerald-50 text-success border-emerald-200",
  Refunded: "bg-slate-100 text-slate-600 border-slate-200",
  Active: "bg-emerald-50 text-success border-emerald-200",
  Inactive: "bg-slate-100 text-slate-500 border-slate-200",
  Available: "bg-emerald-50 text-success border-emerald-200",
  Normal: "bg-emerald-50 text-success border-emerald-200",
  Review: "bg-amber-50 text-warning border-amber-200",
  Critical: "bg-red-50 text-danger border-red-200",
  Ready: "bg-sky-50 text-primary border-sky-200",
  Signed: "bg-emerald-50 text-success border-emerald-200",
};
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  const key = String(children);
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide", badgeMap[key] ?? "bg-primary/5 text-primary border-primary/15", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

/* ---------- Card ---------- */
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(22,50,58,0.05),0_8px_24px_-8px_rgba(15,107,120,0.12)]", className)}>{children}</div>;
}

/* ---------- Inputs ---------- */
export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15", props.className)} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15", props.className)} />;
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={cn("h-11 w-full appearance-none rounded-xl border border-line bg-white px-3.5 pr-9 text-sm font-medium text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 cursor-pointer", props.className)} />
      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
    </div>
  );
}

/* ---------- Stat ---------- */
export function StatCard({ icon, label, value, sub, trend, color = "#0F6B78" }: { icon: React.ReactNode; label: string; value: string; sub?: string; trend?: string; color?: string }) {
  return (
    <Card className="group p-5 transition-all hover:-translate-y-0.5 hover:shadow-float">
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: color }}>{icon}</div>
        {trend && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-success">{trend}</span>}
      </div>
      <p className="mt-4 text-[13px] font-medium text-muted">{label}</p>
      <p className="mt-0.5 text-[26px] font-extrabold tracking-tight text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </Card>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({ eyebrow, title, desc, align = "center" }: { eyebrow: string; title: string; desc?: string; align?: "center" | "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[34px] sm:leading-[1.15]">{title}</h2>
      {desc && <p className="mt-3 text-[15px] leading-relaxed text-muted">{desc}</p>}
    </div>
  );
}

/* ---------- Tabs ---------- */
export function Tabs({ tabs, value, onChange }: { tabs: string[]; value: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-soft p-1 no-scrollbar">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={cn("whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-semibold transition cursor-pointer", value === t ? "bg-white text-primary shadow-card" : "text-muted hover:text-ink")}>
          {t}
        </button>
      ))}
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-primary-deep/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()} className={cn("w-full rounded-t-3xl bg-white p-6 shadow-pop animate-fade-up sm:rounded-3xl", wide ? "max-w-2xl" : "max-w-lg")}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-soft text-muted transition hover:text-ink cursor-pointer"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Empty / Loading ---------- */
export function EmptyState({ icon, title, desc, action }: { icon?: React.ReactNode; title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-soft/60 px-6 py-12 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-muted shadow-card">{icon ?? <SearchX className="h-5 w-5" />}</div>
      <p className="mt-4 font-bold text-ink">{title}</p>
      {desc && <p className="mt-1 max-w-sm text-sm text-muted">{desc}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-xl", className)} />;
}
export function Spinner() {
  return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
}

/* ---------- Toasts viewport ---------- */
export function Toasts() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-pop animate-fade-up">
          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", t.kind === "success" ? "bg-emerald-50 text-success" : t.kind === "error" ? "bg-red-50 text-danger" : "bg-primary/10 text-primary")}>
            {t.kind === "success" ? <CheckCircle2 className="h-4 w-4" /> : t.kind === "error" ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink">{t.title}</p>
            {t.desc && <p className="mt-0.5 truncate text-[13px] text-muted">{t.desc}</p>}
          </div>
          <button onClick={() => dismissToast(t.id)} className="text-muted hover:text-ink cursor-pointer" aria-label="Dismiss"><X className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );
}

/* ---------- Pagination ---------- */
export function Pagination({ page, total, onPage }: { page: number; total: number; onPage: (p: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <p className="text-xs text-muted">Page {page} of {total}</p>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => onPage(p)} className={cn("h-9 w-9 rounded-lg text-[13px] font-bold transition cursor-pointer", p === page ? "bg-primary text-white" : "bg-white border border-line text-muted hover:text-primary")}>{p}</button>
        ))}
      </div>
    </div>
  );
}
