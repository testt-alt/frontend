import React from 'react';
import PaymentsHero from './PaymentsHero';
import PaymentsStats from './PaymentsStats';
import PaymentsList from './PaymentsList';
import PaymentsFilters from './PaymentsFilters';
import PaymentMethods from './PaymentMethods';
import PaymentInsights from './PaymentInsights';

const PaymentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500">
      <PaymentsHero />
      <PaymentsStats />
      <PaymentsFilters />
      <PaymentsList />
      <PaymentMethods />
      <PaymentInsights />
    </div>
  );
};

export default PaymentsPage;