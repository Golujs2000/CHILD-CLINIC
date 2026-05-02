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
  FiPhone, FiInfo, FiActivity, FiArrowRight 
} from 'react-icons/fi'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

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
        title={`${service.name} — Child Clinic Services`} 
        description={service.description}
      />

      <main className="bg-gray-50 pb-20">
        {/* Header Section */}
        <section className="bg-hero-gradient text-white pt-32 pb-16 px-4">
          <div className="container-max">
            <Link to="/services" className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors mb-6 text-sm font-bold">
              <FiArrowLeft /> Back to Services
            </Link>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl">
                {service.icon || '🏥'}
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-white/30">
                  {service.category || 'Hospital Facility'}
                </span>
                <h1 className="font-heading text-4xl md:text-5xl font-black">{service.name}</h1>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <FiClock className="text-accent-400" /> {service.available || '24 × 7'}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <FiActivity className="text-accent-400" /> Advanced Infrastructure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-max px-4 -mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Detailed Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
                <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                  <FiInfo className="text-primary-600" /> Service Details
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  {service.description}
                </p>
                
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
                  <h4 className="font-bold text-primary-900 mb-3 text-base">Clinical Importance</h4>
                  <p className="text-primary-700 text-sm leading-relaxed">
                    This facility is part of Child Clinic's commitment to providing world-class pediatric care in Saharsa. 
                    Equipped with modern technology and monitored by Dr. Anshuman's expert team, we ensure your child receives the best diagnostic and therapeutic support.
                  </p>
                </div>
              </motion.div>

              {/* Related Specialities */}
              {Array.isArray(service.relatedSpecialties) && service.relatedSpecialties.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8">
                  <h2 className="text-2xl font-bold text-navy-800 mb-6">Linked Specialities</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.relatedSpecialties.map((specName, i) => (
                      <Link 
                        key={i} 
                        to="/specialities" 
                        className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all"
                      >
                        <span className="font-semibold text-navy-800 group-hover:text-primary-700">{specName}</span>
                        <FiArrowRight className="text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Support Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-8 border-primary-500 border-2 shadow-2xl">
                <h3 className="text-2xl font-bold text-navy-800 mb-4">Contact for Query</h3>
                <p className="text-gray-500 mb-6 text-sm">
                  Need more information about our {service.name} facility? Call us now for immediate assistance.
                </p>
                <a href={`tel:${siteData.contact.phone}`} className="btn-primary w-full justify-center mb-4 py-4 text-base">
                  <FiPhone /> Call Now
                </a>
                <Link to="/contact" className="btn-secondary w-full justify-center">
                  Send Message
                </Link>
              </motion.div>

              {/* Quick Info */}
              <div className="card p-6">
                <h4 className="font-bold text-navy-800 mb-4 uppercase tracking-widest text-xs">Quick Info</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <FiCheck className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy-800">Available 24/7</p>
                      <p className="text-[10px] text-gray-400">Emergency support active</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <FiCheck className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy-800">Expert Team</p>
                      <p className="text-[10px] text-gray-400">Monitored by specialists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
