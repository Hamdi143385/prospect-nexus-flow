
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase/enhanced-client'
import type { Contact } from '../../lib/supabase/api/types'

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const addContact = async (contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contact])
        .select()
        .single()

      if (error) throw error
      setContacts(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur lors de la création du contact'
      return { data: null, error: errorMsg }
    }
  }

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setContacts(prev => prev.map(c => c.id === id ? data : c))
      return { data, error: null }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur lors de la mise à jour du contact'
      return { data: null, error: errorMsg }
    }
  }

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    refetch: fetchContacts
  }
}
