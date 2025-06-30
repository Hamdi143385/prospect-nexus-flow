
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare,
  Menu,
  X,
  BarChart3,
  TrendingUp,
  Target
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/' 
    },
    { 
      id: 'prospects', 
      label: 'Prospects', 
      icon: Users, 
      path: '/prospects' 
    },
    { 
      id: 'contrats', 
      label: 'Contrats', 
      icon: FileText, 
      path: '/contrats' 
    },
    { 
      id: 'activites', 
      label: 'Activités & Tâches', 
      icon: CheckSquare, 
      path: '/activites' 
    }
  ]

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard Principal'
      case '/prospects': return 'Gestion Prospects'
      case '/contrats': return 'Gestion Contrats'
      case '/activites': return 'Activités & Tâches'
      default: return 'CRM Courtage'
    }
  }

  const getPageDescription = () => {
    switch (location.pathname) {
      case '/': return 'Vue d\'ensemble avec KPIs temps réel et analytics'
      case '/prospects': return 'Interface CRUD complète avec segmentation IA'
      case '/contrats': return 'Calculs automatiques des commissions et suivi revenus'
      case '/activites': return 'Gestion activités et tâches avec système d\'urgence'
      default: return 'Plateforme CRM spécialisée courtage'
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
                CRM Courtage
              </h1>
              <p className="text-xs text-gray-500 mt-1">Assurance Santé Senior & TNS</p>
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
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link key={item.id} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${sidebarOpen ? '' : 'px-2'} ${
                    isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {sidebarOpen && <span className="ml-2">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Stats rapides */}
        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Prospects actifs</span>
                  <span className="font-semibold text-blue-600">247</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Contrats mois</span>
                  <span className="font-semibold text-green-600">€45K</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Taux conversion</span>
                  <span className="font-semibold text-purple-600">18.5%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
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
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <BarChart3 className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Live Analytics</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">IA Intégrée</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  )
}
