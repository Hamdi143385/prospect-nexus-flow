
import { useContacts } from '@/hooks/useContacts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, User, Phone, Mail } from 'lucide-react'

export default function ProspectsList() {
  const { contacts, loading } = useContacts()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800'
      case 'Qualifié': return 'bg-green-100 text-green-800'
      case 'En cours': return 'bg-yellow-100 text-yellow-800'
      case 'Converti': return 'bg-purple-100 text-purple-800'
      case 'Perdu': return 'bg-red-100 text-red-800'
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

  if (!contacts || contacts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun contact trouvé
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{contact.prenom} {contact.nom}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {contact.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </div>
                    )}
                    {contact.telephone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {contact.telephone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(contact.statut_lead)}>
                  {contact.statut_lead}
                </Badge>
                <div className="text-sm text-gray-500">
                  Score: {contact.score}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
