import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { Toasts } from "@/components/ui";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medicale — Better Healthcare. Better Living.",
  description:
    "Premium healthcare platform. Discover doctors, explore services and book appointments online. 500+ doctors, 20+ departments, 24/7 support.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-soft text-ink antialiased">
        <AppProvider>{children}<Toasts /></AppProvider>
      </body>
    </html>
  );
}
