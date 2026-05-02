import { Link } from 'react-router-dom'
import { FiClock, FiPhone, FiCalendar, FiUser } from 'react-icons/fi'
import { getInitials } from '../utils/helpers'

const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const DAYS_FULL  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const ACCENT = {
  primary: {
    badge:   'bg-primary-600',
    qual:    'text-primary-600',
    dayPill: 'bg-primary-50 text-primary-700',
    bookBtn: 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/25',
    viewBtn: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    specTag: 'bg-primary-50 text-primary-700 border border-primary-200',
  },
  rose: {
    badge:   'bg-rose-500',
    qual:    'text-rose-500',
    dayPill: 'bg-rose-50 text-rose-600',
    bookBtn: 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/25',
    viewBtn: 'border-2 border-rose-500 text-rose-500 hover:bg-rose-50',
    specTag: 'bg-rose-50 text-rose-600 border border-rose-200',
  },
}

const isObgyn = (doc) =>
  /gynaec|gynec|obstet|women|maternity/i.test(doc.specialty || '') ||
  (Array.isArray(doc.specialties) && doc.specialties.some(s => /gynaec|gynec|obstet|women|maternity/i.test(s)))

export default function DoctorCard({ doc, accent }) {
  const resolvedAccent = accent ?? (isObgyn(doc) ? 'rose' : 'primary')
  const c = ACCENT[resolvedAccent] || ACCENT.primary
  const qualDisplay = doc.qualification?.replace(/,?\s*Ex[\s\S]*$/i, '').trim()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex group hover:-translate-y-1 transition-all duration-300 min-h-[180px]">

      {/* Left — image */}
      <div className="relative w-36 sm:w-48 shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {doc.image ? (
          <img
            src={doc.image}
            alt={doc.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={`w-16 h-16 ${c.badge} rounded-full flex items-center justify-center`}>
              <span className="font-bold text-white text-2xl">{getInitials(doc.name)}</span>
            </div>
          </div>
        )}

        {/* Experience badge */}
        {doc.experience && (
          <div className={`absolute top-3 left-3 w-[52px] h-[52px] ${c.badge} rounded-xl flex flex-col items-center justify-center shadow-lg`}>
            <span className="text-white font-black text-xl leading-none">{doc.experience}</span>
            <span className="text-white/80 text-[8px] font-bold tracking-wide uppercase">Yrs Exp</span>
          </div>
        )}
      </div>

      {/* Right — info */}
      <div className="flex-1 flex flex-col p-4 sm:p-5 min-w-0">

        {/* Specialty tag — top right */}
        <div className="flex justify-end mb-1">
          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.specTag}`}>
            <FiUser className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[130px]">{doc.specialty}</span>
          </span>
        </div>

        <h3 className="font-heading font-bold text-navy-800 text-lg leading-tight mb-0.5">{doc.name}</h3>

        {qualDisplay && (
          <p className={`text-sm font-semibold mb-2 ${c.qual}`}>{qualDisplay}</p>
        )}

        {doc.bio && (
          <p className="text-gray-500 text-xs leading-relaxed mb-2 line-clamp-2">{doc.bio}</p>
        )}

        <div className="space-y-1.5 mb-3 text-xs text-gray-600">
          {(doc.availableTime || doc.phone) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {doc.availableTime && (
                <span className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  {doc.availableTime}
                </span>
              )}
              {doc.phone && (
                <span className="flex items-center gap-1">
                  <FiPhone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  {doc.phone}
                </span>
              )}
            </div>
          )}
          {Array.isArray(doc.availableDays) && doc.availableDays.length > 0 && (
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {DAYS_SHORT.map((short, idx) =>
                  doc.availableDays.includes(DAYS_FULL[idx]) ? (
                    <span key={short} className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${c.dayPill}`}>{short}</span>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link
            to={`/doctors/${doc.slug || doc.id}`}
            className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${c.viewBtn}`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
