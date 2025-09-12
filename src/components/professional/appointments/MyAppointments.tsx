import React from 'react';
import AppointmentsHero from './AppointmentsHero';
import AppointmentsStats from './AppointmentsStats';
import AppointmentFilters from './AppointmentFilters';
import AppointmentList from './AppointmentList';

const MyAppointments: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <AppointmentsHero />
      <AppointmentsStats />
      <AppointmentFilters />
      <AppointmentList />
    </div>
  );
};

export default MyAppointments;