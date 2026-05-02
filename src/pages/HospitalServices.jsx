// ─────────────────────────────────────────────────────────────
// pages/HospitalServices.jsx
// Public listing page for all hospital facility services.
// Route: /hospital-services
// Fetches from `hospitalServices` Firestore collection.
// Each card shows icon, name, category, availability, description,
// and related speciality chips that link to /services/:slug.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiAlertCircle, FiArrowRight, FiCalendar, FiPhone,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { useHospitalServices } from '../hooks/useHospitalServices'
import { useSpecialities } from '../hooks/useSpecialities'
import { siteData } from '../data/siteData'

const CATEGORY_CONFIG = {
  'Consultation':   { emoji: '🩺', light: 'bg-primary-50',  text: 'text-primary-700',  border: 'border-primary-200'  },
  'Therapy':        { emoji: '🌿', light: 'bg-emerald-50',  text: 'text-emerald-700',  border: 'border-emerald-200'  },
  'Wellness':       { emoji: '🌱', light: 'bg-green-50',    text: 'text-green-700',    border: 'border-green-200'    },
  'Pharmacy':       { emoji: '💊', light: 'bg-green-50',    text: 'text-green-700',    border: 'border-green-200'    },
  'Support':        { emoji: '🤝', light: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200'    },
  'Emergency':      { emoji: '🚨', light: 'bg-red-50',      text: 'text-red-700',      border: 'border-red-200'      },
  'Infrastructure': { emoji: '🏥', light: 'bg-indigo-50',   text: 'text-indigo-700',   border: 'border-indigo-200'   },
  'Department':     { emoji: '🏢', light: 'bg-cyan-50',     text: 'text-cyan-700',     border: 'border-cyan-200'     },
  'Diagnostic':     { emoji: '🔬', light: 'bg-teal-50',     text: 'text-teal-700',     border: 'border-teal-200'     },
}

const DEFAULT_CFG = { emoji: '🏥', light: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }

const AVAIL_COLOR = {
  '24 × 7':         'bg-green-100 text-green-700',
  'OPD Hours':      'bg-primary-100 text-primary-700',
  'By Appointment': 'bg-gray-100 text-gray-600',
}

export default function HospitalServices() {
  const { services, loading } = useHospitalServices()
  const { specialities } = useSpecialities()
  const [activeCategory, setActiveCategory] = useState('All')

  // Build a slug-lookup map from specialities
  const slugMap = useMemo(() => {
    const map = {}
    specialities.forEach((s) => { if (s.name && s.slug) map[s.name] = s.slug })
    return map
  }, [specialities])

  const allCategories = useMemo(() => {
    const cats = [...new Set(services.map((s) => s.category).filter(Boolean))]
    return ['All', ...cats]
  }, [services])

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory),
    [services, activeCategory]
  )

  return (
    <>
      <SEO
        title="Clinic Services & Facilities"
        description={`Explore ${siteData.name}'s range of pediatric services — Pediatric OPD, NICU, Vaccination Centre, and Emergency care.`}
      />

      {/* ── Hero ── */}
      <section className="bg-hero-gradient text-white py-14 px-4">
        <div className="container-max">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Our Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-black mb-3 leading-tight">
              Clinic Services &amp; Facilities
            </h1>
            <p className="text-white/75 text-lg">
              Dedicated pediatric and emergency care provided with expert medical skill and compassionate heart — including a level II NICU and specialized diagnostic support.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
                <p className="text-white font-bold text-2xl">{services.length || '—'}</p>
                <p className="text-white/60 text-xs mt-0.5">Total Services</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
                <p className="text-white font-bold text-2xl">12+</p>
                <p className="text-white/60 text-xs mt-0.5">Years Experience</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 text-center">
                <p className="text-white font-bold text-2xl">8</p>
                <p className="text-white/60 text-xs mt-0.5">Specialized Units</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="sticky top-[calc(var(--navbar-h,80px))] z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="container-max px-4 py-3 flex flex-wrap items-center gap-2">
          {allCategories.map((cat) => {
            const cfg = cat === 'All' ? null : (CATEGORY_CONFIG[cat] || DEFAULT_CFG)
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? cat === 'All'
                      ? 'bg-primary-600 text-white border-primary-600'
                      : `${cfg.light} ${cfg.text} ${cfg.border}`
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{cat === 'All' ? '🏥' : (cfg?.emoji || '🌿')}</span>
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse border border-gray-100">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
                  <div className="h-5 bg-gray-100 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <FiAlertCircle size={40} className="mb-3 opacity-40" />
                  <p className="font-medium text-lg">No services found</p>
                  <p className="text-sm mt-1">
                    {activeCategory !== 'All' ? (
                      <button onClick={() => setActiveCategory('All')} className="text-primary-600 hover:underline">
                        Clear filter
                      </button>
                    ) : 'No hospital services have been added yet.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((svc, i) => {
                    const cfg = CATEGORY_CONFIG[svc.category] || DEFAULT_CFG
                    return (
                      <motion.div
                        key={svc.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i % 3) * 0.07 }}
                        className={`bg-white rounded-2xl border ${cfg.border} shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4`}
                      >
                        {/* Icon + name */}
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${cfg.light} flex items-center justify-center text-2xl flex-shrink-0`}>
                            {svc.icon || '🏥'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading font-bold text-navy-800 text-base leading-tight">{svc.name}</h3>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                              {svc.category && (
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.light} ${cfg.text}`}>
                                  {svc.category}
                                </span>
                              )}
                              {svc.available && (
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${AVAIL_COLOR[svc.available] || 'bg-gray-100 text-gray-600'}`}>
                                  {svc.available}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {svc.description && (
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{svc.description}</p>
                        )}

                        {/* Related specialities */}
                        {Array.isArray(svc.relatedSpecialties) && svc.relatedSpecialties.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5">Related Specialities</p>
                            <div className="flex flex-wrap gap-1.5">
                              {svc.relatedSpecialties.map((name) => {
                                const slug = slugMap[name]
                                return slug ? (
                                  <Link
                                    key={name}
                                    to={`/specialities`}
                                    className="text-xs px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium transition-colors border border-primary-100"
                                  >
                                    {name}
                                  </Link>
                                ) : (
                                  <span key={name} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                                    {name}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}


              {/* Result count */}
              {!loading && filtered.length > 0 && (
                <p className="text-center text-sm text-gray-400 mt-8">
                  Showing {filtered.length} of {services.length} services
                  {activeCategory !== 'All' && (
                    <button onClick={() => setActiveCategory('All')} className="ml-2 text-primary-600 hover:underline font-medium">
                      Clear filter
                    </button>
                  )}
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-16 bg-primary-600 text-white text-center px-4">
        <div className="container-max max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-3">Need a Specific Facility?</h2>
          <p className="text-white/75 mb-8">
            Our team is available by appointment for OPD. Get in touch and we'll guide you to the right service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-7 py-3.5 rounded-[5px] hover:bg-primary-50 transition-colors"
            >
              <FiCalendar /> Book Appointment
            </Link>
            <a
              href={`tel:${siteData.contact.phone}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-[5px] transition-colors"
            >
              <FiPhone /> {siteData.contact.phone}
            </a>
            <Link
              to="/specialities"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-[5px] transition-colors"
            >
              View Specialities <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
