
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Clock,
  Zap
} from 'lucide-react';

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

interface OggoComparisonProps {
  prospect: Prospect;
  onClose: () => void;
}

const OggoComparison = ({ prospect, onClose }: OggoComparisonProps) => {
  const comparisonData = {
    currentSolution: {
      name: "Solution actuelle - " + prospect.company,
      monthlyFee: 1200,
      setupFee: 5000,
      features: {
        automation: false,
        aiInsights: false,
        customReports: true,
        integration: true,
        support: "Standard",
        scalability: "Limitée"
      },
      pros: [
        "Solution déjà en place",
        "Équipe formée",
        "Intégration existante"
      ],
      cons: [
        "Pas d'automatisation",
        "Rapports limités",
        "Pas d'IA intégrée",
        "Support standard uniquement"
      ]
    },
    oggo: {
      name: "Oggo CRM Pro",
      monthlyFee: 890,
      setupFee: 2500,
      features: {
        automation: true,
        aiInsights: true,
        customReports: true,
        integration: true,
        support: "Premium 24/7",
        scalability: "Illimitée"
      },
      pros: [
        "IA avancée pour le scoring",
        "Automation marketing intégrée",
        "ROI supérieur de 35%",
        "Support premium inclus",
        "Onboarding en 2 semaines"
      ],
      cons: [
        "Migration nécessaire",
        "Formation équipe requise",
        "Période d'adaptation"
      ]
    }
  };

  const annualSavings = (comparisonData.currentSolution.monthlyFee - comparisonData.oggo.monthlyFee) * 12;
  const roiTimeframe = Math.ceil(comparisonData.oggo.setupFee / (comparisonData.currentSolution.monthlyFee - comparisonData.oggo.monthlyFee));

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Comparaison Oggo vs Solution actuelle - {prospect.company}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* ROI Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <TrendingUp className="h-5 w-5" />
                Analyse ROI personnalisée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    €{annualSavings.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Économies annuelles</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {roiTimeframe} mois
                  </div>
                  <p className="text-sm text-gray-600">Retour sur investissement</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    +35%
                  </div>
                  <p className="text-sm text-gray-600">Amélioration conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Solution Actuelle */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {comparisonData.currentSolution.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">
                    €{comparisonData.currentSolution.monthlyFee}/mois
                  </div>
                  <Badge variant="outline">
                    Setup: €{comparisonData.currentSolution.setupFee.toLocaleString()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Fonctionnalités</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Marketing Automation</span>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Insights IA</span>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rapports personnalisés</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Intégrations</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Support</span>
                      <span className="text-sm text-gray-600">Standard</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Avantages</h4>
                  <ul className="space-y-1 text-sm">
                    {comparisonData.currentSolution.pros.map((pro, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-red-600">Inconvénients</h4>
                  <ul className="space-y-1 text-sm">
                    {comparisonData.currentSolution.cons.map((con, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <XCircle className="h-3 w-3 text-red-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Oggo Solution */}
            <Card className="border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  {comparisonData.oggo.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-600">
                    €{comparisonData.oggo.monthlyFee}/mois
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">
                    Setup: €{comparisonData.oggo.setupFee.toLocaleString()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Fonctionnalités</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Marketing Automation</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Insights IA</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rapports personnalisés</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Intégrations</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Support</span>
                      <span className="text-sm text-purple-600 font-medium">Premium 24/7</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">Avantages</h4>
                  <ul className="space-y-1 text-sm">
                    {comparisonData.oggo.pros.map((pro, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-600">Points d'attention</h4>
                  <ul className="space-y-1 text-sm">
                    {comparisonData.oggo.cons.map((con, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-yellow-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fermer la comparaison
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <DollarSign className="h-4 w-4 mr-2" />
              Générer une proposition
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OggoComparison;
