import type { Appointment, Department, Doctor, LabReport, MedicalRecord, Patient, Prescription, Service } from "./types";

export const departments: Department[] = [
  { id: "cardiology", name: "Cardiology", icon: "HeartPulse", description: "Heart care, ECG, echo, stress testing and interventional cardiology.", doctors: 42, patients: 12400, status: "Active" },
  { id: "neurology", name: "Neurology", icon: "Brain", description: "Brain, spine and nervous system diagnosis and treatment.", doctors: 28, patients: 8600, status: "Active" },
  { id: "orthopedics", name: "Orthopedics", icon: "Bone", description: "Bones, joints, sports injuries and joint replacement.", doctors: 34, patients: 9800, status: "Active" },
  { id: "pediatrics", name: "Pediatrics", icon: "Baby", description: "Complete child healthcare from newborn to adolescence.", doctors: 30, patients: 15200, status: "Active" },
  { id: "dermatology", name: "Dermatology", icon: "Sparkles", description: "Skin, hair and cosmetic dermatology with laser care.", doctors: 22, patients: 7400, status: "Active" },
  { id: "dental", name: "Dental", icon: "Smile", description: "Implants, orthodontics, cosmetic dentistry and oral surgery.", doctors: 26, patients: 9100, status: "Active" },
  { id: "gynecology", name: "Gynecology", icon: "HeartHandshake", description: "Women's health, maternity, fertility and laparoscopic surgery.", doctors: 31, patients: 11800, status: "Active" },
  { id: "general", name: "General Medicine", icon: "Stethoscope", description: "Primary care, chronic disease and preventive health.", doctors: 58, patients: 21400, status: "Active" },
];

