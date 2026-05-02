import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useFeaturedDoctors } from '../../hooks/useDoctors'
import DoctorCard from '../DoctorCard'

export default function FeaturedDoctors() {
  const { doctors: featured, loading } = useFeaturedDoctors()

  return (
    <section className="relative section-padding overflow-hidden bg-white">
      <div className="container-max relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Meet Our Experts
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">
            Our Featured <span className="text-primary-600">Doctors</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Our team of highly qualified specialists brings decades of experience and genuine compassion to every patient.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {featured.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DoctorCard doc={doc} accent="primary" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-primary-600/25"
          >
            View All Doctors <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
