
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Zap, 
  Plus, 
  Search,
  Play,
  Pause,
  Settings,
  BarChart3,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  trigger: string
  status: 'Actif' | 'Inactif' | 'Brouillon'
  stepsCount: number
  executionsCount: number
  successRate: number
  lastExecuted: string
  category: 'Prospection' | 'Suivi' | 'Onboarding' | 'Relance'
}

interface WorkflowStep {
  id: string
  type: 'email' | 'sms' | 'call' | 'wait' | 'condition'
  title: string
  description: string
  delay?: number
  condition?: string
}

export default function WorkflowManagement() {
  const [workflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Séquence de bienvenue seniors',
      description: 'Automatise l\'onboarding des nouveaux prospects seniors',
      trigger: 'Nouveau prospect ajouté',
      status: 'Actif',
      stepsCount: 5,
      executionsCount: 143,
      successRate: 87,
      lastExecuted: '2024-01-22',
      category: 'Onboarding'
    },
    {
      id: '2',
      name: 'Relance après devis',
      description: 'Relance automatique des prospects qui n\'ont pas répondu au devis',
      trigger: 'Devis envoyé sans réponse (3 jours)',
      status: 'Actif',
      stepsCount: 3,
      executionsCount: 89,
      successRate: 64,
      lastExecuted: '2024-01-21',
      category: 'Relance'
    },
    {
      id: '3',
      name: 'Nurturing prospects qualifiés',
      description: 'Maintient l\'engagement des prospects qualifiés mais non convertis',
      trigger: 'Prospect qualifié sans conversion (7 jours)',
      status: 'Actif',
      stepsCount: 8,
      executionsCount: 56,
      successRate: 72,
      lastExecuted: '2024-01-20',
      category: 'Suivi'
    },
    {
      id: '4',
      name: 'Prospection ciblée 65+',
      description: 'Campagne de prospection automatisée pour les seniors de 65 ans et plus',
      trigger: 'Nouveau lead 65+ identifié',
      status: 'Brouillon',
      stepsCount: 6,
      executionsCount: 0,
      successRate: 0,
      lastExecuted: 'Jamais',
      category: 'Prospection'
    }
  ])

  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Tous')

  const statuses = ['Tous', 'Actif', 'Inactif', 'Brouillon']

  const workflowSteps: WorkflowStep[] = [
    {
      id: '1',
      type: 'email',
      title: 'Email de bienvenue',
      description: 'Envoi automatique d\'un email de bienvenue personnalisé'
    },
    {
      id: '2',
      type: 'wait',
      title: 'Attendre 2 jours',
      description: 'Délai d\'attente avant la prochaine action',
      delay: 2
    },
    {
      id: '3',
      type: 'email',
      title: 'Présentation des services',
      description: 'Email détaillant nos services mutuelle seniors'
    },
    {
      id: '4',
      type: 'condition',
      title: 'A ouvert l\'email ?',
      description: 'Vérifie si le prospect a ouvert le dernier email',
      condition: 'email_opened'
    },
    {
      id: '5',
      type: 'call',
      title: 'Appel de suivi',
      description: 'Tâche automatique d\'appel assignée au commercial'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800 border-green-200'
      case 'Inactif': return 'bg-red-100 text-red-800 border-red-200'
      case 'Brouillon': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prospection': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Suivi': return 'bg-green-100 text-green-800 border-green-200'
      case 'Onboarding': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Relance': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧'
      case 'sms': return '💬'
      case 'call': return '📞'
      case 'wait': return '⏰'
      case 'condition': return '❓'
      default: return '🔧'
    }
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'Tous' || workflow.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Workflows Automation</h1>
          <p className="text-gray-600 mt-1">Automatisez vos processus commerciaux</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Workflow
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Workflows Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {workflows.filter(w => w.status === 'Actif').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Exécutions Totales</p>
                <p className="text-2xl font-bold text-blue-600">
                  {workflows.reduce((sum, w) => sum + w.executionsCount, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux Succès Moyen</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects Actifs</p>
                <p className="text-2xl font-bold text-orange-600">47</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflows List */}
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher un workflow..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Workflows */}
          <div className="space-y-3">
            {filteredWorkflows.map((workflow) => (
              <Card 
                key={workflow.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedWorkflow?.id === workflow.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                      <Badge className={getCategoryColor(workflow.category)} variant="outline">
                        {workflow.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Étapes</p>
                      <p className="font-medium">{workflow.stepsCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Exécutions</p>
                      <p className="font-medium">{workflow.executionsCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Succès</p>
                      <p className="font-medium text-green-600">{workflow.successRate}%</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        Déclencheur: {workflow.trigger}
                      </span>
                      <div className="flex gap-2">
                        {workflow.status === 'Actif' ? (
                          <Button variant="outline" size="sm">
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            Activer
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow Details */}
        <div className="space-y-4">
          {selectedWorkflow ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedWorkflow.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Déclencheur</h4>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      🚀 {selectedWorkflow.trigger}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Étapes du workflow</h4>
                    <div className="space-y-3">
                      {workflowSteps.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-sm font-medium border">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getStepIcon(step.type)}</span>
                              <h5 className="font-medium">{step.title}</h5>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                            {step.delay && (
                              <p className="text-xs text-orange-600 mt-1">
                                ⏰ Délai: {step.delay} jour(s)
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Taux de succès</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{selectedWorkflow.successRate}%</p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Exécutions</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{selectedWorkflow.executionsCount}</p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Dernière exécution</span>
                      </div>
                      <p className="text-sm font-bold text-purple-600">
                        {selectedWorkflow.lastExecuted !== 'Jamais' 
                          ? new Date(selectedWorkflow.lastExecuted).toLocaleDateString('fr-FR')
                          : 'Jamais'
                        }
                      </p>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">En cours</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">
                        {Math.floor(Math.random() * 15) + 1}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sélectionnez un workflow</h3>
                <p className="text-gray-600">Choisissez un workflow dans la liste pour voir ses détails et performances.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
