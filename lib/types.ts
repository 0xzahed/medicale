export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending" | "Refunded";
export type ConsultType = "In-Clinic" | "Video" | "Phone";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  languages: string[];
  education: string;
  hospital: string;
  gender: "Male" | "Female";
  available: boolean;
  nextAvailable: string;
  consultTypes: ConsultType[];
  about: string;
  image: string;
  initials: string;
  color: string;
  patients: number;
  status: "Active" | "Inactive";
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  doctors: number;
  patients: number;
  status: "Active" | "Inactive";
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  doctorId: string;
  department: string;
  date: string;
  time: string;
  type: ConsultType;
  fee: number;
  status: AppointmentStatus;
  payment: PaymentStatus;
  location: string;
  reason?: string;
}

export interface Prescription {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string; instructions: string }[];
  status: string;
}

export interface LabReport {
  id: string;
  test: string;
  patient: string;
  doctor: string;
  date: string;
  status: "Normal" | "Review" | "Critical" | "Ready";
}

export interface MedicalRecord {
  id: string;
  type: string;
  doctor: string;
  date: string;
  status: string;
  summary: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  appointments: number;
  status: "Active" | "Inactive";
  age: number;
  gender: string;
  blood: string;
}
