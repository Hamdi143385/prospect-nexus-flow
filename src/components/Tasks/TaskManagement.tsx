
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  CheckSquare, 
  Plus, 
  Calendar,
  Clock,
  AlertTriangle,
  User,
  Search,
  Filter
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'Basse' | 'Moyenne' | 'Haute' | 'Urgente'
  status: 'À faire' | 'En cours' | 'Terminée'
  assignedTo: string
  dueDate: string
  createdAt: string
  prospectName?: string
  category: 'Prospection' | 'Suivi' | 'Admin' | 'Formation'
}

export default function TaskManagement() {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Appeler M. Dupont pour devis mutuelle',
      description: 'Faire le suivi de la demande de devis pour une mutuelle santé senior',
      priority: 'Haute',
      status: 'À faire',
      assignedTo: 'Jean Martin',
      dueDate: '2024-01-25',
      createdAt: '2024-01-20',
      prospectName: 'Pierre Dupont',
      category: 'Prospection'
    },
    {
      id: '2',
      title: 'Préparer présentation produits seniors',
      description: 'Créer une présentation pour le rendez-vous client de demain',
      priority: 'Urgente',
      status: 'En cours',
      assignedTo: 'Marie Dubois',
      dueDate: '2024-01-23',
      createdAt: '2024-01-22',
      category: 'Prospection'
    },
    {
      id: '3',
      title: 'Formation nouveaux produits',
      description: 'Participer à la formation sur les nouveaux produits Premunia 2024',
      priority: 'Moyenne',
      status: 'À faire',
      assignedTo: 'Paul Leroy',
      dueDate: '2024-01-30',
      createdAt: '2024-01-18',
      category: 'Formation'
    },
    {
      id: '4',
      title: 'Mise à jour base prospects',
      description: 'Nettoyer et mettre à jour les informations de la base prospects',
      priority: 'Basse',
      status: 'Terminée',
      assignedTo: 'Sophie Chen',
      dueDate: '2024-01-20',
      createdAt: '2024-01-15',
      category: 'Admin'
    }
  ])

  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('Toutes')
  const [selectedStatus, setSelectedStatus] = useState('Tous')

  const priorities = ['Toutes', 'Basse', 'Moyenne', 'Haute', 'Urgente']
  const statuses = ['Tous', 'À faire', 'En cours', 'Terminée']

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente': return 'bg-red-100 text-red-800 border-red-200'
      case 'Haute': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Basse': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminée': return 'bg-green-100 text-green-800 border-green-200'
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'À faire': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === 'Toutes' || task.priority === selectedPriority
    const matchesStatus = selectedStatus === 'Tous' || task.status === selectedStatus
    
    return matchesSearch && matchesPriority && matchesStatus
  })

  const getTaskStats = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'Terminée').length
    const inProgress = tasks.filter(t => t.status === 'En cours').length
    const overdue = tasks.filter(t => 
      new Date(t.dueDate) < new Date() && t.status !== 'Terminée'
    ).length

    return { total, completed, inProgress, overdue }
  }

  const stats = getTaskStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Tâches</h1>
          <p className="text-gray-600 mt-1">Organisez et suivez vos tâches commerciales</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
          >
            Liste
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            onClick={() => setView('calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendrier
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Tâche
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tâches</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terminées</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Cours</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Retard</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
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
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      {view === 'list' && (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      {task.prospectName && (
                        <div className="flex items-center gap-1">
                          <span>Prospect: {task.prospectName}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    {task.status !== 'Terminée' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Terminer
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vue Calendrier</h3>
            <p className="text-gray-600">La vue calendrier sera bientôt disponible.</p>
          </CardContent>
        </Card>
      )}

      {filteredTasks.length === 0 && view === 'list' && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucune tâche trouvée</h3>
            <p className="text-gray-600">Aucune tâche ne correspond à vos critères de recherche.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
