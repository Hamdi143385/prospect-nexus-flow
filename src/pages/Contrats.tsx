
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download,
  DollarSign,
  TrendingUp,
  Building2,
  Calendar,
  Eye
} from 'lucide-react'

export default function Contrats() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCompagnie, setSelectedCompagnie] = useState('all')
  const [selectedStatut, setSelectedStatut] = useState('all')

  const contrats = [
    {
      id: 1,
      client: 'Martin Dubois',
      compagnie: 'Malakoff Humanis',
      produit: 'Santé Senior Premium',
      primeMensuelle: 245,
      commission: 490,
      statut: 'Actif',
      dateSignature: '2024-01-15',
      commercial: 'Jean Dupont',
      renouvellement: '2025-01-15'
    },
    {
      id: 2,
      client: 'Sophie Laurent',
      compagnie: 'Allianz',
      produit: 'TNS Santé Pro',
      primeMensuelle: 189,
      commission: 378,
      statut: 'Actif',
      dateSignature: '2024-01-12',
      commercial: 'Marie Martin',
      renouvellement: '2025-01-12'
    },
    {
      id: 3,
      client: 'Pierre Moreau',
      compagnie: 'AXA',
      produit: 'Santé Senior Essentiel',
      primeMensuelle: 156,
      commission: 312,
      statut: 'En cours',
      dateSignature: '2024-01-10',
      commercial: 'Jean Dupont',
      renouvellement: '2025-01-10'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800'
      case 'En cours': return 'bg-yellow-100 text-yellow-800'
      case 'Suspendu': return 'bg-red-100 text-red-800'
      case 'Résilié': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const filteredContrats = contrats.filter(contrat => {
    const matchesSearch = contrat.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrat.produit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCompagnie = selectedCompagnie === 'all' || contrat.compagnie === selectedCompagnie
    const matchesStatut = selectedStatut === 'all' || contrat.statut === selectedStatut
    return matchesSearch && matchesCompagnie && matchesStatut
  })

  const totalPrimes = contrats.reduce((sum, contrat) => sum + contrat.primeMensuelle, 0)
  const totalCommissions = contrats.reduce((sum, contrat) => sum + contrat.commission, 0)
  const contratsActifs = contrats.filter(c => c.statut === 'Actif').length

  return (
    <div className="space-y-6">
      {/* KPIs Contrats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contrats Actifs</p>
                <p className="text-2xl font-bold">{contratsActifs}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Primes Mensuelles</p>
                <p className="text-2xl font-bold">€{totalPrimes.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commissions</p>
                <p className="text-2xl font-bold">€{totalCommissions.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA Annuel</p>
                <p className="text-2xl font-bold">€{(totalPrimes * 12).toLocaleString()}</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-500" />
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
              placeholder="Rechercher contrats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedCompagnie} onValueChange={setSelectedCompagnie}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Compagnie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes compagnies</SelectItem>
              <SelectItem value="Malakoff Humanis">Malakoff Humanis</SelectItem>
              <SelectItem value="Allianz">Allianz</SelectItem>
              <SelectItem value="AXA">AXA</SelectItem>
              <SelectItem value="Generali">Generali</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatut} onValueChange={setSelectedStatut}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="Actif">Actif</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Suspendu">Suspendu</SelectItem>
              <SelectItem value="Résilié">Résilié</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600">
            <Plus className="h-4 w-4" />
            Nouveau Contrat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contrats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contrats">Contrats</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="contrats" className="space-y-4">
          <div className="grid gap-4">
            {filteredContrats.map((contrat) => (
              <Card key={contrat.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {contrat.client.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{contrat.client}</h3>
                        <p className="text-gray-600">{contrat.produit}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{contrat.compagnie}</span>
                          <span>Commercial: {contrat.commercial}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">
                          €{contrat.primeMensuelle}
                        </div>
                        <p className="text-xs text-gray-500">Prime/mois</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">
                          €{contrat.commission}
                        </div>
                        <p className="text-xs text-gray-500">Commission</p>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={getStatusColor(contrat.statut)}>
                          {contrat.statut}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Signé le {contrat.dateSignature}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span><strong>Renouvellement:</strong> {contrat.renouvellement}</span>
                      <span className="text-gray-500">
                        CA annuel: €{(contrat.primeMensuelle * 12).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Commissions par Compagnie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { compagnie: 'Malakoff Humanis', contrats: 15, commission: 7350, pourcentage: 35 },
                    { compagnie: 'Allianz', contrats: 12, commission: 4536, pourcentage: 28 },
                    { compagnie: 'AXA', contrats: 8, commission: 2496, pourcentage: 22 },
                    { compagnie: 'Generali', contrats: 6, commission: 1872, pourcentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{item.compagnie}</span>
                        <p className="text-sm text-gray-600">{item.contrats} contrats</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          €{item.commission.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">{item.pourcentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Commerciale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { commercial: 'Jean Dupont', contrats: 18, commission: 8964, performance: 'Excellent' },
                    { commercial: 'Marie Martin', contrats: 14, commission: 5586, performance: 'Très bon' },
                    { commercial: 'Pierre Lambert', contrats: 9, commission: 2704, performance: 'Bon' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{item.commercial}</span>
                        <p className="text-sm text-gray-600">{item.contrats} contrats</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          €{item.commission.toLocaleString()}
                        </div>
                        <Badge className={
                          item.performance === 'Excellent' ? 'bg-green-100 text-green-800' :
                          item.performance === 'Très bon' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {item.performance}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution Mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+15%</div>
                    <p className="text-sm text-gray-600">Croissance vs mois dernier</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Nouveaux contrats</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Renouvellements</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Résiliations</span>
                      <span className="font-semibold text-red-600">2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux de Rétention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">94%</div>
                    <p className="text-sm text-gray-600">Taux de rétention annuel</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Objectif: 95% (Très proche!)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Panier Moyen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">€197</div>
                    <p className="text-sm text-gray-600">Prime mensuelle moyenne</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Senior Premium</span>
                      <span className="font-semibold">€245</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TNS</span>
                      <span className="font-semibold">€189</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Essentiel</span>
                      <span className="font-semibold">€156</span>
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
