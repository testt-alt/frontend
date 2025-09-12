import React from 'react';
import { AuthProvider, useAuth } from './contexts/auth/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import SecurityWrapper from './components/shared/SecurityWrapper';
import LoginScreen from './components/auth/LoginScreen';
import LoadingScreen from './components/shared/LoadingScreen';
import ProfessionalDashboard from './components/professional/ProfessionalDashboard';
import ClientDashboard from './components/client/ClientDashboard';
import SuperAdminDashboard from './components/superadmin/SuperAdminDashboard';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return <LoginScreen />;
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'professional':
      return <ProfessionalDashboard />;
    case 'client':
      return <ClientDashboard />;
    case 'superadmin':
      return <SuperAdminDashboard />;
    default:
      return <LoginScreen />;
  }
};

function App() {
  return (
    <SecurityWrapper>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SecurityWrapper>
  );
}

export default App;