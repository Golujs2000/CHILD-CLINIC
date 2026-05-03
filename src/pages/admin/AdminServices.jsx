// ─────────────────────────────────────────────────────────────
// pages/admin/AdminServices.jsx
// Hospital services management page (e.g. "24/7 Emergency",
// "Ambulance"). These are general offerings distinct from
// medical specialities. Each has a name, icon, description,
// and display order.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiPlus, FiEdit2, FiTrash2, FiX,
  FiRefreshCw, FiArrowUp, FiArrowDown, FiPlusSquare,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import {
  getHospitalServices, addHospitalService, updateHospitalService, deleteHospitalService,
} from '../../services/hospitalServices'
import { getSpecialities } from '../../services/specialities'

// Hospital services are facility/department-level (ICU, OT, Lab, etc.)
// They are distinct from Specialities (doctor expertise domains)

const SERVICE_CATEGORIES = ['Infrastructure', 'Department', 'Diagnostic', 'Emergency', 'Support']
const AVAILABILITY = ['By Appointment', 'OPD Hours', '24 × 7']

const EMPTY_FORM = {
  name: '', icon: '', category: '', available: '',
  description: '', relatedSpecialties: [], order: 0,
}

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [specialities, setSpecialities] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [svc, specs] = await Promise.all([getHospitalServices(), getSpecialities()])
      setServices(svc)
      setSpecialities(specs)
    } catch (err) {
      console.error('Admin fetchAll error:', err)
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const openAddModal = () => {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, order: services.length + 1 })
    setModalOpen(true)
  }

  const openEditModal = (svc) => {
    setEditingId(svc.id)
    setForm({
      name: svc.name || '',
      icon: svc.icon || '',
      category: svc.category || '',
      available: svc.available || '',
      description: svc.description || '',
      relatedSpecialties: Array.isArray(svc.relatedSpecialties) ? svc.relatedSpecialties : [],
      order: svc.order ?? 0,
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'order' ? Number(value) : value }))
  }

  const toggleSpecialty = (specName) => {
    setForm((prev) => ({
      ...prev,
      relatedSpecialties: prev.relatedSpecialties.includes(specName)
        ? prev.relatedSpecialties.filter((s) => s !== specName)
        : [...prev.relatedSpecialties, specName],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name) { toast.error('Name is required'); return }
    setSaving(true)
    try {
      if (editingId) {
        await updateHospitalService(editingId, form)
        toast.success('Service updated')
      } else {
        await addHospitalService(form)
        toast.success('Service added')
      }
      await fetchAll()
      closeModal()
    } catch {
      toast.error('Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this hospital service?')) return
    setDeletingId(id)
    try {
      await deleteHospitalService(id)
      setServices((prev) => prev.filter((s) => s.id !== id))
      toast.success('Service deleted')
    } catch {
      toast.error('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const handleReorder = async (svc, direction) => {
    const idx = services.findIndex((s) => s.id === svc.id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= services.length) return
    const swapSvc = services[swapIdx]
    try {
      await Promise.all([
        updateHospitalService(svc.id, { ...svc, order: swapSvc.order }),
        updateHospitalService(swapSvc.id, { ...swapSvc, order: svc.order }),
      ])
      await fetchAll()
    } catch {
      toast.error('Failed to reorder')
    }
  }

  const catColor = {
    'Infrastructure': 'bg-blue-50 text-blue-700',
    'Department':     'bg-indigo-50 text-indigo-700',
    'Diagnostic':     'bg-teal-50 text-teal-700',
    'Emergency':      'bg-red-50 text-red-700',
    'Support':        'bg-amber-50 text-amber-700',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Hospital Services</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {services.length} service{services.length !== 1 ? 's' : ''} — facility-level infrastructure &amp; departments
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll} className="btn-secondary text-sm py-2 px-4">
            <FiRefreshCw size={14} />
          </button>
          <button onClick={openAddModal} className="btn-primary text-sm py-2 px-4">
            <FiPlus size={16} /> Add Service
          </button>
        </div>
      </div>

      {/* Explainer banner */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
        <strong>Hospital Services</strong> are facility-level offerings (ICU, OT, Blood Bank, Lab).
        They differ from <strong>Specialities</strong> (doctor expertise like Cardiology, Ortho) and
        <strong> Treatments</strong> (specific procedures under a speciality).
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-5 bg-gray-100 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 text-gray-400">
          <FiPlusSquare size={36} className="mb-3 opacity-40" />
          <p className="font-medium">No hospital services yet</p>
          <p className="text-sm mt-1 text-center max-w-xs">
            Add services like Emergency, ICU, Blood Bank, Operation Theatre…
          </p>
          <button onClick={openAddModal} className="btn-primary mt-4 text-sm py-2 px-4">
            <FiPlus size={15} /> Add First Service
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4 flex items-start gap-4"
            >
              {/* Order Controls */}
              <div className="flex flex-col gap-1 shrink-0 pt-1">
                <button onClick={() => handleReorder(svc, 'up')} disabled={idx === 0}
                  className="text-gray-300 hover:text-gray-500 disabled:opacity-20">
                  <FiArrowUp size={15} />
                </button>
                <span className="text-xs text-gray-400 text-center font-mono">{svc.order}</span>
                <button onClick={() => handleReorder(svc, 'down')} disabled={idx === services.length - 1}
                  className="text-gray-300 hover:text-gray-500 disabled:opacity-20">
                  <FiArrowDown size={15} />
                </button>
              </div>

              {/* Icon */}
              {svc.icon && (
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-xl">
                  {svc.icon}
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-navy-800">{svc.name}</h3>
                  {svc.category && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor[svc.category] || 'bg-gray-100 text-gray-600'}`}>
                      {svc.category}
                    </span>
                  )}
                  {svc.available && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${svc.available === '24 × 7' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {svc.available}
                    </span>
                  )}
                </div>
                {svc.description && (
                  <p className="text-sm text-gray-500 line-clamp-1">{svc.description}</p>
                )}
                {Array.isArray(svc.relatedSpecialties) && svc.relatedSpecialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {svc.relatedSpecialties.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-primary-50 text-primary-600 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEditModal(svc)}
                  className="p-2 rounded-lg text-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors" title="Edit">
                  <FiEdit2 size={15} />
                </button>
                <button onClick={() => handleDelete(svc.id)} disabled={deletingId === svc.id}
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
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                  <h2 className="text-lg font-bold text-navy-800">
                    {editingId ? 'Edit Hospital Service' : 'Add Hospital Service'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiX size={22} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                  {/* Name + Icon */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required
                        className="input-field" placeholder="e.g. Operation Theatre, Blood Bank" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                      <input name="icon" value={form.icon} onChange={handleChange}
                        className="input-field text-2xl" placeholder="🏥" />
                    </div>
                  </div>

                  {/* Category + Availability + Order */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select name="category" value={form.category} onChange={handleChange} className="input-field">
                        <option value="">Select…</option>
                        {SERVICE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
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

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange}
                      rows={2} className="input-field resize-none"
                      placeholder="Brief overview of this hospital service…" />
                  </div>

                  {/* Related Specialities */}
                  {specialities.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Related Specialities
                        <span className="text-gray-400 font-normal ml-1 text-xs">(which doctor specialities use this service)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {specialities.map((spec) => {
                          const checked = form.relatedSpecialties.includes(spec.name)
                          return (
                            <button
                              key={spec.id}
                              type="button"
                              onClick={() => toggleSpecialty(spec.name)}
                              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                                checked
                                  ? 'bg-primary-600 text-white border-primary-600'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300 hover:text-primary-600'
                              }`}
                            >
                              {spec.icon && <span>{spec.icon}</span>}
                              {spec.name}
                              {checked && <FiX size={11} />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1 justify-center py-2.5">Cancel</button>
                    <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-2.5 disabled:opacity-60">
                      {saving ? 'Saving...' : editingId ? 'Update' : 'Add Service'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
