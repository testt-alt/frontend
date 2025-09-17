import React from 'react';
import { MessageCircle, Star, TrendingUp, ThumbsUp, Search, Filter } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const stats = [
    { icon: MessageCircle, label: 'Total Reviews', value: '45,892', change: '+18%' },
    { icon: Star, label: 'Average Rating', value: '4.8', change: '+0.2' },
    { icon: ThumbsUp, label: 'Positive Reviews', value: '42,156', change: '+20%' },
    { icon: TrendingUp, label: 'Review Growth', value: '+15%', change: 'This month' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Reviews Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Monitor and moderate reviews across the platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mb-4">
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
              Review Moderation
            </h2>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
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
            <MessageCircle className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Review Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed review management and moderation tools will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;