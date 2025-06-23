
import { supabase } from '../enhanced-client'
import type { Company } from './types'

export const companiesAPI = {
  async getAll(filters?: { status?: string; sector?: string; search?: string }) {
    let query = supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.sector) {
      query = query.eq('sector', filters.sector)
    }
    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as Company[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        prospects:prospects(count),
        tasks:tasks(count)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(company: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
      .single()
    
    if (error) throw error
    return data as Company
  },

  async update(id: string, updates: Partial<Company>) {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Company
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getStats() {
    const { data, error } = await supabase
      .from('companies')
      .select('status, size, revenue')
    
    if (error) throw error
    
    const stats = {
      total: data.length,
      by_status: {} as Record<string, number>,
      by_size: {} as Record<string, number>,
      total_revenue: 0
    }
    
    data.forEach(company => {
      stats.by_status[company.status] = (stats.by_status[company.status] || 0) + 1
      if (company.size) {
        stats.by_size[company.size] = (stats.by_size[company.size] || 0) + 1
      }
      stats.total_revenue += company.revenue || 0
    })
    
    return stats
  }
}
