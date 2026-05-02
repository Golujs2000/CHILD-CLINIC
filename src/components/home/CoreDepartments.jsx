import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock, FiShield, FiPlusCircle } from 'react-icons/fi'

const DEPARTMENTS = [
  {
    id: 'opd',
    name: 'Pediatric OPD',
    type: 'Department',
    hours: 'OPD Hours',
    icon: '👶',
    desc: 'Daily outpatient consultations for children from newborn to adolescence. Dr. Anshuman personally examines every child, diagnoses the condition, and prescribes safe, weight-based medications.',
    specialities: ['General Pediatrics', 'Pediatric Nutrition & Growth'],
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 'nicu',
    name: 'NICU & Newborn Care',
    type: 'Emergency',
    hours: '24 × 7',
    icon: '🏥',
    desc: 'Advanced NICU facility for premature babies, low birth weight newborns, neonatal jaundice, and birth-related complications. Round-the-clock specialist monitoring with incubators, phototherapy, and IV support.',
    specialities: ['Neonatology (Newborn Care)'],
    color: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-50'
  },
  {
    id: 'vaccination',
    name: 'Vaccination Centre',
    type: 'Diagnostic',
    hours: 'OPD Hours',
    icon: '💉',
    desc: 'Complete childhood vaccination services following IAP and WHO schedules. All vaccines available including BCG, OPV, DPT, MMR, Hepatitis B, PCV, Typhoid, and Chickenpox. Cold-chain maintained with digital records.',
    specialities: ['Vaccinations & Immunizations'],
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50'
  },
  {
    id: 'emergency',
    name: 'Pediatric Emergency',
    type: 'Emergency',
    hours: '24 × 7',
    icon: '🚨',
    desc: 'Round-the-clock emergency pediatric services for seizures, high fever, severe respiratory distress, dehydration, and acute infections. Immediate life-saving interventions by trained staff.',
    specialities: ['General Pediatrics', 'Pediatric Pulmonology'],
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50'
  }
]

export default function CoreDepartments() {
  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white border border-primary-100 text-primary-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm"
          >
            Clinical Departments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-black text-navy-900 leading-tight"
          >
            Specialized Care for <span className="text-primary-600">Every Need</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto"
          >
            Our facility is designed to provide comprehensive pediatric care, from routine checkups to critical emergency interventions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-navy-900/5 border border-white hover:border-primary-100 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${dept.color} opacity-[0.03] rounded-bl-full`} />

              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl">
                    {dept.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${dept.bg} ${dept.color.replace('from-', 'text-').split(' ')[0]}`}>
                      {dept.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                      <FiClock className="w-3.5 h-3.5" /> {dept.hours}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-black text-2xl text-navy-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {dept.desc}
                </p>

                <div className="space-y-4">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Related Specialities</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.specialities.map(spec => (
                        <span key={spec} className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-[11px] font-semibold border border-gray-100">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className={`inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3 ${dept.color.replace('from-', 'text-').split(' ')[0]}`}
                  >
                    Contact for Consultation <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/specialities"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-white rounded-2xl font-bold hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/20"
          >
            Explore All Departments <FiPlusCircle />
          </Link>
        </div>
      </div>
    </section>
  )
}
