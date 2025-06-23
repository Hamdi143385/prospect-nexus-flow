
'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Mail, 
  BarChart3, 
  Upload, 
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  Shield,
  Crown,
  Building2,
  CheckSquare,
  MessageSquare,
  Workflow
} from 'lucide-react'
import { useAuth } from '@/hooks/useSupabase'
import AdminDashboard from '@/components/Dashboard/AdminDashboard'
import ProspectsWithComparator from '@/components/Prospects/ProspectsWithComparator'
import AutomationEngine from '@/components/Marketing/AutomationEngine'
import AdvancedReporting from '@/components/Reports/AdvancedReporting'
import CompanyManagement from '@/components/Companies/CompanyManagement'
import TaskManagement from '@/components/Tasks/TaskManagement'
import EmailTemplates from '@/components/Email/EmailTemplates'
import AnalyticsDashboard from '@/components/Analytics/AnalyticsDashboard'
import WorkflowManagement from '@/components/Workflows/WorkflowManagement'
import InteractionHistory from '@/components/Interactions/InteractionHistory'

export default function PremuniaLayout() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      roles: ['admin', 'manager', 'commercial'] 
    },
    { 
      id: 'prospects', 
      label: 'Prospects & Comparateur', 
      icon: Users, 
      roles: ['admin', 'manager', 'commercial'] 
    },
    { 
      id: 'companies', 
      label: 'Entreprises', 
      icon: Building2, 
      roles: ['admin', 'manager', 'commercial'] 
    },
    { 
      id: 'tasks', 
      label: 'Tâches', 
      icon: CheckSquare, 
      roles: ['admin', 'manager', 'commercial'] 
    },
    { 
      id: 'interactions', 
      label: 'Interactions', 
      icon: MessageSquare, 
      roles: ['admin', 'manager', 'commercial'] 
    },
    { 
      id: 'automation', 
      label: 'Marketing Automation', 
      icon: Mail, 
      roles: ['admin', 'manager'] 
    },
    { 
      id: 'workflows', 
      label: 'Workflows', 
      icon: Workflow, 
      roles: ['admin', 'manager'] 
    },
    { 
      id: 'email-templates', 
      label: 'Templates Email', 
      icon: Mail, 
      roles: ['admin', 'manager'] 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      roles: ['admin', 'manager'] 
    },
    { 
      id: 'reporting', 
      label: 'Reporting Avancé', 
      icon: BarChart3, 
      roles: ['admin', 'manager'] 
    },
    { 
      id: 'upload', 
      label: 'Import Données', 
      icon: Upload, 
      roles: ['admin'] 
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: Settings, 
      roles: ['admin'] 
    }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'commercial')
  )

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-500" />
      case 'manager': return <Shield className="h-4 w-4 text-blue-500" />
      default: return <Target className="h-4 w-4 text-green-500" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur'
      case 'manager': return 'Gestionnaire'
      default: return 'Commercial'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'prospects':
        return <ProspectsWithComparator />
      case 'companies':
        return <CompanyManagement />
      case 'tasks':
        return <TaskManagement />
      case 'interactions':
        return <InteractionHistory />
      case 'automation':
        return <AutomationEngine />
      case 'workflows':
        return <WorkflowManagement />
      case 'email-templates':
        return <EmailTemplates />
      case 'analytics':
        return <AnalyticsDashboard />
      case 'reporting':
        return <AdvancedReporting />
      case 'upload':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Centre d&apos;Import</h3>
              <p className="text-gray-600">Fonctionnalité en développement</p>
            </CardContent>
          </Card>
        )
      case 'settings':
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Paramètres Système</h3>
              <p className="text-gray-600">Configuration avancée du CRM</p>
            </CardContent>
          </Card>
        )
      default:
        return <AdminDashboard />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Tableau de Bord Premunia'
      case 'prospects': return 'Gestion Prospects avec Comparateur Oggo'
      case 'companies': return 'Gestion des Entreprises'
      case 'tasks': return 'Gestion des Tâches'
      case 'interactions': return 'Historique des Interactions'
      case 'automation': return 'Marketing Automation Seniors'
      case 'workflows': return 'Workflows Automation'
      case 'email-templates': return 'Modèles d\'Emails'
      case 'analytics': return 'Analytics Dashboard'
      case 'reporting': return 'Reporting Commercial Avancé'
      case 'upload': return 'Centre d\'Import de Données'
      default: return 'Paramètres du Système'
    }
  }

  const getPageDescription = () => {
    switch (activeTab) {
      case 'dashboard': return 'Vue d\'ensemble de votre activité mutuelle santé seniors'
      case 'prospects': return 'Gérez vos prospects avec comparaison directe des offres'
      case 'companies': return 'Gérez votre portefeuille d\'entreprises et partenaires'
      case 'tasks': return 'Organisez et suivez vos tâches commerciales'
      case 'interactions': return 'Historique de toutes vos communications prospects'
      case 'automation': return 'Automatisation marketing spécialisée pour seniors'
      case 'workflows': return 'Automatisez vos processus commerciaux'
      case 'email-templates': return 'Gérez vos modèles d\'emails commerciaux'
      case 'analytics': return 'Analytics et métriques de performance détaillées'
      case 'reporting': return 'Analytics et performance commerciale détaillée'
      case 'upload': return 'Import depuis Excel, HubSpot, Google Sheets'
      default: return 'Configuration et paramètres du CRM'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-xl transition-all duration-300 border-r border-gray-200`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premunia CRM
              </h1>
              <p className="text-xs text-gray-500 mt-1">Mutuelle Santé Seniors</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${sidebarOpen ? '' : 'px-2'} ${
                  activeTab === item.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2 text-sm">{item.label}</span>}
              </Button>
            )
          })}
        </nav>

        {/* User info et déconnexion */}
        <div className="absolute bottom-4 left-4 right-4">
          {sidebarOpen && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <div className="flex items-center gap-1">
                    {getRoleIcon(user.role)}
                    <span className="text-xs text-gray-600">{getRoleLabel(user.role)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Button
            variant="outline"
            className={`w-full ${sidebarOpen ? 'justify-start' : 'px-2'} border-red-200 text-red-600 hover:bg-red-50`}
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Déconnexion</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header dynamique */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {getPageTitle()}
                </h2>
                <p className="text-gray-600 mt-1">
                  {getPageDescription()}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
                  <Zap className="h-3 w-3 mr-1" />
                  Oggo Data Intégré
                </Badge>
                {user.role === 'admin' && (
                  <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200">
                    <Crown className="h-3 w-3 mr-1" />
                    Accès Complet
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
