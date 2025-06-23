
'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  Plus, 
  Search,
  Edit,
  Eye,
  Copy,
  BarChart3,
  Send
} from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  category: 'Prospection' | 'Suivi' | 'Relance' | 'Information'
  isActive: boolean
  usageCount: number
  lastUsed: string
  variables: string[]
}

export default function EmailTemplates() {
  const [templates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Première prise de contact senior',
      subject: 'Découvrez nos solutions mutuelle adaptées aux seniors',
      content: `Bonjour {{prenom}} {{nom}},

J'espère que ce message vous trouve en bonne santé.

Je me permets de vous contacter car j'ai vu que vous recherchiez des informations sur les mutuelles santé adaptées aux seniors.

Chez Premunia, nous sommes spécialisés dans l'accompagnement des personnes de plus de 60 ans pour trouver la mutuelle qui correspond vraiment à leurs besoins et à leur budget.

Nos avantages :
- Couverture spécialisée seniors (optique, dentaire, hospitalisation)
- Tarifs préférentiels pour les +60 ans
- Service client dédié et bienveillant
- Remboursements rapides

Seriez-vous disponible pour un échange téléphonique de 15 minutes cette semaine ? Je pourrais vous présenter nos offres et répondre à toutes vos questions.

Bien cordialement,
{{commercial_nom}}
{{commercial_telephone}}`,
      category: 'Prospection',
      isActive: true,
      usageCount: 45,
      lastUsed: '2024-01-22',
      variables: ['prenom', 'nom', 'commercial_nom', 'commercial_telephone']
    },
    {
      id: '2',
      name: 'Suivi après devis',
      subject: 'Suite à votre demande de devis mutuelle',
      content: `Bonjour {{prenom}},

J'espère que vous avez pu prendre le temps d'examiner le devis personnalisé que je vous ai envoyé le {{date_devis}}.

Pour rappel, notre proposition inclut :
- {{garanties_principales}}
- Un tarif mensuel de {{montant_mensuel}}€
- Une prise d'effet possible dès le {{date_effet}}

Avez-vous des questions sur les garanties proposées ? Souhaitez-vous que nous ajustions certains éléments pour mieux correspondre à vos attentes ?

Je reste à votre disposition pour tout échange.

Cordialement,
{{commercial_nom}}`,
      category: 'Suivi',
      isActive: true,
      usageCount: 32,
      lastUsed: '2024-01-21',
      variables: ['prenom', 'date_devis', 'garanties_principales', 'montant_mensuel', 'date_effet', 'commercial_nom']
    },
    {
      id: '3',
      name: 'Relance après présentation',
      subject: 'Votre projet mutuelle santé',
      content: `Bonjour {{prenom}},

Suite à notre échange du {{date_rdv}}, j'espère que notre présentation des solutions Premunia a répondu à vos attentes.

Comme convenu, je vous recontacte pour connaître votre décision concernant :
{{recap_proposition}}

N'hésitez pas si vous avez besoin de précisions complémentaires ou si vous souhaitez ajuster certains éléments.

Dans l'attente de votre retour.

Bien à vous,
{{commercial_nom}}`,
      category: 'Relance',
      isActive: true,
      usageCount: 28,
      lastUsed: '2024-01-20',
      variables: ['prenom', 'date_rdv', 'recap_proposition', 'commercial_nom']
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [showPreview, setShowPreview] = useState(false)

  const categories = ['Toutes', 'Prospection', 'Suivi', 'Relance', 'Information']

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Toutes' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prospection': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Suivi': return 'bg-green-100 text-green-800 border-green-200'
      case 'Relance': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Information': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Modèles d'Emails</h1>
          <p className="text-gray-600 mt-1">Gérez vos templates d'emails commerciaux</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Modèle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Modèles</p>
                <p className="text-2xl font-bold text-gray-800">{templates.length}</p>
              </div>
              <Mail className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Modèles Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {templates.filter(t => t.isActive).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilisations Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {templates.reduce((sum, t) => sum + t.usageCount, 0)}
                </p>
              </div>
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Moy. Utilisation</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(templates.reduce((sum, t) => sum + t.usageCount, 0) / templates.length)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Templates List */}
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher un modèle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate?.id === template.id ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category}
                      </Badge>
                      {template.isActive ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Actif
                        </Badge>
                      ) : (
                        <Badge variant="outline">Inactif</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Utilisé {template.usageCount} fois</span>
                    <span>Modifié le {new Date(template.lastUsed).toLocaleDateString('fr-FR')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Template Preview/Editor */}
        <div className="space-y-4">
          {selectedTemplate ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{selectedTemplate.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={showPreview ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => setShowPreview(false)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Éditer
                    </Button>
                    <Button
                      variant={showPreview ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowPreview(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Aperçu
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showPreview ? (
                    // Editor Mode
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom du modèle</label>
                        <Input value={selectedTemplate.name} />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Objet</label>
                        <Input value={selectedTemplate.subject} />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Contenu</label>
                        <Textarea 
                          value={selectedTemplate.content}
                          rows={12}
                          className="font-mono text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Variables disponibles</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.variables.map(variable => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {`{{${variable}}}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    // Preview Mode
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="bg-white p-4 rounded border shadow-sm">
                        <div className="border-b pb-2 mb-4">
                          <strong>Objet:</strong> {selectedTemplate.subject}
                        </div>
                        <div className="whitespace-pre-wrap text-sm">
                          {selectedTemplate.content}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Dupliquer
                      </Button>
                      <Button variant="outline" size="sm">
                        Tester
                      </Button>
                    </div>
                    <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                      Sauvegarder
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Usage Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistiques d'utilisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nombre d'utilisations</span>
                      <span className="font-medium">{selectedTemplate.usageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Dernière utilisation</span>
                      <span className="font-medium">
                        {new Date(selectedTemplate.lastUsed).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Catégorie</span>
                      <Badge className={getCategoryColor(selectedTemplate.category)}>
                        {selectedTemplate.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sélectionnez un modèle</h3>
                <p className="text-gray-600">Choisissez un modèle dans la liste pour le prévisualiser ou l'éditer.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
