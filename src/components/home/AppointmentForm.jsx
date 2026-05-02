import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import {
  FiUser, FiPhone, FiMail, FiMapPin, FiMessageSquare,
  FiActivity, FiClock, FiCheckCircle, FiCalendar, FiAlertCircle,
} from 'react-icons/fi'
import { createAppointment } from '../../services/appointments'
import { checkHoneypot, checkRateLimit, setRateLimit, sanitizeInput } from '../../utils/formProtection'
import { siteData } from '../../data/siteData'
import { generateBookingId } from '../../utils/helpers'
import { useSpecialities } from '../../hooks/useSpecialities'

const TIME_SLOTS = [
  { label: '9:00 AM',  period: 'morning' },
  { label: '10:00 AM', period: 'morning' },
  { label: '11:00 AM', period: 'morning' },
  { label: '12:00 PM', period: 'afternoon' },
  { label: '2:00 PM',  period: 'afternoon' },
  { label: '3:00 PM',  period: 'afternoon' },
  { label: '4:00 PM',  period: 'afternoon' },
  { label: '5:00 PM',  period: 'evening' },
  { label: '6:00 PM',  period: 'evening' },
  { label: '7:00 PM',  period: 'evening' },
]

const PERIOD_LABELS = { morning: '🌤 Morning', afternoon: '☀️ Afternoon', evening: '🌆 Evening' }

const SEX_OPTIONS = ['Male', 'Female', 'Other']

