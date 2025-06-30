
import { useCampagnes } from '@/hooks/useCampagnes'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Mail, MessageSquare, Phone } from 'lucide-react'

export default function CampaignsList() {
  const { campagnes, loading } = useCampagnes()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Email': return <Mail className="h-4 w-4" />
      case 'SMS': return <MessageSquare className="h-4 w-4" />
      case 'Phone': return <Phone className="h-4 w-4" />
      default: return <Mail className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'brouillon': return 'bg-gray-100 text-gray-800'
      case 'actif': return 'bg-green-100 text-green-800'
      case 'pause': return 'bg-yellow-100 text-yellow-800'
      case 'termine': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  {getTypeIcon(campagne.type)}
                </div>
                <div>
                  <h3 className="font-semibold">{campagne.nom}</h3>
                  <div className="text-sm text-gray-600">
                    {campagne.description || 'Pas de description'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(campagne.statut)}>
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
