
import { supabase } from '../enhanced-client'
import type { Workflow } from './types'

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
    // First get current execution count
    const { data: current, error: fetchError } = await supabase
      .from('workflows')
      .select('execution_count')
      .eq('id', id)
      .single()
    
    if (fetchError) throw fetchError
    
    // Then update with incremented value
    const { data, error } = await supabase
      .from('workflows')
      .update({ execution_count: (current.execution_count || 0) + 1 })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Workflow
  }
}
