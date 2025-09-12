import React from 'react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { AppProvider, useApp } from '../../contexts/AppContext';
import { LoadingScreen } from '../shared';
import ProfessionalNavbar from './shared/ProfessionalNavbar';
import ProfessionalLanding from './landing/ProfessionalLanding';
import CalendarView from './calendar/CalendarView';
import MyProfile from './profile/MyProfile';
import MyServices from './services/MyServices';
import MyAppointments from './appointments/MyAppointments';
import MyReviews from './reviews/MyReviews';
import MySubscription from './subscription/MySubscription';
import AddServicePage from './add_service/AddServicePage';
import PaymentPage from './payment/PaymentPage';

const ProfessionalDashboardContent: React.FC = () => {
  const { currentModule, setCurrentModule } = useApp();
  const [showLanding, setShowLanding] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showAddService, setShowAddService] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading time for professional dashboard
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize with home module when landing is shown
  React.useEffect(() => {
    if (showLanding && setCurrentModule) {
      setCurrentModule('home');
    }
  }, [showLanding, setCurrentModule]);

  React.useEffect(() => {
    // Listen for hash changes to show add service page
    const handleHashChange = () => {
      if (window.location.hash === '#add-service') {
        setShowAddService(true);
        setShowLanding(false);
        setShowPayment(false);
      } else if (window.location.hash === '#payment') {
        setShowPayment(true);
        setShowLanding(false);
        setShowAddService(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showPayment) {
    return (
      <div className="min-h-screen">
        <PaymentPage 
          onBack={() => {
            setShowPayment(false);
            window.location.hash = '';
            setShowLanding(true);
          }}
          onComplete={(paymentData) => {
            console.log('Payment completed:', paymentData);
            setShowPayment(false);
            window.location.hash = '';
            setShowLanding(true);
            // Here you would typically process the payment and update subscription
          }}
        />
      </div>
    );
  }

  if (showAddService) {
    return (
      <div className="min-h-screen">
        <AddServicePage 
          onBack={() => {
            setShowAddService(false);
            setShowPayment(false);
            window.location.hash = '';
            setShowLanding(true);
          }}
          onSave={(serviceData) => {
            console.log('Service created:', serviceData);
            setShowAddService(false);
            setShowPayment(false);
            window.location.hash = '';
            setShowLanding(true);
            // Here you would typically save to your backend
          }}
        />
      </div>
    );
  }

  const handleEnterDashboard = (moduleName?: string) => {
    setShowLanding(false);
    setShowAddService(false);
    setShowPayment(false);
    if (moduleName) {
      setCurrentModule(moduleName);
    }
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    setShowAddService(false);
    setShowPayment(false);
    window.location.hash = '';
    if (setCurrentModule) {
      setCurrentModule('home');
    }
  };

  const handleNavbarNavigation = (moduleName: string) => {
    if (moduleName === 'home') {
      handleBackToLanding();
    } else {
      handleEnterDashboard(moduleName);
    }
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ProfessionalLanding onNavigate={handleNavbarNavigation} />
      </div>
    );
  }

  const renderCurrentModule = () => {
    if (currentModule === 'home') {
      return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <ProfessionalLanding onNavigate={handleEnterDashboard} />
        </div>
      );
    }
    
    switch (currentModule) {
      case 'My Profile':
        return <MyProfile />;
      case 'My Services':
        return <MyServices />;
      case 'My Calendar':
        return <CalendarView />;
      case 'My Appointments':
        return <MyAppointments />;
      case 'My Reviews':
        return <MyReviews />;
      case 'My Subscription':
        return <MySubscription />;
      default:
        return <CalendarView />;
    }
  };

  // If current module is home, show landing without navbar wrapper
  if (currentModule === 'home') {
    return renderCurrentModule();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <ProfessionalNavbar onLogoClick={handleBackToLanding} showBackToLanding={true} isLandingPage={false} />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {renderCurrentModule()}
        </div>
      </main>
    </div>
  );
};

const ProfessionalDashboard: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <ProfessionalDashboardContent />
      </AppProvider>
    </ThemeProvider>
  );
};

export default ProfessionalDashboard;