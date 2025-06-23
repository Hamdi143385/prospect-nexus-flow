
import { supabase } from '../enhanced-client'
import type { Task } from './types'

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
