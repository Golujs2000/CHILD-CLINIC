// ─────────────────────────────────────────────────────────────
// App.jsx
// Root router configuration for Care Homeopathic Clinic.
// Defines all public and admin routes.
//
// Route structure:
//   /                  → Public pages wrapped in PublicLayout
//   /admin/login       → Standalone login page (no layout)
//   /admin/*           → Protected admin pages wrapped in AdminLayout
//   *                  → 404 NotFound
// ─────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useVisitTracker } from './hooks/useVisitTracker'

// Layout & Route Guards
import PublicLayout from './components/PublicLayout'
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
import BookAppointment from './pages/BookAppointment'
import AppointmentSuccess from './pages/AppointmentSuccess'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import DataDeletion from './pages/DataDeletion'
import NotFound from './pages/NotFound'

// ── Admin Pages ──────────────────────────────────────────────
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminBlog from './pages/admin/AdminBlog'
import AdminGallery from './pages/admin/AdminGallery'
import AdminMessages from './pages/admin/AdminMessages'
import AdminStaff from './pages/admin/AdminStaff'
import AdminSpecialities from './pages/admin/AdminSpecialities'
import AdminServices from './pages/admin/AdminServices'
import AdminSettings from './pages/admin/AdminSettings'

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
        <Route path="/specialities" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointment-success" element={<AppointmentSuccess />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
      </Route>

      {/* ── Admin Login (no sidebar layout) ── */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ── Protected Admin Routes (requires auth + staff role) ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />  {/* sidebar + header shell */}
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="staff" element={<ProtectedRoute requireAdmin><AdminStaff /></ProtectedRoute>} />
        <Route path="specialities" element={<AdminSpecialities />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
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
