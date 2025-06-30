
import { supabase } from '../enhanced-client'
import type { User } from './types'

export const authAPI = {
  async login(email: string, password: string) {
    // Use standard auth login instead of RPC function
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data.user
  },

  async getCurrentUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    
    // Transform database user to application User type
    if (data) {
      const user: User = {
        id: data.id,
        email: data.email,
        name: data.nom_complet,
        role: 'commercial', // Default role, should be determined from role_id
        avatar_url: undefined,
        is_active: data.statut === 'actif',
        objectives: undefined,
        team_id: data.equipe_id || undefined,
        last_login: undefined,
        created_at: data.created_at,
        updated_at: data.created_at // Use created_at as fallback since updated_at doesn't exist
      }
      return user
    }
    
    throw new Error('User not found')
  },

  async updateLastLogin(userId: string) {
    // Since last_login doesn't exist in the users table schema,
    // we'll update a custom field or skip this for now
    console.log(`Would update last login for user ${userId}`)
    // Could be implemented by adding last_login field to users table
    // or tracking in a separate table
  }
}
