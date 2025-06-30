
'use client'

import { useState, useEffect } from 'react'
import { authAPI } from '../lib/supabase/api'
import type { User } from '../lib/supabase/api'

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
      
      const authResult = await authAPI.login(email, password)
      
      if (authResult && authResult.success) {
        const userData = await authAPI.getCurrentUser(authResult.user_id)
        setUser(userData)
        localStorage.setItem('premunia_user', JSON.stringify(userData))
        
        // Mettre à jour la dernière connexion
        await authAPI.updateLastLogin(authResult.user_id)
        
        return { data: userData, error: null }
      } else {
        setError('Email ou mot de passe incorrect')
        return { data: null, error: 'Email ou mot de passe incorrect' }
      }
    } catch (error) {
      const errorMessage = 'Erreur de connexion'
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
