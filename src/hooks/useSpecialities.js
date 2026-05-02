// ─────────────────────────────────────────────────────────────
// hooks/useSpecialities.js
// React hook for fetching hospital specialities/departments.
// Returns them sorted by their `order` field (set in admin panel).
// Includes fallback seed data for pediatric care.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getSpecialities } from '../services/specialities'

const SEED_SPECIALITIES = [
  {
    id: 'seed-1',
    name: 'General Pediatrics',
    category: 'Children',
    icon: '👶',
    description: 'Comprehensive healthcare for infants, children, and adolescents, including regular checkups and treatment of common illnesses.',
    available: 'OPD Hours',
    features: ['Routine Checkups', 'Childhood Infections', 'Growth Monitoring'],
    order: 0
  },
  {
    id: 'seed-2',
    name: 'Neonatology',
    category: 'Children',
    icon: '🏥',
    description: 'Specialized medical care for newborn infants, especially those who are ill or premature.',
    available: '24 × 7',
    features: ['Level II NICU', 'Premature Care', 'Neonatal Jaundice'],
    order: 1
  },
  {
    id: 'seed-3',
    name: 'Vaccination Centre',
    category: 'Diagnostic',
    icon: '💉',
    description: 'Complete immunization services following national and international pediatric guidelines.',
    available: 'OPD Hours',
    features: ['Painless Vaccines', 'Immunization Cards', 'Safety Protocols'],
    order: 2
  },
  {
    id: 'seed-4',
    name: 'Pediatric Emergency',
    category: 'Emergency',
    icon: '🚨',
    description: 'Round-the-clock emergency services specifically for children with critical healthcare needs.',
    available: '24 × 7',
    features: ['Acute Care', 'Emergency Trauma', 'Oxygen Support'],
    order: 3
  }
]

export function useSpecialities() {
  const [specialities, setSpecialities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getSpecialities()
      .then(data => {
        if (data && data.length > 0) {
          setSpecialities(data)
        } else {
          setSpecialities(SEED_SPECIALITIES)
        }
      })
      .catch(err => {
        console.error('Firestore Specialities error:', err)
        setSpecialities(SEED_SPECIALITIES)
      })
      .finally(() => setLoading(false))
  }, [])

  return { 
    specialities, 
    loading, 
    error, 
    refetch: () => getSpecialities().then(data => setSpecialities(data.length > 0 ? data : SEED_SPECIALITIES)) 
  }
}
