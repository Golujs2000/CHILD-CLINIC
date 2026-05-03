// ─────────────────────────────────────────────────────────────
// pages/ServiceDetail.jsx
// Detailed page for a single hospital facility/service.
// Fetches by slug from the `hospitalServices` collection.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, FiClock, FiCheck, FiCalendar, 
  FiPhone, FiInfo, FiActivity, FiArrowRight, FiUser 
} from 'react-icons/fi'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'
import { getInitials, slugify } from '../utils/helpers'
import { useDoctors } from '../hooks/useDoctors'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const { doctors } = useDoctors()

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'hospitalServices'), where('slug', '==', slug))
        const snap = await getDocs(q)
        if (!snap.empty) {
          setService({ id: snap.docs[0].id, ...snap.docs[0].data() })
        }
      } catch (err) {
        console.error('Fetch service error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <FiInfo size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-navy-800 mb-2">Service Not Found</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">The facility you are looking for might have been moved or renamed.</p>
        <Link to="/services" className="btn-primary">View All Services</Link>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={`${service.name} — Child Clinic`} 
        description={service.description}
        keywords={[service.name, `${service.name} Saharsa`, 'hospital facility Saharsa', 'best NICU Kosi region', 'child clinic Saharsa services']}
      />

      <main className="bg-gray-50 pb-20">
        {/* Header Section with Animated Gradient & Glassmorphism */}
        <section className="relative bg-hero-gradient text-white pt-36 pb-20 overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent"></div>

          <div className="container-max relative z-10 px-4">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-all mb-8 text-sm font-bold group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to All Facilities
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-5xl shadow-2xl shadow-primary-900/40"
              >
                {service.icon || '🏥'}
              </motion.div>
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
                    {service.category || 'Hospital Facility'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-200">Saharsa Unit</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-5xl md:text-6xl font-black tracking-tight"
                >
                  {service.name}
                </motion.h1>
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-2.5 text-white/70 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <FiClock className="text-accent-400" />
                    </div>
                    {service.available || '24 × 7 Service'}
                  </div>
                  <div className="flex items-center gap-2.5 text-white/70 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <FiActivity className="text-accent-400" />
                    </div>
                    High-Tech Infrastructure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-max px-4 -mt-12 relative z-20">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Infrastructure Section (Added More Details) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-navy-900 rounded-[32px] p-10 text-white shadow-2xl shadow-navy-900/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent-400">
                    <FiActivity size={24} />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Equipment & Infrastructure</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-accent-400 font-black text-[10px] uppercase tracking-widest mb-1">Advanced Technology</p>
                      <p className="text-white font-bold">LED Phototherapy & Incubators</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-accent-400 font-black text-[10px] uppercase tracking-widest mb-1">Monitoring</p>
                      <p className="text-white font-bold">Continuous Multipara Monitors</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-accent-400 font-black text-[10px] uppercase tracking-widest mb-1">Diagnostics</p>
                      <p className="text-white font-bold">Automated Biochemistry Analyzers</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-accent-400 font-black text-[10px] uppercase tracking-widest mb-1">Life Support</p>
                      <p className="text-white font-bold">Centralized Oxygen Supply</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3">
                  <FiCheck className="text-green-400" />
                  <p className="text-white/60 text-sm font-medium italic">Regularly sanitized and calibrated as per medical standards.</p>
                </div>
              </motion.div>

              {/* Related Specialities Chips */}
              {Array.isArray(service.relatedSpecialties) && service.relatedSpecialties.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-navy-800 px-2 tracking-tight">Governing Specialities</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.relatedSpecialties.map((specName, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link 
                          to="/specialities" 
                          className="group flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                              <FiActivity size={18} />
                            </div>
                            <span className="font-black text-navy-800 group-hover:text-primary-700 transition-colors">{specName}</span>
                          </div>
                          <FiArrowRight className="text-gray-300 group-hover:text-primary-600 group-hover:translate-x-2 transition-all" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Doctor Profile Sidebar Card (New) */}
              {(doctors.find(d => d.name.includes('Anshuman'))) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-navy-900/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-6">Medical Oversight</h4>
                    
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-md">
                        <img 
                          src={doctors.find(d => d.name.includes('Anshuman')).image || '/doctor-placeholder.png'} 
                          alt={doctors.find(d => d.name.includes('Anshuman')).name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 text-lg leading-tight">{doctors.find(d => d.name.includes('Anshuman')).name}</h3>
                        <p className="text-gray-400 text-xs font-medium mt-1">{doctors.find(d => d.name.includes('Anshuman')).qualification}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Link 
                        to="/book-appointment" 
                        state={{ 
                          department: service.name,
                          doctorId: doctors.find(d => d.name.includes('Anshuman')).id 
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary-900/20 transition-all hover:scale-[1.02]"
                      >
                        <FiCalendar size={18} /> Book Appointment
                      </Link>
                      
                      <Link 
                        to={`/doctors/${doctors.find(d => d.name.includes('Anshuman')).slug || slugify(doctors.find(d => d.name.includes('Anshuman')).name)}`}
                        className="w-full flex items-center justify-center gap-3 bg-navy-50 text-navy-800 font-bold py-4 rounded-2xl hover:bg-navy-100 transition-colors"
                      >
                        <FiUser size={18} /> View Full Profile
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Support Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="bg-navy-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl shadow-navy-900/40"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight leading-tight">Help & Queries</h3>
                <p className="text-white/70 mb-8 text-base leading-relaxed">
                  Need more information about the **{service.name}** facility at Child Clinic?
                </p>
                <div className="space-y-4 pt-8 border-t border-white/10">
                  <a href={`tel:${siteData.contact.phone}`} className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary-900/20 transition-all hover:scale-[1.02]">
                    <FiPhone /> Call Now
                  </a>
                  <Link to="/contact" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">
                    Send Message
                  </Link>
                </div>
              </motion.div>

              {/* Status Indicators */}
              <div className="bg-navy-900 rounded-[32px] p-8 text-white">
                <h4 className="font-black text-white/40 mb-6 uppercase tracking-widest text-[10px]">Infrastructure Status</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <FiCheck className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Operational 24/7</p>
                      <p className="text-[10px] text-white/40 font-medium">Emergency team on standby</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <FiCheck className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Expert Monitored</p>
                      <p className="text-[10px] text-white/40 font-medium">Dr. Anshuman's oversight</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* region Badge */}
              <div className="bg-accent-50 rounded-3xl p-6 border border-accent-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent-600 shadow-sm">
                  <FiActivity size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-accent-900 uppercase tracking-wider">Kosi Region Hub</p>
                  <p className="text-[10px] text-accent-700 font-medium">Trusted by Saharsa families</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
