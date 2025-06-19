
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Target, DollarSign, Calendar, TrendingUp } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: 'Prospection' | 'Qualification' | 'Proposition' | 'Négociation' | 'Closing' | 'Gagné' | 'Perdu';
  probability: number;
  closeDate: string;
  createdDate: string;
  source: string;
}

const OpportunityManagement = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  useEffect(() => {
    // Simulation de données d'opportunités
    const mockOpportunities: Opportunity[] = [
      {
        id: '1',
        title: 'Projet CRM Enterprise',
        company: 'TechCorp SA',
        contact: 'Jean Dupont',
        value: 85000,
        stage: 'Négociation',
        probability: 75,
        closeDate: '2024-02-15',
        createdDate: '2024-01-05',
        source: 'Inbound'
      },
      {
        id: '2',
        title: 'Migration Cloud',
        company: 'InnovateLtd',
        contact: 'Marie Martin',
        value: 45000,
        stage: 'Proposition',
        probability: 60,
        closeDate: '2024-02-28',
        createdDate: '2024-01-10',
        source: 'Cold Call'
      },
      {
        id: '3',
        title: 'Automatisation Marketing',
        company: 'StartupX',
        contact: 'Pierre Lambert',
        value: 25000,
        stage: 'Qualification',
        probability: 40,
        closeDate: '2024-03-15',
        createdDate: '2024-01-12',
        source: 'Référence'
      },
      {
        id: '4',
        title: 'Solution BI Analytics',
        company: 'DataCorp',
        contact: 'Sophie Durand',
        value: 120000,
        stage: 'Prospection',
        probability: 25,
        closeDate: '2024-04-30',
        createdDate: '2024-01-15',
        source: 'LinkedIn'
      }
    ];
    setOpportunities(mockOpportunities);
  }, []);

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || opp.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospection': return 'bg-gray-100 text-gray-800';
      case 'Qualification': return 'bg-blue-100 text-blue-800';
      case 'Proposition': return 'bg-yellow-100 text-yellow-800';
      case 'Négociation': return 'bg-orange-100 text-orange-800';
      case 'Closing': return 'bg-purple-100 text-purple-800';
      case 'Gagné': return 'bg-green-100 text-green-800';
      case 'Perdu': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalValue = filteredOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = filteredOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
  const avgProbability = filteredOpportunities.length > 0 
    ? filteredOpportunities.reduce((sum, opp) => sum + opp.probability, 0) / filteredOpportunities.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header avec filtres */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher opportunités..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par étape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les étapes</SelectItem>
              <SelectItem value="Prospection">Prospection</SelectItem>
              <SelectItem value="Qualification">Qualification</SelectItem>
              <SelectItem value="Proposition">Proposition</SelectItem>
              <SelectItem value="Négociation">Négociation</SelectItem>
              <SelectItem value="Closing">Closing</SelectItem>
              <SelectItem value="Gagné">Gagné</SelectItem>
              <SelectItem value="Perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle opportunité
        </Button>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total opportunités</p>
                <p className="text-2xl font-bold">{filteredOpportunities.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valeur totale</p>
                <p className="text-2xl font-bold">€{Math.round(totalValue / 1000)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valeur pondérée</p>
                <p className="text-2xl font-bold">€{Math.round(weightedValue / 1000)}K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Probabilité moy.</p>
                <p className="text-2xl font-bold">{Math.round(avgProbability)}%</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline visuel */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de vente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {['Prospection', 'Qualification', 'Proposition', 'Négociation', 'Closing'].map((stage) => {
              const stageOpps = opportunities.filter(opp => opp.stage === stage);
              const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
              
              return (
                <div key={stage} className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">{stage}</h4>
                  <div className="text-2xl font-bold text-blue-600">{stageOpps.length}</div>
                  <div className="text-sm text-gray-600">€{Math.round(stageValue / 1000)}K</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Liste des opportunités */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunités actives ({filteredOpportunities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{opportunity.title}</h3>
                      <Badge className={getStageColor(opportunity.stage)}>
                        {opportunity.stage}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Entreprise:</span> {opportunity.company}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {opportunity.contact}
                      </div>
                      <div>
                        <span className="font-medium">Source:</span> {opportunity.source}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="font-medium">Clôture prévue:</span> {opportunity.closeDate}
                      </div>
                      <div>
                        <span className="font-medium">Créé le:</span> {opportunity.createdDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-green-600">
                      €{opportunity.value.toLocaleString()}
                    </div>
                    <div className={`text-lg font-semibold ${getProbabilityColor(opportunity.probability)}`}>
                      {opportunity.probability}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Valeur pondérée: €{Math.round(opportunity.value * opportunity.probability / 100).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpportunityManagement;
