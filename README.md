# 🌿 Care Homeopathic Clinic

> **Gentle Healing. Lasting Health.**

Official website for **Care Homeopathic Clinic**, Saharsa, Bihar — built with React, Vite, Tailwind CSS, and Firebase.

---

## 🏥 About the Clinic

| | |
|---|---|
| **Doctor** | Dr. Rajesh Kumar Ranjan (B.H.M.S., P.G.D.C.P.) |
| **Specialisation** | General Physician · Skin & Women's Diseases |
| **Registration** | Regd. No. 28291 |
| **Address** | Radha Krishna Vatika, Panchwati Chowk, Ward No. 15, Saharsa, Bihar 852201 |
| **Phone** | 8757864776 · 9523034934 |
| **Email** | carehomeopathicclinic@gmail.com |
| **Hours** | Mon – Sat: 9:00 AM – 8:00 PM · Sun: By Appointment |
| **Since** | 2001 |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 5 |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Backend | Firebase (Firestore, Auth, Storage) |
| Functions | Firebase Cloud Functions |
| Hosting | Firebase Hosting |
| Icons | React Icons (Feather) |

---

## ✨ Features

- **Homepage** — Hero with doctor photo, services grid, stats counter, gallery, testimonials
- **Specialities & Treatments** — Firestore-powered, categorised, expandable cards
- **Doctor Profile** — Qualifications, specialities, treatment list
- **Book Appointment** — Online appointment form with date picker
- **Gallery** — Bento mosaic + lightbox
- **Blog** — CMS-managed articles
- **Admin Panel** — Manage doctors, specialities, treatments, gallery, blog, appointments, messages
- **SEO** — Per-page meta tags, sitemap, robots.txt
- **Responsive** — Mobile-first design

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Golujs2000/CARE-HOMEOPATHIC-CLINIC.git
cd CARE-HOMEOPATHIC-CLINIC
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── home/          # Homepage sections
│   ├── admin/         # Admin layout & shared components
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages/
│   ├── admin/         # Admin panel pages
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── DoctorProfile.jsx
│   ├── BookAppointment.jsx
│   └── ...
├── firebase/
│   └── config.js      # Firebase initialisation (env vars)
├── hooks/             # Custom React hooks (Firestore data)
├── services/          # Firestore CRUD helpers
├── data/
│   ├── siteData.js    # Clinic info (name, address, phone...)
│   └── seed/          # Seed data for Firestore
└── styles/
    └── index.css      # Tailwind + global styles
```

---

## 🔐 Admin Panel

Access the admin panel at `/admin/login`.

Manage:
- Doctors & Staff
- Specialities & Treatments
- Hospital Services
- Gallery
- Blog Posts
- Appointments
- Patient Messages
- Site Settings

---

## 📄 License

© 2025 Care Homeopathic Clinic. All rights reserved.
# CHILD-CLINIC
