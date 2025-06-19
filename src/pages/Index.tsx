
'use client'

import React from 'react'
import { useAuth } from '@/hooks/useSupabase'
import LoginForm from '@/components/Auth/LoginForm'
import PremuniaLayout from '@/components/Layout/PremuniaLayout'

export default function Index() {
  const { user, loading, signIn } = useAuth()

  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await signIn(email, password)
      if (error) {
        console.error('Erreur de connexion:', error)
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Premunia CRM</h2>
          <p className="text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <PremuniaLayout />
}
