
import { useState } from 'react'
import { useProspects } from '@/hooks/useSupabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Plus, User, Phone, Mail } from 'lucide-react'
import CreateProspectForm from './CreateProspectForm'

export default function ProspectsList() {
  const { prospects, loading } = useProspects()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProspects = prospects?.filter(prospect =>
    prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Rechercher un prospect..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau prospect
        </Button>
      </div>

      {showCreateForm && (
        <CreateProspectForm onClose={() => setShowCreateForm(false)} />
      )}

      <div className="grid gap-4">
        {filteredProspects.map((prospect) => (
          <Card key={prospect.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{prospect.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {prospect.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(prospect.status)}>
                    {prospect.status}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    Score: {prospect.score}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProspects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun prospect trouvé
        </div>
      )}
    </div>
  )
}
