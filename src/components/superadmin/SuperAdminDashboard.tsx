import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { LoadingScreen } from '../shared';
import Navbar from './shared/Navbar';
import LandingPage from './landing/LandingPage';
import ProfessionalsPage from './professionals/ProfessionalsPage';
import AppointmentsPage from './appointments/AppointmentsPage';
import ServicesPage from './services/ServicesPage';
import SubscriptionsPage from './subscriptions/SubscriptionsPage';
import ReportsPage from './reports/ReportsPage';
import ClientsPage from './clients/ClientsPage';
import ReviewsPage from './reviews/ReviewsPage';
import Footer from './landing/Footer';

const SuperAdminDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeModule, setActiveModule] = useState('Home');

  useEffect(() => {
    // Scroll to top when navigating to a new module
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeModule]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (user.role !== 'superadmin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this dashboard.
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeModule) {
      case 'Professionals':
        return <ProfessionalsPage />;
      case 'Appointments':
        return <AppointmentsPage />;
      case 'Services':
        return <ServicesPage />;
      case 'Subscriptions':
        return <SubscriptionsPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Clients':
        return <ClientsPage />;
      case 'Reviews':
        return <ReviewsPage />;
      case 'Home':
      default:
        return (
          <>
            <LandingPage />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default SuperAdminDashboard;