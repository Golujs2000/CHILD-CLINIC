// ─────────────────────────────────────────────────────────────
// pages/Home.jsx
// The main homepage — composes all home section components.
// ─────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiCalendar, FiVideo, FiArrowRight } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useSpecialities } from '../hooks/useSpecialities'
import HeroSection from '../components/home/HeroSection'
import StatsCounter from '../components/home/StatsCounter'
import WhyChooseUs from '../components/home/WhyChooseUs'
import ServicesSection from '../components/home/ServicesSection'
import FeaturedDoctors from '../components/home/FeaturedDoctors'
import AppointmentForm from '../components/home/AppointmentForm'
import Testimonials from '../components/home/Testimonials'
import BlogPreview from '../components/home/BlogPreview'
import GalleryStrip from '../components/home/GalleryStrip'
import { siteData } from '../data/siteData'

const hospitalSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: siteData.name,
  url: siteData.url,
  logo: `${siteData.url}/favicon.png`,
  description: siteData.description,
  telephone: `+91${siteData.contact.phone}`,
  email: siteData.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'near Dr I D Singh, Shardha Nagar',
    addressLocality: 'Saharsa',
    addressRegion: 'Bihar',
    postalCode: '852201',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '14:00' },
  ],
  medicalSpecialty: [],
  availableService: [],
  sameAs: [siteData.social.facebook, siteData.social.instagram],
}

export default function Home() {
  const { specialities } = useSpecialities()
  const specNames = specialities.map(s => s.name)

  return (
    <>
      <SEO
        description="Child Clinic, near Dr I D Singh, Shardha Nagar, Saharsa — trusted pediatric and general emergency care. Providing expert medical services for children and families in Saharsa, Bihar."
        keywords={['child clinic Saharsa', 'pediatric doctor Saharsa', 'emergency clinic Saharsa', 'best child specialist Saharsa Bihar', 'Dr I D Singh Saharsa', 'Shardha Nagar Saharsa clinic']}
        jsonLd={{
          ...hospitalSchema,
          medicalSpecialty: specNames.length > 0 ? specNames : ['Pediatrics', 'Neonatology', 'Child Nutrition', 'Pediatric Emergency'],
          availableService: specNames.length > 0
            ? specNames.map(name => ({ '@type': 'MedicalTherapy', name }))
            : hospitalSchema.availableService
        }}

      />

      {/* 1. Hero */}
      <HeroSection />

      {/* Online Consultation Highlight */}
      <section className="bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container-max relative z-10 py-5 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 mx-auto md:mx-0 shadow-inner">
                <FiVideo className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg leading-tight tracking-wide">Expert Pediatric Consultation</h3>
                <p className="text-primary-100 text-sm mt-0.5">Consult with Dr. Anshuman for your child's health concerns — now available for online sessions.</p>
                <p className="text-yellow-200 text-xs mt-2 font-semibold bg-white/10 inline-block px-3 py-1 rounded-full border border-white/20">
                  Note: Prior appointment is mandatory for online consultations.
                </p>
              </div>
            </div>
            <Link to="/book-appointment" className="shrink-0 bg-white text-primary-700 hover:bg-primary-50 px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-lg shadow-black/10 flex items-center gap-2 group">
              Book Online Session <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stats ticker */}
      <StatsCounter />

      {/* 3. Why Choose Us */}
      <WhyChooseUs />

      {/* 4. Specialities / Services */}
      <ServicesSection />

      {/* 5. World Class Facility */}
      <GalleryStrip />

      {/* 6. Featured Doctors */}
      <FeaturedDoctors />

      {/* 7. Quick Appointment Booking */}
      <section className="relative section-padding overflow-hidden bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Quick Booking
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2 leading-tight">
              Book an Appointment{' '}
              <span className="text-primary-600">in 60 Seconds</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Our team confirms within 30 minutes · Available 7 days a week
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <AppointmentForm />
          </motion.div>
        </div>
      </section>

      {/* 9. Patient Testimonials */}
      <Testimonials />

      {/* 10. Blog / Health Tips */}
      <BlogPreview />

      {/* 11. Location */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Find Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-800 mt-2">Our Location</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto">Conveniently located in the heart of the city with ample parking.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-96 rounded-[5px] overflow-hidden shadow-xl border border-gray-100 ring-1 ring-primary-100"
            >
              <iframe
                src={siteData.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Child Clinic Location"
              />
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {[
                { icon: FiMapPin, label: 'Address',  value: siteData.contact.address,   href: null,                                    color: 'bg-blue-50 text-blue-600' },
                { icon: FiPhone,  label: 'Phone',    value: siteData.contact.phone,      href: `tel:${siteData.contact.phone}`,         color: 'bg-green-50 text-green-600' },
                { icon: FiMail,   label: 'Email',    value: siteData.contact.email,      href: `mailto:${siteData.contact.email}`,      color: 'bg-purple-50 text-purple-600' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="flex gap-4 p-4 bg-white rounded-[5px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${color} rounded-[5px] flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-800 text-sm mb-0.5">{label}</h4>
                    {href ? (
                      <a href={href} className="text-gray-600 text-sm hover:text-primary-600 transition-colors">{value}</a>
                    ) : (
                      <p className="text-gray-600 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/25 mt-2"
              >
                <FiCalendar /> Get Directions &amp; Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
