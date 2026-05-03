import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiAward, FiHeart, FiUsers, FiTarget, FiEye,
  FiCheckCircle, FiPhone, FiCalendar, FiArrowRight,
  FiShield, FiTruck, FiStar,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { siteData } from '../data/siteData'
import { getGallery } from '../services/gallery'
import { useSpecialities } from '../hooks/useSpecialities'

const LOGO = '/favicon.png'

const values = [
  { icon: FiHeart,        title: 'Compassionate Care',  desc: 'Every patient is treated with empathy, dignity, and genuine concern — not just as a case, but as a person.',                              color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
  { icon: FiCheckCircle,  title: 'Pediatric Excellence', desc: 'We provide specialized medical care for newborns and children — evidence-based, safe, and tailored to every child\'s needs.', color: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-100' },
  { icon: FiUsers,        title: 'Patient First',       desc: 'Every decision — from prescription to scheduling — is guided by what is genuinely best for the patient.',                              color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: FiShield,       title: 'Zero Side Effects',   desc: 'Homeopathic medicines work in harmony with the body — safe for all ages, from newborns to the elderly.',                               color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  { icon: FiAward,        title: 'Clinical Excellence', desc: 'Recognised for outstanding contribution to pediatric healthcare and neonatal intensive care in the region.',                             color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  { icon: FiStar,         title: 'Proven Results',      desc: 'Trusted by thousands of families for successful recoveries and healthy growth milestones in children.',                               color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
]

const milestones = [
  { year: '2024', title: 'Child Clinic Founded',   desc: 'Established Child Clinic near Dr I D Singh, Shardha Nagar, Saharsa with a mission to bring expert pediatric and general care to the community.' },
  { year: '2025', title: 'Expanded Services', desc: 'Launched specialized emergency and general pediatric wings to better serve families in Saharsa.' },
]

const facilities = [
  { icon: '👶', name: 'Pediatric OPD' },
  { icon: '🏥', name: 'NICU' },
  { icon: '💉', name: 'Vaccination' },
  { icon: '🚨', name: 'Emergency' },
  { icon: '🔬', name: 'Pathology' },
  { icon: '💊', name: 'Pharmacy' },
]

export default function About() {
  const [galleryImgs, setGalleryImgs] = useState([])
  const { specialities } = useSpecialities()

  useEffect(() => {
    getGallery()
      .then((imgs) => setGalleryImgs(imgs.slice(0, 4)))
      .catch(console.error)
  }, [])

  return (
    <>
      <SEO
        title={`About Us — ${siteData.name}`}
        description={`Learn about Child Clinic, Naya Bazar, Saharsa — the most trusted pediatric care centre in the Kosi region. Providing expert medical services since ${siteData.founded}.`}
        keywords={['about Child Clinic Saharsa', 'pediatric clinic Saharsa', 'child specialist Saharsa', 'best child doctor Kosi region', 'Naya Bazar Saharsa', 'Kosi division pediatric care']}
      />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/60 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-100/40 rounded-full blur-[100px]"></div>
          </div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none">
            <defs>
              <pattern id="about-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#0e9b42"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-dots)"></rect>
          </svg>
          
          <div className="container-max section-padding relative z-10 !pt-24 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-primary-600 font-bold text-sm tracking-widest uppercase mb-3">
                  Saharsa's Most Trusted Child Clinic
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-black text-navy-800 leading-[1.1] mb-5 tracking-tight">
                  Healing with Skill. <span className="text-primary-600">Caring with Heart.</span>
                </motion.h1>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-white border border-primary-200 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full shadow-sm mb-5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>Serving Saharsa since 2024 — Trusted Pediatric Care
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-gray-600 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
                  Child Clinic is Saharsa's trusted pediatric and general care centre, providing expert medical services for children and families at Shardha Nagar.
                </motion.p>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2.5 mb-8">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 bg-white border border-primary-100 px-3 py-1.5 rounded-full shadow-sm">
                    <FiCalendar className="w-3.5 h-3.5 text-primary-500" />Est. 2024 · Saharsa
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 bg-white border border-primary-100 px-3 py-1.5 rounded-full shadow-sm">
                    <FiShield className="w-3.5 h-3.5 text-primary-500" />7+ Years Exp.
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-700 bg-white border border-primary-100 px-3 py-1.5 rounded-full shadow-sm">
                    <FiStar className="w-3.5 h-3.5 text-primary-500" />Saharsa's Trusted Child Clinic
                  </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4">
                  <Link className="btn-accent btn-shimmer gap-2 text-base px-8 py-4 shadow-lg shadow-accent-500/25 font-bold rounded-xl" to="/book-appointment">
                    <FiCalendar /> Book Appointment
                  </Link>
                  <a href={`tel:${siteData.contact.phone}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-primary-50 border-2 border-primary-200 text-primary-700 font-semibold rounded-xl transition-all duration-200 text-base shadow-sm">
                    <FiPhone /> Call Now
                  </a>
                </motion.div>
              </div>
              
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hidden lg:flex items-center justify-center relative">
                <div className="absolute w-[110%] h-[110%] bg-primary-100/25 rounded-full blur-[90px] -z-10"></div>
                <div className="relative w-full max-w-md">
                  <div className="relative rounded-3xl bg-gradient-to-br from-primary-50 via-white to-accent-50/60 border-2 border-primary-100/70 shadow-2xl shadow-primary-200/30 pt-6 pb-0 px-4 mb-20">
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary-400 rounded-tl-lg"></div>
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary-400 rounded-tr-lg"></div>
                    <img 
                      src="https://firebasestorage.googleapis.com/v0/b/child-clinic.firebasestorage.app/o/gallery%2F1777810933653_DR.%20ANSHUMAN.webp?alt=media&token=c9a4fa9b-7016-40fb-b969-51919afa90d2" 
                      alt="Dr. Anshuman" 
                      className="w-full h-auto max-h-[460px] object-contain object-bottom relative z-10" 
                    />
                    
                    <div className="absolute -bottom-[4.5rem] left-3 right-3 z-20">
                      <div className="bg-white/90 backdrop-blur-md border border-primary-100 rounded-2xl shadow-xl px-5 py-4">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-heading font-black text-base text-primary-900 leading-tight">Expert Medical Team</h3>
                            <p className="text-primary-600 font-bold text-[11px] tracking-wide uppercase mt-0.5">Pediatric Specialists</p>
                            <p className="text-gray-500 text-[11px] font-medium mt-0.5">Child & General Care</p>
                          </div>
                          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
                            <FiStar className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 border-y border-primary-100 py-12">
          <div className="container-max px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} className="text-center bg-white border border-primary-100 rounded-2xl py-5 px-3 shadow-sm">
                <p className="font-heading text-2xl md:text-3xl font-black text-primary-600">2024</p>
                <p className="text-gray-500 text-xs mt-1 font-medium">Est. Year</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-center bg-white border border-primary-100 rounded-2xl py-5 px-3 shadow-sm">
                <p className="font-heading text-2xl md:text-3xl font-black text-primary-600">1000+</p>
                <p className="text-gray-500 text-xs mt-1 font-medium">Happy Families</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center bg-white border border-primary-100 rounded-2xl py-5 px-3 shadow-sm">
                <p className="font-heading text-2xl md:text-3xl font-black text-primary-600">7+</p>
                <p className="text-gray-500 text-xs mt-1 font-medium">Yrs Experience</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center bg-white border border-primary-100 rounded-2xl py-5 px-3 shadow-sm">
                <p className="font-heading text-2xl md:text-3xl font-black text-primary-600">1000+</p>
                <p className="text-gray-500 text-xs mt-1 font-medium">New Borns Cared</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Story ──────────────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white bg-primary-50">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/child-clinic.firebasestorage.app/o/gallery%2F1777810933653_DR.%20ANSHUMAN.webp?alt=media&token=c9a4fa9b-7016-40fb-b969-51919afa90d2" 
                  alt="Dr. Anshuman" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-primary-100">
                <p className="text-3xl font-black text-primary-600 leading-none">7+</p>
                <p className="text-[10px] font-bold text-navy-800 uppercase tracking-widest mt-1">Years Experience</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">Our Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-800 leading-tight mb-6">Building Trust, <span className="text-primary-600">One Patient at a Time</span></h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Child Clinic was established in <strong className="text-navy-800">2024</strong> near Dr I D Singh, Shardha Nagar, Saharsa with a clear mission — to make quality pediatric healthcare accessible and affordable for every family.</p>
                <p>Our clinic provides expert medical care for children and general emergency services — all under one roof.</p>
                <p>We are committed to becoming Saharsa's most trusted child healthcare centre, serving the community with dedication and excellence.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-green-50 border-green-200 text-green-700">
                  <FiCheckCircle className="w-4 h-4" /> Newborn & Child Care
                </div>
                <div className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-primary-50 border-primary-200 text-primary-700">
                  <FiHeart className="w-4 h-4" /> Pediatric Nutrition
                </div>
                <div className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-blue-50 border-blue-200 text-blue-700">
                  <FiShield className="w-4 h-4" /> Zero Side Effects
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Mission & Vision ─────────────────────────────────── */}
        <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50/40">
          <div className="container-max">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Purpose</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">Mission & <span className="text-primary-600">Vision</span></h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative bg-white rounded-3xl p-8 shadow-card border border-gray-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-400 to-primary-600 rounded-l-3xl"></div>
                <div className="w-14 h-14 bg-primary-50 border border-primary-200 rounded-2xl flex items-center justify-center mb-6">
                  <FiTarget className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">To provide compassionate, evidence-based, and affordable pediatric and general healthcare to every family in Saharsa — treating every child with the utmost care and expertise.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative bg-white rounded-3xl p-8 shadow-card border border-gray-100 overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent-400 to-accent-600 rounded-l-3xl"></div>
                <div className="w-14 h-14 bg-accent-50 border border-accent-200 rounded-2xl flex items-center justify-center mb-6">
                  <FiEye className="w-7 h-7 text-accent-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">To be Saharsa's most trusted child clinic — a place where families receive expert medical care, children feel safe and cared for, and every visit restores hope and health.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Core Values ──────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">What We Stand For</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">Our Core <span className="text-primary-600">Values</span></h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <div className={`w-12 h-12 ${bg} ${border} border rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <h4 className="font-heading font-bold text-navy-800 text-base mb-2 group-hover:text-primary-700 transition-colors">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Journey Timeline ─────────────────────────────────── */}
        <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary-200/30 blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-200/20 blur-[80px] pointer-events-none"></div>
          <div className="container-max relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Our Journey</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">Serving Since <span className="text-primary-600">2024</span></h2>
            </motion.div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 md:-translate-x-0.5"></div>
              <div className="space-y-8">
                {milestones.map(({ year, title, desc }, i) => (
                  <motion.div key={year} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow z-10 mt-5"></div>
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:ml-auto'}`}>
                      <div className="bg-white border border-primary-100 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
                        <span className="inline-block bg-primary-50 text-primary-600 border border-primary-200 text-xs font-bold px-3 py-1 rounded-full mb-3">{year}</span>
                        <h4 className="font-heading font-bold text-navy-800 mb-2">{title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Facilities ───────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Infrastructure</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">Our <span className="text-primary-600">Facilities</span></h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Everything you need for complete, comfortable healthcare — all under one roof in Shardha Nagar, Saharsa.</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {facilities.map(({ icon, name }, i) => (
                <motion.div key={name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-primary-50 border border-primary-100 rounded-2xl p-5 text-center hover:bg-primary-100 transition-all duration-200 cursor-default">
                  <span className="text-3xl block mb-3">{icon}</span>
                  <p className="text-navy-800 text-xs font-semibold leading-tight">{name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50/40 border-t border-primary-100">
          <div className="container-max text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">Get In Touch</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 mb-4 leading-tight">Ready to Start <span className="text-primary-600">Your Healing Journey?</span></h2>
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">Book an appointment today or call us anytime. Our team is here to help.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/book-appointment" className="btn-accent btn-shimmer gap-2 text-base px-8 py-4 shadow-lg shadow-accent-500/25 font-bold rounded-xl">
                  <FiCalendar /> Book Appointment
                </Link>
                <a href={`tel:${siteData.contact.phone}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-primary-50 border-2 border-primary-200 text-primary-700 font-semibold rounded-xl transition-all duration-200 text-base shadow-sm">
                  <FiPhone /> {siteData.contact.phone}
                </a>
                <Link to="/doctors" className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 text-base shadow-sm">
                  Meet Our Doctors <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
