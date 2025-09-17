import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';

const AppointmentsPage: React.FC = () => {
  const stats = [
    { icon: Calendar, label: 'Total Appointments', value: '45,892', change: '+15%' },
    { icon: CheckCircle, label: 'Completed Today', value: '1,342', change: '+8%' },
    { icon: Clock, label: 'Pending', value: '234', change: '-3%' },
    { icon: TrendingUp, label: 'Success Rate', value: '94.2%', change: '+2%' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Appointments Overview
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Monitor all appointments across the platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Appointment Analytics
          </h2>
          
          <div className="text-center py-12">
            <BarChart3 className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed appointment analytics and management tools will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;