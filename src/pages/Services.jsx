// ─────────────────────────────────────────────────────────────
// pages/Services.jsx
// Redesigned Specialities/Departments page.
// Grid-based clickable cards for each clinical department.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  FiArrowRight, FiActivity, FiCalendar, FiAlertCircle, 
  FiClock, FiCheckCircle 
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useSpecialities } from '../hooks/useSpecialities'
import { siteData } from '../data/siteData'

export default function Services() {
  const { specialities, loading } = useSpecialities()
  const [activeCategory, setActiveCategory] = useState('All')

  const allCategories = useMemo(() => {
    const cats = [...new Set(specialities.map((s) => s.category).filter(Boolean))]
    return ['All', ...cats]
  }, [specialities])

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return specialities
    return specialities.filter((s) => s.category === activeCategory)
  }, [specialities, activeCategory])

  return (
    <>
      <SEO
        title="Medical Specialities & Departments"
        description="Explore our specialized pediatric units in Saharsa — including Neonatology, NICU, Vaccination, and Emergency care for the Kosi region, Bihar."
        keywords={['pediatric specialities Saharsa', 'NICU Saharsa', 'child vaccination Saharsa', 'pediatric emergency Kosi region', 'neonatology Saharsa']}
      />

      {/* Hero Section */}
      <section className="relative bg-navy-900 pt-36 pb-24 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent-400/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

        <div className="container-max relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-600/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6 border border-primary-600/30">
              Clinical Excellence
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Medical <span className="text-primary-500">Specialities</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Comprehensive pediatric care through specialized departments, equipped with advanced medical technology for the Kosi region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-white border-b border-gray-100 sticky top-[64px] z-30 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container-max px-4">
          <div className="flex items-center gap-3 py-4 min-w-max">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/20 scale-105'
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-navy-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Specialities Grid */}
      <section className="section-padding bg-gray-50/50 min-h-[60vh]">
        <div className="container-max px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[400px] bg-white rounded-[40px] animate-pulse border border-gray-100 shadow-sm" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-6">
                <FiAlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-navy-800 mb-2">No Specialities Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8">We haven't listed any departments in this category yet. Please check back later.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="text-primary-600 font-bold hover:underline underline-offset-4"
              >
                Clear Filters & View All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((spec, i) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    to={`/specialities/${spec.slug}`}
                    className="group block bg-white rounded-[40px] border border-gray-100 p-10 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 relative overflow-hidden h-full flex flex-col"
                  >
                    {/* Decorative pattern */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-4xl shadow-sm border border-gray-100 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                          {spec.icon || '🩺'}
                        </div>
                        <div className="bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-green-100">
                          {spec.available || 'Active'}
                        </div>
                      </div>

                      <h3 className="font-heading text-3xl font-black text-navy-800 mb-4 tracking-tight group-hover:text-primary-600 transition-colors">
                        {spec.name}
                      </h3>
                      
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-4 font-medium italic">
                        "{spec.description}"
                      </p>

                      <div className="mt-auto space-y-6">
                        <div className="flex flex-wrap gap-2">
                          {(spec.features || []).slice(0, 3).map((f) => (
                            <span key={f} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-navy-600 px-3 py-1 bg-navy-50 rounded-lg">
                              <FiCheckCircle className="text-primary-500" /> {f}
                            </span>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                          <span className="text-xs font-black text-primary-600 uppercase tracking-widest">Learn More</span>
                          <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-2">
                            <FiArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container-max relative z-10 px-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[48px] p-12 md:p-20 text-center max-w-4xl mx-auto shadow-2xl">
            <h2 className="font-heading text-4xl md:text-6xl font-black mb-8 leading-tight">
              Looking for a <span className="text-primary-400">Specialist?</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
              Our support team is here to guide you to the right department for your child's specific medical needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/book-appointment" 
                className="btn-primary w-full sm:w-auto px-10 py-5 text-lg rounded-2xl shadow-xl shadow-primary-900/40 hover:scale-105"
              >
                Book Appointment
              </Link>
              <a 
                href={`tel:${siteData.contact.phone}`}
                className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-bold px-10 py-5 rounded-2xl border border-white/20 hover:bg-white/10 transition-all"
              >
                Call Helpline: {siteData.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
