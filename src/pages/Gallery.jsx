// ─────────────────────────────────────────────────────────────
// pages/Gallery.jsx
// Full gallery page with folder-based filtering, lazy-loaded
// image grid, and a full-screen lightbox with keyboard navigation.
// Folders are fetched from Firestore; "All" tab shows every image.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi'
import SEO from '../components/SEO'
import { useGallery } from '../hooks/useGallery'
import { getFolders } from '../services/gallery'

export default function Gallery() {
  const [folders, setFolders] = useState([])
  const [activeFolderId, setActiveFolderId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const { images, loading } = useGallery(activeFolderId)

  // Common tags found in image names (can be expanded)
  const TAGS = ['All', 'Doctor', 'Clinic', 'Happy Patient', 'Reception', 'Cabin', 'OT', 'Ward']

  useEffect(() => {
    getFolders().then(data => {
      const sorted = [...data].sort((a, b) => {
        const aName = a.name?.toLowerCase() || '';
        const bName = b.name?.toLowerCase() || '';
        const aIsDoc = aName.includes('doctor') || aName.includes('dr');
        const bIsDoc = bName.includes('doctor') || bName.includes('dr');
        if (aIsDoc && !bIsDoc) return -1;
        if (!aIsDoc && bIsDoc) return 1;
        return (a.order ?? 999) - (b.order ?? 999);
      });
      setFolders(sorted);
    }).catch(() => {})
  }, [])

  // Prioritize "Doctor" category images in the "All" view AND apply search filter
  const displayImages = useMemo(() => {
    if (!images) return []

    let result = [...images]

    // 1. Apply Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(img => {
        const title = img.title?.toLowerCase() || ''
        const folder = folders.find(f => f.id === img.folderId)
        const folderName = folder?.name?.toLowerCase() || ''
        return title.includes(q) || folderName.includes(q)
      })
    }

    // 2. Apply Tag Filter (Subfilter)
    if (selectedTag !== 'All') {
      const t = selectedTag.toLowerCase()
      result = result.filter(img => {
        const title = img.title?.toLowerCase() || ''
        const folder = folders.find(f => f.id === img.folderId)
        const folderName = folder?.name?.toLowerCase() || ''

        // Check title match
        const matchesTitle = (t === 'doctor')
          ? (title.includes('doctor') || title.includes('dr') || title.includes('staff'))
          : (t === 'happy patient')
            ? (title.includes('happy') || title.includes('patient') || title.includes('feedback'))
            : title.includes(t)

        // Check folder name match
        const matchesFolder = folderName.includes(t) || (t === 'doctor' && (folderName.includes('dr') || folderName.includes('staff')))

        return matchesTitle || matchesFolder
      })
    }

    // 3. Apply Doctor Priority (only if no specific folder is selected)
    if (activeFolderId === '') {
      const doctorFolder = folders.find(f => {
        const name = f.name?.toLowerCase() || '';
        return name.includes('doctor') || name.includes('dr');
      })
      
      if (doctorFolder) {
        result.sort((a, b) => {
          const aIsDoctor = a.folderId === doctorFolder.id
          const bIsDoctor = b.folderId === doctorFolder.id
          
          if (aIsDoctor && !bIsDoctor) return -1
          if (!aIsDoctor && bIsDoctor) return 1
          return (a.order ?? 999) - (b.order ?? 999)
        })
      }
    }

    return result
  }, [images, folders, activeFolderId, searchQuery])

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((i) => (i === 0 ? displayImages.length - 1 : i - 1))
  const next = () => setLightbox((i) => (i === displayImages.length - 1 ? 0 : i + 1))

  return (
    <>
      <SEO
        title="Gallery"
        description="Explore Child Clinic's welcoming facility, diagnostic equipment, and clinic environment through our photo gallery."
      />

      {/* Hero */}
      <section className="page-hero text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-max">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            A visual tour of our world-class facilities and compassionate team.
          </p>
        </motion.div>
      </section>

      {/* Filter tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] z-30 shadow-sm">
        <div className="container-max px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          </div>

          {/* Subfilter (Tags based on Name) */}
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <span className="text-gray-400 text-[11px] font-bold tracking-widest uppercase whitespace-nowrap">Filter by Name:</span>
            <div className="flex gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedTag === tag
                      ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-primary-400 hover:text-primary-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : displayImages.length === 0 ? (
            <div className="text-center py-20">
              <FiImage className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-lg">No images here yet.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {displayImages.map((img, i) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                    onClick={() => openLightbox(i)}
                  >
                    {img.image ? (
                      <img
                        src={img.image}
                        alt={img.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        <FiImage className="w-10 h-10 text-primary-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-white font-semibold text-sm">{img.title}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={closeLightbox}
            >
              <FiX className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {displayImages[lightbox]?.image ? (
                <img
                  src={displayImages[lightbox].image}
                  alt={displayImages[lightbox].title}
                  className="w-full h-full object-contain rounded-xl max-h-[80vh]"
                />
              ) : (
                <div className="w-full h-80 bg-gray-800 rounded-xl flex items-center justify-center">
                  <FiImage className="w-20 h-20 text-gray-600" />
                </div>
              )}
              <p className="text-white text-center mt-4 font-medium">{displayImages[lightbox]?.title}</p>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            <p className="absolute bottom-4 text-white/50 text-sm">
              {lightbox + 1} / {displayImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
