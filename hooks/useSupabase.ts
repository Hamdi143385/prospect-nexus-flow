
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { userAPI, prospectAPI, opportunityAPI, campaignAPI } from '@/lib/supabase/api'
import type { User, Prospect, Opportunity, MarketingCampaign } from '@/lib/supabase/client'

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
      const profile = await userAPI.getById(userId)
      setUser(profile)
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
      const data = await prospectAPI.getAll(user.id, user.role)
      setProspects(data)
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
      const newProspect = await prospectAPI.create(prospect)
      setProspects(prev => [newProspect, ...prev])
      return { data: newProspect, error: null }
    } catch (error) {
      console.error('Erreur lors de la création du prospect:', error)
      return { data: null, error }
    }
  }

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    try {
      const updatedProspect = await prospectAPI.update(id, updates)
      setProspects(prev => prev.map(p => p.id === id ? updatedProspect : p))
      return { data: updatedProspect, error: null }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prospect:', error)
      return { data: null, error }
    }
  }

  const deleteProspect = async (id: string) => {
    try {
      await prospectAPI.delete(id)
      setProspects(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (error) {
      console.error('Erreur lors de la suppression du prospect:', error)
      return { error }
    }
  }

  const importProspects = async (prospects: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>[]) => {
    try {
      const importedProspects = await prospectAPI.importBatch(prospects)
      setProspects(prev => [...importedProspects, ...prev])
      return { data: importedProspects, error: null }
    } catch (error) {
      console.error('Erreur lors de l\'import des prospects:', error)
      return { data: null, error }
    }
  }

  return {
    prospects,
    loading,
    createProspect,
    updateProspect,
    deleteProspect,
    importProspects,
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
      const data = await opportunityAPI.getAll(user.id, user.role)
      setOpportunities(data)
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
      const newOpportunity = await opportunityAPI.create(opportunity)
      await loadOpportunities() // Recharger pour avoir les données jointes
      return { data: newOpportunity, error: null }
    } catch (error) {
      console.error('Erreur lors de la création de l\'opportunité:', error)
      return { data: null, error }
    }
  }

  const updateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
    try {
      const updatedOpportunity = await opportunityAPI.update(id, updates)
      await loadOpportunities() // Recharger pour avoir les données jointes
      return { data: updatedOpportunity, error: null }
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
      const data = await campaignAPI.getAll()
      setCampaigns(data)
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
      const newCampaign = await campaignAPI.create(campaign)
      setCampaigns(prev => [newCampaign, ...prev])
      return { data: newCampaign, error: null }
    } catch (error) {
      console.error('Erreur lors de la création de la campagne:', error)
      return { data: null, error }
    }
  }

  const updateCampaign = async (id: string, updates: Partial<MarketingCampaign>) => {
    try {
      const updatedCampaign = await campaignAPI.update(id, updates)
      setCampaigns(prev => prev.map(c => c.id === id ? updatedCampaign : c))
      return { data: updatedCampaign, error: null }
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
