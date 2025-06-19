
import { supabase } from './client'
import type { User, Prospect, Opportunity, MarketingCampaign } from './client'

// API pour les utilisateurs
export const userAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as User[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as User
  },

  async create(user: Omit<User, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// API pour les prospects
export const prospectAPI = {
  async getAll(userId?: string, role?: string) {
    let query = supabase
      .from('prospects')
      .select('*')
    
    // Si commercial, ne voir que ses prospects
    if (role === 'commercial' && userId) {
      query = query.eq('assigned_to', userId)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Prospect[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('prospects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Prospect
  },

  async create(prospect: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('prospects')
      .insert([{
        ...prospect,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Prospect
  },

  async update(id: string, updates: Partial<Prospect>) {
    const { data, error } = await supabase
      .from('prospects')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Prospect
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('prospects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async importBatch(prospects: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>[]) {
    const timestamp = new Date().toISOString()
    const prospectsWithDates = prospects.map(p => ({
      ...p,
      created_at: timestamp,
      updated_at: timestamp
    }))

    const { data, error } = await supabase
      .from('prospects')
      .insert(prospectsWithDates)
      .select()
    
    if (error) throw error
    return data as Prospect[]
  }
}

// API pour les opportunités
export const opportunityAPI = {
  async getAll(userId?: string, role?: string) {
    let query = supabase
      .from('opportunities')
      .select(`
        *,
        prospect:prospects(name, company, email)
      `)
    
    if (role === 'commercial' && userId) {
      query = query.eq('created_by', userId)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(opportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([{
        ...opportunity,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Opportunity
  },

  async update(id: string, updates: Partial<Opportunity>) {
    const { data, error } = await supabase
      .from('opportunities')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Opportunity
  }
}

// API pour les campagnes marketing
export const campaignAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as MarketingCampaign[]
  },

  async create(campaign: Omit<MarketingCampaign, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .insert([{
        ...campaign,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as MarketingCampaign
  },

  async update(id: string, updates: Partial<MarketingCampaign>) {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as MarketingCampaign
  }
}
