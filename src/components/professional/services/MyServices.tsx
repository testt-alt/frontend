import React from 'react';
import ServicesHero from './ServicesHero';
import ServicesStats from './ServicesStats';
import ServicesFilters from './ServicesFilters';
import ServicesList from './ServicesList';

const MyServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <ServicesHero />
      <ServicesStats />
      <ServicesFilters />
      <ServicesList />
    </div>
  );
};

export default MyServices;