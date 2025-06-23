
import { supabase } from '../enhanced-client'

export const analyticsAPI = {
  async getDashboardMetrics(userId?: string, userRole?: string) {
    const { data, error } = await supabase.rpc('get_dashboard_metrics', {
      user_id: userId,
      user_role: userRole
    })
    
    if (error) throw error
    return data
  },

  async getPerformanceData(filters?: { 
    user_id?: string
    date_from?: string
    date_to?: string
    period?: 'week' | 'month' | 'quarter' | 'year'
  }) {
    const { data, error } = await supabase
      .from('v_performance_dashboard')
      .select('*')
    
    if (error) throw error
    return data
  },

  async getRecentActivities(limit: number = 20, userId?: string) {
    let query = supabase
      .from('v_recent_activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getConversionFunnel(filters?: { user_id?: string; date_from?: string; date_to?: string }) {
    let query = supabase
      .from('prospects')
      .select('status, created_at')
    
    if (filters?.user_id) {
      query = query.eq('assigned_to', filters.user_id)
    }
    if (filters?.date_from) {
      query = query.gte('created_at', filters.date_from)
    }
    if (filters?.date_to) {
      query = query.lte('created_at', filters.date_to)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    const funnel = {
      'Nouveau': 0,
      'Qualifié': 0,
      'En cours': 0,
      'Converti': 0,
      'Perdu': 0
    }
    
    data.forEach(prospect => {
      funnel[prospect.status as keyof typeof funnel]++
    })
    
    return funnel
  },

  async getRevenueByPeriod(period: 'month' | 'quarter' | 'year' = 'month') {
    const { data, error } = await supabase
      .from('prospects')
      .select('revenue_potential, status, created_at')
      .eq('status', 'Converti')
    
    if (error) throw error
    
    // Grouper par période
    const revenueByPeriod: Record<string, number> = {}
    
    data.forEach(prospect => {
      const date = new Date(prospect.created_at)
      let periodKey: string
      
      switch (period) {
        case 'month':
          periodKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          break
        case 'quarter':
          const quarter = Math.floor(date.getMonth() / 3) + 1
          periodKey = `${date.getFullYear()}-Q${quarter}`
          break
        case 'year':
          periodKey = String(date.getFullYear())
          break
      }
      
      revenueByPeriod[periodKey] = (revenueByPeriod[periodKey] || 0) + prospect.revenue_potential
    })
    
    return revenueByPeriod
  }
}
