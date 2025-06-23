
import { supabase } from './enhanced-client'
import type { Database } from './types'

// Types complets pour l'API
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'commercial'
  avatar_url?: string
  is_active: boolean
  objectives?: any
  team_id?: string
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  name: string
  sector?: string
  size?: 'Startup' | 'PME' | 'ETI' | 'Grande Entreprise'
  revenue?: number
  contacts_count: number
  status: 'Prospect' | 'Client' | 'Partenaire' | 'Inactif'
  location?: string
  phone?: string
  email?: string
  website?: string
  created_year?: number
  siret?: string
  notes?: string
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  type: 'call' | 'email' | 'meeting' | 'demo' | 'follow_up' | 'admin'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  due_date?: string
  estimated_duration?: number
  actual_duration?: number
  assigned_to?: string
  created_by?: string
  prospect_id?: string
  company_id?: string
  tags?: string[]
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  template_type: string
  category?: string
  variables?: string[]
  is_active: boolean
  usage_count: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  trigger_type: string
  trigger_conditions?: any
  is_active: boolean
  execution_count: number
  success_rate?: number
  created_by?: string
  created_at: string
  updated_at: string
}

export interface InteractionHistory {
  id: string
  prospect_id?: string
  company_id?: string
  user_id?: string
  type: 'call' | 'email' | 'meeting' | 'sms' | 'whatsapp' | 'note'
  direction: 'inbound' | 'outbound'
  subject?: string
  content?: string
  duration?: number
  outcome?: string
  next_action?: string
  attachments?: any[]
  metadata?: any
  created_at: string
}

// ============================================
// API AUTHENTIFICATION
// ============================================
export const authAPI = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.rpc('authenticate_user', {
      p_email: email,
      p_password: password
    })
    
    if (error) throw error
    return data?.[0] || null
  },

  async getCurrentUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data as User
  },

  async updateLastLogin(userId: string) {
    const { error } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId)
    
    if (error) throw error
  }
}

// ============================================
// API COMPANIES
// ============================================
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

// ============================================
// API TASKS
// ============================================
export const tasksAPI = {
  async getAll(filters?: { 
    assigned_to?: string; 
    status?: string; 
    type?: string; 
    priority?: string;
    due_date_from?: string;
    due_date_to?: string;
  }) {
    let query = supabase
      .from('tasks')
      .select(`
        *,
        assigned_user:users!tasks_assigned_to_fkey(name),
        created_user:users!tasks_created_by_fkey(name),
        prospect:prospects(name),
        company:companies(name)
      `)
      .order('due_date', { ascending: true, nullsFirst: false })
    
    if (filters?.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }
    if (filters?.due_date_from) {
      query = query.gte('due_date', filters.due_date_from)
    }
    if (filters?.due_date_to) {
      query = query.lte('due_date', filters.due_date_to)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assigned_user:users!tasks_assigned_to_fkey(*),
        created_user:users!tasks_created_by_fkey(*),
        prospect:prospects(*),
        company:companies(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  async update(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Task
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async getStats(userId?: string) {
    let query = supabase
      .from('tasks')
      .select('status, priority, type, due_date')
    
    if (userId) {
      query = query.eq('assigned_to', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    const now = new Date()
    const stats = {
      total: data.length,
      by_status: {} as Record<string, number>,
      by_priority: {} as Record<string, number>,
      by_type: {} as Record<string, number>,
      overdue: 0,
      due_today: 0,
      due_this_week: 0
    }
    
    data.forEach(task => {
      stats.by_status[task.status] = (stats.by_status[task.status] || 0) + 1
      stats.by_priority[task.priority] = (stats.by_priority[task.priority] || 0) + 1
      stats.by_type[task.type] = (stats.by_type[task.type] || 0) + 1
      
      if (task.due_date) {
        const dueDate = new Date(task.due_date)
        const daysDiff = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 3600 * 24))
        
        if (daysDiff < 0) stats.overdue++
        else if (daysDiff === 0) stats.due_today++
        else if (daysDiff <= 7) stats.due_this_week++
      }
    })
    
    return stats
  }
}

// ============================================
// API EMAIL TEMPLATES
// ============================================
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
    const { data, error } = await supabase
      .from('email_templates')
      .update({ usage_count: supabase.raw('usage_count + 1') })
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

// ============================================
// API WORKFLOWS
// ============================================
export const workflowsAPI = {
  async getAll(filters?: { is_active?: boolean; trigger_type?: string }) {
    let query = supabase
      .from('workflows')
      .select(`
        *,
        created_user:users(name),
        workflow_steps(*)
      `)
      .order('created_at', { ascending: false })
    
    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active)
    }
    if (filters?.trigger_type) {
      query = query.eq('trigger_type', filters.trigger_type)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select(`
        *,
        created_user:users(*),
        workflow_steps(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(workflow: Omit<Workflow, 'id' | 'created_at' | 'updated_at' | 'execution_count' | 'success_rate'>) {
    const { data, error } = await supabase
      .from('workflows')
      .insert([{ ...workflow, execution_count: 0, success_rate: 0 }])
      .select()
      .single()
    
    if (error) throw error
    return data as Workflow
  },

  async update(id: string, updates: Partial<Workflow>) {
    const { data, error } = await supabase
      .from('workflows')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Workflow
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async addStep(workflowId: string, step: {
    step_order: number
    step_type: string
    step_config: any
    delay_duration?: number
  }) {
    const { data, error } = await supabase
      .from('workflow_steps')
      .insert([{ ...step, workflow_id: workflowId }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateStep(stepId: string, updates: any) {
    const { data, error } = await supabase
      .from('workflow_steps')
      .update(updates)
      .eq('id', stepId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteStep(stepId: string) {
    const { error } = await supabase
      .from('workflow_steps')
      .delete()
      .eq('id', stepId)
    
    if (error) throw error
  },

  async incrementExecution(id: string) {
    const { data, error } = await supabase
      .from('workflows')
      .update({ execution_count: supabase.raw('execution_count + 1') })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Workflow
  }
}

// ============================================
// API INTERACTION HISTORY
// ============================================
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

// ============================================
// API ANALYTICS DASHBOARD
// ============================================
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

// Export par défaut de toutes les APIs
export default {
  auth: authAPI,
  companies: companiesAPI,
  tasks: tasksAPI,
  emailTemplates: emailTemplatesAPI,
  workflows: workflowsAPI,
  interactions: interactionsAPI,
  analytics: analyticsAPI
}
