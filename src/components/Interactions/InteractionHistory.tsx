
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MessageSquare, 
  Plus, 
  Search,
  Phone,
  Mail,
  Video,
  Calendar,
  Filter,
  Edit,
  Eye
} from 'lucide-react'

interface Interaction {
  id: string
  type: 'call' | 'email' | 'meeting' | 'sms' | 'video'
  prospectName: string
  prospectId: string
  title: string
  description: string
  outcome: 'Positif' | 'Neutre' | 'Négatif' | 'À suivre'
  date: string
  duration?: number
  assignedTo: string
  nextAction?: string
  attachments?: string[]
}

export default function InteractionHistory() {
  const [interactions] = useState<Interaction[]>([
    {
      id: '1',
      type: 'call',
      prospectName: 'Pierre Dupont',
      prospectId: 'P001',
      title: 'Appel de découverte - Besoins mutuelle',
      description: 'Échange très positif. M. Dupont cherche une mutuelle complète pour lui et sa conjointe. Actuellement chez Harmonie Mutuelle, pas satisfait des remboursements optique. Budget 200€/mois.',
      outcome: 'Positif',
      date: '2024-01-22T14:30:00',
      duration: 25,
      assignedTo: 'Jean Martin',
      nextAction: 'Envoyer devis personnalisé avant vendredi'
    },
    {
      id: '2',
      type: 'email',
      prospectName: 'Marie Leblanc',
      prospectId: 'P002',
      title: 'Envoi devis mutuelle senior',
      description: 'Devis envoyé suite à sa demande sur le site. Proposition avec garanties dentaire renforcées et couverture hospitalisation premium.',
      outcome: 'À suivre',
      date: '2024-01-22T10:15:00',
      assignedTo: 'Sophie Chen',
      nextAction: 'Relance téléphonique dans 3 jours'
    },
    {
      id: '3',
      type: 'meeting',
      prospectName: 'Robert Martin',
      prospectId: 'P003',
      title: 'RDV signature contrat',
      description: 'Signature du contrat mutuelle senior. Client très satisfait de l\'accompagnement. A recommandé nos services à son voisin.',
      outcome: 'Positif',
      date: '2024-01-21T16:00:00',
      duration: 45,
      assignedTo: 'Marie Dubois',
      nextAction: 'Envoyer documents de bienvenue'
    },
    {
      id: '4',
      type: 'email',
      prospectName: 'Sylvie Durand',
      prospectId: 'P004',
      title: 'Réponse questions garanties',
      description: 'Réponse détaillée aux questions sur les garanties optique et dentaire. Clarification sur les délais de carence et les plafonds de remboursement.',
      outcome: 'Neutre',
      date: '2024-01-21T11:30:00',
      assignedTo: 'Paul Leroy'
    },
    {
      id: '5',
      type: 'call',
      prospectName: 'André Petit',
      prospectId: 'P005',
      title: 'Relance après devis',
      description: 'M. Petit trouve le tarif un peu élevé. Proposition d\'ajuster les garanties pour réduire le coût. Semble intéressé par une version allégée.',
      outcome: 'À suivre',
      date: '2024-01-20T15:45:00',
      duration: 18,
      assignedTo: 'Jean Martin',
      nextAction: 'Préparer nouveau devis avec garanties ajustées'
    }
  ])

  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('Tous')
  const [selectedOutcome, setSelectedOutcome] = useState('Tous')

  const types = ['Tous', 'call', 'email', 'meeting', 'sms', 'video']
  const outcomes = ['Tous', 'Positif', 'Neutre', 'Négatif', 'À suivre']

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      case 'meeting': return <Calendar className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'sms': return <MessageSquare className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'call': return 'Appel'
      case 'email': return 'Email'
      case 'meeting': return 'Rendez-vous'
      case 'video': return 'Visio'
      case 'sms': return 'SMS'
      default: return type
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'Positif': return 'bg-green-100 text-green-800 border-green-200'
      case 'Neutre': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Négatif': return 'bg-red-100 text-red-800 border-red-200'
      case 'À suivre': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredInteractions = interactions.filter(interaction => {
    const matchesSearch = interaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.prospectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'Tous' || interaction.type === selectedType
    const matchesOutcome = selectedOutcome === 'Tous' || interaction.outcome === selectedOutcome
    
    return matchesSearch && matchesType && matchesOutcome
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Historique des Interactions</h1>
          <p className="text-gray-600 mt-1">Suivez toutes vos communications avec les prospects</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Interaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interactions</p>
                <p className="text-2xl font-bold text-gray-800">{interactions.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interactions Positives</p>
                <p className="text-2xl font-bold text-green-600">
                  {interactions.filter(i => i.outcome === 'Positif').length}
                </p>
              </div>
              <Phone className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">À Suivre</p>
                <p className="text-2xl font-bold text-orange-600">
                  {interactions.filter(i => i.outcome === 'À suivre').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cette Semaine</p>
                <p className="text-2xl font-bold text-blue-600">
                  {interactions.filter(i => 
                    new Date(i.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactions List */}
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher une interaction..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'Tous' ? 'Tous les types' : getTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedOutcome}
                    onChange={(e) => setSelectedOutcome(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {outcomes.map(outcome => (
                      <option key={outcome} value={outcome}>
                        {outcome === 'Tous' ? 'Tous les résultats' : outcome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactions */}
          <div className="space-y-3">
            {filteredInteractions.map((interaction) => (
              <Card 
                key={interaction.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedInteraction?.id === interaction.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedInteraction(interaction)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                        {getTypeIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{interaction.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {interaction.prospectName} • {interaction.assignedTo}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(interaction.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {interaction.duration && ` • ${interaction.duration}min`}
                        </p>
                      </div>
                    </div>
                    <Badge className={getOutcomeColor(interaction.outcome)}>
                      {interaction.outcome}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {interaction.description}
                  </p>
                  
                  {interaction.nextAction && (
                    <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-800">
                        <strong>Prochaine action:</strong> {interaction.nextAction}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interaction Details */}
        <div className="space-y-4">
          {selectedInteraction ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{selectedInteraction.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(selectedInteraction.type)}
                        <span>{getTypeLabel(selectedInteraction.type)}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Résultat</label>
                      <Badge className={getOutcomeColor(selectedInteraction.outcome)}>
                        {selectedInteraction.outcome}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Prospect</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {selectedInteraction.prospectName} (ID: {selectedInteraction.prospectId})
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Date et heure</label>
                    <p className="text-sm">
                      {new Date(selectedInteraction.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {selectedInteraction.duration && (
                        <span className="text-gray-500"> • Durée: {selectedInteraction.duration} minutes</span>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Commercial</label>
                    <p className="text-sm">{selectedInteraction.assignedTo}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea 
                      value={selectedInteraction.description}
                      rows={6}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  
                  {selectedInteraction.nextAction && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Prochaine action</label>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-800">{selectedInteraction.nextAction}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Rappeler
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Envoyer Email
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Planifier RDV
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Ajouter Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sélectionnez une interaction</h3>
                <p className="text-gray-600">Choisissez une interaction dans la liste pour voir ses détails.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
