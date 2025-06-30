
'use client'

import React from 'react'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '@/components/Auth/LoginForm'
import PremuniaLayout from '@/components/Layout/PremuniaLayout'
import { useToast } from '@/hooks/use-toast'

export default function Index() {
  const { user, loading, signIn, error } = useAuth()
  const { toast } = useToast()

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await signIn(email, password)
      
      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error,
          variant: "destructive",
        })
      } else if (data) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${data.name} !`,
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
