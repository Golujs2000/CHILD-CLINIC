import { motion } from 'framer-motion'
import { FiShield, FiHeart, FiUserCheck, FiClock, FiStar, FiCheckCircle } from 'react-icons/fi'

const REASONS = [
  {
    icon: FiUserCheck,
    title: 'Expert Pediatrician',
    desc: 'Led by Dr. Anshuman (M.D. Pediatrics, P.G.P.N. Boston), providing evidence-based medical care.',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    icon: FiShield,
    title: 'Safe & Gentle Care',
    desc: 'Using only the safest, most effective treatments tailored specifically for growing children.',
    color: 'bg-primary-500',
    lightColor: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  {
    icon: FiClock,
    title: '24/7 Emergency Support',
    desc: 'Round-the-clock emergency services for critical pediatric and neonatal conditions.',
    color: 'bg-teal-500',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
  {
    icon: FiHeart,
    title: 'Compassionate Care',
    desc: 'A child-friendly clinic designed to make medical visits stress-free and positive for families.',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  }
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 border-8 border-primary-500 rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border-[16px] border-blue-500 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container-max relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-black tracking-widest uppercase mb-6 shadow-sm">
              <FiCheckCircle className="animate-bounce" /> Why Parents Trust Us
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-navy-900 leading-tight mb-6 tracking-tight">
              Dedicated to Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
                Child's Wellbeing
              </span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
              We combine years of international clinical expertise with a deep commitment to compassionate, evidence-based pediatric care.
            </p>
          </motion.div>
        </div>

        {/* Reason Cards - Modern Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.1)] transition-all duration-500 flex flex-col items-center text-center group-hover:-translate-y-2">
                {/* Icon with glow effect */}
                <div className={`relative w-20 h-20 rounded-3xl ${reason.lightColor} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <div className={`absolute inset-0 rounded-3xl ${reason.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                  <reason.icon size={36} className={`${reason.textColor} relative z-10`} />
                </div>
                
                <h3 className="text-xl font-black text-navy-900 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {reason.desc}
                </p>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 ${reason.color} rounded-t-full group-hover:w-1/3 transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-10 py-10 border-t border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
              <FiCheckCircle size={32} />
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-navy-900 leading-none">1000+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Happy Families Cared For</p>
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block" />
          <div className="text-center md:text-left flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
              <FiStar size={32} />
            </div>
            <div>
              <p className="text-2xl font-black text-navy-900 leading-none">99.8%</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Recovery Success Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