const initialState = {
  name: '', parentName: '', phone: '', email: '', age: '', sex: '',
  address: '', department: '', date: null,
  timeSlot: '', mode: 'Offline', message: '', _hp: '',
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}{required && <span className="text-primary-500 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inp = (err) =>
  `w-full px-4 py-2.5 rounded-xl border-2 text-sm font-medium text-gray-800 bg-white outline-none transition-all placeholder:text-gray-300 placeholder:font-normal
  ${err
    ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
    : 'border-gray-100 hover:border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
  }`

const isObgynDept = (dept = '') => /gynaec|gynec|obstet|women|maternity/i.test(dept)

export default function AppointmentForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { specialities } = useSpecialities()
  const departments = specialities.length > 0
    ? specialities.map((s) => s.name)
    : siteData.departments

  const set = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleChange = (e) => set(e.target.name, e.target.value)

  const validate = () => {
    const e = {}
    if (!form.name.trim())                            e.name       = 'Name is required'
    if (!form.phone.trim())                           e.phone      = 'Phone is required'
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit number'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email   = 'Enter a valid email'
    if (!form.age)                                    e.age        = 'Age is required'
    if (!form.sex)                                    e.sex        = 'Please select'
    if (!form.department)                             e.department = 'Select a department'
    if (!form.date)                                   e.date       = 'Pick a date'
    if (!form.timeSlot)                               e.timeSlot   = 'Pick a time slot'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!checkHoneypot(form._hp)) return
    if (!checkRateLimit('appointment')) { toast.error('Please wait before submitting again.'); return }
    if (!validate()) { toast.error('Please fill all required fields.'); return }

    setLoading(true)
    try {
      const bookingId = generateBookingId()
      await createAppointment({
        bookingId,
        name:       sanitizeInput(form.name),
        parentName: sanitizeInput(form.parentName),
        phone:      form.phone.trim(),
        email:      form.email.trim(),
        age:        form.age,
        sex:        form.sex,
        address:    sanitizeInput(form.address),
        department: form.department,
        date:       form.date?.toISOString(),
        timeSlot:   form.timeSlot,
        mode:       form.mode,
        message:    sanitizeInput(form.message),
      })
      setRateLimit('appointment')
      toast.success('Appointment booked!')
      navigate('/appointment-success', {
        state: { bookingId, name: form.name, parentName: form.parentName, department: form.department, date: form.date, timeSlot: form.timeSlot, mode: form.mode },
      })
      setForm(initialState)
    } catch {
      toast.error('Failed to book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const obgyn = isObgynDept(form.department)

  const grouped = TIME_SLOTS.reduce((acc, s) => {
    acc[s.period] = acc[s.period] || []
    acc[s.period].push(s.label)
    return acc
  }, {})

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type="text" name="_hp" value={form._hp} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-card">

        {/* ── LEFT PANEL: Patient Details ──────────────────────────── */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 space-y-5">
          <div className="pb-4 border-b border-gray-100">
            <h3 className="font-heading font-bold text-navy-800 text-xl">Patient Information</h3>
            <p className="text-gray-400 text-sm mt-0.5">Fields marked <span className="text-primary-500 font-bold">*</span> are required</p>
          </div>

          {/* Name and Parent Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" required error={errors.name}>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Patient's full name"
                  className={`${inp(errors.name)} pl-10`} />
              </div>
            </Field>

            <Field label="Parent's Name (Optional)" error={null}>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input name="parentName" value={form.parentName} onChange={handleChange}
                  placeholder="For minors"
                  className={`${inp(false)} pl-10`} />
              </div>
            </Field>
          </div>

          {/* Age + Sex row */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Age" required error={errors.age}>
              <input name="age" value={form.age} onChange={handleChange}
                placeholder="e.g. 32"
                type="number" min="1" max="120"
                className={inp(errors.age)} />
            </Field>

            <Field label="Sex" required error={errors.sex}>
              <div className="flex gap-2">
                {SEX_OPTIONS.map((s) => (
                  <button
                    key={s} type="button"
                    onClick={() => set('sex', s)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                      form.sex === s
                        ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-primary-300 hover:text-primary-600'
                    }`}
                  >
                    {s === 'Male' ? '♂' : s === 'Female' ? '♀' : '⚥'} {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          {/* Mode */}
          <Field label="Consultation Mode" required error={null}>
            <div className="flex gap-2">
              {['Offline', 'Online'].map((m) => (
                <button
                  key={m} type="button"
                  onClick={() => set('mode', m)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                    form.mode === m
                      ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {m === 'Offline' ? '🏥 In-Clinic (Offline)' : '📱 Video/Phone (Online)'}
                </button>
              ))}
            </div>
          </Field>

          {/* Phone */}
          <Field label="Mobile Number" required error={errors.phone}>
            <div className="relative">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="10-digit mobile number"
                inputMode="numeric" maxLength={10}
                className={`${inp(errors.phone)} pl-10`} />
            </div>
          </Field>

          {/* Email optional */}
          <Field label="Email Address (Optional)" error={errors.email}>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com"
                className={`${inp(errors.email)} pl-10`} />
            </div>
          </Field>

          {/* Address */}
          <Field label="Address" error={errors.address}>
            <div className="relative">
              <FiMapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300" />
              <textarea name="address" value={form.address} onChange={handleChange}
                rows={2} placeholder="Village / Town / City"
                className={`${inp(errors.address)} pl-10 resize-none`} />
            </div>
          </Field>

          {/* Department */}
          <Field label="Department" required error={errors.department}>
            <div className="relative">
              <FiActivity className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
              <select name="department" value={form.department} onChange={handleChange}
                className={`${inp(errors.department)} pl-10 appearance-none cursor-pointer`}>
                <option value="">Select department</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none text-xs">▼</span>
            </div>
          </Field>

          {/* Message */}
          <Field label="Message / Symptoms (Optional)" error={null}>
            <div className="relative">
              <FiMessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-300" />
              <textarea name="message" value={form.message} onChange={handleChange}
                rows={2} placeholder="Describe symptoms or special requirements…"
                className={`${inp(false)} pl-10 resize-none`} />
            </div>
          </Field>
        </div>

        {/* ── RIGHT PANEL: Calendar + Time Slots ───────────────────── */}
        <div className="lg:col-span-2 bg-primary-50 border-l border-primary-100 p-6 md:p-7 flex flex-col gap-6">

          {/* Calendar */}
          <div>
            <div className="bg-amber-100/50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-2.5 rounded-lg flex items-start gap-2 mb-4">
              <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Please book your appointment at least <strong>48 hours</strong> in advance.</p>
            </div>
            <p className="text-primary-700 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiCalendar className="w-3.5 h-3.5" /> Select Date
              {errors.date && <span className="text-red-500 normal-case font-medium tracking-normal">— {errors.date}</span>}
            </p>
            <div className="rounded-2xl overflow-hidden booking-calendar">
              <DatePicker
                selected={form.date}
                onChange={(d) => set('date', d)}
                minDate={new Date()}
                inline
                calendarClassName="booking-cal"
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <p className="text-primary-700 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <FiClock className="w-3.5 h-3.5" /> Select Time Slot
              {errors.timeSlot && <span className="text-red-500 normal-case font-medium tracking-normal">— {errors.timeSlot}</span>}
            </p>
            <div className="space-y-3">
              {Object.entries(grouped).map(([period, slots]) => (
                <div key={period}>
                  <p className="text-primary-400 text-xs mb-2">{PERIOD_LABELS[period]}</p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot} type="button"
                        onClick={() => set('timeSlot', slot)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          form.timeSlot === slot
                            ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                            : 'bg-white text-gray-600 border-primary-200 hover:bg-primary-100 hover:text-primary-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-auto w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-bold text-sm disabled:opacity-60 transition-all shadow-md active:scale-95 ${
              obgyn ? 'bg-rose-500 hover:bg-rose-600' : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Booking…</>
            ) : (
              <><FiCheckCircle className="w-5 h-5 text-white" /> Confirm Appointment</>
            )}
          </button>

          {/* Quick info */}
          <p className="text-gray-500 text-xs font-medium text-center -mt-3">
            Confirmation call within 30 mins · Call Us: {siteData.contact.phone}
          </p>
        </div>
      </div>
    </form>
  )
}
