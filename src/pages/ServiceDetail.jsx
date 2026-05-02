// ─────────────────────────────────────────────────────────────
// pages/ServiceDetail.jsx
// Detail page for a single speciality at /services/:slug.
// Fetches the speciality by slug from Firestore and also loads
// associated doctors filtered by the department name.
// Renders treatment list with individual links to TreatmentDetail.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiCalendar, FiCheck, FiActivity,
  FiUser, FiArrowRight, FiMapPin,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { getSpecialityBySlug } from '../services/specialities'
import { useDoctors } from '../hooks/useDoctors'
import { getInitials } from '../utils/helpers'
import { siteData } from '../data/siteData'

const CATEGORY_CONFIG = {
  'Surgical':      { bg: 'bg-blue-600',   light: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  'Women & Child': { bg: 'bg-rose-500',   light: 'bg-rose-50',   text: 'text-rose-600',   border: 'border-rose-200' },
  'Emergency':     { bg: 'bg-red-600',    light: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
  'Critical Care': { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Diagnostics':   { bg: 'bg-teal-600',   light: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200' },
  'Support':       { bg: 'bg-amber-600',  light: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
}

const AVAIL_COLOR = {
  '24 × 7':         'bg-green-100 text-green-700',
  'OPD Hours':      'bg-blue-100 text-blue-700',
  'By Appointment': 'bg-gray-100 text-gray-600',
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [speciality, setSpeciality] = useState(null)
  const [loading, setLoading] = useState(true)
  const { doctors } = useDoctors()

  useEffect(() => {
    setLoading(true)
    getSpecialityBySlug(slug)
      .then((data) => {
        if (!data) navigate('/services', { replace: true })
        else setSpeciality(data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="section-padding container-max">
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-100 rounded-[5px]" />
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-[5px]" />)}
          </div>
        </div>
      </div>
    )
  }

  if (!speciality) return null

  const cfg = CATEGORY_CONFIG[speciality.category] || CATEGORY_CONFIG['Support']
  const treatments = Array.isArray(speciality.treatments) ? speciality.treatments : []
  const features = Array.isArray(speciality.features) ? speciality.features : []
  // Primary: doctors explicitly linked via doctorIds[] in admin
  // Fallback union: also match by specialty name for backward compat
  const byId   = doctors.filter((d) => (speciality.doctorIds || []).includes(d.id))
  const byName = doctors.filter((d) =>
    d.specialty === speciality.name ||
    (Array.isArray(d.specialties) && d.specialties.includes(speciality.name))
  )
  const relatedDoctors = [...new Map([...byId, ...byName].map((d) => [d.id, d])).values()]

  return (
    <>
      <SEO
        title={speciality.name}
        description={`${speciality.description} Recovery: ${speciality.recoveryTime || 'Varies'}.`}
        keywords={[speciality.name, `${speciality.name} Saharsa`, `${speciality.name} hospital Bihar`, ...(speciality.features || [])]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'MedicalSpecialty',
            name: speciality.name,
            description: speciality.description,
            url: `${siteData.url}/services/${speciality.slug}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteData.url },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteData.url}/services` },
              { '@type': 'ListItem', position: 3, name: speciality.name },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-hero-gradient text-white py-16 px-4">
        <div className="container-max">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`w-20 h-20 ${cfg.bg} rounded-[5px] flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}>
              {speciality.icon || '🏥'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {speciality.category && (
                  <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                    {speciality.category}
                  </span>
                )}
                {speciality.available && (
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${AVAIL_COLOR[speciality.available] || 'bg-white/20 text-white'}`}>
                    {speciality.available}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-black mb-3">{speciality.name}</h1>
              <p className="text-white/80 text-lg max-w-2xl">{speciality.description}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {speciality.recoveryTime && (
              <div className="bg-white/10 backdrop-blur-sm rounded-[5px] px-5 py-3">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Recovery Time</p>
                <p className="text-white font-bold text-lg">{speciality.recoveryTime}</p>
              </div>
            )}
            {treatments.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-[5px] px-5 py-3">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Procedures</p>
                <p className="text-white font-bold text-lg">{treatments.length}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left — main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Key Features */}
              {features.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-4">Key Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f, i) => (
                      <div key={i} className={`flex items-center gap-3 ${cfg.light} rounded-[5px] px-4 py-3`}>
                        <FiCheck className={`w-4 h-4 ${cfg.text} flex-shrink-0`} />
                        <span className="text-sm font-medium text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Treatments List */}
              {treatments.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <FiActivity className="w-5 h-5 text-primary-600" />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">Treatments & Procedures</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {treatments.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link
                          to={`/services/${speciality.slug}/treatment/${t.slug || i}`}
                          className={`block bg-white border ${cfg.border} rounded-[5px] p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={`font-semibold text-navy-800 text-sm group-hover:${cfg.text} transition-colors`}>{t.name}</h3>
                            <FiArrowRight className={`w-4 h-4 ${cfg.text} flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            {t.duration && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <FiClock className="w-3 h-3" /> {t.duration}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-2 font-medium ${cfg.text} flex items-center gap-1`}>
                            View Details <FiArrowRight className="w-3 h-3" />
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">

              {/* Book CTA */}
              <div className={`rounded-[5px] p-6 text-white ${cfg.bg}`}>
                <h3 className="font-heading font-bold text-lg mb-2">Book an Appointment</h3>
                <p className="text-white/75 text-sm mb-4">Our team will confirm within 30 minutes.</p>
                <Link
                  to={`/book-appointment?dept=${encodeURIComponent(speciality.name)}&from=/services/${speciality.slug}`}
                  className={`w-full flex items-center justify-center gap-2 bg-white font-bold text-sm py-3 rounded-[5px] transition-colors ${cfg.text} hover:opacity-90`}
                >
                  <FiCalendar className="w-4 h-4" /> Book Now
                </Link>
              </div>

              {/* Location */}
              <div className="bg-white rounded-[5px] border border-gray-100 shadow-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin className="w-4 h-4 text-primary-600" />
                  <h3 className="font-heading font-semibold text-navy-800">Location</h3>
                </div>
                <p className="text-sm text-gray-500">Radha Krishna Vatika, Panchwati Chowk, Ward No. 15, Saharsa, Bihar 852201</p>
                <p className={`text-xs mt-2 font-semibold ${AVAIL_COLOR[speciality.available] || 'text-gray-500'} inline-block px-2 py-1 rounded-full`}>
                  {speciality.available || 'By Appointment'}
                </p>
              </div>

              {/* Doctors */}
              {relatedDoctors.length > 0 && (
                <div className="bg-white rounded-[5px] border border-gray-100 shadow-card p-5">
                  <h3 className="font-heading font-semibold text-navy-800 mb-4">Our Specialists</h3>
                  <div className="space-y-3">
                    {relatedDoctors.map((doc) => (
                      <Link key={doc.id} to={`/doctors/${doc.id}`}
                        className="flex items-center gap-3 hover:bg-primary-50 rounded-[5px] p-2 transition-colors group">
                        {doc.image ? (
                          <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-primary-600 text-sm">{getInitials(doc.name)}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-navy-800 text-sm group-hover:text-primary-700 transition-colors">{doc.name}</p>
                          <p className="text-xs text-gray-400">{doc.qualification}</p>
                          <p className="text-xs text-primary-600 font-medium">{doc.experience} yrs exp.</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
