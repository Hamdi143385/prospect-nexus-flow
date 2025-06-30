
import { useCampagnes } from '@/hooks/useCampagnes'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Target, Mail } from 'lucide-react'

export default function OpportunitiesList() {
  const { campagnes, loading } = useCampagnes()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!campagnes || campagnes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune campagne trouvée
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {campagnes.map((campagne) => (
        <Card key={campagne.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{campagne.nom}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="h-3 w-3" />
                    {campagne.description || 'Pas de description'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {campagne.statut}
                </Badge>
                <div className="text-sm text-gray-500">
                  {campagne.type}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
