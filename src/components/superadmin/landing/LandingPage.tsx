import React from 'react';
import { BarChart3, Users, Calendar, Star, TrendingUp, Shield, Zap, Award } from 'lucide-react';

const LandingPage: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '15,247', change: '+12%' },
    { icon: Calendar, label: 'Appointments Today', value: '1,342', change: '+8%' },
    { icon: Star, label: 'Average Rating', value: '4.9', change: '+0.1' },
    { icon: TrendingUp, label: 'Revenue Growth', value: '+24%', change: 'This month' },
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-in slide-in-from-bottom-4 duration-1000">
            Super Admin
            <span className="block bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-200">
            Monitor and manage the entire ProBooking platform with comprehensive administrative tools.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-4">
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

          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              View System Overview
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default LandingPage;