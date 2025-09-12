import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { LoadingScreen } from '../shared';
import Navbar from './shared/Navbar';
import Landing from './landing/Landing';
import ProfessionalsPage from './professionals/ProfessionalsPage';
import AppointmentsPage from './appointments/AppointmentsPage';
import ReviewsPage from './reviews/ReviewsPage';
import PaymentsPage from './payments/PaymentsPage';
import ProfilesPage from './profiles/ProfilesPage';
import BookingPage from './booking/BookingPage';

const ClientDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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

  if (user.role !== 'client') {
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

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'professionals':
        return <ProfessionalsPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfilesPage onNavigate={handleNavigation} />;
      case 'payments':
        return <PaymentsPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'booking':
        return <BookingPage onNavigate={handleNavigation} />;
      default:
        return <Landing onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      {renderCurrentPage()}
    </div>
  );
};

export default ClientDashboard;