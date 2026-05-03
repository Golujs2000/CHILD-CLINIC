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
import { getInitials, slugify } from '../utils/helpers'
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
        keywords={[speciality.name, `${speciality.name} Saharsa`, 'pediatric specialist Saharsa', 'best child doctor Kosi region', 'child care Bihar']}
      />

      <main className="bg-gray-50 pb-20">
        {/* Header Section with Glassmorphism */}
        <section className="relative bg-navy-900 text-white pt-36 pb-20 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent-400/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

          <div className="container-max relative z-10 px-4">
            <Link to="/specialities" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-all mb-8 text-sm font-bold group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Specialities
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-5xl shadow-2xl"
                >
                  {speciality.icon || '👶'}
                </motion.div>
                <div>
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block px-4 py-1.5 bg-primary-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 shadow-lg shadow-primary-900/50"
                  >
                    {speciality.category || 'Specialized Unit'}
                  </motion.span>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading text-5xl md:text-6xl font-black tracking-tight"
                  >
                    {speciality.name}
                  </motion.h1>
                  <div className="flex flex-wrap gap-6 mt-6">
                    <div className="flex items-center gap-2.5 text-white/70 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <FiClock className="text-primary-400" />
                      </div>
                      {speciality.available || 'OPD Hours'}
                    </div>
                    <div className="flex items-center gap-2.5 text-white/70 text-sm font-medium">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <FiActivity className="text-primary-400" />
                      </div>
                      Dedicated Pediatric Care
                    </div>
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
              {/* Overview Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white rounded-[32px] p-10 shadow-xl shadow-navy-900/5 border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-navy-800 mb-6 tracking-tight">Department Overview</h2>
                <p className="text-gray-600 leading-relaxed text-xl font-medium">
                  {speciality.description}
                </p>
                <div className="mt-8 pt-8 border-t border-gray-50 grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                      <FiCheck size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-navy-800 uppercase tracking-widest">Expert Doctors</p>
                      <p className="text-xs text-gray-400 font-bold">Specialized Training</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center text-accent-600">
                      <FiActivity size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-navy-800 uppercase tracking-widest">Modern Labs</p>
                      <p className="text-xs text-gray-400 font-bold">Latest Technology</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Highlights Grid */}
              {Array.isArray(speciality.features) && speciality.features.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-3xl font-bold text-navy-800 tracking-tight">Key Clinical Highlights</h2>
                    <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase rounded-lg">Advanced Care</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {speciality.features.map((feature, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group p-6 rounded-3xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                            <FiCheck size={20} />
                          </div>
                          <div>
                            <p className="text-navy-800 font-black text-lg leading-tight">{feature}</p>
                            <p className="text-gray-400 text-xs mt-1 font-medium">Available in Saharsa</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditions We Treat Section (Added More Details) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-navy-800 rounded-[32px] p-10 text-white shadow-2xl shadow-navy-900/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary-400">
                    <FiActivity size={24} />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Conditions We Treat</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    'Acute & Chronic Childhood Infections',
                    'Neonatal Jaundice & Respiratory Distress',
                    'Nutritional Deficiencies & Growth Delays',
                    'Childhood Asthma & Allergic Bronchitis',
                    'Congenital Heart & Renal Issues',
                    'Endocrine & Hormonal Imbalances'
                  ].map((condition, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                      <span className="text-white/80 font-medium">{condition}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-8">
                  * Comprehensive diagnosis and therapeutic management provided in Saharsa.
                </p>
              </motion.div>

              {/* Clinical Journey Section */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-navy-800 px-2 tracking-tight">Clinical Journey</h2>
                <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary-100">
                  {[
                    { title: 'Initial Consultation', desc: 'Expert physical examination and history taking by Dr. Anshuman.' },
                    { title: 'Rapid Diagnostics', desc: 'In-house lab tests and immediate reporting for quick decision making.' },
                    { title: 'Personalized Treatment Plan', desc: 'Tailored medical and nutritional plan based on international pediatric protocols.' },
                    { title: 'Continuous Follow-up', desc: 'Digital tracking of growth and recovery milestones for every patient.' }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[28px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary-600 z-10 shadow-sm"></div>
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-black text-navy-800 mb-1">{step.title}</h4>
                        <p className="text-gray-500 text-sm font-medium">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Specialists Carousel/Grid */}
              {relatedDoctors.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-3xl font-bold text-navy-800 tracking-tight">Lead Specialists</h2>
                    <Link to="/doctors" className="text-primary-600 font-bold text-sm hover:underline">View All Staff</Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {relatedDoctors.map((doc, i) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link to={`/doctors/${doc.slug || slugify(doc.name)}`} className="block group">
                          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                            <div className="flex items-center gap-5 relative z-10">
                              <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border-2 border-white shadow-md">
                                <img 
                                  src={doc.image || '/doctor-placeholder.png'} 
                                  alt={doc.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-navy-800 text-lg group-hover:text-primary-600 transition-colors truncate">{doc.name}</h3>
                                <p className="text-primary-600 font-black text-[10px] uppercase tracking-wider mb-1">{doc.specialty}</p>
                                <p className="text-gray-400 text-xs font-medium truncate">{doc.qualification}</p>
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                                <FiUser size={16} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section (New) */}
              {Array.isArray(speciality.faqs) && speciality.faqs.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-navy-800 px-2 tracking-tight">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {speciality.faqs.map((faq, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                      >
                        <h4 className="font-black text-navy-800 mb-2 flex gap-3">
                          <span className="text-primary-600">Q.</span> {faq.q}
                        </h4>
                        <p className="text-gray-500 text-sm font-medium pl-7 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Doctor Profile Sidebar Card (New) */}
              {(relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-navy-900/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-6">Expert in Charge</h4>
                    
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-md">
                        <img 
                          src={(relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).image || '/doctor-placeholder.png'} 
                          alt={(relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 text-lg leading-tight">{(relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).name}</h3>
                        <p className="text-gray-400 text-xs font-medium mt-1">{(relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).qualification}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Link 
                        to="/book-appointment" 
                        state={{ 
                          department: speciality.name,
                          doctorId: (relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).id 
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary-900/20 transition-all hover:scale-[1.02]"
                      >
                        <FiCalendar size={18} /> Book Appointment
                      </Link>
                      
                      <Link 
                        to={`/doctors/${(relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).slug || slugify((relatedDoctors[0] || doctors.find(d => d.name.includes('Anshuman'))).name)}`}
                        className="w-full flex items-center justify-center gap-3 bg-navy-50 text-navy-800 font-bold py-4 rounded-2xl hover:bg-navy-100 transition-colors"
                      >
                        <FiUser size={18} /> View Full Profile
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Premium Appointment CTA */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="bg-navy-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl shadow-navy-900/40"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight leading-tight">Priority Helpline</h3>
                <p className="text-white/70 mb-8 text-base leading-relaxed">
                  Direct contact for {speciality.name} emergencies and priority bookings.
                </p>
                <div className="pt-8 border-t border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-4">Direct Contact</p>
                  <a href={`tel:${siteData.contact.phone}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <FiPhone size={20} className="text-primary-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-black group-hover:text-primary-400 transition-colors tracking-tight">{siteData.contact.phone}</p>
                      <p className="text-[10px] text-white/40 font-bold uppercase">24/7 Helpline</p>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Department Status Card */}
              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                <h4 className="font-black text-navy-800 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Department Status
                </h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm font-bold text-gray-400">Consultation</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-lg">Active</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm font-bold text-gray-400">Emergency</span>
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-black uppercase rounded-lg">Available</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-bold text-gray-400">OPD Days</span>
                    <span className="text-sm font-black text-navy-800">Mon - Sat</span>
                  </div>
                </div>
              </div>

              {/* Location Badge */}
              <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">
                  <FiInfo size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary-900 uppercase tracking-wider">Serving Saharsa</p>
                  <p className="text-[10px] text-primary-700 font-medium">& the entire Kosi region</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
