
import React, { useState } from 'react';
import LoginForm from '@/components/Auth/LoginForm';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string, password: string) => {
    // Simulation d'authentification - en production, ceci serait géré par un service d'auth
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <DashboardLayout userEmail={userEmail} onLogout={handleLogout} />;
};

export default Index;
