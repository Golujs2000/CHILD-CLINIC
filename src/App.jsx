// ─────────────────────────────────────────────────────────────
// App.jsx
// Root router configuration for Child Clinic.
// Defines all public and admin routes.
// ─────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useVisitTracker } from './hooks/useVisitTracker'

// Layout & Route Guards
import PublicLayout from './components/PublicLayout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

// ── Public Pages ─────────────────────────────────────────────
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import DoctorProfile from './pages/DoctorProfile'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import HospitalServices from './pages/HospitalServices'
import ServiceDetail from './pages/ServiceDetail'
import SpecialityDetail from './pages/SpecialityDetail'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import DataDeletion from './pages/DataDeletion'
import NotFound from './pages/NotFound'

// ── Admin Pages ──────────────────────────────────────────────
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminSpecialities from './pages/admin/AdminSpecialities'
import AdminServices from './pages/admin/AdminServices'
import AdminGallery from './pages/admin/AdminGallery'
import AdminBlog from './pages/admin/AdminBlog'
import AdminMessages from './pages/admin/AdminMessages'
import AdminSettings from './pages/admin/AdminSettings'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminTreatments from './pages/admin/AdminTreatments'

// Inner component so useVisitTracker runs inside BrowserRouter context
function AppRoutes() {
  // Increments visit counter in Firestore once per session
  useVisitTracker()

  return (
    <Routes>
      {/* ── Public Routes (Navbar + Footer) ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<HospitalServices />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/specialities" element={<Services />} />
        <Route path="/specialities/:slug" element={<SpecialityDetail />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:slug" element={<DoctorProfile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
      </Route>

      {/* ── Admin Auth (No Layout) ── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ── Protected Admin Routes ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="specialities" element={<AdminSpecialities />} />
        <Route path="treatments" element={<AdminTreatments />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* ── 404 Fallback ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
