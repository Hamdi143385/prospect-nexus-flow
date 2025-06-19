
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  Target, 
  BarChart3,
  Play,
  Pause,
  Settings,
  Plus,
  Eye,
  Edit
} from 'lucide-react'

export default function AutomationEngine() {
  const [sequences] = useState([
    {
      id: '1',
      name: 'Séquence Senior Premium',
      target: 'Prospects 65+ avec budget premium',
      status: 'active',
      type: 'email',
      steps: 5,
      stats: { sent: 1247, opened: 312, clicked: 89, converted: 23 }
    },
    {
      id: '2',
      name: 'Nurturing Mutuelle Santé',
      target: 'Prospects qualifiés seniors',
      status: 'active',
      type: 'mixed',
      steps: 7,
      stats: { sent: 892, opened: 245, clicked: 67, converted: 18 }
    },
    {
      id: '3',
      name: 'Réactivation Dormants',
      target: 'Prospects inactifs 60+ jours',
      status: 'paused',
      type: 'email',
      steps: 3,
      stats: { sent: 456, opened: 89, clicked: 23, converted: 7 }
    }
  ])

  const [templates] = useState([
    {
      id: '1',
      name: 'Bienvenue Senior Premium',
      subject: 'Votre mutuelle santé senior personnalisée vous attend',
      type: 'welcome',
      segment: 'Senior Premium',
      performance: { openRate: 28.5, clickRate: 8.2 }
    },
    {
      id: '2',
      name: 'Rappel Devis Senior',
      subject: 'N\'oubliez pas votre devis mutuelle senior',
      type: 'reminder',
      segment: 'Senior Standard',
      performance: { openRate: 22.1, clickRate: 6.8 }
    },
    {
      id: '3',
      name: 'Éducation Garanties',
      subject: 'Guide complet des garanties mutuelle senior',
      type: 'education',
      segment: 'Tous segments',
      performance: { openRate: 31.2, clickRate: 12.4 }
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'sms': return <MessageSquare className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Marketing Automation Seniors
          </h1>
          <p className="text-gray-600 mt-2">
            Automatisation intelligente pour prospects seniors en mutuelle santé
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Séquence
        </Button>
      </div>

      <Tabs defaultValue="sequences" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sequences">Séquences</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="sequences" className="space-y-6">
          {/* Métriques globales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Séquences Actives</p>
                    <p className="text-2xl font-bold text-blue-700">8</p>
                  </div>
                  <Play className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Emails Envoyés</p>
                    <p className="text-2xl font-bold text-green-700">2,847</p>
                    <p className="text-green-600 text-xs">ce mois</p>
                  </div>
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Taux Ouverture</p>
                    <p className="text-2xl font-bold text-purple-700">27.3%</p>
                    <p className="text-purple-600 text-xs">+3.2% vs mois dernier</p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Conversions</p>
                    <p className="text-2xl font-bold text-orange-700">156</p>
                    <p className="text-orange-600 text-xs">ce mois</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des séquences */}
          <Card>
            <CardHeader>
              <CardTitle>Séquences d&apos;Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sequences.map((sequence) => (
                  <div key={sequence.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(sequence.type)}
                        <div>
                          <h3 className="font-semibold text-lg">{sequence.name}</h3>
                          <p className="text-sm text-gray-600">{sequence.target}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(sequence.status)}>
                          {sequence.status === 'active' ? 'Active' : 
                           sequence.status === 'paused' ? 'En pause' : 'Terminée'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {sequence.status === 'active' ? 
                            <Pause className="h-4 w-4" /> : 
                            <Play className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{sequence.steps}</div>
                        <div className="text-gray-600">Étapes</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{sequence.stats.sent}</div>
                        <div className="text-gray-600">Envoyés</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">{sequence.stats.opened}</div>
                        <div className="text-gray-600">Ouverts</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-orange-600">{sequence.stats.clicked}</div>
                        <div className="text-gray-600">Clics</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-red-600">{sequence.stats.converted}</div>
                        <div className="text-gray-600">Conversions</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                      <span>Taux ouverture: {((sequence.stats.opened / sequence.stats.sent) * 100).toFixed(1)}%</span>
                      <span>Taux clic: {((sequence.stats.clicked / sequence.stats.opened) * 100).toFixed(1)}%</span>
                      <span>Taux conversion: {((sequence.stats.converted / sequence.stats.sent) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Templates Spécialisés Seniors</h3>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{template.segment}</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">Objet:</p>
                      <p className="text-sm text-gray-600">&quot;{template.subject}&quot;</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{template.performance.openRate}%</div>
                        <div className="text-gray-600">Taux ouverture</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{template.performance.clickRate}%</div>
                        <div className="text-gray-600">Taux clic</div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance des Campagnes Seniors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Métriques détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Segment Senior Premium</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Prospects ciblés:</span>
                        <span className="font-semibold">456</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taux ouverture:</span>
                        <span className="font-semibold text-green-600">32.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span className="font-semibold text-purple-600">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI:</span>
                        <span className="font-semibold text-orange-600">450%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Segment Senior Standard</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Prospects ciblés:</span>
                        <span className="font-semibold">789</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taux ouverture:</span>
                        <span className="font-semibold text-green-600">24.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span className="font-semibold text-purple-600">35</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI:</span>
                        <span className="font-semibold text-orange-600">320%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">Global Senior</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total prospects:</span>
                        <span className="font-semibold">1,245</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taux ouverture:</span>
                        <span className="font-semibold text-green-600">27.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total conversions:</span>
                        <span className="font-semibold text-purple-600">63</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI moyen:</span>
                        <span className="font-semibold text-orange-600">385%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommandations IA */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-3">Recommandations IA pour Seniors</h4>
                  <div className="space-y-2 text-sm text-indigo-700">
                    <p>• Optimiser les horaires d&apos;envoi: Les seniors consultent leurs emails entre 9h-11h et 14h-16h</p>
                    <p>• Personnaliser selon l&apos;âge: Adapter le ton et les garanties selon la tranche 60-70 ou 70+</p>
                    <p>• Mettre en avant la sécurité: Insister sur les garanties hospitalisation et soins spécialisés</p>
                    <p>• Simplifier les CTA: Utiliser des boutons clairs comme &quot;Obtenir mon devis gratuit&quot;</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuration Automation Seniors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Paramètres Généraux</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Délai entre emails (heures)</label>
                      <Input type="number" defaultValue="48" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Horaire optimal d&apos;envoi</label>
                      <Select defaultValue="morning">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">9h00 - 11h00</SelectItem>
                          <SelectItem value="afternoon">14h00 - 16h00</SelectItem>
                          <SelectItem value="evening">18h00 - 20h00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Fréquence maximum par semaine</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 email</SelectItem>
                          <SelectItem value="2">2 emails</SelectItem>
                          <SelectItem value="3">3 emails</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Scoring et Segmentation</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Score minimum Senior Premium</label>
                      <Input type="number" defaultValue="75" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Âge minimum segment Senior</label>
                      <Input type="number" defaultValue="60" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Budget minimum Premium (€/mois)</label>
                      <Input type="number" defaultValue="120" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-4">Intégrations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-16 flex-col">
                    <Mail className="h-6 w-6 mb-1" />
                    <span className="text-sm">Configuration SMTP</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Phone className="h-6 w-6 mb-1" />
                    <span className="text-sm">API SMS</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <BarChart3 className="h-6 w-6 mb-1" />
                    <span className="text-sm">Analytics</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
