// ─────────────────────────────────────────────────────────────
// hooks/useHospitalServices.js
// React hook for fetching all hospital services from Firestore.
// Includes fallback seed data for pediatric clinic infrastructure.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getHospitalServices } from '../services/hospitalServices'

const SEED_SERVICES = [
  {
    id: 'svc-1',
    name: 'Advanced Neonatal ICU (NICU)',
    category: 'Emergency',
    icon: '🏥',
    description: 'Level II NICU facility with specialized monitoring and intensive care for newborns and premature babies.',
    available: '24 × 7',
    relatedSpecialties: ['Neonatology'],
    order: 0
  },
  {
    id: 'svc-2',
    name: 'Pediatric OPD',
    category: 'Consultation',
    icon: '🩺',
    description: 'Expert pediatric consultations for all general childhood health issues, growth monitoring, and nutrition.',
    available: 'OPD Hours',
    relatedSpecialties: ['General Pediatrics'],
    order: 1
  },
  {
    id: 'svc-3',
    name: 'Digital X-Ray & Lab',
    category: 'Diagnostic',
    icon: '🔬',
    description: 'In-house diagnostic services providing quick and accurate results for pediatric diagnosis.',
    available: '24 × 7',
    relatedSpecialties: [],
    order: 2
  },
  {
    id: 'svc-4',
    name: '24/7 Pediatric Pharmacy',
    category: 'Pharmacy',
    icon: '💊',
    description: 'Round-the-clock access to pediatric medicines and healthcare supplies.',
    available: '24 × 7',
    relatedSpecialties: [],
    order: 3
  }
]

export function useHospitalServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = () => {
    setLoading(true)
    getHospitalServices()
      .then(data => {
        if (data && data.length > 0) {
          setServices(data)
        } else {
          setServices(SEED_SERVICES)
        }
      })
      .catch(err => {
        console.error('Firestore Services error:', err)
        setServices(SEED_SERVICES)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [])

  return { services, loading, error, refetch: fetch }
}
