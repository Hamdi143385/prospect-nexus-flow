
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

// Define types that match our application needs mapped to the actual database schema
export interface User {
  id: string
  email: string
  role: 'admin' | 'manager' | 'commercial'
  name: string
  created_at: string
  updated_at: string
  is_active: boolean
  objectives?: {
    monthly_target: number
    quarterly_target: number
    annual_target: number
  }
  team_id?: string
}

export interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  age: number
  segment: 'Senior' | 'Premium' | 'Standard'
  score: number
  status: 'Nouveau' | 'Qualifié' | 'En cours' | 'Converti' | 'Perdu'
  assigned_to: string
  created_at: string
  updated_at: string
  source: 'Excel' | 'HubSpot' | 'GoogleSheets' | 'Manuel' | 'Import'
  revenue_potential: number
  last_contact?: string
  notes?: string
  health_situation?: {
    current_insurance: string
    health_issues: string[]
    budget_range: string
    urgency_level: 'low' | 'medium' | 'high'
  }
  automation_stage?: string
}

export interface Opportunity {
  id: string
  prospect_id: string
  title: string
  value: number
  stage: 'Prospection' | 'Qualification' | 'Proposition' | 'Négociation' | 'Closing' | 'Gagné' | 'Perdu'
  probability: number
  close_date: string
  created_by: string
  created_at: string
  updated_at: string
  products: string[]
  competitor_analysis?: any
}

export interface MarketingCampaign {
  id: string
  name: string
  type: 'Email' | 'SMS' | 'WhatsApp' | 'Phone'
  target_segment: string
  template_content: string
  status: 'Draft' | 'Active' | 'Paused' | 'Completed'
  created_by: string
  created_at: string
  stats: {
    sent: number
    opened: number
    clicked: number
    converted: number
    bounced: number
  }
  automation_rules: any
}

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

// Hook pour les prospects (mapped to contacts table)
export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const loadProspects = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      // Transform contacts data to prospects format
      const transformedProspects: Prospect[] = (data || []).map(contact => ({
        id: contact.id,
        name: `${contact.prenom} ${contact.nom}`,
        email: contact.email || '',
        phone: contact.telephone || '',
        company: '', // No company field in contacts table
        age: 65, // Default age for seniors
        segment: 'Senior' as const,
        score: contact.score || 0,
        status: contact.statut_lead as any || 'Nouveau',
        assigned_to: contact.collaborateur_en_charge || user.id,
        created_at: contact.created_at,
        updated_at: contact.updated_at,
        source: 'Manuel' as const,
        revenue_potential: 2500, // Default revenue potential
        notes: contact.notes || undefined
      }))
      
      setProspects(transformedProspects)
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
      // Transform prospect data to contact format
      const nameParts = prospect.name.split(' ')
      const contactData = {
        prenom: nameParts[0] || '',
        nom: nameParts.slice(1).join(' ') || '',
        email: prospect.email,
        telephone: prospect.phone,
        score: prospect.score,
        statut_lead: prospect.status,
        collaborateur_en_charge: prospect.assigned_to,
        notes: prospect.notes
      }

      const { data, error } = await supabase
        .from('contacts')
        .insert([contactData])
        .select()
        .single()
      
      if (error) throw error
      
      // Transform back to prospect format
      const newProspect: Prospect = {
        id: data.id,
        name: `${data.prenom} ${data.nom}`,
        email: data.email || '',
        phone: data.telephone || '',
        company: '',
        age: 65,
        segment: 'Senior',
        score: data.score || 0,
        status: data.statut_lead as any,
        assigned_to: data.collaborateur_en_charge || user.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        source: 'Manuel',
        revenue_potential: 2500,
        notes: data.notes || undefined
      }
      
      setProspects(prev => [newProspect, ...prev])
      return { data: newProspect, error: null }
    } catch (error) {
      console.error('Erreur lors de la création du prospect:', error)
      return { data: null, error }
    }
  }

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    try {
      const contactUpdates: any = {}
      
      if (updates.name) {
        const nameParts = updates.name.split(' ')
        contactUpdates.prenom = nameParts[0] || ''
        contactUpdates.nom = nameParts.slice(1).join(' ') || ''
      }
      if (updates.email) contactUpdates.email = updates.email
      if (updates.phone) contactUpdates.telephone = updates.phone
      if (updates.score !== undefined) contactUpdates.score = updates.score
      if (updates.status) contactUpdates.statut_lead = updates.status
      if (updates.notes) contactUpdates.notes = updates.notes

      const { data, error } = await supabase
        .from('contacts')
        .update(contactUpdates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      
      setProspects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
      return { data, error: null }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du prospect:', error)
      return { data: null, error }
    }
  }

  const deleteProspect = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
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

// Hook pour les opportunités (mapped to propositions table)
export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const loadOpportunities = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('propositions')
        .select(`
          *,
          contacts (*)
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
      const propositionData = {
        contact_id: opportunity.prospect_id,
        montant_mensuel: opportunity.value,
        statut: 'brouillon',
        conseiller_id: opportunity.created_by,
        produit: opportunity.title
      }

      const { data, error } = await supabase
        .from('propositions')
        .insert([propositionData])
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
      const propositionUpdates: any = {}
      if (updates.title) propositionUpdates.produit = updates.title
      if (updates.value) propositionUpdates.montant_mensuel = updates.value

      const { data, error } = await supabase
        .from('propositions')
        .update(propositionUpdates)
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

// Hook pour les campagnes marketing (mapped to campagnes table)
export function useMarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([])
  const [loading, setLoading] = useState(true)

  const loadCampaigns = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('campagnes')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      // Transform campaigns data
      const transformedCampaigns: MarketingCampaign[] = (data || []).map(campaign => ({
        id: campaign.id,
        name: campaign.nom,
        type: campaign.type as any || 'Email',
        target_segment: 'Senior',
        template_content: campaign.description || '',
        status: campaign.statut as any || 'Draft',
        created_by: campaign.cree_par || '',
        created_at: campaign.created_at,
        stats: {
          sent: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          bounced: 0
        },
        automation_rules: campaign.declencheur || {}
      }))
      
      setCampaigns(transformedCampaigns)
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
      const campaignData = {
        nom: campaign.name,
        type: campaign.type,
        description: campaign.template_content,
        statut: campaign.status,
        cree_par: campaign.created_by,
        declencheur: campaign.automation_rules || {},
        etapes: []
      }

      const { data, error } = await supabase
        .from('campagnes')
        .insert([campaignData])
        .select()
        .single()
      
      if (error) throw error
      
      const newCampaign: MarketingCampaign = {
        id: data.id,
        name: data.nom,
        type: data.type as any,
        target_segment: 'Senior',
        template_content: data.description || '',
        status: data.statut as any,
        created_by: data.cree_par,
        created_at: data.created_at,
        stats: {
          sent: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          bounced: 0
        },
        automation_rules: data.declencheur || {}
      }
      
      setCampaigns(prev => [newCampaign, ...prev])
      return { data: newCampaign, error: null }
    } catch (error) {
      console.error('Erreur lors de la création de la campagne:', error)
      return { data: null, error }
    }
  }

  const updateCampaign = async (id: string, updates: Partial<MarketingCampaign>) => {
    try {
      const campaignUpdates: any = {}
      if (updates.name) campaignUpdates.nom = updates.name
      if (updates.status) campaignUpdates.statut = updates.status
      if (updates.template_content) campaignUpdates.description = updates.template_content

      const { data, error } = await supabase
        .from('campagnes')
        .update(campaignUpdates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
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
