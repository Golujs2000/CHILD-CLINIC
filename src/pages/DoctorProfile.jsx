// ─────────────────────────────────────────────────────────────
// pages/DoctorProfile.jsx
// Individual doctor detail page at /doctors/:id.
// Fetches the doctor document directly from Firestore by ID.
// Displays bio, qualifications, specializations, available days,
// consultation fee, and a link to book an appointment.
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import {
  FiPhone, FiMail, FiClock, FiCalendar,
  FiArrowLeft, FiAward, FiUser, FiActivity, FiChevronRight,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { db } from '../firebase/config'
import { getInitials } from '../utils/helpers'
import { getSpecialities } from '../services/specialities'
import { siteData } from '../data/siteData'

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function DoctorProfile() {
  const { id } = useParams()
  const [doctor, setDoctor]           = useState(null)
  const [loading, setLoading]         = useState(true)
  const [linkedGroups, setLinkedGroups] = useState([])

  useEffect(() => {
    getDoc(doc(db, 'doctors', id))
      .then((snap) => {
        if (snap.exists()) setDoctor({ id: snap.id, ...snap.data() })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  // Build linked-treatment groups once doctor + specialities are loaded
  useEffect(() => {
    if (!doctor?.linkedTreatments?.length) return
    getSpecialities().then((specs) => {
      const groups = []
      specs.forEach((spec) => {
        const matched = (spec.treatments || []).filter((t) =>
          doctor.linkedTreatments.includes(`${spec.id}::${t.slug}`)
        )
        if (matched.length) groups.push({ spec, treatments: matched })
      })
      setLinkedGroups(groups)
    }).catch(console.error)
  }, [doctor])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-xl">Doctor not found.</p>
        <Link to="/doctors" className="btn-primary">Back to Doctors</Link>
      </div>
    )
  }

  const sortedDays = (doctor.availableDays || []).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  )

  return (
    <>
      <SEO
        title={doctor.name}
        description={`${doctor.name} – ${doctor.specialty} specialist at Care Homeopathic Clinic, Saharsa. ${doctor.experience} years of experience. ${doctor.qualification}. Book an appointment today.`}
        keywords={[doctor.name, doctor.specialty, `${doctor.specialty} doctor Saharsa`, `${doctor.specialty} specialist Bihar`]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Physician',
            name: doctor.name,
            description: doctor.bio || '',
            medicalSpecialty: doctor.specialty,
            hasCredential: doctor.qualification,
            telephone: doctor.phone ? `+91${doctor.phone}` : undefined,
            email: doctor.email || undefined,
            image: doctor.image || undefined,
            workLocation: {
              '@type': 'Hospital',
              name: siteData.name,
              url: siteData.url,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Saharsa',
                addressRegion: 'Bihar',
                addressCountry: 'IN',
              },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteData.url },
              { '@type': 'ListItem', position: 2, name: 'Doctors', item: `${siteData.url}/doctors` },
              { '@type': 'ListItem', position: 3, name: doctor.name },
            ],
          },
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="container-max flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/doctors" className="hover:text-primary-600">Doctors</Link>
          <span>/</span>
          <span className="text-gray-800">{doctor.name}</span>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-max">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-primary-600 text-sm font-medium mb-8 hover:gap-3 transition-all">
            <FiArrowLeft /> Back to All Doctors
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: profile card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-1"
            >
              <div className="card p-8 text-center sticky top-24">
                {/* Avatar */}
                <div className="w-36 h-36 rounded-full mx-auto mb-5 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  {doctor.image ? (
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-heading font-bold text-primary-600 text-5xl">{getInitials(doctor.name)}</span>
                  )}
                </div>

                <h1 className="font-heading font-bold text-navy-800 text-2xl mb-1">{doctor.name}</h1>
                <p className="text-primary-600 font-semibold mb-1">{doctor.specialty}</p>
                <p className="text-gray-500 text-sm mb-4">{doctor.qualification}</p>

                {/* Info chips */}
                <div className="space-y-3 text-sm text-left mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <FiAward className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">{doctor.experience} Years Experience</span>
                  </div>
                  {doctor.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiPhone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      <a href={`tel:${doctor.phone}`} className="text-gray-700 hover:text-primary-600">{doctor.phone}</a>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <FiMail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      <a href={`mailto:${doctor.email}`} className="text-gray-700 hover:text-primary-600 text-xs truncate">{doctor.email}</a>
                    </div>
                  )}
                </div>

                <Link
                  to={`/book-appointment?dept=${encodeURIComponent(doctor.specialty)}&doctor=${encodeURIComponent(doctor.name)}`}
                  className="btn-primary w-full justify-center"
                >
                  <FiCalendar /> Book Appointment
                </Link>
              </div>
            </motion.div>

            {/* Right: details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Bio */}
              <div className="card p-8">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-4">About Dr. {doctor.name.replace('Dr. ', '')}</h2>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Availability */}
              {sortedDays.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
                    <FiClock className="w-5 h-5 text-primary-500" /> Availability
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dayOrder.map((day) => (
                      <span
                        key={day}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                          sortedDays.includes(day)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                  {doctor.availableTime && (
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <FiClock className="w-4 h-4 text-primary-500" />
                      Timings: <span className="font-semibold text-navy-800">{doctor.availableTime}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Qualifications */}
              <div className="card p-8">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-4 flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-primary-500" /> Qualifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.qualification?.split(',').map((q) => (
                    <span key={q} className="badge bg-primary-50 text-primary-700">{q.trim()}</span>
                  ))}
                </div>
              </div>

              {/* Linked Treatments */}
              {linkedGroups.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
                    <FiActivity className="w-5 h-5 text-primary-500" /> Treatments &amp; Procedures
                  </h2>
                  <div className="space-y-5">
                    {linkedGroups.map(({ spec, treatments }) => (
                      <div key={spec.id}>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                          {spec.icon && <span className="mr-1">{spec.icon}</span>}{spec.name}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {treatments.map((t) => (
                            <Link
                              key={t.slug}
                              to={`/services/${spec.slug}/treatment/${t.slug}`}
                              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
                            >
                              <div>
                                <p className="text-sm font-semibold text-navy-800 group-hover:text-primary-700">{t.name}</p>
                              </div>
                              <FiChevronRight size={16} className="text-primary-400 group-hover:text-primary-600 flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Book CTA */}
              <div className="bg-hero-gradient rounded-2xl p-8 text-white">
                <h3 className="font-heading font-bold text-xl mb-3">Ready to Book an Appointment?</h3>
                <p className="text-white/80 text-sm mb-5">
                  Schedule a consultation with {doctor.name}. Our team will confirm within 30 minutes.
                </p>
                <Link
                  to={`/book-appointment?dept=${encodeURIComponent(doctor.specialty)}&doctor=${encodeURIComponent(doctor.name)}`}
                  className="btn-accent inline-flex"
                >
                  <FiCalendar /> Book Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
