"use client";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Appointment } from "./types";
import { appointmentsSeed } from "./data";

export interface Toast { id: number; title: string; desc?: string; kind: "success" | "info" | "error"; }
export interface Notification { id: string; title: string; desc: string; time: string; icon: string; unread: boolean; }

const seedNotifications: Notification[] = [
  { id: "n1", title: "Appointment confirmed", desc: "Dr. Amelia Hart • Sep 28, 10:30 AM", time: "2m ago", icon: "CalendarCheck", unread: true },
  { id: "n2", title: "Prescription added", desc: "Dr. Marcus Webb added 2 medicines", time: "1h ago", icon: "Pill", unread: true },
  { id: "n3", title: "Lab report available", desc: "Lipid Profile is ready to review", time: "3h ago", icon: "FileText", unread: true },
  { id: "n4", title: "Payment successful", desc: "$85 paid for APT-90412", time: "Yesterday", icon: "CreditCard", unread: false },
  { id: "n5", title: "Reminder: video visit", desc: "Dr. Sofia Rahman • Sep 30, 11:00 AM", time: "Yesterday", icon: "Video", unread: false },
];

interface Store {
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  appointments: Appointment[];
  addAppointment: (a: Appointment) => void;
  updateStatus: (id: string, status: Appointment["status"]) => void;
  notifications: Notification[];
  markAllRead: () => void;
}

const Ctx = createContext<Store | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsSeed);
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { ...t, id }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3800);
  }, []);

  const dismissToast = useCallback((id: number) => setToasts((p) => p.filter((x) => x.id !== id)), []);
  const addAppointment = useCallback((a: Appointment) => setAppointments((p) => [a, ...p]), []);
  const updateStatus = useCallback((id: string, status: Appointment["status"]) => {
    setAppointments((p) => p.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);
  const markAllRead = useCallback(() => setNotifications((p) => p.map((n) => ({ ...n, unread: false }))), []);

  const value = useMemo(
    () => ({ toasts, pushToast, dismissToast, appointments, addAppointment, updateStatus, notifications, markAllRead }),
    [toasts, pushToast, dismissToast, appointments, addAppointment, updateStatus, notifications, markAllRead]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}
