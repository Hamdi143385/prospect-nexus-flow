
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Building, Mail, Phone, Eye, Users } from 'lucide-react'
import { useProspects } from '@/hooks/useSupabase'
import ProspectProfile from './ProspectProfile'

export default function ProspectsWithComparator() {
  const { prospects, loading } = useProspects()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProspectId, setSelectedProspectId] = useState<string | null>(null)

  const filteredProspects = prospects.filter(prospect =>
    prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header avec recherche */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau prospect
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total prospects</p>
                <p className="text-2xl font-bold">{prospects.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects Senior</p>
                <p className="text-2xl font-bold">
                  {prospects.filter(p => p.segment === 'Senior').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Score moyen</p>
                <p className="text-2xl font-bold">
                  {prospects.length > 0 ? Math.round(prospects.reduce((acc, p) => acc + p.score, 0) / prospects.length) : 0}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA potentiel</p>
                <p className="text-2xl font-bold">
                  €{Math.round(prospects.reduce((acc, p) => acc + (p.revenue_potential || 0), 0) / 1000)}K
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des prospects */}
      <Card>
        <CardHeader>
          <CardTitle>Prospects avec Comparateur Intégré ({filteredProspects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProspects.map((prospect) => (
              <div
                key={prospect.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{prospect.name}</h3>
                      <Badge className={getSegmentColor(prospect.segment)}>
                        {prospect.segment}
                      </Badge>
                      <Badge className={getStatusColor(prospect.status)}>
                        {prospect.status}
                      </Badge>
                      {prospect.age && (
                        <Badge variant="outline">
                          {prospect.age} ans
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {prospect.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {prospect.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-lg font-bold text-green-600">
                      €{prospect.revenue_potential?.toLocaleString() || 0}
                    </div>
                    <p className="text-sm text-gray-600">Score: {prospect.score}/100</p>
                    <Button 
                      onClick={() => setSelectedProspectId(prospect.id)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Voir & Comparer
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredProspects.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun prospect trouvé pour &quot;{searchTerm}&quot;
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal ProspectProfile avec comparateur */}
      {selectedProspectId && (
        <ProspectProfile 
          prospectId={selectedProspectId}
          isOpen={!!selectedProspectId}
          onClose={() => setSelectedProspectId(null)}
        />
      )}
    </div>
  )
}
