
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileSpreadsheet, 
  Link, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImportCenter = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');
  const [hubspotToken, setHubspotToken] = useState('');
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImporting(true);
      // Simulation d'import Excel
      setTimeout(() => {
        setIsImporting(false);
        toast({
          title: "Import Excel réussi",
          description: `${Math.floor(Math.random() * 200) + 50} prospects importés depuis ${file.name}`,
        });
      }, 3000);
    }
  };

  const handleGoogleSheetsImport = () => {
    if (!googleSheetsUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir l'URL de la feuille Google Sheets",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    // Simulation d'import Google Sheets
    setTimeout(() => {
      setIsImporting(false);
      toast({
        title: "Import Google Sheets réussi",
        description: `${Math.floor(Math.random() * 150) + 30} prospects importés depuis Google Sheets`,
      });
      setGoogleSheetsUrl('');
    }, 2500);
  };

  const handleHubSpotImport = () => {
    if (!hubspotToken) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre token API HubSpot",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    // Simulation d'import HubSpot
    setTimeout(() => {
      setIsImporting(false);
      toast({
        title: "Import HubSpot réussi",
        description: `${Math.floor(Math.random() * 300) + 100} prospects importés depuis HubSpot`,
      });
      setHubspotToken('');
    }, 4000);
  };

  const importHistory = [
    {
      date: '2024-01-15 14:30',
      source: 'Excel',
      file: 'prospects_janvier_2024.xlsx',
      imported: 245,
      status: 'Réussi'
    },
    {
      date: '2024-01-14 09:15',
      source: 'HubSpot',
      file: 'API Import',
      imported: 156,
      status: 'Réussi'
    },
    {
      date: '2024-01-13 16:45',
      source: 'Google Sheets',
      file: 'Prospects Q1 2024',
      imported: 89,
      status: 'Réussi'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Imports ce mois</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prospects importés</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux de réussite</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interface d'import */}
      <Card>
        <CardHeader>
          <CardTitle>Centre d'import de prospects</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="excel" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="excel" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </TabsTrigger>
              <TabsTrigger value="sheets" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Google Sheets
              </TabsTrigger>
              <TabsTrigger value="hubspot" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                HubSpot
              </TabsTrigger>
            </TabsList>

            <TabsContent value="excel" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Import depuis Excel</h3>
                <p className="text-gray-600 mb-4">
                  Glissez-déposez votre fichier Excel ou cliquez pour sélectionner
                </p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="excel-upload"
                  disabled={isImporting}
                />
                <Label htmlFor="excel-upload">
                  <Button asChild disabled={isImporting}>
                    <span>
                      {isImporting ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      {isImporting ? 'Import en cours...' : 'Choisir un fichier'}
                    </span>
                  </Button>
                </Label>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Format attendu</h4>
                <p className="text-blue-700 text-sm">
                  Colonnes requises: Nom, Prénom, Email, Entreprise, Téléphone (optionnel)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="sheets" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sheets-url">URL Google Sheets prospects</Label>
                  <Input
                    id="sheets-url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={googleSheetsUrl}
                    onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                    disabled={isImporting}
                  />
                </div>
                <Button 
                  onClick={handleGoogleSheetsImport} 
                  disabled={isImporting || !googleSheetsUrl}
                  className="w-full"
                >
                  {isImporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Link className="h-4 w-4 mr-2" />
                  )}
                  {isImporting ? 'Import en cours...' : 'Importer depuis Google Sheets'}
                </Button>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Configuration requise</h4>
                <p className="text-yellow-700 text-sm">
                  La feuille doit être partagée publiquement ou avec l'accès en lecture
                </p>
              </div>
            </TabsContent>

            <TabsContent value="hubspot" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hubspot-token">Token API HubSpot</Label>
                  <Input
                    id="hubspot-token"
                    type="password"
                    placeholder="pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={hubspotToken}
                    onChange={(e) => setHubspotToken(e.target.value)}
                    disabled={isImporting}
                  />
                </div>
                <Button 
                  onClick={handleHubSpotImport} 
                  disabled={isImporting || !hubspotToken}
                  className="w-full"
                >
                  {isImporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="h-4 w-4 mr-2" />
                  )}
                  {isImporting ? 'Import en cours...' : 'Importer depuis HubSpot'}
                </Button>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Synchronisation automatique</h4>
                <p className="text-green-700 text-sm">
                  L'import HubSpot peut être configuré pour une synchronisation automatique quotidienne
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Historique des imports */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des imports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {importHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {item.source === 'Excel' && <FileSpreadsheet className="h-5 w-5 text-green-600" />}
                  {item.source === 'Google Sheets' && <Link className="h-5 w-5 text-blue-600" />}
                  {item.source === 'HubSpot' && <Database className="h-5 w-5 text-orange-600" />}
                  <div>
                    <p className="font-semibold">{item.source} - {item.file}</p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">{item.imported} prospects</span>
                  </div>
                  <span className="text-sm text-green-600">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCenter;
