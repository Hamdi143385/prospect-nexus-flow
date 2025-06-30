
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth, useProspects, useOpportunities, useMarketingCampaigns } from '@/hooks/useSupabase'
import { Users, Target, Mail, BarChart3, LogOut } from 'lucide-react'
import ProspectsList from '@/components/ProspectsList'
import OpportunitiesList from '@/components/OpportunitiesList'
import CampaignsList from '@/components/CampaignsList'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { prospects, loading: prospectsLoading } = useProspects()
  const { opportunities, loading: opportunitiesLoading } = useOpportunities()
  const { campaigns, loading: campaignsLoading } = useMarketingCampaigns()

  const handleSignOut = async () => {
    await signOut()
  }

  const totalProspects = prospects?.length || 0
  const totalOpportunities = opportunities?.length || 0
  const totalCampaigns = campaigns?.length || 0
  const conversionRate = totalOpportunities > 0 && totalProspects > 0 
    ? ((totalOpportunities / totalProspects) * 100).toFixed(1)
    : '0'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Premunia CRM</h1>
              <p className="text-sm text-gray-600">Bienvenue, {user?.name}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prospects</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProspects}</div>
              <p className="text-xs text-muted-foreground">Total des prospects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opportunités</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOpportunities}</div>
              <p className="text-xs text-muted-foreground">Opportunités actives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campagnes</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">Campagnes marketing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">Prospects → Opportunités</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prospects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prospects">Prospects</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
            <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          </TabsList>

          <TabsContent value="prospects">
            <Card>
              <CardHeader>
                <CardTitle>Liste des Prospects</CardTitle>
                <CardDescription>
                  Gérez vos prospects et leur progression dans le pipeline de vente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProspectsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>Opportunités</CardTitle>
                <CardDescription>
                  Suivez vos opportunités de vente et leur progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OpportunitiesList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Campagnes Marketing</CardTitle>
                <CardDescription>
                  Gérez vos campagnes d'email marketing et automation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
