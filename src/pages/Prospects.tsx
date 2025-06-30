
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download,
  Zap,
  Target,
  Star,
  Phone,
  Mail,
  Calendar
} from 'lucide-react'

export default function Prospects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const prospects = [
    {
      id: 1,
      nom: 'Martin Dubois',
      email: 'martin.dubois@email.com',
      telephone: '06 12 34 56 78',
      age: 68,
      statut: 'Qualifié',
      score: 85,
      source: 'Publicité Facebook',
      derniereAction: 'Appel téléphonique',
      dateCreation: '2024-01-15',
      segment: 'Senior Premium'
    },
    {
      id: 2,
      nom: 'Sophie Laurent',
      email: 'sophie.laurent@email.com',
      telephone: '06 98 76 54 32',
      age: 45,
      statut: 'En cours',
      score: 72,
      source: 'Google Ads',
      derniereAction: 'Email envoyé',
      dateCreation: '2024-01-12',
      segment: 'TNS'
    },
    {
      id: 3,
      nom: 'Pierre Moreau',
      email: 'pierre.moreau@email.com',
      telephone: '06 11 22 33 44',
      age: 72,
      statut: 'Nouveau',
      score: 91,
      source: 'Recommandation',
      derniereAction: 'Inscription formulaire',
      dateCreation: '2024-01-10',
      segment: 'Senior Premium'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800'
      case 'Qualifié': return 'bg-green-100 text-green-800'
      case 'En cours': return 'bg-yellow-100 text-yellow-800'
      case 'Converti': return 'bg-purple-100 text-purple-800'
      case 'Perdu': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = prospect.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || prospect.statut === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Actions et filtres */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher prospects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="h-4 w-4" />
            Nouveau Prospect
          </Button>
        </div>
      </div>

      {/* Filtres rapides */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'Nouveau', 'Qualifié', 'En cours', 'Converti'].map(filter => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
          >
            {filter === 'all' ? 'Tous' : filter}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="liste" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="liste">Liste Prospects</TabsTrigger>
          <TabsTrigger value="segmentation">Segmentation IA</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="liste" className="space-y-4">
          <div className="grid gap-4">
            {filteredProspects.map((prospect) => (
              <Card key={prospect.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {prospect.nom.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{prospect.nom}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {prospect.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {prospect.telephone}
                          </div>
                          <span>{prospect.age} ans</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className={`font-bold ${getScoreColor(prospect.score)}`}>
                            {prospect.score}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Score IA</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={getStatusColor(prospect.statut)}>
                          {prospect.statut}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{prospect.segment}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-4">
                        <span><strong>Source:</strong> {prospect.source}</span>
                        <span><strong>Dernière action:</strong> {prospect.derniereAction}</span>
                      </div>
                      <span className="text-gray-500">Créé le {prospect.dateCreation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="segmentation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Segment Senior Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-blue-600">142</div>
                  <p className="text-sm text-gray-600">Prospects 65+ ans avec score élevé</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score moyen</span>
                      <span className="font-semibold">87</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taux conversion</span>
                      <span className="font-semibold text-green-600">24%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Activer Campagne
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Segment TNS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <p className="text-sm text-gray-600">Travailleurs Non-Salariés</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score moyen</span>
                      <span className="font-semibold">72</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taux conversion</span>
                      <span className="font-semibold text-green-600">18%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Workflow TNS
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Prospects Chauds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-yellow-600">16</div>
                  <p className="text-sm text-gray-600">Score IA > 85 - Action immédiate</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score moyen</span>
                      <span className="font-semibold">91</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taux conversion</span>
                      <span className="font-semibold text-green-600">45%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600">
                    Relancer Maintenant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance par Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: 'Facebook Ads', count: 89, conversion: '22%', cpl: '€125' },
                    { source: 'Google Ads', count: 67, conversion: '18%', cpl: '€145' },
                    { source: 'Recommandations', count: 45, conversion: '35%', cpl: '€85' },
                    { source: 'Site Web', count: 34, conversion: '12%', cpl: '€95' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{item.source}</span>
                        <p className="text-sm text-gray-600">{item.count} prospects</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{item.conversion}</div>
                        <div className="text-sm text-gray-600">{item.cpl}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendances Hebdomadaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">+23%</div>
                    <p className="text-sm text-gray-600">Nouveaux prospects cette semaine</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lundi</span>
                      <span className="font-semibold">12 prospects</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mardi</span>
                      <span className="font-semibold">18 prospects</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mercredi</span>
                      <span className="font-semibold">15 prospects</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Jeudi</span>
                      <span className="font-semibold">21 prospects</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Vendredi</span>
                      <span className="font-semibold">9 prospects</span>
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
