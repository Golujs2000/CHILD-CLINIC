// ─────────────────────────────────────────────────────────────
// pages/BookAppointment.jsx
// Standalone appointment booking page at /book-appointment.
// Wraps the shared AppointmentForm component with a page header,
// trust indicators (emergency call, hours, NABH), and SEO tags.
// Pre-fills doctor/department from query params when linked from
// a doctor profile card.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { FiPhone, FiClock, FiShield } from 'react-icons/fi'
import SEO from '../components/SEO'
import AppointmentForm from '../components/home/AppointmentForm'
import { siteData } from '../data/siteData'

export default function BookAppointment() {
  return (
    <>
      <SEO
        title="Book an Appointment"
        description="Book your pediatric consultation at Child Clinic, Saharsa online. Trusted child healthcare in the Kosi region with 30-minute confirmation. Professional pediatric and newborn care."
        keywords={['book appointment Saharsa', 'online child doctor appointment Saharsa', 'doctor appointment Kosi region', 'Child Clinic appointment Bihar']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ReserveAction',
          name: 'Book an Appointment at Child Clinic',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteData.url}/book-appointment`,
            actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
          },
          object: {
            '@type': 'MedicalClinic',
            name: siteData.name,
            url: siteData.url,
          },
        }}
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Fill in the form below and our team will confirm your appointment within 30 minutes.
          </p>
          <div className="mt-4 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium">
            Please book your appointment at least 48 hours in advance.
          </div>
        </motion.div>
      </section>

      <section className="section-padding bg-section-gradient">
        <div className="container-max space-y-6">

          {/* Booking Form — full width */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AppointmentForm />
          </motion.div>

          {/* Info cards below form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {/* OPD Hours */}
            <div className="card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiClock className="w-5 h-5 text-primary-600" />
              </div>
              <div className="w-full">
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-2">OPD Hours</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday – Sunday</span>
                    <span className="font-semibold text-navy-800">9:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <div className="card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiShield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-800 text-sm mb-1">Confirmed in 30 Min</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Our team calls you within 30 minutes to confirm your appointment slot. Secure & confidential.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
