import React from 'react';
import CalendarHero from './CalendarHero';
import CalendarStats from './CalendarStats';
import CalendarControls from './CalendarControls';
import CalendarGrid from './CalendarGrid';

const CalendarView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <CalendarHero />
      <CalendarStats />
      <CalendarControls />
      <CalendarGrid />
    </div>
  );
};

export default CalendarView;