// ─────────────────────────────────────────────────────────────
// components/home/StatsCounter.jsx
// Animated number counters for key hospital stats.
// Each counter uses requestAnimationFrame with a cubic-ease-out
// curve and only starts when the element scrolls into view
// (via framer-motion's useInView with once:true).
// Stats are sourced from siteData.stats.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiUsers, FiHeart, FiShield, FiAward } from 'react-icons/fi'
import { siteData } from '../../data/siteData'

const statIcons = {
  'Happy Families': FiUsers,
  'Newborns Cared For': FiHeart,
  'Vaccinations Done': FiShield,
  'Years Experience': FiAward
}

function Counter({ value, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="bg-gradient-to-r from-navy-900 to-navy-800 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10 text-center"
        >
          {siteData.stats.map(({ label, value, suffix }, i) => {
            const Icon = statIcons[label] || FiHeart
            return (
              <div key={label} className="px-4 group">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <Icon size={28} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-2">
                  <Counter value={value} suffix={suffix} />
                </h3>
                <p className="text-primary-300 font-medium text-sm lg:text-base uppercase tracking-widest">{label}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
