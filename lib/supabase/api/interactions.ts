
import { supabase } from '../enhanced-client'
import type { InteractionHistory } from './types'

export const interactionsAPI = {
  async getAll(filters?: {
    prospect_id?: string
    company_id?: string
    user_id?: string
    type?: string
    direction?: string
    date_from?: string
    date_to?: string
  }) {
    let query = supabase
      .from('interaction_history')
      .select(`
        *,
        user:users(name),
        prospect:prospects(name),
        company:companies(name)
      `)
      .order('created_at', { ascending: false })
    
    if (filters?.prospect_id) {
      query = query.eq('prospect_id', filters.prospect_id)
    }
    if (filters?.company_id) {
      query = query.eq('company_id', filters.company_id)
    }
    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id)
    }
    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.direction) {
      query = query.eq('direction', filters.direction)
    }
    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from)
    }
    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('interaction_history')
      .select(`
        *,
        user:users(*),
        prospect:prospects(*),
        company:companies(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(interaction: Omit<InteractionHistory, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('interaction_history')
      .insert([interaction])
      .select()
      .single()
    
    if (error) throw error
    return data as InteractionHistory
  },

  async update(id: string, updates: Partial<InteractionHistory>) {
    const { data, error } = await supabase
      .from('interaction_history')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as InteractionHistory
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('interaction_history')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getStats(filters?: { user_id?: string; date_from?: string; date_to?: string }) {
    let query = supabase
      .from('interaction_history')
      .select('type, direction, duration, outcome, created_at')
    
    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id)
    }
    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from)
    }
    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    const stats = {
      total: data.length,
      by_type: {} as Record<string, number>,
      by_direction: {} as Record<string, number>,
      total_duration: 0,
      avg_duration: 0,
      by_outcome: {} as Record<string, number>
    }
    
    data.forEach(interaction => {
      stats.by_type[interaction.type] = (stats.by_type[interaction.type] || 0) + 1
      stats.by_direction[interaction.direction] = (stats.by_direction[interaction.direction] || 0) + 1
      
      if (interaction.duration) {
        stats.total_duration += interaction.duration
      }
      
      if (interaction.outcome) {
        stats.by_outcome[interaction.outcome] = (stats.by_outcome[interaction.outcome] || 0) + 1
      }
    })
    
    stats.avg_duration = stats.total_duration / data.filter(i => i.duration).length || 0
    
    return stats
  }
}
