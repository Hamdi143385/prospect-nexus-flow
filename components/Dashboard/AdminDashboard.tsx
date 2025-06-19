
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  Target, 
  Mail, 
  BarChart3, 
  Settings,
  UserPlus,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 24,
    activeProspects: 1247,
    monthlyRevenue: 450000,
    conversionRate: 18.5,
    campaignsActive: 8
  })

  const [salesData] = useState([
    { month: 'Jan', revenue: 65000, prospects: 180, conversions: 32 },
    { month: 'Fév', revenue: 78000, prospects: 210, conversions: 38 },
    { month: 'Mar', revenue: 82000, prospects: 195, conversions: 41 },
    { month: 'Avr', revenue: 91000, prospects: 240, conversions: 45 },
    { month: 'Mai', revenue: 87000, prospects: 220, conversions: 39 },
    { month: 'Jun', revenue: 95000, prospects: 260, conversions: 48 }
  ])

  const [teamPerformance] = useState([
    { name: 'Jean Dupont', prospects: 45, conversions: 12, revenue: 125000, score: 92 },
    { name: 'Marie Martin', prospects: 38, conversions: 9, revenue: 89000, score: 85 },
    { name: 'Pierre Lambert', prospects: 52, conversions: 15, revenue: 156000, score: 96 },
    { name: 'Sophie Durand', prospects: 41, conversions: 8, revenue: 98000, score: 78 }
  ])

  const segmentData = [
    { name: 'Senior Premium', value: 45, color: '#8B5CF6' },
    { name: 'Senior Standard', value: 35, color: '#3B82F6' },
    { name: 'Premium', value: 15, color: '#10B981' },
    { name: 'Standard', value: 5, color: '#F59E0B' }
  ]

  return (
    <div className="space-y-6">
      {/* Header avec métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold">{metrics.totalUsers}</p>
                <p className="text-blue-100 text-xs">+3 ce mois</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Prospects Actifs</p>
                <p className="text-2xl font-bold">{metrics.activeProspects.toLocaleString()}</p>
                <p className="text-green-100 text-xs">+12% ce mois</p>
              </div>
              <Target className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">CA Mensuel</p>
                <p className="text-2xl font-bold">€{(metrics.monthlyRevenue / 1000).toFixed(0)}K</p>
                <p className="text-purple-100 text-xs">+18% ce mois</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Taux Conversion</p>
                <p className="text-2xl font-bold">{metrics.conversionRate}%</p>
                <p className="text-orange-100 text-xs">+2.1% ce mois</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Campagnes Actives</p>
                <p className="text-2xl font-bold">{metrics.campaignsActive}</p>
                <p className="text-pink-100 text-xs">4 en cours</p>
              </div>
              <Mail className="h-8 w-8 text-pink-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="team">Équipe</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Évolution des ventes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Évolution des Performances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `€${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Chiffre d&apos;affaires' : 
                        name === 'prospects' ? 'Prospects' : 'Conversions'
                      ]}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="prospects" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Répartition par segment */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition Prospects Seniors</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Objectifs globaux */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objectifs Trimestriels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Chiffre d&apos;Affaires</span>
                    <span className="text-sm text-gray-600">€1.2M / €1.5M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">80% réalisé</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Nouveaux Prospects</span>
                    <span className="text-sm text-gray-600">3,240 / 4,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">81% réalisé</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Taux Conversion</span>
                    <span className="text-sm text-gray-600">18.5% / 20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">92% réalisé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Performance de l&apos;Équipe</h3>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Ajouter Commercial
            </Button>
          </div>

          <div className="grid gap-4">
            {teamPerformance.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{member.name}</h4>
                        <Badge className={`${member.score >= 90 ? 'bg-green-100 text-green-800' : 
                                          member.score >= 80 ? 'bg-blue-100 text-blue-800' : 
                                          'bg-yellow-100 text-yellow-800'}`}>
                          Score: {member.score}/100
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        €{(member.revenue / 1000).toFixed(0)}K
                      </div>
                      <p className="text-sm text-gray-600">Chiffre d&apos;affaires</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{member.prospects}</div>
                      <div className="text-sm text-gray-600">Prospects</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{member.conversions}</div>
                      <div className="text-sm text-gray-600">Conversions</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-600">
                        {((member.conversions / member.prospects) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Taux conversion</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${member.score}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Marketing Automation Seniors</h3>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600">
              <Mail className="h-4 w-4 mr-2" />
              Nouvelle Campagne
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campagnes Actives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Séquence Senior Premium</h4>
                    <p className="text-sm text-gray-600">Relance prospects 65+ ans</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Nurturing Mutuelle Santé</h4>
                    <p className="text-sm text-gray-600">Éducation produits seniors</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Réactivation Prospects</h4>
                    <p className="text-sm text-gray-600">Relance prospects dormants</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Planifiée</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Emails envoyés ce mois</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taux d&apos;ouverture moyen</span>
                    <span className="font-semibold text-green-600">24.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taux de clic moyen</span>
                    <span className="font-semibold text-blue-600">8.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversions générées</span>
                    <span className="font-semibold text-purple-600">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI campagnes</span>
                    <span className="font-semibold text-orange-600">340%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Gestion Utilisateurs
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Target className="h-6 w-6 mb-2" />
                  Objectifs & KPIs
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Mail className="h-6 w-6 mb-2" />
                  Templates Email
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Activity className="h-6 w-6 mb-2" />
                  Intégrations API
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
