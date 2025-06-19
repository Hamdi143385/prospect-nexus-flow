
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Award,
  Zap,
  Mail,
  Phone
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

export default function AdvancedReporting() {
  const [selectedPeriod, setSelectedPeriod] = useState('quarter')
  const [selectedCommercial, setSelectedCommercial] = useState('all')

  const [globalMetrics] = useState({
    totalRevenue: 1250000,
    totalProspects: 3456,
    conversionRate: 18.5,
    averageTicket: 2850,
    seniorConversions: 245,
    automationROI: 420
  })

  const [commercialData] = useState([
    { 
      id: '1',
      name: 'Jean Dupont', 
      prospects: 145, 
      conversions: 32, 
      revenue: 185000,
      seniorFocus: 85,
      score: 94,
      activities: { calls: 89, emails: 234, meetings: 28 },
      monthlyProgress: [
        { month: 'Jan', revenue: 28000, prospects: 25, conversions: 6 },
        { month: 'Fév', revenue: 32000, prospects: 28, conversions: 7 },
        { month: 'Mar', revenue: 35000, prospects: 24, conversions: 8 },
        { month: 'Avr', revenue: 38000, prospects: 32, conversions: 6 },
        { month: 'Mai', revenue: 31000, prospects: 21, conversions: 5 },
        { month: 'Jun', revenue: 42000, prospects: 35, conversions: 9 }
      ]
    },
    { 
      id: '2',
      name: 'Marie Martin', 
      prospects: 128, 
      conversions: 28, 
      revenue: 156000,
      seniorFocus: 92,
      score: 89,
      activities: { calls: 76, emails: 198, meetings: 24 },
      monthlyProgress: [
        { month: 'Jan', revenue: 24000, prospects: 22, conversions: 5 },
        { month: 'Fév', revenue: 28000, prospects: 25, conversions: 6 },
        { month: 'Mar', revenue: 26000, prospects: 20, conversions: 4 },
        { month: 'Avr', revenue: 29000, prospects: 28, conversions: 7 },
        { month: 'Mai', revenue: 25000, prospects: 18, conversions: 3 },
        { month: 'Jun', revenue: 34000, prospects: 30, conversions: 8 }
      ]
    },
    { 
      id: '3',
      name: 'Pierre Lambert', 
      prospects: 167, 
      conversions: 38, 
      revenue: 198000,
      seniorFocus: 78,
      score: 91,
      activities: { calls: 102, emails: 267, meetings: 31 },
      monthlyProgress: [
        { month: 'Jan', revenue: 31000, prospects: 28, conversions: 7 },
        { month: 'Fév', revenue: 35000, prospects: 32, conversions: 8 },
        { month: 'Mar', revenue: 29000, prospects: 26, conversions: 5 },
        { month: 'Avr', revenue: 33000, prospects: 29, conversions: 6 },
        { month: 'Mai', revenue: 28000, prospects: 24, conversions: 4 },
        { month: 'Jun', revenue: 42000, prospects: 36, conversions: 10 }
      ]
    }
  ])

  const [segmentAnalysis] = useState([
    { segment: 'Senior Premium', prospects: 456, conversions: 89, revenue: 445000, avgAge: 68, satisfaction: 94 },
    { segment: 'Senior Standard', prospects: 678, conversions: 102, revenue: 312000, avgAge: 71, satisfaction: 88 },
    { segment: 'Premium', prospects: 234, conversions: 34, revenue: 198000, avgAge: 45, satisfaction: 91 },
    { segment: 'Standard', prospects: 189, conversions: 28, revenue: 145000, avgAge: 38, satisfaction: 85 }
  ])

  const radarData = [
    { subject: 'Prospection', A: 120, B: 110, fullMark: 150 },
    { subject: 'Conversion', A: 98, B: 130, fullMark: 150 },
    { subject: 'Senior Focus', A: 86, B: 130, fullMark: 150 },
    { subject: 'Activité', A: 99, B: 100, fullMark: 150 },
    { subject: 'Satisfaction', A: 85, B: 90, fullMark: 150 },
    { subject: 'ROI', A: 65, B: 85, fullMark: 150 }
  ]

  const getSelectedCommercialData = () => {
    if (selectedCommercial === 'all') return null
    return commercialData.find(c => c.id === selectedCommercial)
  }

  const selectedData = getSelectedCommercialData()

  return (
    <div className="space-y-6">
      {/* Header avec contrôles */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reporting Commercial Avancé
          </h1>
          <p className="text-gray-600 mt-2">
            Analytics et performance pour courtiers mutuelle santé seniors
          </p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCommercial} onValueChange={setSelectedCommercial}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les commerciaux</SelectItem>
              {commercialData.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="bg-gradient-to-r from-green-600 to-blue-600">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Globaux */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">CA Total</p>
                    <p className="text-2xl font-bold">€{(globalMetrics.totalRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-green-100 text-xs">+22% vs trim. précédent</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Prospects</p>
                    <p className="text-2xl font-bold">{globalMetrics.totalProspects.toLocaleString()}</p>
                    <p className="text-blue-100 text-xs">+15% ce trimestre</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Conversion</p>
                    <p className="text-2xl font-bold">{globalMetrics.conversionRate}%</p>
                    <p className="text-purple-100 text-xs">+3.2% ce trimestre</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Ticket Moyen</p>
                    <p className="text-2xl font-bold">€{globalMetrics.averageTicket}</p>
                    <p className="text-orange-100 text-xs">+8% ce trimestre</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-pink-100 text-sm">Seniors</p>
                    <p className="text-2xl font-bold">{globalMetrics.seniorConversions}</p>
                    <p className="text-pink-100 text-xs">conversions ce trim.</p>
                  </div>
                  <Award className="h-8 w-8 text-pink-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm">ROI Auto</p>
                    <p className="text-2xl font-bold">{globalMetrics.automationROI}%</p>
                    <p className="text-indigo-100 text-xs">marketing automation</p>
                  </div>
                  <Zap className="h-8 w-8 text-indigo-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance globale */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Évolution Trimestrielle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={commercialData[0].monthlyProgress}>
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

            <Card>
              <CardHeader>
                <CardTitle>Performance par Segment Senior</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={segmentAnalysis.filter(s => s.segment.includes('Senior'))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `€${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'CA' : 
                        name === 'conversions' ? 'Conversions' : 'Prospects'
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#8B5CF6" />
                    <Bar dataKey="conversions" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Objectifs vs Réalisé */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objectifs vs Réalisations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">CA Trimestriel</span>
                    <span className="text-sm text-gray-600">€1.25M / €1.5M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">83% réalisé - En avance</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Conversions Seniors</span>
                    <span className="text-sm text-gray-600">245 / 280</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">87% réalisé - Dans les temps</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Taux Conversion</span>
                    <span className="text-sm text-gray-600">18.5% / 20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">92% réalisé - Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commercial" className="space-y-6">
          {selectedData ? (
            // Vue détaillée d'un commercial
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedData.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedData.name}</h2>
                        <div className="flex gap-3 mt-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            Score: {selectedData.score}/100
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800">
                            Focus Senior: {selectedData.seniorFocus}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">
                        €{(selectedData.revenue / 1000).toFixed(0)}K
                      </div>
                      <p className="text-gray-600">Chiffre d&apos;affaires</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedData.prospects}</div>
                    <div className="text-sm text-gray-600">Prospects traités</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedData.conversions}</div>
                    <div className="text-sm text-gray-600">Conversions</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {((selectedData.conversions / selectedData.prospects) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">Taux conversion</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      €{Math.round(selectedData.revenue / selectedData.conversions).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Ticket moyen</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution Mensuelle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={selectedData.monthlyProgress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                        <Line type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activités Commerciales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Appels effectués</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{selectedData.activities.calls}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Emails envoyés</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">{selectedData.activities.emails}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">RDV planifiés</span>
                      </div>
                      <span className="text-xl font-bold text-purple-600">{selectedData.activities.meetings}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Vue comparative de tous les commerciaux
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Performance de l&apos;Équipe Commerciale</h3>
              
              <div className="grid gap-4">
                {commercialData.map((commercial, index) => (
                  <Card key={commercial.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {commercial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{commercial.name}</h4>
                            <div className="flex gap-2 mt-1">
                              <Badge className={`${commercial.score >= 90 ? 'bg-green-100 text-green-800' : 
                                                commercial.score >= 85 ? 'bg-blue-100 text-blue-800' : 
                                                'bg-yellow-100 text-yellow-800'}`}>
                                Score: {commercial.score}/100
                              </Badge>
                              <Badge variant="outline">
                                Senior Focus: {commercial.seniorFocus}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            €{(commercial.revenue / 1000).toFixed(0)}K
                          </div>
                          <p className="text-sm text-gray-600">CA trimestriel</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-center text-sm">
                        <div>
                          <div className="text-xl font-bold text-blue-600">{commercial.prospects}</div>
                          <div className="text-gray-600">Prospects</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-purple-600">{commercial.conversions}</div>
                          <div className="text-gray-600">Conversions</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-orange-600">
                            {((commercial.conversions / commercial.prospects) * 100).toFixed(1)}%
                          </div>
                          <div className="text-gray-600">Taux conversion</div>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-green-600">
                            €{Math.round(commercial.revenue / commercial.conversions).toLocaleString()}
                          </div>
                          <div className="text-gray-600">Ticket moyen</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${commercial.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance par Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={segmentAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `€${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Chiffre d&apos;affaires' : 'Conversions'
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#8B5CF6" />
                    <Bar dataKey="conversions" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyse Radar Commercial</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 150]} />
                    <Radar name="Performance A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Radar name="Performance B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segmentAnalysis.map((segment) => (
              <Card key={segment.segment} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{segment.segment}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Prospects:</span>
                    <span className="font-semibold">{segment.prospects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conversions:</span>
                    <span className="font-semibold text-green-600">{segment.conversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">CA:</span>
                    <span className="font-semibold text-blue-600">€{(segment.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Âge moyen:</span>
                    <span className="font-semibold">{segment.avgAge} ans</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Satisfaction:</span>
                    <span className="font-semibold text-purple-600">{segment.satisfaction}%</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(segment.conversions / segment.prospects) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Taux conversion: {((segment.conversions / segment.prospects) * 100).toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Marketing Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <div className="text-sm text-gray-600">Emails envoyés</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">27.3%</div>
                  <div className="text-sm text-gray-600">Taux ouverture</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8.9%</div>
                  <div className="text-sm text-gray-600">Taux de clic</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">420%</div>
                  <div className="text-sm text-gray-600">ROI</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Séquences Seniors Actives</h4>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-medium">Séquence Senior Premium</h5>
                      <p className="text-sm text-gray-600">Prospects 65+ avec budget élevé</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm text-center">
                    <div>
                      <div className="font-semibold">456</div>
                      <div className="text-gray-600">Envoyés</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600">32.1%</div>
                      <div className="text-gray-600">Ouverture</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">12.4%</div>
                      <div className="text-gray-600">Clic</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-600">28</div>
                      <div className="text-gray-600">Conversions</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-medium">Nurturing Santé Senior</h5>
                      <p className="text-sm text-gray-600">Éducation produits mutuelle senior</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm text-center">
                    <div>
                      <div className="font-semibold">789</div>
                      <div className="text-gray-600">Envoyés</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600">24.8%</div>
                      <div className="text-gray-600">Ouverture</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">7.2%</div>
                      <div className="text-gray-600">Clic</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-600">35</div>
                      <div className="text-gray-600">Conversions</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Prédictions IA & Recommandations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Prévision Optimiste</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">€1.8M</div>
                  <p className="text-sm text-green-700">CA prévu fin année si tendance maintenue</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Prévision Réaliste</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">€1.6M</div>
                  <p className="text-sm text-blue-700">Basé sur les tendances actuelles</p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Prévision Prudente</h4>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">€1.4M</div>
                  <p className="text-sm text-yellow-700">Scénario conservateur</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-4">Recommandations IA pour Seniors</h4>
                <div className="space-y-3 text-indigo-700">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p><strong>Segment Senior Premium</strong>: Augmenter l&apos;effort sur ce segment (ROI +45% vs autres)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p><strong>Timing optimal</strong>: Les seniors répondent mieux entre 9h-11h et 14h-16h</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p><strong>Contenu</strong>: Mettre en avant sécurité et garanties santé spécialisées</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p><strong>Automation</strong>: Réduire la fréquence à 2 emails/semaine pour ce segment</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
