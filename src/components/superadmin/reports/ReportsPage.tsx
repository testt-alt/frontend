import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Search, Filter } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const stats = [
    { icon: BarChart3, label: 'Total Reports', value: '1,247', change: '+8%' },
    { icon: TrendingUp, label: 'Revenue Growth', value: '+24%', change: 'This month' },
    { icon: PieChart, label: 'User Segments', value: '12', change: 'Active' },
    { icon: Activity, label: 'System Health', value: '99.9%', change: 'Uptime' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Reports & Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive platform analytics and reporting
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-4">
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h2>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          <div className="text-center py-12">
            <BarChart3 className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Advanced Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed reporting and analytics interface will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;