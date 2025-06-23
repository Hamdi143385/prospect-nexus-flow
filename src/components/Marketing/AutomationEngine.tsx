
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Users, Calendar, Zap } from 'lucide-react'

export default function AutomationEngine() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Marketing Automation Seniors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">Séquences Email</h3>
                    <p className="text-sm text-gray-600">Automatisation pour seniors</p>
                  </div>
                </div>
                <Badge className="mb-2">Actif</Badge>
                <p className="text-sm text-gray-600">3 séquences en cours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-semibold">Segmentation</h3>
                    <p className="text-sm text-gray-600">Ciblage par âge</p>
                  </div>
                </div>
                <Badge variant="outline">Configuration</Badge>
                <p className="text-sm text-gray-600">2 segments définis</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">Rappels</h3>
                    <p className="text-sm text-gray-600">Suivis automatiques</p>
                  </div>
                </div>
                <Badge className="mb-2">Actif</Badge>
                <p className="text-sm text-gray-600">5 rappels programmés</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Créer une nouvelle séquence
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
