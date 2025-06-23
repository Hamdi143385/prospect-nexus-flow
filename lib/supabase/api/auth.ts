
import { supabase } from '../enhanced-client'
import type { User } from './types'

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
