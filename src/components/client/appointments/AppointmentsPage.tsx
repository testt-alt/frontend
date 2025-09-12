import React from 'react';
import AppointmentsHero from './AppointmentsHero';
import AppointmentsList from './AppointmentsList';
import AppointmentStats from './AppointmentStats';
import UpcomingReminders from './UpcomingReminders';
import QuickActions from './QuickActions';

const AppointmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500">
      <AppointmentsHero />
      <AppointmentStats />
      <UpcomingReminders />
      <AppointmentsList />
      <QuickActions />
    </div>
  );
};

export default AppointmentsPage;