
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Upload, 
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import ProspectManagement from '../Prospects/ProspectManagement';
import OpportunityManagement from '../Opportunities/OpportunityManagement';
import ImportCenter from '../Import/ImportCenter';
import ReportsCenter from '../Reports/ReportsCenter';

interface DashboardLayoutProps {
  userEmail: string;
  onLogout: () => void;
}

const DashboardLayout = ({ userEmail, onLogout }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'prospects', label: 'Prospects', icon: Users },
    { id: 'opportunities', label: 'Opportunités', icon: Target },
    { id: 'import', label: 'Import', icon: Upload },
    { id: 'reports', label: 'Reporting', icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'prospects':
        return <ProspectManagement />;
      case 'opportunities':
        return <OpportunityManagement />;
      case 'import':
        return <ImportCenter />;
      case 'reports':
        return <ReportsCenter />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prospects Total</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% ce mois</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Opportunités</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">+5% ce mois</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux Conversion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% ce mois</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CA Prévisionnel</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€245K</div>
                <p className="text-xs text-muted-foreground">+18% ce mois</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 border-r`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl text-blue-600 ${sidebarOpen ? 'block' : 'hidden'}`}>
              CRM Pro
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${sidebarOpen ? '' : 'px-2'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className={`mb-4 p-2 bg-gray-100 rounded-lg ${sidebarOpen ? 'block' : 'hidden'}`}>
            <p className="text-xs text-gray-600 truncate">{userEmail}</p>
          </div>
          <Button
            variant="outline"
            className={`w-full ${sidebarOpen ? 'justify-start' : 'px-2'}`}
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Déconnexion</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 capitalize">
              {activeTab === 'dashboard' ? 'Tableau de bord' : 
               activeTab === 'prospects' ? 'Gestion des prospects' :
               activeTab === 'opportunities' ? 'Gestion des opportunités' :
               activeTab === 'import' ? 'Centre d\'import' :
               'Reporting commercial'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'dashboard' ? 'Vue d\'ensemble de votre activité commerciale' :
               activeTab === 'prospects' ? 'Gérez et segmentez vos prospects' :
               activeTab === 'opportunities' ? 'Suivez vos opportunités de vente' :
               activeTab === 'import' ? 'Importez vos données depuis différentes sources' :
               'Analysez vos performances commerciales'}
            </p>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
