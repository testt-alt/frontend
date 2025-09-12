import React from 'react';
import { Calendar, Users, Clock, TrendingUp, BarChart3 } from 'lucide-react';

const ProfessionalHero: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Active Clients', value: '2,847' },
    { icon: Calendar, label: 'Appointments This Month', value: '342' },
    { icon: Clock, label: 'Hours Worked', value: '1,680' },
    { icon: TrendingUp, label: 'Growth', value: '+24%' },
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-in slide-in-from-bottom-4 duration-1000">
            Manage your practice
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              professionally
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-200">
            The comprehensive platform you need to manage appointments, clients and grow your business efficiently and professionally.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default ProfessionalHero;