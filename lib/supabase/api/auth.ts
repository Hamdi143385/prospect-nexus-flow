
import { supabase } from '../enhanced-client'
import type { User, Role } from './types'

export const authAPI = {
  async login(email: string, password: string) {
    // Vérifier d'abord si l'utilisateur existe dans notre table users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        *,
        roles:role_id (
          nom
        )
      `)
      .eq('email', email)
      .eq('statut', 'actif')
      .single()
    
    if (userError || !userData) {
      throw new Error('Utilisateur non trouvé ou inactif')
    }
    
    // Pour la démo, on accepte le mot de passe basé sur le rôle
    const validPasswords: { [key: string]: string } = {
      'admin@premunia.fr': 'admin123',
      'manager@premunia.fr': 'manager123',
      'commercial@premunia.fr': 'commercial123'
    }
    
    if (validPasswords[email] !== password) {
      throw new Error('Mot de passe incorrect')
    }
    
    return userData
  },

  async getCurrentUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        roles:role_id (
          nom
        )
      `)
      .eq('id', userId)
      .eq('statut', 'actif')
      .single()
    
    if (error) throw error
    
    // Transformer les données pour correspondre à l'interface User
    if (data) {
      const user: User = {
        id: data.id,
        email: data.email,
        nom_complet: data.nom_complet,
        role_id: data.role_id,
        equipe_id: data.equipe_id,
        statut: data.statut,
        created_at: data.created_at,
        role_nom: data.roles?.nom || 'commercial',
        role: data.roles?.nom || 'commercial'
      }
      return user
    }
    
    throw new Error('Utilisateur non trouvé')
  },

  async updateLastLogin(userId: string) {
    // Pour l'instant, on log juste l'information
    console.log(`Connexion utilisateur ${userId}`)
    // On pourrait ajouter un champ last_login à la table users plus tard
  },

  async getAllRoles() {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('nom')
    
    if (error) throw error
    return data as Role[]
  }
}
