
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Target, Calendar, Award } from 'lucide-react';

const ReportsCenter = () => {
  // Données pour les graphiques
  const salesData = [
    { month: 'Jan', prospects: 150, conversions: 12, revenue: 45000 },
    { month: 'Fév', prospects: 180, conversions: 15, revenue: 52000 },
    { month: 'Mar', prospects: 220, conversions: 18, revenue: 68000 },
    { month: 'Avr', prospects: 195, conversions: 22, revenue: 75000 },
    { month: 'Mai', prospects: 240, conversions: 19, revenue: 61000 },
    { month: 'Jun', prospects: 280, conversions: 25, revenue: 89000 },
  ];

  const segmentData = [
    { name: 'Senior', value: 35, color: '#8B5CF6' },
    { name: 'Premium', value: 45, color: '#3B82F6' },
    { name: 'Standard', value: 20, color: '#6B7280' },
  ];

  const commercialData = [
    { name: 'Jean Dupont', prospects: 45, deals: 8, revenue: 125000, conversion: 17.8 },
    { name: 'Marie Martin', prospects: 38, deals: 6, revenue: 89000, conversion: 15.8 },
    { name: 'Pierre Lambert', prospects: 52, deals: 12, revenue: 156000, conversion: 23.1 },
    { name: 'Sophie Durand', prospects: 41, deals: 7, revenue: 98000, conversion: 17.1 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA Total</p>
                <p className="text-2xl font-bold text-green-600">€390K</p>
                <p className="text-xs text-green-600">+18% vs mois dernier</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects Total</p>
                <p className="text-2xl font-bold text-blue-600">1,265</p>
                <p className="text-xs text-blue-600">+12% vs mois dernier</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deals Fermés</p>
                <p className="text-2xl font-bold text-purple-600">111</p>
                <p className="text-xs text-purple-600">+8% vs mois dernier</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux Conversion</p>
                <p className="text-2xl font-bold text-orange-600">18.5%</p>
                <p className="text-xs text-orange-600">+2.1% vs mois dernier</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution des ventes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Évolution des ventes (6 derniers mois)
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
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Répartition par segment
            </CardTitle>
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

      {/* Performance par commercial */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance par commercial
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commercialData.map((commercial, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{commercial.name}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-semibold">
                      €{commercial.revenue.toLocaleString()}
                    </span>
                    <span className="text-blue-600">
                      {commercial.conversion}% conversion
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{commercial.prospects}</div>
                    <div className="text-sm text-gray-600">Prospects traités</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{commercial.deals}</div>
                    <div className="text-sm text-gray-600">Deals fermés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      €{Math.round(commercial.revenue / 1000)}K
                    </div>
                    <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{commercial.conversion}%</div>
                    <div className="text-sm text-gray-600">Taux conversion</div>
                  </div>
                </div>
                
                {/* Barre de progression */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(commercial.conversion / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objectifs et tendances */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Objectifs mensuels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Chiffre d'affaires</span>
                  <span className="font-semibold">€390K / €450K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Nouveaux prospects</span>
                  <span className="font-semibold">280 / 300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Deals fermés</span>
                  <span className="font-semibold">25 / 30</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Prévisions Q1 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Optimiste</h4>
                <div className="text-2xl font-bold text-green-600">€1.2M</div>
                <p className="text-sm text-green-700">Si tous les deals en cours se concrétisent</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Réaliste</h4>
                <div className="text-2xl font-bold text-blue-600">€950K</div>
                <p className="text-sm text-blue-700">Basé sur les tendances actuelles</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Conservateur</h4>
                <div className="text-2xl font-bold text-yellow-600">€720K</div>
                <p className="text-sm text-yellow-700">Scénario prudent avec ajustements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsCenter;