export const services: Service[] = [
  { id: "consult", name: "General Consultation", icon: "Stethoscope", description: "Same-day appointments with experienced general physicians." },
  { id: "emergency", name: "Emergency Care", icon: "Siren", description: "24/7 emergency department with rapid response teams." },
  { id: "dental", name: "Dental Care", icon: "Smile", description: "Preventive, cosmetic and surgical dental treatments." },
  { id: "cardio", name: "Cardiology", icon: "HeartPulse", description: "Advanced cardiac screening, echo and cath-lab support." },
  { id: "neuro", name: "Neurology", icon: "Brain", description: "EEG, EMG, stroke care and neuro-rehabilitation." },
  { id: "pedia", name: "Pediatrics", icon: "Baby", description: "Vaccination, growth tracking and pediatric ICU." },
  { id: "diag", name: "Diagnostics", icon: "Microscope", description: "NABL-accredited labs, MRI, CT and ultrasound." },
  { id: "pharma", name: "Pharmacy", icon: "Pill", description: "In-house pharmacy with home delivery and refills." },
];

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Amelia Hart", specialty: "Cardiologist", department: "Cardiology", experience: 14, rating: 4.9, reviews: 842, fee: 85, languages: ["English", "Spanish"], education: "MD Cardiology, Johns Hopkins", hospital: "Medicale Heart Center", gender: "Female", available: true, nextAvailable: "Today, 4:30 PM", consultTypes: ["In-Clinic", "Video"], about: "Dr. Hart is a board-certified cardiologist specializing in preventive cardiology, heart failure and non-invasive imaging. She has performed 4,000+ echocardiograms and leads the cardiac prevention program.", image: "", initials: "AH", color: "#0F6B78", patients: 5200, status: "Active" },
  { id: "d2", name: "Dr. James Okafor", specialty: "Neurologist", department: "Neurology", experience: 12, rating: 4.8, reviews: 619, fee: 95, languages: ["English", "French"], education: "MD Neurology, Mayo Clinic", hospital: "Medicale Neuro Institute", gender: "Male", available: true, nextAvailable: "Today, 6:00 PM", consultTypes: ["In-Clinic", "Video", "Phone"], about: "Specialist in epilepsy, movement disorders and stroke rehabilitation with 12 years of tertiary-care experience.", image: "", initials: "JO", color: "#19A7A8", patients: 4100, status: "Active" },
  { id: "d3", name: "Dr. Sofia Rahman", specialty: "Pediatrician", department: "Pediatrics", experience: 10, rating: 4.9, reviews: 1104, fee: 60, languages: ["English", "Hindi", "Bengali"], education: "MD Pediatrics, AIIMS", hospital: "Medicale Children's Wing", gender: "Female", available: true, nextAvailable: "Tomorrow, 10:00 AM", consultTypes: ["In-Clinic", "Video"], about: "Trusted pediatrician focused on newborn care, immunizations and developmental screening.", image: "", initials: "SR", color: "#36CFC9", patients: 7800, status: "Active" },
  { id: "d4", name: "Dr. Daniel Kim", specialty: "Orthopedic Surgeon", department: "Orthopedics", experience: 16, rating: 4.7, reviews: 503, fee: 110, languages: ["English", "Korean"], education: "MS Orthopedics, Seoul National", hospital: "Medicale Ortho Center", gender: "Male", available: false, nextAvailable: "Mon, 11:30 AM", consultTypes: ["In-Clinic"], about: "Expert in arthroscopy, joint replacement and sports medicine.", image: "", initials: "DK", color: "#084C61", patients: 4900, status: "Active" },
  { id: "d5", name: "Dr. Elena Petrova", specialty: "Dermatologist", department: "Dermatology", experience: 9, rating: 4.8, reviews: 731, fee: 70, languages: ["English", "Russian"], education: "MD Dermatology, Charité Berlin", hospital: "Medicale Skin Clinic", gender: "Female", available: true, nextAvailable: "Today, 3:15 PM", consultTypes: ["In-Clinic", "Video"], about: "Cosmetic and medical dermatology including laser, acne and hair restoration.", image: "", initials: "EP", color: "#E9A23B", patients: 3600, status: "Active" },
  { id: "d6", name: "Dr. Marcus Webb", specialty: "General Physician", department: "General Medicine", experience: 18, rating: 4.9, reviews: 1420, fee: 55, languages: ["English"], education: "MD Internal Medicine, Oxford", hospital: "Medicale Primary Care", gender: "Male", available: true, nextAvailable: "Today, 2:00 PM", consultTypes: ["In-Clinic", "Video", "Phone"], about: "Primary-care leader in diabetes, hypertension and preventive screening.", image: "", initials: "MW", color: "#20A464", patients: 9400, status: "Active" },
  { id: "d7", name: "Dr. Priya Nair", specialty: "Gynecologist", department: "Gynecology", experience: 13, rating: 4.9, reviews: 968, fee: 80, languages: ["English", "Malayalam", "Hindi"], education: "MS OB-GYN, CMC Vellore", hospital: "Medicale Women's Health", gender: "Female", available: true, nextAvailable: "Tomorrow, 9:00 AM", consultTypes: ["In-Clinic", "Video"], about: "High-risk pregnancy, minimally invasive surgery and fertility care.", image: "", initials: "PN", color: "#0F6B78", patients: 6100, status: "Active" },
  { id: "d8", name: "Dr. Tomas Silva", specialty: "Dentist", department: "Dental", experience: 11, rating: 4.7, reviews: 455, fee: 50, languages: ["English", "Portuguese"], education: "DDS, University of São Paulo", hospital: "Medicale Dental Studio", gender: "Male", available: true, nextAvailable: "Today, 5:45 PM", consultTypes: ["In-Clinic"], about: "Implants, aligners and full-mouth rehabilitation.", image: "", initials: "TS", color: "#19A7A8", patients: 3200, status: "Active" },
  { id: "d9", name: "Dr. Hannah Lee", specialty: "Psychiatrist", department: "General Medicine", experience: 8, rating: 4.9, reviews: 388, fee: 90, languages: ["English", "Korean"], education: "MD Psychiatry, Stanford", hospital: "Medicale Mind Center", gender: "Female", available: false, nextAvailable: "Wed, 1:00 PM", consultTypes: ["Video", "Phone"], about: "Anxiety, depression, sleep disorders and adolescent mental health.", image: "", initials: "HL", color: "#084C61", patients: 2100, status: "Active" },
];

