
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase/enhanced-client'
import type { Campagne } from '../../lib/supabase/api/types'

export function useCampagnes() {
  const [campagnes, setCampagnes] = useState<Campagne[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampagnes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('campagnes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCampagnes(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des campagnes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampagnes()
  }, [])

  return {
    campagnes,
    loading,
    error,
    refetch: fetchCampagnes
  }
}
