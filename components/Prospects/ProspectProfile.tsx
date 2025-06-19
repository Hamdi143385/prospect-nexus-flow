
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Building, 
  Mail, 
  Phone, 
  Star, 
  Calendar, 
  TrendingUp, 
  Search,
  Activity,
  Target,
  BarChart3
} from 'lucide-react'
import { prospectAPI } from '@/lib/supabase/api'
import type { Prospect } from '@/lib/supabase/client'

interface ProspectProfileProps {
  prospectId: string
  isOpen: boolean
  onClose: () => void
}

export default function ProspectProfile({ prospectId, isOpen, onClose }: ProspectProfileProps) {
  const [prospect, setProspect] = useState<Prospect | null>(null)
  const [showComparator, setShowComparator] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (prospectId && isOpen) {
      loadProspect()
    }
  }, [prospectId, isOpen])

  const loadProspect = async () => {
    try {
      setLoading(true)
      const data = await prospectAPI.getById(prospectId)
      setProspect(data)
    } catch (error) {
      console.error('Erreur lors du chargement du prospect:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showComparator) {
      // Charger le script du comparateur Oggo
      const script = document.createElement('script')
      script.src = 'https://cks.oggo-data.net/icomparator/health.js'
      script.type = 'text/javascript'
      script.async = true
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [showComparator])

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!prospect) return null

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Senior': return 'bg-purple-100 text-purple-800'
      case 'Premium': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-green-100 text-green-800'
      case 'Qualifié': return 'bg-blue-100 text-blue-800'
      case 'En cours': return 'bg-yellow-100 text-yellow-800'
      case 'Converti': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Profil Prospect - {prospect.name}</span>
            <Button 
              onClick={() => setShowComparator(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Comparer Offres Oggo
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête avec informations principales */}
          <div className="flex items-start justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{prospect.name}</h1>
              <p className="text-lg text-gray-600 flex items-center gap-2 mt-1">
                <Building className="h-5 w-5" />
                {prospect.company}
              </p>
              <div className="flex gap-2 mt-3">
                <Badge className={getSegmentColor(prospect.segment)}>
                  {prospect.segment}
                </Badge>
                <Badge className={getStatusColor(prospect.status)}>
                  {prospect.status}
                </Badge>
                <Badge variant="outline">
                  Score: {prospect.score}/100
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                €{prospect.revenue_potential?.toLocaleString() || 0}
              </div>
              <p className="text-sm text-gray-600">Potentiel de revenus</p>
              {prospect.age && (
                <div className="mt-2">
                  <span className="text-lg font-semibold text-blue-600">{prospect.age} ans</span>
                  <p className="text-sm text-gray-600">Âge</p>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
              <TabsTrigger value="scoring">Scoring IA</TabsTrigger>
              <TabsTrigger value="activities">Activités</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Informations de contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{prospect.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{prospect.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Source: {prospect.source}</span>
                    </div>
                    {prospect.last_contact && (
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span>Dernier contact: {new Date(prospect.last_contact).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Métriques de performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Score de qualification:</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{prospect.score}/100</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Segment:</span>
                      <Badge className={getSegmentColor(prospect.segment)}>{prospect.segment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Probabilité de conversion:</span>
                      <span className="font-semibold text-green-600">
                        {Math.round(prospect.score * 0.85)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scoring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse IA du scoring - Mutuelle Santé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Points forts détectés</h4>
                      <ul className="space-y-1 text-blue-700">
                        <li>• {prospect.segment === 'Senior' ? 'Profil senior prioritaire pour mutuelle santé' : 'Profil adapté aux offres santé'}</li>
                        <li>• Score de qualification élevé ({prospect.score}/100)</li>
                        <li>• Potentiel de revenus confirmé (€{prospect.revenue_potential?.toLocaleString()})</li>
                        <li>• Segment {prospect.segment} - opportunité premium</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Recommandations IA</h4>
                      <ul className="space-y-1 text-green-700">
                        <li>• Utiliser le comparateur Oggo pour présenter les offres</li>
                        <li>• Activer la séquence automation senior si applicable</li>
                        <li>• Programmer un rappel dans les 48h</li>
                        <li>• Préparer une simulation personnalisée</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des activités</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 border rounded-lg">
                      <Activity className="h-4 w-4 text-green-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Prospect créé</span>
                          <span className="text-sm text-gray-500">
                            {new Date(prospect.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Prospect importé depuis {prospect.source}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Séquences de marketing automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prospect.segment === 'Senior' && (
                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-purple-800">Séquence Senior - Mutuelle Santé</h4>
                          <Badge className="bg-purple-100 text-purple-800">Recommandée</Badge>
                        </div>
                        <p className="text-purple-700 mb-3">
                          Séquence spécialisée pour les prospects seniors avec contenu mutuelle santé adapté
                        </p>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          <Target className="h-4 w-4 mr-2" />
                          Activer la séquence
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Comparateur Oggo */}
          {showComparator && (
            <Dialog open={showComparator} onOpenChange={setShowComparator}>
              <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Comparateur Oggo - Offres Santé pour {prospect.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="w-full">
                  <div 
                    id="oggodata-icomparator-health" 
                    style={{ width: '100%', height: '600px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  ></div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowComparator(false)}>
                    Fermer
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Générer Devis
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
