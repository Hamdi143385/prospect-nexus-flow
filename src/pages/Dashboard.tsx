
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign, 
  BarChart3,
  Activity,
  FileText,
  Zap,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Dashboard() {
  const kpis = [
    {
      title: 'Prospects Actifs',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Contrats Mois',
      value: '€245K',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Taux Conversion',
      value: '18.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      title: 'CPL Moyen',
      value: '€127',
      change: '-8%',
      trend: 'down',
      icon: BarChart3,
      color: 'orange'
    }
  ]

  const salesData = [
    { month: 'Jan', revenue: 165000, prospects: 180, contrats: 32 },
    { month: 'Fév', revenue: 178000, prospects: 210, contrats: 38 },
    { month: 'Mar', revenue: 182000, prospects: 195, contrats: 41 },
    { month: 'Avr', revenue: 191000, prospects: 240, contrats: 45 },
    { month: 'Mai', revenue: 187000, prospects: 220, contrats: 39 },
    { month: 'Jun', revenue: 245000, prospects: 260, contrats: 48 }
  ]

  const compagniesData = [
    { name: 'Malakoff Humanis', value: 35, color: '#3B82F6' },
    { name: 'Allianz', value: 28, color: '#10B981' },
    { name: 'AXA', value: 22, color: '#8B5CF6' },
    { name: 'Generali', value: 15, color: '#F59E0B' }
  ]

  const insightsIA = [
    {
      type: 'Opportunité',
      title: 'Pic d\'activité Senior détecté',
      description: 'Augmentation de 23% des prospects 65+ ans cette semaine',
      action: 'Activer campagne Senior Premium'
    },
    {
      type: 'Alerte',
      title: 'Baisse conversion TNS',
      description: 'Taux de conversion TNS en baisse de 12% vs. mois dernier',
      action: 'Réviser stratégie pricing TNS'
    },
    {
      type: 'Recommandation',
      title: 'Optimisation relances',
      description: 'Meilleur taux de réponse le mardi 14h-16h',
      action: 'Planifier campagnes mardi après-midi'
    }
  ]

  return (
    <div className="space-y-6">
      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-${kpi.color}-100`}>
                    <Icon className={`h-6 w-6 text-${kpi.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Commerciale
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
                    name === 'revenue' ? 'Chiffre d\'affaires' : 
                    name === 'prospects' ? 'Prospects' : 'Contrats'
                  ]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="prospects" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="contrats" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par compagnie */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition Contrats par Compagnie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={compagniesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {compagniesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Insights IA - Recommandations Temps Réel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insightsIA.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={`${
                      insight.type === 'Opportunité' ? 'bg-green-100 text-green-800' :
                      insight.type === 'Alerte' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {insight.type}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activités Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Prospect', action: 'Nouveau prospect Senior ajouté', time: 'Il y a 5 min', color: 'blue' },
                { type: 'Contrat', action: 'Contrat Malakoff signé - €2,400', time: 'Il y a 12 min', color: 'green' },
                { type: 'Relance', action: 'Relance TNS envoyée (15 prospects)', time: 'Il y a 25 min', color: 'purple' },
                { type: 'Tâche', action: 'Rappel client programmé', time: 'Il y a 1h', color: 'orange' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`w-2 h-2 rounded-full bg-${activity.color}-500`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Objectifs du Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Prospects Seniors</span>
                  <span className="text-sm text-gray-600">180 / 200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">CA Contrats TNS</span>
                  <span className="text-sm text-gray-600">€245K / €280K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Taux Conversion</span>
                  <span className="text-sm text-gray-600">18.5% / 20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
