import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiHeart, FiActivity, FiEye, FiTool, FiUser, FiUsers } from 'react-icons/fi'
import { useSpecialities } from '../../hooks/useSpecialities'

const iconMap = {
  heart: FiHeart,
  brain: FiActivity,
  bone: FiTool,
  child: FiUser,
  female: FiUsers,
  ribbon: FiEye,
}

export default function ServicesSection() {
  const { specialities, loading } = useSpecialities()
  const displayed = specialities.slice(0, 9)

  return (
    <section className="section-padding" style={{ backgroundColor: '#f5f1e8' }}>
      <div className="container-max">

        {/* Section header — title left, description right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 items-end mb-14"
        >
          <div>
            <span className="text-primary-600 font-bold text-xs tracking-widest uppercase mb-3 block">
              Quality Service
            </span>
            <h2 className="font-heading font-bold text-navy-800 text-4xl md:text-5xl leading-tight">
              Expert Pediatric Care & Healing Services
            </h2>
          </div>
          <p className="text-gray-500 text-base leading-relaxed md:text-right">
            At Child Clinic, we offer specialized medical care for children from newborn to adolescence — providing expert diagnosis and evidence-based treatments for every stage of growth.
          </p>
        </motion.div>

        {/* 3×3 grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-32 bg-white/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayed.map((spec, i) => {
              const Icon = iconMap[spec.icon]
              const isEmoji = !Icon && spec.icon

              return (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/specialities`}
                    className="flex items-start gap-4 bg-white rounded-[5px] p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 hover:-translate-y-0.5 transition-all duration-300 group h-full"
                  >
                    {/* Icon box */}
                    <div className="w-14 h-14 rounded-[5px] border-2 border-primary-100 bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      {isEmoji ? (
                        <span className="text-2xl leading-none">{spec.icon}</span>
                      ) : Icon ? (
                        <Icon className="w-6 h-6 text-primary-700" />
                      ) : (
                        <FiHeart className="w-6 h-6 text-primary-700" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-navy-800 text-base mb-1.5 group-hover:text-primary-700 transition-colors">
                        {spec.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {spec.description || 'Expert medical care and specialized treatment for children.'}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/specialities" className="btn-secondary">
            View All Specialities <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
