import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';

const CalendarGrid: React.FC = () => {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { appointments = [] } = useApp();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Calendar Content */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
          {currentView === 'day' && <DayView currentDate={currentDate} appointments={appointments} />}
          {currentView === 'week' && <WeekView currentDate={currentDate} appointments={appointments} />}
          {currentView === 'month' && <MonthView currentDate={currentDate} appointments={appointments} />}
        </div>
      </div>
    </section>
  );
};

export default CalendarGrid;