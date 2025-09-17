import React from 'react';
import { Star, TrendingUp, Zap, Award, Search, Filter } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const stats = [
    { icon: Star, label: 'Total Services', value: '12,456', change: '+18%' },
    { icon: TrendingUp, label: 'Popular Services', value: '2,847', change: '+25%' },
    { icon: Zap, label: 'New This Month', value: '342', change: '+45%' },
    { icon: Award, label: 'Top Rated', value: '1,234', change: '+12%' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Services Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Monitor and manage all services across the platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4">
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
              Service Directory
            </h2>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
            <Star className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Service Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed service management interface will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;