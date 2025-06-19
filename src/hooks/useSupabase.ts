
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { User, Prospect, Opportunity, MarketingCampaign } from '@/integrations/supabase/types'

// Hook pour l'authentification
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      // Simuler un profil utilisateur pour le moment
      const mockUser: User = {
        id: userId,
        email: session?.user?.email || 'admin@premunia.com',
        role: 'admin',
        name: 'Administrateur Premunia',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      }
      setUser(mockUser)
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
  }
}

// Hook pour les prospects
export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const loadProspects = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setProspects(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des prospects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadProspects()
    }
  }, [user])

  const createProspect = async (prospect: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .insert([prospect])
        .select()
        .single()
      
      if (error) throw error
      setProspects(prev => [data, ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la création du prospect:', error)
      return { data: null, error }
    }
  }

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    try {
      const { data, error } = await supabase
        .from('prospects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      setProspects(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prospect:', error)
      return { data: null, error }
    }
  }

  const deleteProspect = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prospects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setProspects(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Erreur lors de la suppression du prospect:', error)
      return { error }
    }
  }

  return {
    prospects,
    loading,
    createProspect,
    updateProspect,
    deleteProspect,
    reloadProspects: loadProspects,
  }
}

// Hook pour les opportunités
export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const loadOpportunities = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('opportunities')
        .select(`
          *,
          prospects (*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setOpportunities(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des opportunités:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadOpportunities()
    }
  }, [user])

  const createOpportunity = async (opportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .insert([opportunity])
        .select()
        .single()
      
      if (error) throw error
      await loadOpportunities()
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la création de l\'opportunité:', error)
      return { data: null, error }
    }
  }

  const updateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      await loadOpportunities()
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'opportunité:', error)
      return { data: null, error }
    }
  }

  return {
    opportunities,
    loading,
    createOpportunity,
    updateOpportunity,
    reloadOpportunities: loadOpportunities,
  }
}

// Hook pour les campagnes marketing
export function useMarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([])
  const [loading, setLoading] = useState(true)

  const loadCampaigns = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setCampaigns(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des campagnes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCampaigns()
  }, [])

  const createCampaign = async (campaign: Omit<MarketingCampaign, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .insert([campaign])
        .select()
        .single()
      
      if (error) throw error
      setCampaigns(prev => [data, ...prev])
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la création de la campagne:', error)
      return { data: null, error }
    }
  }

  const updateCampaign = async (id: string, updates: Partial<MarketingCampaign>) => {
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      setCampaigns(prev => prev.map(c => c.id === id ? data : c))
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la campagne:', error)
      return { data: null, error }
    }
  }

  return {
    campaigns,
    loading,
    createCampaign,
    updateCampaign,
    reloadCampaigns: loadCampaigns,
  }
}
