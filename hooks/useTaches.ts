
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/enhanced-client'
import type { Tache } from '@/lib/supabase/api/types'

export function useTaches() {
  const [taches, setTaches] = useState<Tache[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTaches = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('taches')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTaches(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des tâches')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTaches()
  }, [])

  const updateTache = async (id: string, updates: Partial<Tache>) => {
    try {
      const { data, error } = await supabase
        .from('taches')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setTaches(prev => prev.map(t => t.id === id ? data : t))
      return { data, error: null }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de la tâche'
      return { data: null, error: errorMsg }
    }
  }

  return {
    taches,
    loading,
    error,
    updateTache,
    refetch: fetchTaches
  }
}
