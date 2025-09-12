import React from 'react';
import ProfessionalHero from './ProfessionalHero';
import ProfessionalModules from './ProfessionalModules';
import ProfessionalCalendar from './ProfessionalCalendar';
import ProfessionalReviews from './ProfessionalReviews';
import ProfessionalFooter from './ProfessionalFooter';
import ProfessionalNavbar from '../shared/ProfessionalNavbar';

interface ProfessionalLandingProps {
  onNavigate?: (page: string) => void;
}

const ProfessionalLanding: React.FC<ProfessionalLandingProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalNavbar 
        onLogoClick={() => onNavigate?.('home')} 
        showBackToLanding={false}
        isLandingPage={true}
      />
      <ProfessionalHero />
      <ProfessionalModules onModuleClick={(moduleName) => onNavigate?.(moduleName)} />
      <ProfessionalCalendar />
      <ProfessionalReviews />
      <ProfessionalFooter />
    </div>
  );
};

export default ProfessionalLanding;