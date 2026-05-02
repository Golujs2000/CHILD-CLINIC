import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiMenu, FiX, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
import { siteData } from '../data/siteData'
import hospitalLogo from '../assets/child-clinic-logo.png'

const NAV_LINKS = [
  { label: 'Home',       to: '/', end: true },
  { label: 'About',      to: '/about' },
  { label: 'Speciality', to: '/specialities' },
  { label: 'Services',   to: '/services' },
  { label: 'Doctors',    to: '/doctors' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Contact',    to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header className="sticky top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2 px-4 overflow-hidden relative">
        <div className="container-max flex justify-between items-center text-[11px] md:text-xs font-bold tracking-wider uppercase">
          <div className="flex items-center gap-4 animate-pulse">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
              24/7 Pediatric Emergency Available
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href={`tel:${siteData.contact.phone}`} className="hover:text-accent-400 transition-colors flex items-center gap-1.5">
              <FiPhone className="w-3 h-3" /> {siteData.contact.phone}
            </a>
            <span className="text-white/30">|</span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-3 h-3" /> {siteData.contact.hours.split('|')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-md shadow-lg py-3'}`}>
        <div className="container-max flex justify-between items-center px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={hospitalLogo} 
              alt="CHILD CLINIC" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-navy-900 font-black text-xl md:text-2xl tracking-tight leading-none">
                CHILD <span className="text-primary-600">CLINIC</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                Pediatric Specialist
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {NAV_LINKS.map(({ label, to, end }) => (
                <NavLink 
                  key={to} 
                  to={to} 
                  end={end}
                  className={({ isActive }) => 
                    `relative text-sm font-bold tracking-wide transition-colors hover:text-primary-600 ${
                      isActive ? 'text-primary-600' : 'text-navy-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full" 
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
            <Link 
              to="/contact" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2.5 rounded-[5px] text-sm shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-navy-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4">
                {NAV_LINKS.map(({ label, to, end }) => (
                  <NavLink 
                    key={to} 
                    to={to} 
                    end={end}
                    className={({ isActive }) => 
                      `text-base font-bold transition-colors ${
                        isActive ? 'text-primary-600' : 'text-navy-800'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <Link 
                  to="/contact" 
                  className="bg-primary-600 text-white text-center font-bold py-3 rounded-[5px] text-sm shadow-md"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
