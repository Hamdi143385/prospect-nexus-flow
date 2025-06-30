
import { useState, useEffect } from 'react'
import { authAPI } from '../../lib/supabase/api/auth'
import type { User } from '../../lib/supabase/api/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const savedUser = localStorage.getItem('premunia_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('premunia_user')
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const userData = await authAPI.login(email, password)
      
      if (userData && userData.id) {
        // Ensure proper type casting for statut
        const user: User = {
          ...userData,
          statut: userData.statut as 'actif' | 'inactif'
        }
        setUser(user)
        localStorage.setItem('premunia_user', JSON.stringify(user))
        
        // Mettre à jour la dernière connexion
        await authAPI.updateLastLogin(userData.id)
        
        return { data: user, error: null }
      } else {
        setError('Erreur lors de la connexion')
        return { data: null, error: 'Erreur lors de la connexion' }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Email ou mot de passe incorrect'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      localStorage.removeItem('premunia_user')
      return { error: null }
    } catch (error) {
      return { error: 'Erreur lors de la déconnexion' }
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('premunia_user', JSON.stringify(updatedUser))
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    updateUser,
  }
}
