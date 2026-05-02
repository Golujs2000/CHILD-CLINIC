import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiImage, FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'
import { getGalleryByFolderName } from '../../services/gallery'

const FACILITIES = [
  { icon: '👶', title: 'Advanced NICU', desc: 'Specialized intensive care for newborns requiring extra medical attention.' },
  { icon: '💡', title: 'Phototherapy', desc: 'Modern LED phototherapy for effective treatment of newborn jaundice.' },
  { icon: '🌬️', title: 'Nebulization & Oxygen', desc: 'Immediate respiratory support for asthma and breathing difficulties.' },
  { icon: '💉', title: 'Vaccination Center', desc: 'All essential and optional pediatric vaccines as per IAP schedule.' },
  { icon: '🏥', title: 'Emergency Care', desc: '24/7 pediatric emergency response and stabilization services.' },
  { icon: '📈', title: 'Growth Monitoring', desc: 'Comprehensive tracking of physical and developmental milestones.' },
]

// ── Lightbox Component ──────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }) {
  const [current, setCurrent] = useState(index)
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  const img = images[current]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-10 border border-white/10">
          <FiX className="w-6 h-6" />
        </button>
        {images.length > 1 && (
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-6 w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all z-10 border border-white/5">
            <FiChevronLeft className="w-8 h-8" />
          </button>
        )}
        <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="max-w-6xl max-h-[90vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <img src={img.image} alt={img.title || 'Facility'} className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" />
          <div className="mt-6 text-center">
            {img.title && <p className="text-white font-bold text-lg tracking-wide">{img.title.replace(/[-_]/g, ' ')}</p>}
            <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{current + 1} of {images.length}</p>
          </div>
        </motion.div>
        {images.length > 1 && (
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-6 w-14 h-14 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all z-10 border border-white/5">
            <FiChevronRight className="w-8 h-8" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

const cleanTitle = (title = '') =>
  title
    .replace(/\(.*?\)/g, '') // Remove (01), (copy), etc.
    .replace(/copy|replica/gi, '') // Remove "copy" or "replica"
    .replace(/[-_\s]+\d+$/, '') // Remove trailing -01, _01, 1
    .replace(/\d+$/, '') // Remove any trailing digits
    .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
    .trim()
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Clinic Space'

export default function FacilitiesSection() {
  const [images, setImages] = useState([])
  const [galleryLoading, setGalleryLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let imgs = await getGalleryByFolderName('Infrastructure')
        if (imgs.length === 0) imgs = await getGalleryByFolderName('Clinic')
        setImages(imgs.slice(0, 30)) // Show even more images as requested
      } catch (err) {
        console.error('Facility gallery fetch error:', err)
      } finally {
        setGalleryLoading(false)
      }
    }
    fetchImages()
  }, [])

  return (
    <section className="section-padding bg-slate-50" id="facilities">
      <div className="container-max">
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
              Our Infrastructure
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-navy-900 mt-2 mb-6 tracking-tight">
              Hospital <span className="text-primary-600">Facilities</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Equipped with modern medical technology and specialized units to ensure the highest standard of pediatric care.
            </p>
          </motion.div>
        </div>

        {/* Facility Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {FACILITIES.map((fac, i) => (
            <motion.div
              key={fac.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-8 rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:border-primary-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {fac.icon}
              </div>
              <h3 className="text-xl font-black text-navy-900 mb-3">{fac.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {fac.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Redesigned Bento Gallery ── */}
        <div className="pt-16 border-t border-gray-200/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <h3 className="text-3xl font-black text-navy-900">Modern Clinic Environment</h3>
              <p className="text-gray-500 text-base mt-2">A sterile, welcoming space optimized for focused pediatric care.</p>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all group">
              View Full Gallery <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {galleryLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`bg-white rounded-2xl animate-pulse ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
              {images.map((img, i) => {
                // Create a varied bento layout
                const isLarge = i % 7 === 0;
                const isTall = i % 7 === 3;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 5) * 0.05 }}
                    className={`relative group cursor-pointer overflow-hidden rounded-2xl border-4 border-white shadow-sm
                      ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                      ${isTall ? 'md:row-span-2' : ''}
                    `}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img 
                      src={img.image} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 border border-white/30 mb-3">
                        <FiMaximize2 size={18} />
                      </div>
                      <p className="text-white text-xs font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {cleanTitle(img.title)}
                      </p>
                    </div>

                    {/* Bottom Label (Visible on mobile/non-hover) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:group-hover:opacity-0 transition-opacity duration-300">
                      <p className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">
                        {cleanTitle(img.title)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  )
}
