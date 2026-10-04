"use client";
import { Navbar, Footer, DashboardShell, type SideItem } from "./layout";

export function PortalPage({ items, base, title, subtitle, children }: { items: SideItem[]; base: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-8">
        <DashboardShell items={items} base={base} title={title} subtitle={subtitle}>{children}</DashboardShell>
      </main>
      <Footer />
    </div>
  );
}
