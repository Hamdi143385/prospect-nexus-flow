
import { supabase } from '../enhanced-client'
import type { EmailTemplate } from './types'

export const emailTemplatesAPI = {
  async getAll(filters?: { category?: string; template_type?: string; is_active?: boolean }) {
    let query = supabase
      .from('email_templates')
      .select(`
        *,
        created_user:users(name)
      `)
      .order('created_at', { ascending: false })
    
    if (filters?.category) {
      query = query.eq('category', filters.category)
    }
    if (filters?.template_type) {
      query = query.eq('template_type', filters.template_type)
    }
    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('email_templates')
      .select(`
        *,
        created_user:users(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at' | 'usage_count'>) {
    const { data, error } = await supabase
      .from('email_templates')
      .insert([{ ...template, usage_count: 0 }])
      .select()
      .single()
    
    if (error) throw error
    return data as EmailTemplate
  },

  async update(id: string, updates: Partial<EmailTemplate>) {
    const { data, error } = await supabase
      .from('email_templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as EmailTemplate
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async incrementUsage(id: string) {
    // First get current usage count
    const { data: current, error: fetchError } = await supabase
      .from('email_templates')
      .select('usage_count')
      .eq('id', id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Then update with incremented value
    const { data, error } = await supabase
      .from('email_templates')
      .update({ usage_count: (current.usage_count || 0) + 1 })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as EmailTemplate
  },

  async getStats() {
    const { data, error } = await supabase
      .from('email_templates')
      .select('category, template_type, is_active, usage_count')
    
    if (error) throw error
    
    const stats = {
      total: data.length,
      active: data.filter(t => t.is_active).length,
      by_category: {} as Record<string, number>,
      by_type: {} as Record<string, number>,
      total_usage: data.reduce((sum, t) => sum + t.usage_count, 0)
    }
    
    data.forEach(template => {
      if (template.category) {
        stats.by_category[template.category] = (stats.by_category[template.category] || 0) + 1
      }
      stats.by_type[template.template_type] = (stats.by_type[template.template_type] || 0) + 1
    })
    
    return stats
  }
}
