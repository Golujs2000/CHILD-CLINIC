// ─────────────────────────────────────────────────────────────
// pages/SpecialityDetail.jsx
// Detailed page for a single medical speciality.
// Fetches by slug from the `specialities` collection.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, FiClock, FiCheck, FiCalendar, 
  FiPhone, FiUser, FiInfo, FiActivity 
} from 'react-icons/fi'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import SEO from '../components/SEO'
import { useDoctors } from '../hooks/useDoctors'
import { siteData } from '../data/siteData'

export default function SpecialityDetail() {
  const { slug } = useParams()
  const [speciality, setSpeciality] = useState(null)
  const [loading, setLoading] = useState(true)
  const { doctors } = useDoctors()

  useEffect(() => {
    const fetchSpeciality = async () => {
      setLoading(true)
      try {
        const q = query(collection(db, 'specialities'), where('slug', '==', slug))
        const snap = await getDocs(q)
        if (!snap.empty) {
          setSpeciality({ id: snap.docs[0].id, ...snap.docs[0].data() })
        }
      } catch (err) {
        console.error('Fetch speciality error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSpeciality()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!speciality) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <FiInfo size={48} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-navy-800 mb-2">Speciality Not Found</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">The department you are looking for might have been moved or renamed.</p>
        <Link to="/specialities" className="btn-primary">View All Departments</Link>
      </div>
    )
  }

  const relatedDoctors = doctors.filter(d => 
    d.specialty === speciality.name || 
    (Array.isArray(d.specialties) && d.specialties.includes(speciality.name))
  )

  return (
    <>
      <SEO 
        title={`${speciality.name} — Child Clinic`} 
        description={speciality.description}
      />

      <main className="bg-gray-50 pb-20">
        {/* Header Section */}
        <section className="bg-navy-900 text-white pt-32 pb-16 px-4">
          <div className="container-max">
            <Link to="/specialities" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6 text-sm font-bold">
              <FiArrowLeft /> Back to Specialities
            </Link>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl">
                {speciality.icon || '👶'}
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                  {speciality.category || 'Specialized Unit'}
                </span>
                <h1 className="font-heading text-4xl md:text-5xl font-black">{speciality.name}</h1>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <FiClock className="text-primary-400" /> {speciality.available || 'OPD Hours'}
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <FiActivity className="text-primary-400" /> Dedicated Care
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
              {/* Overview */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
                <h2 className="text-2xl font-bold text-navy-800 mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {speciality.description}
                </p>
              </motion.div>

              {/* Key Features */}
              {Array.isArray(speciality.features) && speciality.features.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8">
                  <h2 className="text-2xl font-bold text-navy-800 mb-6">Key Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {speciality.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-primary-50 border border-primary-100">
                        <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center shrink-0 mt-0.5">
                          <FiCheck className="text-white w-3.5 h-3.5" />
                        </div>
                        <p className="text-primary-900 font-semibold">{feature}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Doctors Section */}
              {relatedDoctors.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-navy-800 px-2">Expert Specialists</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {relatedDoctors.map((doc) => (
                      <Link key={doc.id} to={`/doctors/${doc.id}`} className="card group overflow-hidden">
                        <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                          <img 
                            src={doc.image || '/doctor-placeholder.png'} 
                            alt={doc.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading font-bold text-navy-800 text-lg group-hover:text-primary-600 transition-colors">{doc.name}</h3>
                          <p className="text-primary-600 font-bold text-xs uppercase tracking-wider mb-2">{doc.specialty}</p>
                          <p className="text-gray-500 text-xs line-clamp-2">{doc.qualification}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Appointment Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-8 bg-primary-600 text-white sticky top-24">
                <h3 className="text-2xl font-bold mb-4">Book a Consultation</h3>
                <p className="text-white/80 mb-6 text-sm">
                  Schedule an appointment with our {speciality.name} specialists for expert medical care.
                </p>
                <Link to="/book-appointment" state={{ department: speciality.name }} className="btn-accent w-full justify-center mb-4 py-4 text-base">
                  <FiCalendar /> Book Now
                </Link>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-xs text-white/60 uppercase font-black tracking-widest mb-3">Or call us directly</p>
                  <a href={`tel:${siteData.contact.phone}`} className="flex items-center gap-3 text-xl font-black hover:text-accent-400 transition-colors">
                    <FiPhone /> {siteData.contact.phone}
                  </a>
                </div>
              </motion.div>

              {/* Hours Card */}
              <div className="card p-6 bg-white">
                <h4 className="font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <FiClock className="text-primary-600" /> Availability
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Service Hours</span>
                    <span className="font-bold text-navy-800">{speciality.available || '9:00 AM - 8:00 PM'}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                    <span className="text-gray-500">Days</span>
                    <span className="font-bold text-navy-800">Mon - Sat</span>
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
