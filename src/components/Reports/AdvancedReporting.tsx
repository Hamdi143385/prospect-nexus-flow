
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function AdvancedReporting() {
  return (
    <div className="space-y-6">
      {/* KPIs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Senior</p>
                <p className="text-2xl font-bold text-green-600">23.4%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA Moyen/Client</p>
                <p className="text-2xl font-bold text-blue-600">€2,847</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects 65+</p>
                <p className="text-2xl font-bold text-purple-600">187</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux Ouverture</p>
                <p className="text-2xl font-bold text-orange-600">67.2%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Rapports Détaillés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Performance Commerciale Q4</h3>
                <p className="text-sm text-gray-600">Analyse des ventes par commercial et segment senior</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Mensuel</Badge>
                <Button variant="outline" size="sm">Télécharger</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Efficacité Marketing Automation</h3>
                <p className="text-sm text-gray-600">ROI des campagnes et séquences email seniors</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Hebdomadaire</Badge>
                <Button variant="outline" size="sm">Télécharger</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Analyse Comparative Oggo</h3>
                <p className="text-sm text-gray-600">Performance des offres recommandées vs converties</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Temps réel</Badge>
                <Button variant="outline" size="sm">Voir</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
