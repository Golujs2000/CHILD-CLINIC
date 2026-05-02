// ─────────────────────────────────────────────────────────────
// pages/Doctors.jsx
// Doctor listing page with live search by name and filter
// by specialty. Fetches all doctors from Firestore via useDoctors.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useDoctors } from '../hooks/useDoctors'
import DoctorCard from '../components/DoctorCard'
import { siteData } from '../data/siteData'

export default function Doctors() {
  const [specialty, setSpecialty] = useState('')
  const [search, setSearch] = useState('')
  const { doctors, loading } = useDoctors({ specialty })

  const filtered = doctors.filter((d) =>
    !search || d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <SEO
        title="Our Doctors"
        description="Meet the Homoeopathic Consultant at Care Homeopathic Clinic, Saharsa — Dr. Rajesh Kumar Ranjan (B.H.M.S.). View profiles and book appointments online."
        keywords={['doctors in Saharsa', 'best surgeon Saharsa', 'gynaecologist Saharsa', 'specialist doctor Bihar', 'Dr Amit Anand', 'Dr Kumari Sneha']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Doctors at Care Homeopathic Clinic',
          description: 'Meet Dr. Rajesh Kumar Ranjan and the team at Care Homeopathic Clinic, Saharsa, Bihar.',
          url: `${siteData.url}/doctors`,
        }}
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Expert Doctors</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            80+ highly qualified specialists committed to your health and recovery.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container-max px-4 md:px-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor name…"
              className="input-field pl-11"
            />
          </div>

          {/* Specialty filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="input-field w-auto min-w-[200px]"
            >
              <option value="">All Specialities</option>
              {siteData.departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {(search || specialty) && (
            <button
              onClick={() => { setSearch(''); setSpecialty('') }}
              className="text-sm text-primary-600 font-medium hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Doctors grid */}
      <section className="section-padding bg-section-gradient">
        <div className="container-max">
          {loading ? (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No doctors found matching your search.</p>
              <button onClick={() => { setSearch(''); setSpecialty('') }} className="btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.06 }}
                >
                  <DoctorCard doc={doc} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
