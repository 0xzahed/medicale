"use client";
import { SimplePortalPage as P } from "../slides";
export default function Page() { return <P title="Reviews" subtitle="4.9 average across 842 verified reviews." body={<div className="space-y-3">{[["Rachel T.",5,"Thorough, kind and never rushed."],["Michael C.",5,"Accurate diagnosis on the first visit."],["Aisha K.",5,"My whole family sees Dr. Hart now."]].map(([n,,t]) => <div key={n as string} className="rounded-xl bg-soft p-4"><b className="text-sm">{n as string} • ★★★★★</b><p className="text-[13px] text-muted">{t as string}</p></div>)}</div>} />; }
