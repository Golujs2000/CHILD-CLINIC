// ─────────────────────────────────────────────────────────────
// pages/HospitalServices.jsx
// Redesigned Facilities & Hospital Services page.
// Grid-based clickable cards for each clinic facility.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiAlertCircle, FiArrowRight, FiCalendar, FiActivity, FiShield, FiHeart
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { useHospitalServices } from '../hooks/useHospitalServices'
import { siteData } from '../data/siteData'

export default function HospitalServices() {
  const { services, loading } = useHospitalServices()
  const [activeCategory, setActiveCategory] = useState('All')

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
        description={`Explore ${siteData.name}'s range of pediatric services in Saharsa — Level II NICU, Pathology Lab, Pharmacy, and Emergency care for the Kosi region.`}
        keywords={['clinic services Saharsa', 'NICU facility Kosi region', 'pathology lab Saharsa', 'pharmacy Saharsa', 'pediatric hospital Kosi division']}
      />

      {/* Hero Section */}
      <section className="relative bg-navy-900 pt-36 pb-24 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-accent-400/5 blur-[100px] rounded-full translate-x-1/4 translate-y-1/4"></div>

        <div className="container-max relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary-600/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 border border-primary-600/30">
              Infrastructure & Care
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              Clinical <span className="text-primary-500">Facilities</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              World-class infrastructure in the heart of Saharsa, designed to provide the highest standard of pediatric and neonatal care.
            </p>

            <div className="flex flex-wrap gap-6 mt-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-500">
                  <FiShield size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">Level II NICU</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-500">
                  <FiActivity size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">24/7 Emergency</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-500">
                  <FiHeart size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">Expert Care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-100 sticky top-[64px] z-30 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container-max px-4">
          <div className="flex items-center gap-3 py-4 min-w-max">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-xl shadow-primary-900/20 scale-105'
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-navy-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding bg-gray-50/50 min-h-[60vh]">
        <div className="container-max px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[350px] bg-white rounded-[40px] animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <FiAlertCircle size={60} className="mx-auto text-gray-200 mb-6" />
              <h3 className="text-2xl font-bold text-navy-800">No Facilities Listed</h3>
              <p className="text-gray-400 mt-2">Try clearing your filters to see all services.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    to={`/services/${svc.slug}`}
                    className="group block bg-white rounded-[40px] p-8 border border-gray-100 hover:border-primary-200 hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden"
                  >
                    {/* Hover Decoration */}
                    <div className="absolute top-0 left-0 w-2 h-0 bg-primary-600 group-hover:h-full transition-all duration-500"></div>
                    
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                        {svc.icon || '🏥'}
                      </div>
                      <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] px-3 py-1 bg-primary-50 rounded-full border border-primary-100">
                        {svc.available || 'Active'}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-black text-navy-800 mb-4 tracking-tight group-hover:text-primary-600 transition-colors">
                      {svc.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                      {svc.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</span>
                        <span className="text-sm font-black text-navy-800">{svc.category}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy-800 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1">
                        <FiArrowRight />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-max relative z-10 px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ready to visit our <span className="text-navy-900">Facility?</span>
            </h2>
            <p className="text-white/80 text-xl font-medium">
              Book a consultation or walk-in to our OPD during business hours. We are here to serve Saharsa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link 
              to="/book-appointment" 
              className="bg-white text-primary-600 font-black px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-all text-center"
            >
              Book Appointment
            </Link>
            <Link 
              to="/contact" 
              className="bg-navy-900 text-white font-black px-10 py-5 rounded-2xl shadow-2xl hover:bg-navy-800 transition-all text-center border border-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
