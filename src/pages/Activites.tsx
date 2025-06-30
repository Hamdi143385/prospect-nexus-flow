
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CheckSquare, 
  Search, 
  Plus, 
  Calendar,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  User,
  Filter
} from 'lucide-react'

export default function Activites() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPriorite, setSelectedPriorite] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const taches = [
    {
      id: 1,
      titre: 'Rappeler Martin Dubois',
      description: 'Relance pour signature contrat Senior Premium',
      priorite: 'Haute',
      statut: 'A faire',
      echeance: '2024-01-20',
      type: 'Appel',
      contact: 'Martin Dubois',
      assigne: 'Jean Dupont',
      creee: '2024-01-18'
    },
    {
      id: 2,
      titre: 'Envoyer devis TNS',
      description: 'Proposition Allianz TNS pour Sophie Laurent',
      priorite: 'Moyenne',
      statut: 'En cours',
      echeance: '2024-01-22',
      type: 'Email',
      contact: 'Sophie Laurent',
      assigne: 'Marie Martin',
      creee: '2024-01-17'
    },
    {
      id: 3,
      titre: 'RDV prospects seniors',
      description: 'Présentation offres Senior Premium groupe',
      priorite: 'Haute',
      statut: 'Terminé',
      echeance: '2024-01-19',
      type: 'Rendez-vous',
      contact: 'Groupe Senior Club',
      assigne: 'Jean Dupont',
      creee: '2024-01-15'
    }
  ]

  const activites = [
    {
      id: 1,
      type: 'Appel',
      contact: 'Martin Dubois',
      sujet: 'Présentation contrat Senior Premium',
      date: '2024-01-18 14:30',
      duree: '15 min',
      resultat: 'Intéressé - Devis à envoyer',
      commercial: 'Jean Dupont',
      statut: 'Complété'
    },
    {
      id: 2,
      type: 'Email',
      contact: 'Sophie Laurent',
      sujet: 'Relance proposition TNS',
      date: '2024-01-18 10:15',
      duree: null,
      resultat: 'Email ouvert - Pas de réponse',
      commercial: 'Marie Martin',
      statut: 'Envoyé'
    },
    {
      id: 3,
      type: 'Rendez-vous',
      contact: 'Pierre Moreau',
      sujet: 'Signature contrat AXA',
      date: '2024-01-17 16:00',
      duree: '30 min',
      resultat: 'Contrat signé - €156/mois',
      commercial: 'Jean Dupont',
      statut: 'Complété'
    }
  ]

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'Haute': return 'bg-red-100 text-red-800'
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800'
      case 'Basse': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'A faire': return 'bg-blue-100 text-blue-800'
      case 'En cours': return 'bg-yellow-100 text-yellow-800'
      case 'Terminé': return 'bg-green-100 text-green-800'
      case 'Complété': return 'bg-green-100 text-green-800'
      case 'Envoyé': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Appel': return <Phone className="h-4 w-4" />
      case 'Email': return <Mail className="h-4 w-4" />
      case 'Rendez-vous': return <Calendar className="h-4 w-4" />
      case 'SMS': return <MessageSquare className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const filteredTaches = taches.filter(tache => {
    const matchesSearch = tache.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tache.contact.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriorite = selectedPriorite === 'all' || tache.priorite === selectedPriorite
    const matchesType = selectedType === 'all' || tache.type === selectedType
    return matchesSearch && matchesPriorite && matchesType
  })

  const tachesUrgentes = taches.filter(t => t.priorite === 'Haute' && t.statut !== 'Terminé').length
  const tachesEnCours = taches.filter(t => t.statut === 'En cours').length
  const tachesTerminees = taches.filter(t => t.statut === 'Terminé').length

  return (
    <div className="space-y-6">
      {/* KPIs Activités */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tâches Urgentes</p>
                <p className="text-2xl font-bold text-red-600">{tachesUrgentes}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Cours</p>
                <p className="text-2xl font-bold text-yellow-600">{tachesEnCours}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Terminées</p>
                <p className="text-2xl font-bold text-green-600">{tachesTerminees}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activités</p>
                <p className="text-2xl font-bold">{activites.length}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher activités..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedPriorite} onValueChange={setSelectedPriorite}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Basse">Basse</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="Appel">Appel</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Rendez-vous">RDV</SelectItem>
              <SelectItem value="SMS">SMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="h-4 w-4" />
            Nouvelle Tâche
          </Button>
        </div>
      </div>

      <Tabs defaultValue="taches" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="taches">Tâches</TabsTrigger>
          <TabsTrigger value="activites">Historique Activités</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="taches" className="space-y-4">
          <div className="grid gap-4">
            {filteredTaches.map((tache) => (
              <Card key={tache.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                        {getTypeIcon(tache.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tache.titre}</h3>
                        <p className="text-gray-600 text-sm">{tache.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>Contact: {tache.contact}</span>
                          <span>Assigné: {tache.assigne}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <Badge className={getPrioriteColor(tache.priorite)}>
                          {tache.priorite}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Priorité</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={getStatutColor(tache.statut)}>
                          {tache.statut}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Statut</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {tache.echeance}
                        </div>
                        <p className="text-xs text-gray-500">Échéance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activites" className="space-y-4">
          <div className="grid gap-4">
            {activites.map((activite) => (
              <Card key={activite.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                        {getTypeIcon(activite.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{activite.sujet}</h3>
                        <p className="text-gray-600 text-sm">{activite.resultat}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>Contact: {activite.contact}</span>
                          <span>Commercial: {activite.commercial}</span>
                          {activite.duree && <span>Durée: {activite.duree}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <Badge className={getStatutColor(activite.statut)}>
                          {activite.statut}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Statut</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {activite.date}
                        </div>
                        <p className="text-xs text-gray-500">Date/Heure</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Agenda Aujourd'hui
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { heure: '09:00', activite: 'Appel Martin Dubois', type: 'Appel', urgent: true },
                    { heure: '11:30', activite: 'RDV Groupe Senior', type: 'Rendez-vous', urgent: false },
                    { heure: '14:00', activite: 'Relance TNS par email', type: 'Email', urgent: false },
                    { heure: '16:30', activite: 'Signature contrat AXA', type: 'Rendez-vous', urgent: true }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${item.urgent ? 'border-red-200 bg-red-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-gray-900">{item.heure}</div>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <span className="text-sm">{item.activite}</span>
                        </div>
                      </div>
                      {item.urgent && (
                        <Badge className="bg-red-100 text-red-800">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Statistiques Semaine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Appels effectués</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emails envoyés</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rendez-vous</span>
                    <span className="font-semibold">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taux de réponse</span>
                    <span className="font-semibold text-green-600">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contrats signés</span>
                    <span className="font-semibold text-purple-600">3</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Performance</span>
                      <Badge className="bg-green-100 text-green-800">Excellente</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