export const appointmentsSeed: Appointment[] = [
  { id: "APT-90412", patient: "Sarah Mitchell", doctor: "Dr. Amelia Hart", doctorId: "d1", department: "Cardiology", date: "Sep 28, 2026", time: "10:30 AM", type: "In-Clinic", fee: 85, status: "Confirmed", payment: "Paid", location: "Tower A, Room 304" },
  { id: "APT-90413", patient: "Sarah Mitchell", doctor: "Dr. Sofia Rahman", doctorId: "d3", department: "Pediatrics", date: "Sep 30, 2026", time: "11:00 AM", type: "Video", fee: 60, status: "Confirmed", payment: "Paid", location: "Video Consultation" },
  { id: "APT-90398", patient: "Sarah Mitchell", doctor: "Dr. Marcus Webb", doctorId: "d6", department: "General Medicine", date: "Sep 12, 2026", time: "09:15 AM", type: "In-Clinic", fee: 55, status: "Completed", payment: "Paid", location: "Primary Care, Room 102" },
  { id: "APT-90377", patient: "John Carter", doctor: "Dr. James Okafor", doctorId: "d2", department: "Neurology", date: "Sep 28, 2026", time: "09:00 AM", type: "In-Clinic", fee: 95, status: "Pending", payment: "Pending", location: "Tower B, Room 210" },
  { id: "APT-90376", patient: "Emily Ross", doctor: "Dr. Daniel Kim", doctorId: "d4", department: "Orthopedics", date: "Sep 28, 2026", time: "09:30 AM", type: "In-Clinic", fee: 110, status: "Confirmed", payment: "Paid", location: "Ortho Center, Room 118" },
  { id: "APT-90375", patient: "David Lin", doctor: "Dr. Priya Nair", doctorId: "d7", department: "Gynecology", date: "Sep 27, 2026", time: "02:00 PM", type: "Video", fee: 80, status: "Completed", payment: "Paid", location: "Video Consultation" },
];

export const patientsSeed: Patient[] = [
  { id: "P-10231", name: "Sarah Mitchell", phone: "+1 (415) 555-0132", email: "sarah.m@mail.com", lastVisit: "Sep 12, 2026", appointments: 8, status: "Active", age: 34, gender: "Female", blood: "O+" },
  { id: "P-10232", name: "John Carter", phone: "+1 (415) 555-0188", email: "john.c@mail.com", lastVisit: "Sep 20, 2026", appointments: 5, status: "Active", age: 45, gender: "Male", blood: "A+" },
  { id: "P-10233", name: "Emily Ross", phone: "+1 (415) 555-0119", email: "emily.r@mail.com", lastVisit: "Sep 25, 2026", appointments: 3, status: "Active", age: 29, gender: "Female", blood: "B+" },
  { id: "P-10234", name: "David Lin", phone: "+1 (415) 555-0144", email: "david.l@mail.com", lastVisit: "Aug 30, 2026", appointments: 6, status: "Active", age: 52, gender: "Male", blood: "AB+" },
  { id: "P-10235", name: "Aisha Khan", phone: "+1 (415) 555-0161", email: "aisha.k@mail.com", lastVisit: "Jul 14, 2026", appointments: 2, status: "Inactive", age: 38, gender: "Female", blood: "O-" },
  { id: "P-10236", name: "Robert Fox", phone: "+1 (415) 555-0177", email: "robert.f@mail.com", lastVisit: "Sep 02, 2026", appointments: 11, status: "Active", age: 61, gender: "Male", blood: "A-" },
];

