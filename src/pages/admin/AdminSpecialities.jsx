// ─────────────────────────────────────────────────────────────
// pages/admin/AdminSpecialities.jsx
// Specialities/departments management page.
// Each speciality has a name, slug, icon key, description,
// category, order, and optional treatment/cost fields.
// Slug is auto-generated from name on add; can be manually edited.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiStar,
  FiRefreshCw, FiArrowUp, FiArrowDown, FiActivity, FiEye, FiCheck,
  FiImage, FiVideo, FiUploadCloud,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase/config'
import {
  getSpecialities, addSpeciality, updateSpeciality, deleteSpeciality,
} from '../../services/specialities'
import { getDoctors } from '../../services/doctors'
import { getHospitalServices } from '../../services/hospitalServices'
import { slugify, compressImage } from '../../utils/helpers'

const CATEGORIES = [
  'General', 'Skin', 'Digestive', 'Respiratory', 'Neuro', 'Musculo', 
  'Women', 'Men', 'Chronic', 'Dental', 'Children', 'Allergy', 
  'Urology', 'Cardio', 'ENT', 'Eye', 'Ear', 'Endo', 'Behavioral', 'Diagnostics', 'Support'
]
const AVAILABILITY = ['By Appointment', 'OPD Hours', '24 × 7']

const EMPTY_FORM = {
  name: '', icon: '', category: '', available: '',
  description: '', features: '', recoveryTime: '', order: 0,
  doctorIds: [],
}

