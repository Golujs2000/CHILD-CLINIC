import { motion } from 'framer-motion'
import {
  FiShield, FiDroplet, FiUsers, FiAward, FiHeart, FiActivity,
} from 'react-icons/fi'

const reasons = [
  {
    icon: FiActivity,
    title: 'Expert Pediatric Care',
    desc: 'Led by Dr. Anshuman (M.B.B.S., M.D., P.G.P.N.), providing evidence-based medical treatment for all childhood illnesses.',
  },
  {
    icon: FiUsers,
    title: 'Specialized Units',
    desc: 'Level II NICU, Emergency care, and specialized pediatric clinics — all under one roof in Saharsa.',
    color: 'text-primary-600 bg-primary-50 border-primary-100',
  },
  {
    icon: FiShield,
    title: 'Vaccination Safety',
    desc: 'Strict cold-chain maintained facility following latest IAP and WHO immunization schedules for infants and children.',
    color: 'text-green-600 bg-green-50 border-green-100',
  },
  {
    icon: FiAward,
    title: 'Founded in 2024',
    desc: 'Committed to bringing state-of-the-art child healthcare facilities to the heart of Saharsa and the Kosi region.',
    color: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    icon: FiDroplet,
    title: 'In-House Diagnostics',
    desc: 'In-clinic pathology lab and pharmacy ensure rapid diagnosis and immediate treatment for your child.',
    color: 'text-purple-600 bg-purple-50 border-purple-100',
  },
  {
    icon: FiHeart,
    title: 'Compassionate Heart',
    desc: 'We treat every child with the same care and attention as our own family — making doctor visits stress-free.',
    color: 'text-rose-600 bg-rose-50 border-rose-100',
  },
]

export default function WhyChooseUs() {

  return (
    <section className="section-padding bg-[#f5f2eb] relative overflow-hidden">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-wcu" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#075d26" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-wcu)" />
        </svg>
      </div>

      <div className="container-max relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm tracking-widest uppercase">Why Child Clinic</span>
          <h2 className="section-title mt-3">
            Healthcare You Can{' '}
            <span className="text-primary-600">Trust</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We combine advanced medical technology with genuine compassion — because you deserve nothing less.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc, color }, i) => {
            if (i === 0) {
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="lg:col-span-2 bg-navy-800 rounded-2xl p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary-300" />
                    </div>
                    <h3 className="font-heading font-bold text-white text-xl mb-2">{title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-lg">{desc}</p>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                    <span className="text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30 px-3 py-1 rounded-full">Level II NICU</span>
                    <span className="text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30 px-3 py-1 rounded-full">24/7 Emergency</span>
                    <span className="text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30 px-3 py-1 rounded-full">Expert Team</span>
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl ${color} border flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-navy-800 text-base mb-2 group-hover:text-primary-700 transition-colors">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a href="/about" className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all">
            Learn more about us <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