export const prescriptionsSeed: Prescription[] = [
  { id: "RX-5521", patient: "Sarah Mitchell", doctor: "Dr. Marcus Webb", date: "Sep 12, 2026", status: "Active", medicines: [{ name: "Atorvastatin", dosage: "10mg", frequency: "Once daily", duration: "30 days", instructions: "After dinner" }, { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", duration: "60 days", instructions: "With breakfast" }] },
  { id: "RX-5498", patient: "Sarah Mitchell", doctor: "Dr. Amelia Hart", date: "Aug 22, 2026", status: "Completed", medicines: [{ name: "Metoprolol", dosage: "25mg", frequency: "Twice daily", duration: "30 days", instructions: "With food" }] },
];

export const labsSeed: LabReport[] = [
  { id: "LAB-8812", test: "Complete Blood Count", patient: "Sarah Mitchell", doctor: "Dr. Marcus Webb", date: "Sep 20, 2026", status: "Normal" },
  { id: "LAB-8790", test: "Lipid Profile", patient: "Sarah Mitchell", doctor: "Dr. Amelia Hart", date: "Sep 18, 2026", status: "Review" },
  { id: "LAB-8744", test: "HbA1c", patient: "Sarah Mitchell", doctor: "Dr. Marcus Webb", date: "Aug 30, 2026", status: "Ready" },
  { id: "LAB-8701", test: "Thyroid Panel (T3/T4/TSH)", patient: "Sarah Mitchell", doctor: "Dr. Marcus Webb", date: "Aug 12, 2026", status: "Normal" },
];

export const recordsSeed: MedicalRecord[] = [
  { id: "MR-3310", type: "Cardiology Consultation", doctor: "Dr. Amelia Hart", date: "Sep 12, 2026", status: "Signed", summary: "BP 128/82, ECG normal sinus rhythm. Continue statin, recheck lipids in 6 weeks." },
  { id: "MR-3298", type: "Annual Physical", doctor: "Dr. Marcus Webb", date: "Aug 22, 2026", status: "Signed", summary: "All vitals stable. BMI 24.1. Lifestyle counseling provided." },
  { id: "MR-3271", type: "Dental Cleaning", doctor: "Dr. Tomas Silva", date: "Jul 30, 2026", status: "Signed", summary: "Routine scaling, no caries. Next recall in 6 months." },
];

export const testimonials = [
  { name: "Rachel Thompson", role: "Cardiology Patient", rating: 5, text: "Booking took less than two minutes and my cardiologist had my full history ready. The most organized clinic experience I've had.", initials: "RT" },
  { name: "Michael Chen", role: "Orthopedics Patient", rating: 5, text: "From MRI to surgery to rehab, everything was coordinated in one dashboard. My recovery timeline was clear at every step.", initials: "MC" },
  { name: "Fatima Al-Sayed", role: "Maternity Patient", rating: 5, text: "Video consultations saved me hours. Prescriptions and lab reports appeared instantly in my portal. Exceptional care.", initials: "FA" },
];

export const blogs = [
  { id: "b1", category: "Preventive Care", title: "The 7 Screenings Every Adult Over 30 Should Not Skip", author: "Dr. Marcus Webb", date: "Sep 18, 2026", read: "6 min read", color: "#0F6B78" },
  { id: "b2", category: "Nutrition", title: "Heart-Healthy Eating: A Cardiologist's Weekly Guide", author: "Dr. Amelia Hart", date: "Sep 12, 2026", read: "5 min read", color: "#19A7A8" },
  { id: "b3", category: "Mental Wellness", title: "Sleep, Stress and Your Heart: What Science Says", author: "Dr. Hannah Lee", date: "Sep 05, 2026", read: "8 min read", color: "#084C61" },
];

export const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:15 PM", "04:30 PM", "05:45 PM", "06:00 PM"];

export const next7Days = (() => {
  const days: { label: string; day: string; num: string; full: string }[] = [];
  const base = new Date(2026, 8, 27);
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.toLocaleDateString("en-US", { weekday: "long" }),
      num: String(d.getDate()).padStart(2, "0"),
      full: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
  }
  return days;
})();
