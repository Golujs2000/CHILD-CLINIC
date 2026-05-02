// ─────────────────────────────────────────────────────────────
// components/Footer.jsx
// Redesigned footer with full speciality + treatment + doctor links.
// Layout:
//   Row 1 — Brand | Quick Links | Contact Us
//   Row 2 — All Specialities & Treatments (full-width grid)
//   Row 3 — Our Doctors (full-width grid)
//   Row 4 — Copyright / legal bar
// ─────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom'
import {
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLinkedin,
  FiPhone, FiMail, FiMapPin, FiClock, FiChevronRight, FiUser,
} from 'react-icons/fi'
import { siteData } from '../data/siteData'
import { useSpecialities } from '../hooks/useSpecialities'
import { useDoctors } from '../hooks/useDoctors'

const quickLinks = [
  { label: 'Home',              to: '/' },
  { label: 'About Us',          to: '/about' },
  { label: 'Our Doctors',       to: '/doctors' },
  { label: 'Clinic Services',   to: '/services' },
  { label: 'Specialities',      to: '/specialities' },
  { label: 'Book Appointment',  to: '/book-appointment' },
  { label: 'Contact',           to: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy',    to: '/privacy-policy' },
  { label: 'Terms & Conditions',to: '/terms' },
  { label: 'Data Deletion',     to: '/data-deletion' },
]

const socialIcons = {
  facebook:  FiFacebook,
  instagram: FiInstagram,
  twitter:   FiTwitter,
  youtube:   FiYoutube,
  linkedin:  FiLinkedin,
}

// Category accent colours for speciality headers
const catColor = {
  'General':     'text-blue-400 border-blue-400/40',
  'Skin':        'text-teal-400 border-teal-400/40',
  'Digestive':   'text-green-400 border-green-400/40',
  'Respiratory': 'text-sky-400 border-sky-400/40',
  'Women':       'text-pink-400 border-pink-400/40',
  'Musculo':     'text-amber-400 border-amber-400/40',
  'Neuro':       'text-purple-400 border-purple-400/40',
  'Chronic':     'text-red-400 border-red-400/40',
  'Urology':     'text-cyan-400 border-cyan-400/40',
  'Children':    'text-orange-400 border-orange-400/40',
  'Men':         'text-indigo-400 border-indigo-400/40',
}
const defaultCat = 'text-primary-400 border-primary-400/40'

export default function Footer() {
  const { specialities } = useSpecialities()
  const { doctors } = useDoctors()

  return (
    <footer className="bg-navy-900 text-gray-300">

      {/* ── Row 1: Brand / Quick Links / Contact ── */}
      <div className="container-max px-4 md:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src="/child-clinic-logo.png"
                alt="Child Clinic Logo"
                className="w-14 h-14 object-contain shrink-0"
              />
              <div>
                <p className="font-heading font-bold text-white text-lg">{siteData.name}</p>
                <p className="text-xs text-primary-300">{siteData.tagline}</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-sm">{siteData.description}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-colors"
              >
                📅 Book Appointment
              </Link>
              <a
                href={`tel:${siteData.contact.phone}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <FiPhone className="w-4 h-4 text-primary-500" />
                Phone: {siteData.contact.phone}
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {Object.entries(siteData.social).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                return Icon ? (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    aria-label={platform}>
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm text-gray-400 hover:text-primary-300 transition-colors flex items-center gap-2 group">
                    <FiChevronRight className="w-3 h-3 text-primary-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <FiMapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">{siteData.contact.address}</span>
              </li>
              <li className="flex gap-3 items-start">
                <FiPhone className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  {[siteData.contact.phone, siteData.contact.phone2]
                    .filter(Boolean)
                    .map((ph) => (
                      <a key={ph} href={`tel:${ph}`}
                        className="block text-gray-400 hover:text-white transition-colors">
                        {ph}
                      </a>
                    ))}
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <FiMail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={`mailto:${siteData.contact.email}`}
                  className="text-gray-400 hover:text-white transition-colors break-all">
                  {siteData.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <div className="flex items-center gap-2">
                  <FiClock className="text-gray-400" />
                  <p className="text-gray-400">{siteData.contact.hours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Row 2: Specialities & Treatments ── */}
      {specialities.length > 0 && (
        <div className="container-max px-4 md:px-8 py-10">
          <h4 className="font-heading font-semibold text-white mb-8 text-sm uppercase tracking-wider flex items-center gap-3">
            <span className="w-6 h-px bg-primary-500 inline-block" />
            Medical Specialities
            <span className="w-6 h-px bg-primary-500 inline-block" />
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {specialities.map((spec) => {
              const color = catColor[spec.category] || defaultCat
              const treatments = Array.isArray(spec.treatments) ? spec.treatments : []
              return (
                <div key={spec.id}>
                  {/* Speciality header */}
                  <Link
                    to={`/specialities`}
                    className={`inline-flex items-center gap-1.5 font-heading font-bold text-xs uppercase tracking-wider mb-3 border-b pb-2 w-full ${color} hover:opacity-80 transition-opacity`}
                  >
                    {spec.icon && <span className="text-base leading-none">{spec.icon}</span>}
                    {spec.name}
                  </Link>
                  <p className="text-[10px] text-gray-500 leading-relaxed mb-4">{spec.description?.substring(0, 60)}...</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Row 3: Our Doctors ── */}
      {doctors.length > 0 && (
        <>
          <div className="border-t border-white/10" />
          <div className="container-max px-4 md:px-8 py-10">
            <h4 className="font-heading font-semibold text-white mb-8 text-sm uppercase tracking-wider flex items-center gap-3">
              <span className="w-6 h-px bg-primary-500 inline-block" />
              Our Doctors
              <span className="w-6 h-px bg-primary-500 inline-block" />
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {doctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  to={`/doctors/${doctor.id}`}
                  className="flex items-center gap-2.5 group p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {/* Avatar */}
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/10 group-hover:border-primary-400/50 transition-colors"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary-400/50 transition-colors">
                      <FiUser className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-300 group-hover:text-primary-300 transition-colors truncate leading-tight">
                      {doctor.name}
                    </p>
                    {doctor.specialty && (
                      <p className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">{doctor.specialty}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <Link to="/doctors" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                View all doctors →
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="hover:text-gray-300 transition-colors">{label}</Link>
            ))}
            <Link to="/admin/login" className="hover:text-gray-300 transition-colors">Admin</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
