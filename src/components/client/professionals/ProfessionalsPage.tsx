import React from 'react';
import ProfessionalsHero from './ProfessionalsHero';
import SearchFilters from './SearchFilters';
import ProfessionalsList from './ProfessionalsList';
import TrustIndicators from './TrustIndicators';
import FeaturedProfessionals from './FeaturedProfessionals';

interface ProfessionalsPageProps {
  onNavigate?: (page: string) => void;
}

const ProfessionalsPage: React.FC<ProfessionalsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500">
      <ProfessionalsHero />
      <TrustIndicators />
      <FeaturedProfessionals onNavigate={onNavigate} />
      <SearchFilters />
      <ProfessionalsList onNavigate={onNavigate} />
    </div>
  );
};

export default ProfessionalsPage;