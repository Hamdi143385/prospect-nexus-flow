
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
      
      // Type cast the data to match our interface
      const typedCampagnes: Campagne[] = (data || []).map(item => ({
        ...item,
        statut: item.statut as 'brouillon' | 'actif' | 'pause' | 'termine',
        etapes: Array.isArray(item.etapes) ? item.etapes : []
      }))
      
      setCampagnes(typedCampagnes)
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