export default function AdminSpecialities() {
  const [specialities, setSpecialities] = useState([])
  const [doctors, setDoctors] = useState([])
  const [hospitalServices, setHospitalServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [viewItem, setViewItem] = useState(null)

  // Media state: [{ url, type:'image'|'video', name, storagePath }]
  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({}) // { filename: 0-100 }
  const fileInputRef = useRef(null)

  const fetchSpecialities = async () => {
    setLoading(true)
    try {
      const [specs, docs, svcs] = await Promise.all([
        getSpecialities(), getDoctors(), getHospitalServices(),
      ])
      setSpecialities(specs)
      setDoctors(docs)
      setHospitalServices(svcs)
    } catch {
      toast.error('Failed to load specialities')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSpecialities() }, [])

  const openAddModal = () => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, order: specialities.length + 1 })
    setMedia([])
    setUploadProgress({})
    setModalOpen(true)
  }

  const openEditModal = (spec) => {
    setEditingId(spec.id)
    setForm({
      name: spec.name || '',
      icon: spec.icon || '',
      category: spec.category || '',
      available: spec.available || '',
      description: spec.description || '',
      features: Array.isArray(spec.features) ? spec.features.join('\n') : spec.features || '',
      recoveryTime: spec.recoveryTime || '',
      order: spec.order ?? 0,
      doctorIds: Array.isArray(spec.doctorIds) ? spec.doctorIds : [],
    })

    setMedia(Array.isArray(spec.media) ? spec.media : [])
    setUploadProgress({})
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
    setMedia([])
    setUploadProgress({})
  }

  // ── Media upload ──────────────────────────────────────────────────────────
  const handleMediaSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    e.target.value = ''

    setUploading(true)
    const newItems = []

    for (const file of files) {
      const isVideo = file.type.startsWith('video/')
      const isImage = file.type.startsWith('image/')
      if (!isVideo && !isImage) {
        toast.error(`${file.name}: only images and videos allowed`)
        continue
      }

      const timestamp = Date.now()
      const safeName  = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const storagePath = `specialities/media/${timestamp}_${safeName}`
      const storageRef  = ref(storage, storagePath)

      try {
        // Compress images before upload
        const uploadFile = isImage ? await compressImage(file) : file

        await new Promise((resolve, reject) => {
          const task = uploadBytesResumable(storageRef, uploadFile)
          task.on(
            'state_changed',
            (snap) => {
              const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
              setUploadProgress((p) => ({ ...p, [safeName]: pct }))
            },
            reject,
            async () => {
              const url = await getDownloadURL(task.snapshot.ref)
              newItems.push({ url, type: isVideo ? 'video' : 'image', name: file.name, storagePath })
              setUploadProgress((p) => { const n = { ...p }; delete n[safeName]; return n })
              resolve()
            }
          )
        })
      } catch {
        toast.error(`Failed to upload ${file.name}`)
        setUploadProgress((p) => { const n = { ...p }; delete n[safeName]; return n })
      }
    }

    setMedia((prev) => [...prev, ...newItems])
    setUploading(false)
  }

  const handleRemoveMedia = async (idx) => {
    const item = media[idx]
    // Delete from Storage
    if (item.storagePath) {
      try {
        await deleteObject(ref(storage, item.storagePath))
      } catch {
        // ignore — file may already be gone
      }
    }
    setMedia((prev) => prev.filter((_, i) => i !== idx))
  }

  const toggleDoctorId = (id) => {
    setForm((prev) => ({
      ...prev,
      doctorIds: prev.doctorIds.includes(id)
        ? prev.doctorIds.filter((d) => d !== id)
        : [...prev.doctorIds, id],
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'order' ? Number(value) : value }))
  }

  // ── Treatment row handlers ────────────────────────────────────────────────


  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      const data = {
        ...form,
        slug: slugify(form.name),
        features: form.features
          ? form.features.split('\n').map((f) => f.trim()).filter(Boolean)
          : [],
        media,
      }
      if (editingId) {
        await updateSpeciality(editingId, data)
        toast.success('Speciality updated')
      } else {
        await addSpeciality(data)
        toast.success('Speciality added')
      }
      await fetchSpecialities()
      closeModal()
    } catch {
      toast.error('Failed to save speciality')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this speciality?')) return
    setDeletingId(id)
    try {
      await deleteSpeciality(id)
      setSpecialities((prev) => prev.filter((s) => s.id !== id))
      toast.success('Speciality deleted')
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const handleReorder = async (spec, direction) => {
    const idx = specialities.findIndex((s) => s.id === spec.id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= specialities.length) return
    const swapSpec = specialities[swapIdx]
    try {
      await Promise.all([
        updateSpeciality(spec.id, { ...spec, order: swapSpec.order }),
        updateSpeciality(swapSpec.id, { ...swapSpec, order: spec.order }),
      ])
      await fetchSpecialities()
    } catch {
      toast.error('Failed to reorder')
    }
  }

  // ── Category badge colors ─────────────────────────────────────────────────
  const catColor = {
    'Surgical':      'bg-blue-50 text-blue-700',
    'Women & Child': 'bg-pink-50 text-pink-700',
    'Emergency':     'bg-red-50 text-red-700',
    'Critical Care': 'bg-purple-50 text-purple-700',
    'Diagnostics':   'bg-teal-50 text-teal-700',
    'Support':       'bg-amber-50 text-amber-700',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Specialities</h1>
          <p className="text-gray-500 text-sm mt-0.5">{specialities.length} specialit{specialities.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchSpecialities} className="btn-secondary text-sm py-2 px-4">
            <FiRefreshCw size={14} />
          </button>
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4">
            <FiPlus size={16} /> Add Speciality
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-5 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : specialities.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiStar size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No specialities yet</p>
          <button onClick={openAddModal} className="btn-primary mt-4 text-sm py-2 px-4">
            <FiPlus size={15} /> Add First Speciality
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {specialities.map((spec, idx) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 flex items-start gap-4"
            >
              {/* Order Controls */}
              <div className="flex flex-col gap-1 shrink-0 pt-1">
                <button onClick={() => handleReorder(spec, 'up')} disabled={idx === 0}
                  className="text-gray-300 hover:text-gray-500 disabled:opacity-20">
                  <FiArrowUp size={15} />
                </button>
                <span className="text-xs text-gray-400 text-center font-mono">{spec.order}</span>
                <button onClick={() => handleReorder(spec, 'down')} disabled={idx === specialities.length - 1}
                  className="text-gray-300 hover:text-gray-500 disabled:opacity-20">
                  <FiArrowDown size={15} />
                </button>
              </div>

              {/* Icon */}
              {spec.icon && (
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-xl">
                  {spec.icon}
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-navy-800">{spec.name}</h3>
                  {spec.category && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[spec.category] || 'bg-gray-100 text-gray-600'}`}>
                      {spec.category}
                    </span>
                  )}
                  {spec.available && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${spec.available === '24 × 7' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {spec.available}
                    </span>
                  )}
                </div>
                {spec.description && (
                  <p className="text-sm text-gray-500 line-clamp-1">{spec.description}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                  {spec.recoveryTime && <span>Recovery: {spec.recoveryTime}</span>}

                  {Array.isArray(spec.doctorIds) && spec.doctorIds.length > 0 && (
                    <span className="text-teal-600 font-medium flex items-center gap-1">
                      👨‍⚕️ {spec.doctorIds.length} doctor{spec.doctorIds.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {(() => {
                    const linked = hospitalServices.filter(s =>
                      Array.isArray(s.relatedSpecialties) && s.relatedSpecialties.includes(spec.name)
                    )
                    return linked.length > 0 ? (
                      <span className="text-amber-600 font-medium flex items-center gap-1">
                        🏥 {linked.length} service{linked.length !== 1 ? 's' : ''}
                      </span>
                    ) : null
                  })()}
                </div>
                {/* Linked doctor avatars */}
                {Array.isArray(spec.doctorIds) && spec.doctorIds.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    {spec.doctorIds.slice(0, 5).map((did) => {
                      const doc = doctors.find(d => d.id === did)
                      if (!doc) return null
                      return doc.image ? (
                        <img key={did} src={doc.image} alt={doc.name} title={doc.name}
                          className="w-6 h-6 rounded-full object-cover border border-white shadow-sm" />
                      ) : (
                        <div key={did} title={doc.name}
                          className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center border border-white shadow-sm">
                          <span className="text-primary-700 text-[9px] font-bold">{doc.name?.[0]}</span>
                        </div>
                      )
                    })}
                    {spec.doctorIds.length > 5 && (
                      <span className="text-xs text-gray-400 ml-1">+{spec.doctorIds.length - 5}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setViewItem(spec)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors text-xs font-semibold">
                  <FiEye size={13} /> View
                </button>
                <button onClick={() => openEditModal(spec)}
                  className="p-2 rounded-lg text-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors" title="Edit">
                  <FiEdit2 size={15} />
                </button>
                <button onClick={() => handleDelete(spec.id)} disabled={deletingId === spec.id}
                  className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50" title="Delete">
                  <FiTrash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                  <h2 className="text-lg font-bold text-navy-800">
                    {editingId ? 'Edit Speciality' : 'Add Speciality'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                  {/* Row 1: Name + Icon */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        className="input-field" placeholder="General Surgery" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                      <input name="icon" value={form.icon} onChange={handleChange}
                        className="input-field text-2xl" placeholder="🔪" />
                    </div>
                  </div>

                  {/* Row 2: Category + Availability + Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select name="category" value={form.category} onChange={handleChange} className="input-field">
                        <option value="">Select…</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <select name="available" value={form.available} onChange={handleChange} className="input-field">
                        <option value="">Select…</option>
                        {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input name="order" type="number" value={form.order} onChange={handleChange}
                        className="input-field" min={0} />
                    </div>
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Time</label>
                      <input name="recoveryTime" value={form.recoveryTime} onChange={handleChange}
                        className="input-field" placeholder="1 – 3 days" />
                    </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange}
                      rows={2} className="input-field resize-none"
                      placeholder="Brief overview of this speciality…" />
                  </div>

                  {/* Key Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Features <span className="text-gray-400 font-normal">(one per line)</span>
                    </label>
                    <textarea name="features" value={form.features} onChange={handleChange}
                      rows={3} className="input-field resize-none font-mono text-sm"
                      placeholder={"Minimally invasive\n24/7 care\nSame-day discharge"} />
                  </div>

                  {/* ── Media (Images & Videos) ──────────────────────────── */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Photos &amp; Videos
                        <span className="text-gray-400 font-normal ml-1">({media.length} file{media.length !== 1 ? 's' : ''})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors font-medium disabled:opacity-50"
                      >
                        <FiUploadCloud size={13} />
                        {uploading ? 'Uploading…' : 'Add Files'}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleMediaSelect}
                      />
                    </div>

                    {/* Upload progress bars */}
                    {Object.entries(uploadProgress).map(([name, pct]) => (
                      <div key={name} className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-0.5">
                          <span className="truncate max-w-xs">{name}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all duration-200"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Media grid */}
                    {media.length === 0 && Object.keys(uploadProgress).length === 0 ? (
                      <div
                        className="border-2 border-dashed border-gray-100 rounded-xl p-6 text-center text-sm text-gray-400 cursor-pointer hover:border-primary-300 hover:text-primary-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FiUploadCloud size={24} className="mx-auto mb-2 opacity-50" />
                        Click to upload images or videos
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {media.map((item, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
                            {item.type === 'video' ? (
                              <video
                                src={item.url}
                                className="w-full h-full object-cover"
                                muted
                                preload="metadata"
                              />
                            ) : (
                              <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {/* Type badge */}
                            <div className="absolute bottom-1 left-1 bg-black/60 text-white rounded px-1.5 py-0.5 flex items-center gap-1">
                              {item.type === 'video'
                                ? <FiVideo size={10} />
                                : <FiImage size={10} />
                              }
                              <span className="text-[9px] font-medium uppercase">{item.type}</span>
                            </div>
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveMedia(idx)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              <FiX size={12} />
                            </button>
                          </div>
                        ))}
                        {/* Add more tile */}
                        <div
                          className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors text-gray-400 hover:text-primary-500"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FiPlus size={20} />
                          <span className="text-[10px] mt-1 font-medium">Add</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Linked Doctors ───────────────────────────────────── */}
                  {doctors.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Linked Doctors
                        <span className="text-gray-400 font-normal ml-1 text-xs">(select doctors who work in this speciality)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {doctors.map((doc) => {
                          const checked = form.doctorIds.includes(doc.id)
                          return (
                            <button
                              key={doc.id}
                              type="button"
                              onClick={() => toggleDoctorId(doc.id)}
                              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                                checked
                                  ? 'bg-teal-600 text-white border-teal-600'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300 hover:text-teal-600'
                              }`}
                            >
                              {doc.image ? (
                                <img src={doc.image} alt={doc.name} className="w-5 h-5 rounded-full object-cover" />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-[9px] font-bold text-gray-500">{doc.name?.[0]}</span>
                                </div>
                              )}
                              {doc.name}
                              {checked && <FiX size={11} />}
                            </button>
                          )
                        })}
                      </div>
                      {form.doctorIds.length > 0 && (
                        <p className="text-xs text-teal-600 mt-1 font-medium">{form.doctorIds.length} doctor{form.doctorIds.length !== 1 ? 's' : ''} linked</p>
                      )}
                    </div>
                  )}

                  {/* ── Linked Hospital Services (read-only info) ─────────── */}
                  {hospitalServices.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Linked Hospital Services
                        <span className="text-gray-400 font-normal ml-1 text-xs">(services that reference this speciality)</span>
                      </label>
                      {(() => {
                        const linked = hospitalServices.filter(s =>
                          Array.isArray(s.relatedSpecialties) && s.relatedSpecialties.includes(form.name)
                        )
                        return linked.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {linked.map(s => (
                              <span key={s.id} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                                {s.icon && <span>{s.icon}</span>} {s.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">No hospital services linked yet. Link from Hospital Services page.</p>
                        )
                      })()}
                    </div>
                  )}



                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center py-2.5">Cancel</button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60">
                      {saving ? 'Saving...' : editingId ? 'Update' : 'Add Speciality'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── View Modal ── */}
      <AnimatePresence>
        {viewItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setViewItem(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{viewItem.icon || '🏥'}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        {viewItem.category && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">{viewItem.category}</span>}
                        {viewItem.available && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">{viewItem.available}</span>}
                      </div>
                      <h2 className="font-heading font-bold text-navy-800 text-xl">{viewItem.name}</h2>
                    </div>
                  </div>
                  <button onClick={() => setViewItem(null)} className="text-gray-400 hover:text-gray-600 transition-colors mt-1">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="px-6 py-5 space-y-5">
                  {/* Stats */}
                  <div className="flex flex-wrap gap-3">
                    {viewItem.recoveryTime && (
                      <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium">
                        Recovery: {viewItem.recoveryTime}
                      </div>
                    )}
                    {viewItem.order !== undefined && (
                      <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-lg text-sm font-medium">
                        Order: {viewItem.order}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {viewItem.description && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{viewItem.description}</p>
                    </div>
                  )}

                  {/* Features */}
                  {viewItem.features?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Key Features</p>
                      <div className="grid grid-cols-2 gap-2">
                        {viewItem.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-sm text-gray-700">
                            <FiCheck size={13} className="text-green-600 flex-shrink-0" />{f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Treatments */}
                  {viewItem.treatments?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Treatments ({viewItem.treatments.length})
                      </p>
                      <div className="space-y-1.5">
                        {viewItem.treatments.map((t, i) => (
                          <div key={i} className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2">
                            <span className="text-sm font-medium text-navy-800">{t.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              {t.duration && <span className="text-xs text-gray-400">{t.duration}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Media */}
                  {viewItem.media?.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Photos &amp; Videos ({viewItem.media.length})
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {viewItem.media.map((item, i) => (
                          <div key={i} className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square">
                            {item.type === 'video' ? (
                              <video src={item.url} className="w-full h-full object-cover" controls muted />
                            ) : (
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute bottom-1 left-1 bg-black/60 text-white rounded px-1.5 py-0.5 flex items-center gap-1">
                              {item.type === 'video' ? <FiVideo size={10} /> : <FiImage size={10} />}
                              <span className="text-[9px] font-medium uppercase">{item.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Slug */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">URL Slug</p>
                    <p className="text-sm font-mono text-gray-500">/services/{viewItem.slug}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                  <button onClick={() => { setViewItem(null); openEditModal(viewItem) }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors text-sm font-semibold">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button onClick={() => setViewItem(null)}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors text-sm font-semibold">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
