
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  TrendingUp
} from 'lucide-react'

interface Company {
  id: string
  name: string
  sector: string
  size: 'Startup' | 'PME' | 'ETI' | 'Grande Entreprise'
  revenue: number
  contactsCount: number
  status: 'Prospect' | 'Client' | 'Partenaire'
  location: string
  phone: string
  email: string
  website: string
  createdYear: number
}

export default function CompanyManagement() {
  const [companies] = useState<Company[]>([
    {
      id: '1',
      name: 'TechSeniors SA',
      sector: 'Technologies',
      size: 'PME',
      revenue: 2500000,
      contactsCount: 12,
      status: 'Client',
      location: 'Paris, France',
      phone: '+33 1 23 45 67 89',
      email: 'contact@techseniors.fr',
      website: 'www.techseniors.fr',
      createdYear: 2015
    },
    {
      id: '2',
      name: 'Assurance Plus',
      sector: 'Assurance',
      size: 'Grande Entreprise',
      revenue: 15000000,
      contactsCount: 45,
      status: 'Prospect',
      location: 'Lyon, France',
      phone: '+33 4 56 78 90 12',
      email: 'info@assuranceplus.fr',
      website: 'www.assuranceplus.fr',
      createdYear: 2008
    },
    {
      id: '3',
      name: 'Santé Senior',
      sector: 'Santé',
      size: 'ETI',
      revenue: 8000000,
      contactsCount: 28,
      status: 'Partenaire',
      location: 'Marseille, France',
      phone: '+33 4 91 23 45 67',
      email: 'contact@santesenior.fr',
      website: 'www.santesenior.fr',
      createdYear: 2012
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('Tous')
  const [selectedStatus, setSelectedStatus] = useState('Tous')

  const sectors = ['Tous', 'Technologies', 'Assurance', 'Santé', 'Finance', 'Immobilier']
  const statuses = ['Tous', 'Prospect', 'Client', 'Partenaire']

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.sector.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === 'Tous' || company.sector === selectedSector
    const matchesStatus = selectedStatus === 'Tous' || company.status === selectedStatus
    
    return matchesSearch && matchesSector && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Client': return 'bg-green-100 text-green-800 border-green-200'
      case 'Prospect': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Partenaire': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'Startup': return 'bg-orange-100 text-orange-800'
      case 'PME': return 'bg-blue-100 text-blue-800'
      case 'ETI': return 'bg-purple-100 text-purple-800'
      case 'Grande Entreprise': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Entreprises</h1>
          <p className="text-gray-600 mt-1">Gérez votre portefeuille d'entreprises clients et prospects</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Entreprise
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Entreprises</p>
                <p className="text-2xl font-bold text-gray-800">{companies.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clients Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {companies.filter(c => c.status === 'Client').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects</p>
                <p className="text-2xl font-bold text-blue-600">
                  {companies.filter(c => c.status === 'Prospect').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA Total</p>
                <p className="text-2xl font-bold text-purple-600">
                  €{(companies.reduce((sum, c) => sum + c.revenue, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Rechercher une entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Companies List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{company.sector}</p>
                </div>
                <Badge className={getStatusColor(company.status)}>
                  {company.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getSizeColor(company.size)} variant="outline">
                  {company.size}
                </Badge>
                <span className="text-sm font-medium text-gray-700">
                  €{(company.revenue / 1000000).toFixed(1)}M CA
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{company.contactsCount} contacts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{company.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="truncate">{company.website}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Créée en {company.createdYear}
                  </span>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucune entreprise trouvée</h3>
            <p className="text-gray-600">Aucune entreprise ne correspond à vos critères de recherche.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
