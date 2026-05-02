// ─────────────────────────────────────────────────────────────
// hooks/useSpecialities.js
// React hook for fetching hospital specialities/departments.
// Returns them sorted by their `order` field (set in admin panel).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { getSpecialities } from '../services/specialities'

export function useSpecialities() {
  const [specialities, setSpecialities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getSpecialities()
      .then(setSpecialities)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  // refetch lets admin pages reload after add/edit/delete operations
  return { specialities, loading, error, refetch: () => getSpecialities().then(setSpecialities) }
}
