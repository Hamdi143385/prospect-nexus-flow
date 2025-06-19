
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Star, Building, Mail, Phone, ExternalLink } from 'lucide-react';
import ProspectDetails from './ProspectDetails';

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

const ProspectManagement = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  useEffect(() => {
    // Simulation de données prospects
    const mockProspects: Prospect[] = [
      {
        id: '1',
        name: 'Jean Dupont',
        company: 'TechCorp SA',
        email: 'jean.dupont@techcorp.fr',
        phone: '+33 1 23 45 67 89',
        segment: 'Senior',
        score: 85,
        status: 'Qualifié',
        lastContact: '2024-01-15',
        revenue: 50000
      },
      {
        id: '2',
        name: 'Marie Martin',
        company: 'InnovateLtd',
        email: 'marie.martin@innovate.com',
        phone: '+33 1 98 76 54 32',
        segment: 'Premium',
        score: 72,
        status: 'En cours',
        lastContact: '2024-01-14',
        revenue: 35000
      },
      {
        id: '3',
        name: 'Pierre Lambert',
        company: 'StartupX',
        email: 'pierre@startupx.io',
        phone: '+33 1 11 22 33 44',
        segment: 'Standard',
        score: 45,
        status: 'Nouveau',
        lastContact: '2024-01-13',
        revenue: 15000
      }
    ];
    setProspects(mockProspects);
  }, []);

  const filteredProspects = prospects.filter(prospect =>
    prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Senior': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-green-100 text-green-800';
      case 'Qualifié': return 'bg-blue-100 text-blue-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      case 'Converti': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec recherche */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher prospects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau prospect
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total prospects</p>
                <p className="text-2xl font-bold">{prospects.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Score moyen</p>
                <p className="text-2xl font-bold">
                  {Math.round(prospects.reduce((acc, p) => acc + p.score, 0) / prospects.length)}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Segments Senior</p>
                <p className="text-2xl font-bold">
                  {prospects.filter(p => p.segment === 'Senior').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA potentiel</p>
                <p className="text-2xl font-bold">
                  €{Math.round(prospects.reduce((acc, p) => acc + p.revenue, 0) / 1000)}K
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des prospects */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des prospects ({filteredProspects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProspects.map((prospect) => (
              <div
                key={prospect.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedProspect(prospect)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{prospect.name}</h3>
                      <Badge className={getSegmentColor(prospect.segment)}>
                        {prospect.segment}
                      </Badge>
                      <Badge className={getStatusColor(prospect.status)}>
                        {prospect.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {prospect.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {prospect.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{prospect.score}/100</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      CA: €{prospect.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-blue-600">Voir détails</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog pour les détails du prospect */}
      {selectedProspect && (
        <Dialog open={!!selectedProspect} onOpenChange={() => setSelectedProspect(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Détails du prospect</DialogTitle>
            </DialogHeader>
            <ProspectDetails prospect={selectedProspect} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProspectManagement;
