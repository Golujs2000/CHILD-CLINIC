import { motion } from 'framer-motion'
import { FiBookOpen, FiAward, FiActivity, FiGlobe, FiBriefcase } from 'react-icons/fi'

const QUALIFICATIONS = [
  { icon: FiBookOpen, label: 'M.B.B.S (PMCH PATNA)' },
  { icon: FiAward, label: 'D.C.H (PMCH PATNA)' },
  { icon: FiActivity, label: 'M.D Pediatric (PMCH PATNA)' },
  { icon: FiGlobe, label: 'P.G.P.N (BOSTON U.S.A)' },
]

const EXPERIENCE = [
  { 
    title: 'Ex Senior Resident', 
    hospital: 'I.G.I.M.S PATNA',
    color: 'bg-navy-900'
  },
  { 
    title: 'Ex Consultant', 
    hospital: 'Mahavir Vatsalya Hospital Patna',
    color: 'bg-navy-800'
  }
]

export default function DoctorHighlight() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left - Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 ring-1 ring-slate-200">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/child-clinic.firebasestorage.app/o/gallery%2F1777714740704_DR.%20ANSHUMAN01.webp?alt=media&token=27dc5999-2e10-4cd4-a081-9a71250a0a89" 
                alt="Dr. Anshuman" 
                className="w-full h-full object-cover aspect-[4/5] object-top"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-200/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary-50 border border-primary-100 text-primary-600 text-xs font-black tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-6">
              Expert Pediatrician & Neonatologist
            </span>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-navy-900 mb-6 leading-tight">
              Dr. Anshuman
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Dr. Anshuman is a highly qualified Pediatrician and Neonatologist with over 7 years of experience in saving and nurturing young lives. He is dedicated to providing evidence-based, compassionate care for children of all ages.
            </p>

            {/* Qualifications Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {QUALIFICATIONS.map((qual, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <qual.icon size={20} />
                  </div>
                  <span className="font-bold text-navy-900 text-sm">{qual.label}</span>
                </div>
              ))}
            </div>

            {/* Experience Cards */}
            <div className="space-y-4">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className={`${exp.color} p-6 rounded-2xl text-white shadow-xl flex items-center gap-6 group hover:scale-[1.02] transition-transform`}>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <FiBriefcase size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl leading-tight">{exp.title}</h4>
                    <p className="text-primary-300 font-bold text-sm tracking-wide mt-1 uppercase">{exp.hospital}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
