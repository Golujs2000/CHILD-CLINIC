import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft, FiClock, FiCalendar, FiCheck,
  FiPhone, FiArrowRight, FiAlertCircle, FiActivity,
  FiShield, FiList, FiImage, FiYoutube, FiHelpCircle,
  FiChevronDown, FiChevronUp, FiX, FiUser,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { getSpecialityBySlug } from '../services/specialities'
import { getDoctors } from '../services/doctors'
import { getInitials } from '../utils/helpers'
import { siteData } from '../data/siteData'

// Convert any YouTube URL to embed URL
function toEmbedUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}`
    }
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`
    }
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/embed/')) {
      return url
    }
  } catch {
    // Not a valid URL, return as-is (could be embed URL already)
  }
  return url
}

const CATEGORY_CONFIG = {
  'Surgical':      { bg: 'bg-blue-600',   light: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  'Women & Child': { bg: 'bg-pink-600',   light: 'bg-pink-50',   text: 'text-pink-700',   border: 'border-pink-200' },
  'Emergency':     { bg: 'bg-red-600',    light: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
  'Critical Care': { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Diagnostics':   { bg: 'bg-teal-600',   light: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200' },
  'Support':       { bg: 'bg-amber-600',  light: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
}

// Generic steps shown for every treatment
const PROCESS_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Meet our specialist for an initial assessment and medical history review.' },
  { step: '02', title: 'Diagnosis & Planning', desc: 'Tests or imaging if required. Our doctor explains the procedure and answers your questions.' },
  { step: '03', title: 'Procedure / Treatment', desc: 'The treatment is performed by our experienced medical team with full care and safety protocols.' },
  { step: '04', title: 'Recovery & Follow-up', desc: 'Post-treatment monitoring, discharge instructions, and scheduled follow-up visits.' },
]

export default function TreatmentDetail() {
  const { slug, treatmentSlug } = useParams()
  const navigate = useNavigate()
  const [speciality, setSpeciality] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [relatedDoctors, setRelatedDoctors] = useState([])

  useEffect(() => {
    setLoading(true)
    getSpecialityBySlug(slug)
      .then((data) => {
        if (!data) navigate('/services', { replace: true })
        else setSpeciality(data)
      })
      .finally(() => setLoading(false))
  }, [slug])

  // Fetch doctors and filter to those linked to this treatment
  useEffect(() => {
    if (!speciality) return
    getDoctors().then((all) => {
      const key = `${speciality.id}::${treatmentSlug}`
      const filtered = all.filter((d) =>
        (d.linkedTreatments || []).includes(key) ||
        d.specialty === speciality.name ||
        (Array.isArray(d.specialties) && d.specialties.includes(speciality.name))
      )
      setRelatedDoctors(filtered)
    }).catch(() => {})
  }, [speciality?.id, treatmentSlug])

  if (loading) {
    return (
      <div className="section-padding container-max">
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-100 rounded-[5px]" />
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-32 bg-gray-100 rounded-[5px]" />
        </div>
      </div>
    )
  }

  if (!speciality) return null

  const treatments = Array.isArray(speciality.treatments) ? speciality.treatments : []
  const treatment = treatments.find((t) => t.slug === treatmentSlug)

  if (!treatment) {
    return (
      <div className="section-padding container-max text-center">
        <FiAlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="font-heading text-xl font-bold text-navy-800 mb-2">Treatment not found</h2>
        <Link to={`/services/${slug}`} className="btn-primary mt-4">Back to {speciality.name}</Link>
      </div>
    )
  }

  const cfg = CATEGORY_CONFIG[speciality.category] || CATEGORY_CONFIG['Support']
  const otherTreatments = treatments.filter((t) => t.slug !== treatmentSlug)

  return (
    <>
      <SEO
        title={`${treatment.name} — ${speciality.name}`}
        description={
          `${treatment.name} at Care Homeopathic Clinic, Saharsa. ` +
          (treatment.description ? treatment.description.slice(0, 120) + '… ' : '') +
          `Recovery: ${treatment.recovery || 'Varies'}.`
        }
        keywords={[treatment.name, speciality.name, `${treatment.name} Saharsa`, speciality.category].filter(Boolean)}
        type="article"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: treatment.name,
            description: treatment.description || '',
            procedureType: 'https://schema.org/SurgicalProcedure',
            status: 'https://schema.org/ActiveActionStatus',
            preparation: Array.isArray(treatment.preparation) ? treatment.preparation.join(' ') : '',
            followup: `Recovery time: ${treatment.recovery || 'Varies'}. Follow-up as advised by your doctor.`,
            recognizingAuthority: { '@type': 'Organization', name: 'Care Homeopathic Clinic', url: siteData.url },
          },
          ...(treatment.faqs?.length ? [{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: treatment.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }] : []),
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteData.url },
              { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteData.url}/services` },
              { '@type': 'ListItem', position: 3, name: speciality.name, item: `${siteData.url}/services/${speciality.slug}` },
              { '@type': 'ListItem', position: 4, name: treatment.name },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="bg-hero-gradient text-white py-16 px-4">
        <div className="container-max">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link to={`/services/${slug}`} className="hover:text-white transition-colors">{speciality.name}</Link>
            <span>/</span>
            <span className="text-white">{treatment.name}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold uppercase tracking-widest ${cfg.light} ${cfg.text} px-3 py-1 rounded-full`}>
              {speciality.category}
            </span>
            <span className="text-xs text-white/50">{speciality.name}</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-black mb-6">{treatment.name}</h1>

          {/* Key info pills */}
          <div className="flex flex-wrap gap-4">

            {treatment.duration && (
              <div className="bg-white/10 backdrop-blur-sm rounded-[5px] px-5 py-3">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Duration</p>
                <p className="text-white font-bold text-xl flex items-center gap-2">
                  <FiClock className="w-4 h-4" /> {treatment.duration}
                </p>
              </div>
            )}
            {speciality.available && (
              <div className="bg-white/10 backdrop-blur-sm rounded-[5px] px-5 py-3">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Availability</p>
                <p className="text-white font-bold text-xl">{speciality.available}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* About */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-3">About This Procedure</h2>
                <p className="text-gray-600 leading-relaxed">
                  {treatment.description || (
                    <><span className="font-semibold">{treatment.name}</span> is treated at Care Homeopathic Clinic under the{' '}
                    <Link to={`/services/${slug}`} className="text-primary-600 hover:underline">{speciality.name}</Link> department
                    by our experienced medical team. We follow international safety protocols to ensure the best outcomes for every patient.</>
                  )}
                </p>
                {speciality.recoveryTime && (
                  <div className={`mt-4 inline-flex items-center gap-2 ${cfg.light} ${cfg.text} rounded-[5px] px-4 py-2 text-sm font-medium`}>
                    <FiClock className="w-4 h-4" />
                    Typical recovery: {treatment.recovery || speciality.recoveryTime}
                  </div>
                )}
              </motion.div>

              {/* Image Gallery */}
              {Array.isArray(treatment.images) && treatment.images.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiImage className={`w-5 h-5 ${cfg.text}`} />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">Photos</h2>
                  </div>
                  {/* Main image */}
                  <div
                    className="relative w-full aspect-video rounded-[5px] overflow-hidden bg-gray-100 cursor-pointer mb-3"
                    onClick={() => setLightbox(treatment.images[activeImg])}
                  >
                    <img
                      src={treatment.images[activeImg]}
                      alt={`${treatment.name} ${activeImg + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                      <span className="bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">View full size</span>
                    </div>
                    {treatment.images.length > 1 && (
                      <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeImg + 1} / {treatment.images.length}
                      </span>
                    )}
                  </div>
                  {/* Thumbnails */}
                  {treatment.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {treatment.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`flex-shrink-0 w-16 h-16 rounded-[5px] overflow-hidden border-2 transition-all ${
                            i === activeImg ? `${cfg.border.replace('border-', 'border-')} border-2 opacity-100` : 'border-transparent opacity-60 hover:opacity-90'
                          }`}
                        >
                          <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Video */}
              {treatment.videoUrl && toEmbedUrl(treatment.videoUrl) && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiYoutube className="w-5 h-5 text-red-500" />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">Procedure Video</h2>
                  </div>
                  <div className="relative w-full aspect-video rounded-[5px] overflow-hidden bg-black">
                    <iframe
                      src={toEmbedUrl(treatment.videoUrl)}
                      title={`${treatment.name} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </motion.div>
              )}

              {/* Indications */}
              {Array.isArray(treatment.indications) && treatment.indications.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiActivity className={`w-5 h-5 ${cfg.text}`} />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">When Is This Needed?</h2>
                  </div>
                  <ul className="space-y-2">
                    {treatment.indications.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.bg} mt-2 flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Benefits */}
              {Array.isArray(treatment.benefits) && treatment.benefits.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiShield className={`w-5 h-5 ${cfg.text}`} />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">Benefits</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {treatment.benefits.map((b, i) => (
                      <div key={i} className={`flex items-center gap-3 ${cfg.light} rounded-[5px] px-4 py-3`}>
                        <FiCheck className={`w-4 h-4 ${cfg.text} flex-shrink-0`} />
                        <span className="text-sm font-medium text-gray-700">{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Preparation */}
              {Array.isArray(treatment.preparation) && treatment.preparation.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiList className={`w-5 h-5 ${cfg.text}`} />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">How to Prepare</h2>
                  </div>
                  <ul className="space-y-2">
                    {treatment.preparation.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                        <span className={`w-5 h-5 rounded-full ${cfg.bg} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{i + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* FAQs */}
              {Array.isArray(treatment.faqs) && treatment.faqs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <FiHelpCircle className={`w-5 h-5 ${cfg.text}`} />
                    <h2 className="font-heading font-bold text-navy-800 text-xl">Frequently Asked Questions</h2>
                  </div>
                  <div className="space-y-3">
                    {treatment.faqs.map((faq, i) => (
                      <div key={i} className={`border ${cfg.border} rounded-[5px] overflow-hidden`}>
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                        >
                          <span className="font-semibold text-navy-800 text-sm">{faq.question}</span>
                          {openFaq === i
                            ? <FiChevronUp className={`w-4 h-4 ${cfg.text} flex-shrink-0`} />
                            : <FiChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          }
                        </button>
                        <AnimatePresence initial={false}>
                          {openFaq === i && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className={`px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t ${cfg.border} pt-3`}>
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Process Steps */}
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                <h2 className="font-heading font-bold text-navy-800 text-xl mb-6">What to Expect</h2>
                <div className="space-y-5">
                  {(treatment.steps || PROCESS_STEPS).map(({ step, title, desc }, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className={`w-10 h-10 rounded-[5px] ${cfg.bg} text-white font-black text-sm flex items-center justify-center flex-shrink-0`}>
                        {step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-800 mb-1">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Department features */}
              {Array.isArray(speciality.features) && speciality.features.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-4">
                    Why Choose Care Homeopathic Clinic for {speciality.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {speciality.features.map((f, i) => (
                      <div key={i} className={`flex items-center gap-3 ${cfg.light} rounded-[5px] px-4 py-3`}>
                        <FiCheck className={`w-4 h-4 ${cfg.text} flex-shrink-0`} />
                        <span className="text-sm font-medium text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Other treatments in this department */}
              {otherTreatments.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-white rounded-[5px] border border-gray-100 shadow-card p-6">
                  <h2 className="font-heading font-bold text-navy-800 text-xl mb-4">
                    Other Treatments in {speciality.name}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {otherTreatments.slice(0, 6).map((t, i) => (
                        <Link
                          key={i}
                          to={`/services/${slug}/treatment/${t.slug}`}
                          className={`flex items-center justify-between gap-2 border ${cfg.border} rounded-[5px] px-4 py-3 hover:${cfg.light} transition-colors group`}
                        >
                          <div>
                            <p className="font-medium text-navy-800 text-sm group-hover:text-primary-700 transition-colors">{t.name}</p>
                          </div>
                          <FiArrowRight className={`w-4 h-4 ${cfg.text} flex-shrink-0`} />
                        </Link>
                    ))}
                  </div>
                  <Link to={`/services/${slug}`} className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${cfg.text}`}>
                    View all {treatments.length} treatments <FiArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sticky top-24 self-start">

              {/* Book CTA */}
              <div className="bg-primary-600 rounded-xl p-5 text-white shadow-lg">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Ready to proceed?</p>
                <h3 className="font-heading font-bold text-lg mb-4 leading-tight">Book This Procedure</h3>
                <Link
                  to={`/book-appointment?dept=${encodeURIComponent(speciality.name)}&treatment=${encodeURIComponent(treatment.name)}`}
                  className="w-full flex items-center justify-center gap-2 bg-white text-primary-700 font-bold text-sm py-3 rounded-lg hover:bg-primary-50 transition-colors mb-2"
                >
                  <FiCalendar className="w-4 h-4" /> Book Appointment
                </Link>
                <a
                  href={`tel:${siteData.contact.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                  <FiPhone className="w-4 h-4" /> {siteData.contact.phone}
                </a>

                )}
              </div>

              {/* Related Doctors */}
              {relatedDoctors.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
                  {/* Header */}
                  <div className={`px-5 py-3 ${cfg.light} border-b ${cfg.border}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${cfg.text}`}>
                      Specialists for this Procedure
                    </p>
                  </div>

                  {/* Doctor cards */}
                  <div className="divide-y divide-gray-50">
                    {relatedDoctors.map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/doctors/${doc.id}`}
                        className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
                      >
                        {/* Photo */}
                        <div className="relative flex-shrink-0">
                          {doc.image ? (
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 group-hover:border-primary-200 transition-colors"
                            />
                          ) : (
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${cfg.border} ${cfg.light}`}>
                              <span className={`font-black text-lg ${cfg.text}`}>{getInitials(doc.name)}</span>
                            </div>
                          )}
                          {/* Online dot */}
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="font-bold text-navy-800 text-sm leading-tight group-hover:text-primary-700 transition-colors">
                            {doc.name}
                          </p>
                          {doc.specialty && (
                            <p className={`text-xs font-semibold mt-0.5 ${cfg.text}`}>{doc.specialty}</p>
                          )}
                          {doc.qualification && (
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{doc.qualification}</p>
                          )}

                          {/* Stats row */}
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            {doc.experience && (
                              <span className="inline-flex items-center gap-1 text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                {doc.experience} yrs exp
                              </span>
                            )}

                          </div>

                          {/* Available days short */}
                          {doc.availableDays?.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((short, i) => {
                                const full = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]
                                const active = doc.availableDays.includes(full)
                                return active ? (
                                  <span key={short} className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${cfg.light} ${cfg.text}`}>
                                    {short}
                                  </span>
                                ) : null
                              })}
                            </div>
                          )}
                        </div>

                        <FiArrowRight className={`w-4 h-4 ${cfg.text} flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </Link>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <Link
                      to={`/book-appointment?dept=${encodeURIComponent(speciality.name)}&treatment=${encodeURIComponent(treatment.name)}`}
                      className={`w-full flex items-center justify-center gap-2 ${cfg.bg} text-white text-xs font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      <FiCalendar className="w-3.5 h-3.5" /> Book with a Specialist
                    </Link>
                  </div>
                </div>
              )}

              {/* Back to department */}
              <Link to={`/services/${slug}`}
                className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors px-1">
                <FiArrowLeft className="w-4 h-4" /> All {speciality.name} treatments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <FiX size={28} />
            </button>
            <img
              src={lightbox}
              alt="Full size"
              className="max-w-full max-h-[90vh] rounded-[5px] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
