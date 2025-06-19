
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Zap, 
  Star, 
  Shield, 
  Heart, 
  Eye, 
  Phone, 
  Calculator,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

interface OggoIntegrationProps {
  prospect: {
    id: string
    name: string
    age: number
    health_situation?: {
      current_insurance: string
      health_issues: string[]
      budget_range: string
      urgency_level: 'low' | 'medium' | 'high'
    }
  }
  isOpen: boolean
  onClose: () => void
}

export default function OggoIntegration({ prospect, isOpen, onClose }: OggoIntegrationProps) {
  const [loading, setLoading] = useState(true)
  const [offers, setOffers] = useState<any[]>([])
  const [showComparator, setShowComparator] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Simulation du chargement des offres via API Oggo
      setLoading(true)
      setTimeout(() => {
        setOffers([
          {
            id: 1,
            provider: 'Harmonie Mutuelle Senior+',
            monthlyPrice: 89,
            coverage: 'Premium',
            score: 95,
            advantages: [
              'Optique: 400€/an + 1 paire tous les 2 ans',
              'Dentaire: 300% + Implants inclus',
              'Hospitalisation: Chambre individuelle',
              'Médecines douces: 200€/an',
              'Aide à domicile: 1000€/an'
            ],
            guarantees: {
              optique: '400€/an',
              dentaire: '300%',
              hospitalisation: 'Chambre individuelle',
              medecineDouce: '200€/an'
            }
          },
          {
            id: 2,
            provider: 'MAIF Santé Senior',
            monthlyPrice: 76,
            coverage: 'Équilibré',
            score: 88,
            advantages: [
              'Optique: 300€/an',
              'Dentaire: 250% + Prothèses',
              'Hospitalisation: Forfait 80€/jour',
              'Prévention: Bilan santé gratuit',
              'Assistance: 24h/24'
            ],
            guarantees: {
              optique: '300€/an',
              dentaire: '250%',
              hospitalisation: 'Forfait 80€/jour',
              prevention: 'Bilan gratuit'
            }
          },
          {
            id: 3,
            provider: 'Malakoff Humanis Senior',
            monthlyPrice: 95,
            coverage: 'Excellence',
            score: 92,
            advantages: [
              'Optique: 500€/an + Progressifs',
              'Dentaire: 400% + Orthodontie adulte',
              'Hospitalisation: Suite + Accompagnant',
              'Spa et Thermalisme: 300€/an',
              'Conciergerie santé'
            ],
            guarantees: {
              optique: '500€/an',
              dentaire: '400%',
              hospitalisation: 'Suite privée',
              thermalisme: '300€/an'
            }
          }
        ])
        setLoading(false)
      }, 1500)
    }
  }, [isOpen])

  const handleCompareOffers = () => {
    setShowComparator(true)
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    return 'text-orange-600'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-purple-600" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Comparateur Oggo Data
              </span>
            </div>
            <Badge variant="outline">
              {prospect.name} - {prospect.age} ans
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Recherche des meilleures offres senior...</p>
              <p className="text-sm text-gray-500">Analyse en cours avec Oggo Data</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Informations prospect */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {prospect.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{prospect.name}</h3>
                      <p className="text-gray-600">Âge: {prospect.age} ans</p>
                    </div>
                  </div>
                  
                  {prospect.health_situation && (
                    <div className="text-right">
                      <Badge className={getUrgencyColor(prospect.health_situation.urgency_level)}>
                        Urgence: {prospect.health_situation.urgency_level === 'high' ? 'Élevée' : 
                                 prospect.health_situation.urgency_level === 'medium' ? 'Modérée' : 'Faible'}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        Budget: {prospect.health_situation.budget_range}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleCompareOffers}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Comparateur Interactif
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Appeler le prospect
              </Button>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir sur Oggo.fr
              </Button>
            </div>

            {/* Offres recommandées */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {offers.map((offer, index) => (
                <Card key={offer.id} className={`hover:shadow-lg transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-purple-200 bg-gradient-to-b from-purple-50 to-white' : ''
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {offer.provider}
                          {index === 0 && <Star className="h-5 w-5 text-yellow-500" />}
                        </CardTitle>
                        <Badge className={`mt-2 ${offer.coverage === 'Premium' || offer.coverage === 'Excellence' ? 
                          'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {offer.coverage}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {offer.monthlyPrice}€
                        </div>
                        <p className="text-sm text-gray-600">/mois</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Score Oggo</span>
                      <span className={`text-lg font-bold ${getScoreColor(offer.score)}`}>
                        {offer.score}/100
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Garanties principales:</h4>
                      <div className="space-y-1">
                        {offer.advantages.slice(0, 3).map((advantage, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <Eye className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                        <div className="font-medium">{offer.guarantees.optique}</div>
                        <div className="text-gray-600">Optique</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <Shield className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <div className="font-medium">{offer.guarantees.dentaire}</div>
                        <div className="text-gray-600">Dentaire</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                      <Button 
                        className={`w-full ${index === 0 ? 
                          'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 
                          'bg-gray-600 hover:bg-gray-700'}`}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Proposer cette offre
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Voir détails complets
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recommandations IA */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-800">
                  <Heart className="h-5 w-5" />
                  Recommandations Personnalisées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-indigo-700">
                  <p>• <strong>Pour son âge ({prospect.age} ans)</strong>: Privilégier les garanties optiques et dentaires renforcées</p>
                  <p>• <strong>Profil senior actif</strong>: Les garanties médecines douces et prévention sont recommandées</p>
                  <p>• <strong>Budget optimisé</strong>: L&apos;offre Harmonie Mutuelle offre le meilleur rapport qualité/prix</p>
                  <p>• <strong>Urgence</strong>: Possibilité d&apos;adhésion immédiate pour toutes ces offres</p>
                </div>
              </CardContent>
            </Card>

            {/* Comparateur iframe intégré */}
            {showComparator && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Comparateur Interactif Oggo Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div 
                      id="oggodata-icomparator-health" 
                      style={{width: '100%', height: '600px', border: '1px solid #e2e8f0', borderRadius: '8px'}}
                      className="bg-white"
                    >
                      {/* Simulation du comparateur Oggo */}
                      <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                            O
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Comparateur Oggo Data</h3>
                          <p className="text-gray-600 mb-4">Interface de comparaison interactive</p>
                          <div className="text-sm text-gray-500">
                            <p>Framework intégré pour {prospect.name}</p>
                            <p>Âge: {prospect.age} ans - Comparaison en temps réel</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <script src="https://cks.oggo-data.net/icomparator/health.js" type="text/javascript"></script>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
