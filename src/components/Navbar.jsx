import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMenu, FiX, FiChevronDown, FiArrowRight, FiActivity } from 'react-icons/fi'
import { siteData } from '../data/siteData'
import { useSpecialities } from '../hooks/useSpecialities'
import hospitalLogo from '../assets/child-clinic-logo.png'


const mainLinks = [
  { label: 'Home',              to: '/' },
  { label: 'About Us',          to: '/about' },
  { label: 'Our Doctors',       to: '/doctors' },
  { label: 'Services', to: '/hospital-services' },
  { label: 'Contact',           to: '/contact' },
]

// ── Services Mega Menu ────────────────────────────────────────────────────────
function ServicesMegaMenu({ specialities, loading, onClose, mobile = false }) {
  const [openSpec, setOpenSpec] = useState(null)

  if (mobile) {
    return (
      <div className="pl-4 mt-1 border-l-2 border-primary-100 max-h-[70vh] overflow-y-auto no-scrollbar space-y-0.5">
        <Link to="/services" onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-[5px] text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors">
          🏥 All Specialities &amp; Treatments
        </Link>
        {loading
          ? [...Array(4)].map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded mx-3 animate-pulse" />)
          : specialities.map((spec) => {
            const treatments = Array.isArray(spec.treatments) ? spec.treatments : []
            const isOpen = openSpec === spec.id
            return (
              <div key={spec.id}>
                <button
                  onClick={() => setOpenSpec(isOpen ? null : spec.id)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-[5px] text-sm text-gray-700 font-semibold hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{spec.icon || '🏥'}</span>{spec.name}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <FiActivity className="w-3 h-3" />
                    <span className="text-xs">{treatments.length}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                      <FiChevronDown size={13} />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden pl-3"
                    >
                      <Link to={`/services/${spec.slug}`} onClick={onClose}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary-600 hover:text-primary-800 transition-colors">
                        <FiArrowRight size={10} /> View all {spec.name}
                      </Link>
                      {treatments.map((t) => (
                        <Link key={t.slug} to={`/services/${spec.slug}/treatment/${t.slug}`} onClick={onClose}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-[5px] text-xs text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors">
                          <span className="w-1 h-1 rounded-full bg-primary-400 flex-shrink-0" />
                          {t.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full right-0 mt-2 w-[680px] bg-white rounded-[5px] shadow-2xl border border-gray-100 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-primary-50 border-b border-primary-100">
        <span className="text-sm font-bold text-primary-700">Speciality / Treatment</span>
        <Link to="/services" onClick={onClose}
          className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors">
          View All <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Specialities + all treatment links */}
      <div className="overflow-y-auto" style={{ maxHeight: '460px' }}>
        {loading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-[5px] animate-pulse" />)}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {specialities.map((spec) => {
              const treatments = Array.isArray(spec.treatments) ? spec.treatments : []
              return (
                <div key={spec.id} className="px-4 py-3">
                  {/* Speciality header — full link */}
                  <Link
                    to={`/services/${spec.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 mb-2 group"
                  >
                    <span className="text-lg leading-none flex-shrink-0">{spec.icon || '🏥'}</span>
                    <span className="text-sm font-bold text-navy-800 group-hover:text-primary-600 transition-colors">{spec.name}</span>
                    <span className="text-[10px] text-gray-400 ml-auto group-hover:text-primary-500 transition-colors flex items-center gap-1">
                      <FiActivity size={10} /> {treatments.length} treatments
                      <FiArrowRight size={10} />
                    </span>
                  </Link>

                  {/* All treatments as links */}
                  {treatments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-8">
                      {treatments.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/services/${spec.slug}/treatment/${t.slug}`}
                          onClick={onClose}
                          className="text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
                        >
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">Click any treatment to view details, cost &amp; FAQs</span>
        <Link to="/book-appointment" onClick={onClose}
          className="text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 px-3 py-1.5 rounded-[5px] transition-colors">
          Book Appointment
        </Link>
      </div>
    </motion.div>
  )
}

const NAV_LINKS = [
  { label: 'Home',              to: '/',                   end: true },
  { label: 'About Us',          to: '/about' },
  { label: 'Our Doctors',       to: '/doctors' },
  { label: 'Services', to: '/hospital-services' },
  { label: 'Contact',           to: '/contact' },
]

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const { pathname } = useLocation()
  const servicesRef = useRef(null)
  const { specialities, loading: specLoading } = useSpecialities()


  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20)
      const doc = document.documentElement
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100
      setScrollPct(Math.min(pct, 100))
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false); setMobileServicesOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isServicesActive = pathname === '/services'

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Sticky wrapper */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-nav' : ''}`}>

        {/* Top bar */}
        <div className="hidden md:flex bg-navy-900 text-white text-xs px-3 py-1.5 justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 opacity-80">
              <FiPhone className="w-3 h-3" />
              Call Us: <strong>{siteData.contact.phone}</strong>
            </span>
            <span className="flex items-center gap-1.5 opacity-70">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {siteData.contact.address}
            </span>
          </div>
          <span className="opacity-70">{siteData.contact.hours}</span>
        </div>

        {/* Main nav */}
        <div className={`transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
          <nav className="w-full px-3 flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <motion.img
                src={hospitalLogo}
                alt="Child Clinic Logo"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="h-10 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="text-navy-900 font-hindi font-bold text-lg md:text-xl leading-none group-hover:text-primary-600 transition-colors">
                  चाइल्ड क्लिनिक सहरसा
                </span>
                <span className="text-primary-500 text-[9px] md:text-[10px] font-semibold italic hidden sm:block leading-none mt-0.5">
                  General & Emergency Pediatric Care
                </span>
                <span className="text-primary-600 text-[9px] font-bold tracking-widest hidden sm:block mt-0.5 uppercase">
                  Caring for the health of your little ones with excellence.
                </span>
              </div>
            </Link>

            {/* Desktop links — sliding underline */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to, end }) => (
                <li key={to}>
                  <NavLink to={to} end={end}
                    className={({ isActive }) =>
                      `nav-link-line px-4 py-2 text-sm font-semibold transition-colors duration-200 block ${
                        isActive ? 'text-primary-600 active-link' : 'text-gray-600 hover:text-primary-600'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              {/* Services dropdown */}
              <li className="relative" ref={servicesRef}>
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  className={`nav-link-line flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    isServicesActive || servicesOpen ? 'text-primary-600 active-link' : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  Speciality / Treatment
                  <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={14} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {servicesOpen && <ServicesMegaMenu specialities={specialities} loading={specLoading} onClose={() => setServicesOpen(false)} />}
                </AnimatePresence>
              </li>
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-end gap-0.5"
              >
                <a href={`tel:${siteData.contact.phone}`}
                  className="flex items-center gap-1.5 text-sm text-primary-700 font-bold hover:text-primary-800 leading-tight transition-colors"
                >
                  <FiPhone className="w-3.5 h-3.5" />
                  {siteData.contact.phone}
                </a>
                <a href={`tel:${siteData.contact.phone2}`}
                  className="flex items-center gap-1.5 text-xs text-gray-400 font-medium hover:text-primary-600 leading-tight transition-colors"
                >
                  <FiPhone className="w-3 h-3" />
                  {siteData.contact.phone2}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Link to="/book-appointment" className="btn-primary btn-shimmer text-sm py-2.5 px-5">
                  Book Appointment
                </Link>
              </motion.div>
            </div>

            {/* Mobile hamburger — animated */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><FiX className="w-6 h-6" /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><FiMenu className="w-6 h-6" /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </nav>

          {/* Mobile menu — staggered links */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="lg:hidden bg-white border-t border-primary-50 overflow-hidden shadow-lg"
              >
                <div className="w-full px-3 py-4 space-y-1">
                  {NAV_LINKS.map(({ label, to, end }, i) => (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <NavLink to={to} end={end} onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-3 rounded-[5px] text-sm font-semibold transition-colors ${
                            isActive ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Services accordion */}
                  <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
                    <button
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-[5px] text-sm font-semibold transition-colors ${
                        isServicesActive ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500' : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      Speciality / Treatment
                      <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <FiChevronDown size={16} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <ServicesMegaMenu mobile specialities={specialities} loading={specLoading} onClose={() => setMobileOpen(false)} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-3 border-t border-primary-50 flex flex-col gap-2"
                  >
                    <a href={`tel:${siteData.contact.phone}`}
                      className="flex items-center gap-2 px-4 py-3 bg-primary-50 text-primary-700 rounded-[5px] text-sm font-bold"
                    >
                      <FiPhone /> Call Us: {siteData.contact.phone}
                    </a>
                    <Link to="/book-appointment" onClick={() => setMobileOpen(false)}
                      className="btn-primary btn-shimmer justify-center text-sm">
                      Book Appointment
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </header>
    </>
  )
}
