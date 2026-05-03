import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useSpecialities } from '../../hooks/useSpecialities'

const CATEGORY_COLORS = {
  'General Pediatrics': { bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-500', text: 'text-blue-600' },
  'Neonatology (NICU)': { bg: 'bg-teal-50', border: 'border-teal-100', iconBg: 'bg-teal-500', text: 'text-teal-600' },
  'Vaccination Centre': { bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-purple-500', text: 'text-purple-600' },
  'Pediatric Emergency': { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-500', text: 'text-amber-600' },
  'Pediatric Nutrition & Growth': { bg: 'bg-green-50', border: 'border-green-100', iconBg: 'bg-green-500', text: 'text-green-600' },
  'Pediatric Pulmonology': { bg: 'bg-sky-50', border: 'border-sky-100', iconBg: 'bg-sky-500', text: 'text-sky-600' },
}

const DEFAULT_COLOR = { bg: 'bg-primary-50', border: 'border-primary-100', iconBg: 'bg-primary-500', text: 'text-primary-600' }

export default function ServicesSection() {
  const { specialities, loading } = useSpecialities()
  const displayed = specialities.slice(0, 6)

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase">Our Specialities</span>
          <h2 className="section-title mt-2">Our Specialized Care Units</h2>
          <p className="section-subtitle mx-auto">
            From routine checkups to specialized neonatal care, we provide comprehensive pediatric services with a compassionate heart.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-50 rounded-[10px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((spec, i) => {
              const color = CATEGORY_COLORS[spec.name] || DEFAULT_COLOR
              return (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group"
                >
                  <Link
                    to={`/specialities/${spec.slug}`}
                    className={`block bg-white border ${color.border} rounded-[10px] overflow-hidden shadow-card group hover:-translate-y-1 transition-all duration-300 h-full`}
                  >
                    <div className={`${color.bg} px-6 pt-8 pb-6 flex items-center gap-5 transition-colors duration-300`}>
                      <div className={`${color.iconBg} w-16 h-16 rounded-[5px] flex items-center justify-center shadow-md flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                        <span className="text-3xl leading-none">{spec.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy-800 text-lg leading-snug group-hover:text-primary-700 transition-colors">{spec.name}</h3>
                        <span className={`text-xs font-semibold ${color.text} mt-1 block`}>{spec.available || 'OPD Hours'}</span>
                      </div>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {spec.description}
                      </p>
                      <div className={`flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all ${color.text}`}>
                        View Details <FiArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/specialities" className="btn-secondary">
            View All Departments <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
