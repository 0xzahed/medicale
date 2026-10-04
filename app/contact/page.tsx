"use client";
import { useState } from "react";
import { PageShell } from "@/components/layout";
import { Card, Field, Input, Textarea, Select, Button } from "@/components/ui";
import { useStore } from "@/lib/store";
import { Clock, Mail, MapPin, Phone, Siren } from "lucide-react";

export default function ContactPage() {
  const { pushToast } = useStore();
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <div className="border-b border-line bg-white"><div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">Contact</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">We&apos;re here to help, 24/7</h1>
        <p className="mt-2 text-muted">Appointments, billing, medical records or feedback — expect a reply within 2 business hours.</p>
      </div></div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            ["Call us", "+1 (415) 555-0100", Phone],
            ["Email", "care@medicale.health", Mail],
            ["Visit", "480 Medical Plaza, San Francisco, CA 94102", MapPin],
            ["Hours", "Mon–Sat 8:00–20:00 • Emergency 24/7", Clock],
          ].map(([t, v, Icon]) => {
            const I = Icon as typeof Phone;
            return <Card key={t as string} className="flex items-center gap-4 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><I className="h-5 w-5" /></span><span><b className="block text-sm text-ink">{t as string}</b><span className="text-sm text-muted">{v as string}</span></span></Card>;
          })}
          <div className="flex items-center gap-4 rounded-2xl bg-danger p-5 text-white"><Siren className="h-8 w-8 shrink-0" /><div><b>Emergency? Call +1 (800) 911-3456</b><p className="text-[13px] text-white/80">Ambulance dispatch in ~8 minutes.</p></div></div>
        </div>
        <Card className="p-6 sm:p-8 lg:col-span-2">
          <h2 className="text-lg font-extrabold text-ink">Send us a message</h2>
          {sent ? (
            <div className="mt-6 rounded-2xl bg-emerald-50 p-6 text-center"><p className="font-bold text-success">Message received!</p><p className="mt-1 text-sm text-muted">Our care team will reply shortly. For urgent needs call the hotline.</p></div>
          ) : (
            <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); pushToast({ title: "Message sent", desc: "We will reply within 2 hours", kind: "success" }); }}>
              <Field label="Name"><Input required placeholder="Jane Cooper" /></Field>
              <Field label="Email"><Input required type="email" placeholder="jane@mail.com" /></Field>
              <Field label="Phone"><Input placeholder="+1 (415) 000-0000" /></Field>
              <Field label="Subject"><Select><option>Appointment help</option><option>Billing & payments</option><option>Medical records</option><option>Feedback</option><option>Other</option></Select></Field>
              <div className="sm:col-span-2"><Field label="Message"><Textarea required rows={5} placeholder="How can we help?" /></Field></div>
              <div className="sm:col-span-2"><Button className="w-full sm:w-auto" size="lg">Send Message</Button></div>
            </form>
          )}
        </Card>
      </div>
    </PageShell>
  );
}
