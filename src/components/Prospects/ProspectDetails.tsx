
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Mail, 
  Phone, 
  Star, 
  Calendar, 
  TrendingUp, 
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import OggoComparison from './OggoComparison';

interface Prospect {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  segment: 'Senior' | 'Premium' | 'Standard';
  score: number;
  status: 'Nouveau' | 'Qualifié' | 'En cours' | 'Converti';
  lastContact: string;
  revenue: number;
}

interface ProspectDetailsProps {
  prospect: Prospect;
}

const ProspectDetails = ({ prospect }: ProspectDetailsProps) => {
  const [showOggoComparison, setShowOggoComparison] = useState(false);

  const activities = [
    { date: '2024-01-15', type: 'Email', description: 'Email de qualification envoyé', status: 'Ouvert' },
    { date: '2024-01-14', type: 'Appel', description: 'Appel de découverte', status: 'Réalisé' },
    { date: '2024-01-13', type: 'Import', description: 'Prospect importé depuis HubSpot', status: 'Complété' },
  ];

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Senior': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Réalisé':
      case 'Complété':
      case 'Ouvert':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'En cours':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec informations principales */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{prospect.name}</h1>
          <p className="text-lg text-gray-600 flex items-center gap-2 mt-1">
            <Building className="h-5 w-5" />
            {prospect.company}
          </p>
          <div className="flex gap-2 mt-3">
            <Badge className={getSegmentColor(prospect.segment)}>
              {prospect.segment}
            </Badge>
            <Badge variant="outline">
              Score: {prospect.score}/100
            </Badge>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            €{prospect.revenue.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">Chiffre d'affaires potentiel</p>
          <Button 
            className="mt-3 bg-purple-600 hover:bg-purple-700"
            onClick={() => setShowOggoComparison(true)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Comparer Oggo
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="scoring">Scoring IA</TabsTrigger>
          <TabsTrigger value="activities">Activités</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{prospect.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{prospect.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Dernier contact: {prospect.lastContact}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Métriques de performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Score de qualification:</span>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">{prospect.score}/100</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Statut:</span>
                  <Badge className="bg-blue-100 text-blue-800">{prospect.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Probabilité de conversion:</span>
                  <span className="font-semibold text-green-600">
                    {Math.round(prospect.score * 0.85)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse IA du scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Points forts détectés</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Entreprise en croissance dans le secteur tech</li>
                    <li>• Profil décisionnel confirmé</li>
                    <li>• Budget estimé compatible avec notre offre</li>
                    <li>• Timing favorable (fin d'année fiscale)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Points d'attention</h4>
                  <ul className="space-y-1 text-yellow-700">
                    <li>• Pas encore de réponse à l'email de qualification</li>
                    <li>• Concurrence identifiée sur le marché</li>
                    <li>• Cycle de vente estimé: 3-6 mois</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Recommandations IA</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• Programmer un appel de découverte dans les 48h</li>
                    <li>• Préparer une démonstration personnalisée</li>
                    <li>• Envoyer un ROI calculator adapté au secteur</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des activités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{activity.type}</span>
                        <span className="text-sm text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{activity.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Séquences de marketing automation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Séquence Senior - Qualification</h4>
                    <Badge className="bg-purple-100 text-purple-800">Active</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Séquence personnalisée pour les prospects senior avec contenu haute valeur
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Email 1: Introduction personnalisée - Envoyé</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span>Email 2: ROI Calculator - Planifié pour demain</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-gray-400" />
                      <span>Email 3: Études de cas - En attente</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de comparaison Oggo */}
      {showOggoComparison && (
        <OggoComparison 
          prospect={prospect}
          onClose={() => setShowOggoComparison(false)}
        />
      )}
    </div>
  );
};

export default ProspectDetails;
