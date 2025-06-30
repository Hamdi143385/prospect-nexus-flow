
import { useOpportunities } from '@/hooks/useSupabase'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Target, Euro } from 'lucide-react'

export default function OpportunitiesList() {
  const { opportunities, loading } = useOpportunities()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune opportunité trouvée
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{opportunity.produit || 'Opportunité'}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Euro className="h-3 w-3" />
                    {opportunity.montant_mensuel ? `${opportunity.montant_mensuel}€/mois` : 'Montant non défini'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {opportunity.statut}
                </Badge>
                <div className="text-sm text-gray-500">
                  {opportunity.compagnie || 'Non assigné'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
