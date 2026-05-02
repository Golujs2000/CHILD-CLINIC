import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiPhone, FiCalendar, FiHeart, FiShield, FiAward, FiStar, FiActivity, FiArrowRight } from 'react-icons/fi'
import { siteData } from '../../data/siteData'

const DR_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/child-clinic.firebasestorage.app/o/gallery%2F1777714740704_DR.%20ANSHUMAN01.webp?alt=media&token=27dc5999-2e10-4cd4-a081-9a71250a0a89'

const features = [
  { icon: FiShield, label: 'Safe & Gentle Care', color: 'bg-blue-50 text-blue-600' },
  { icon: FiHeart, label: 'Neonatal Care', color: 'bg-primary-50 text-primary-600' },
  { icon: FiCalendar, label: 'Easy Booking', color: 'bg-teal-50 text-teal-600' },
  { icon: FiAward, label: 'Expert Pediatrician', color: 'bg-purple-50 text-purple-600' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-70" 
          style={{ backgroundImage: 'url("/pediatric_hero_bg_v2_1777721905241.png")' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/20 via-transparent to-white/60" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-200/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="container-max section-padding relative z-10 w-full pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left — Visual Component (Doctor) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Visual Container */}
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-8 border-white bg-white">
              <img
                src={DR_IMAGE}
                alt="Dr. Anshuman"
                className="w-full h-auto max-h-[600px] object-cover"
              />
              
              {/* Glassmorphism Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading font-black text-xl text-navy-900 leading-tight">Dr. Anshuman</h3>
                    <p className="text-primary-600 font-bold text-[10px] tracking-wide uppercase">Pediatrician & Neonatologist</p>
                    <p className="text-gray-400 font-bold text-[9px] tracking-widest uppercase mt-0.5">P.G.P.N (BOSTON U.S.A)</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-600/30">
                    <FiActivity size={24} />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center border-t border-navy-900/5 pt-4">
                  <div>
                    <p className="text-lg font-black text-navy-900 leading-none">7+</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Yrs Exp</p>
                  </div>
                  <div className="border-x border-navy-900/5">
                    <p className="text-lg font-black text-navy-900 leading-none">24/7</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Support</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-navy-900 leading-none">1000+</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Families</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Icons */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-primary-500 z-20 border border-primary-50"
            >
              <FiHeart size={40} />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -left-12 w-20 h-20 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-blue-500 z-20 border border-blue-50"
            >
              <FiShield size={32} />
            </motion.div>
          </motion.div>

          {/* Right Content (Text) */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 shadow-sm">
                <FiStar className="animate-spin-slow" /> Saharsa's #1 Pediatric Care
              </span>
              
              <h1 className="font-heading text-5xl md:text-6xl lg:text-[4.5rem] font-black text-navy-900 leading-[1.05] mb-6 tracking-tight">
                Nurturing Health, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
                  Inspiring Smiles
                </span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-medium">
                Expert pediatric and neonatal emergency care by <span className="text-navy-900 font-bold border-b-2 border-primary-200">Dr. Anshuman</span>. Dedicated to the wellbeing of your little ones.
              </p>

              {/* Action Cards */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link 
                  to="/contact" 
                  className="group relative bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl transition-all shadow-xl shadow-primary-600/20 flex items-center gap-2 font-bold"
                >
                  <FiPhone size={20} />
                  Contact for Inquiries
                </Link>

                <Link 
                  to="/services" 
                  className="group relative bg-white border border-gray-100 hover:border-primary-200 text-navy-900 px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-bold"
                >
                  Explore Our Services
                  <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Service Highlights */}
              <div className="flex flex-wrap gap-3 mt-2">
                {[
                  { emoji: '👶', label: 'Newborn Care', bg: 'bg-blue-50', text: 'text-blue-700' },
                  { emoji: '💉', label: 'Vaccination', bg: 'bg-teal-50', text: 'text-teal-700' },
                  { emoji: '🚨', label: '24×7 Emergency', bg: 'bg-red-50', text: 'text-red-700' },
                  { emoji: '🥗', label: 'Nutrition Care', bg: 'bg-green-50', text: 'text-green-700' },
                ].map((tag) => (
                  <div key={tag.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${tag.bg} ${tag.text} font-bold text-xs shadow-sm border border-white/50 hover:shadow-md transition-all hover:-translate-y-0.5`}>
                    <span className="text-sm">{tag.emoji}</span>
                    <span>{tag.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Modern Section Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-24 text-slate-50 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-1.5,1200,0V120H0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V120H0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z"></path>
        </svg>
      </div>
    </section>
  )
}

