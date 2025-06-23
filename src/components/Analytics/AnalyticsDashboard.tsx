
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Target,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Sample data for charts
  const conversionData = [
    { name: 'Jan', prospects: 120, conversions: 28 },
    { name: 'Fév', prospects: 98, conversions: 25 },
    { name: 'Mar', prospects: 156, conversions: 42 },
    { name: 'Avr', prospects: 134, conversions: 38 },
    { name: 'Mai', prospects: 167, conversions: 48 },
    { name: 'Jun', prospects: 189, conversions: 55 }
  ]

  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Fév', revenue: 38000 },
    { name: 'Mar', revenue: 62000 },
    { name: 'Avr', revenue: 55000 },
    { name: 'Mai', revenue: 71000 },
    { name: 'Jun', revenue: 84000 }
  ]

  const segmentData = [
    { name: 'Seniors 60-70', value: 45, color: '#f97316' },
    { name: 'Seniors 70-80', value: 35, color: '#ec4899' },
    { name: 'Seniors 80+', value: 20, color: '#8b5cf6' }
  ]

  const teamPerformance = [
    { name: 'Jean Martin', prospects: 45, conversions: 12, revenue: 28500 },
    { name: 'Marie Dubois', prospects: 38, conversions: 15, revenue: 35200 },
    { name: 'Paul Leroy', prospects: 52, conversions: 10, revenue: 22800 },
    { name: 'Sophie Chen', prospects: 41, conversions: 18, revenue: 42100 }
  ]

  const COLORS = ['#f97316', '#ec4899', '#8b5cf6', '#06b6d4']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Analysez vos performances commerciales</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA du Mois</p>
                <p className="text-2xl font-bold text-green-600">€84,000</p>
                <p className="text-xs text-green-600 mt-1">+18.2% vs mois dernier</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nouveaux Prospects</p>
                <p className="text-2xl font-bold text-blue-600">189</p>
                <p className="text-xs text-blue-600 mt-1">+12.8% vs mois dernier</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux Conversion</p>
                <p className="text-2xl font-bold text-orange-600">29.1%</p>
                <p className="text-xs text-orange-600 mt-1">+3.2% vs mois dernier</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Panier Moyen</p>
                <p className="text-2xl font-bold text-purple-600">€1,527</p>
                <p className="text-xs text-purple-600 mt-1">+8.4% vs mois dernier</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Entonnoir de Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="prospects" fill="#f97316" name="Prospects" />
                <Bar dataKey="conversions" fill="#ec4899" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Evolution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Évolution du Chiffre d'Affaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'CA']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Répartition par Segment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Part']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {segmentData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm">{segment.name}</span>
                  </div>
                  <span className="text-sm font-medium">{segment.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance Équipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{member.name}</h4>
                    <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 border-orange-200">
                      {Math.round((member.conversions / member.prospects) * 100)}% conv.
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Prospects</p>
                      <p className="font-medium">{member.prospects}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-medium text-green-600">{member.conversions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CA</p>
                      <p className="font-medium text-blue-600">€{member.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional KPIs */}
      <Card>
        <CardHeader>
          <CardTitle>Indicateurs Détaillés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Acquisition</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Coût par prospect</span>
                  <span className="font-medium">€45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taux de qualification</span>
                  <span className="font-medium">72%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Source principale</span>
                  <span className="font-medium">Référencement</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Conversion</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cycle de vente moyen</span>
                  <span className="font-medium">18 jours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Nb contacts/prospect</span>
                  <span className="font-medium">3.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taux de relance</span>
                  <span className="font-medium">89%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Rétention</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taux de satisfaction</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Renouvellement</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Recommandation</span>
                  <span className="font-medium">76%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
