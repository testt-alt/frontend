import React from 'react';
import { Calendar, Clock, CheckCircle, AlertTriangle, TrendingUp, Users, Star, Award } from 'lucide-react';

const AppointmentStats: React.FC = () => {
  const stats = [
    {
      icon: Calendar,
      title: 'Total Appointments',
      value: '24',
      change: '+3 this month',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10',
      trend: 'up'
    },
    {
      icon: CheckCircle,
      title: 'Completed',
      value: '18',
      change: '75% success rate',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10',
      trend: 'up'
    },
    {
      icon: Clock,
      title: 'Upcoming',
      value: '6',
      change: 'Next: Today 2:00 PM',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10',
      trend: 'neutral'
    },
    {
      icon: AlertTriangle,
      title: 'Pending Confirmation',
      value: '2',
      change: 'Awaiting response',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10',
      trend: 'attention'
    }
  ];

  const achievements = [
    {
      icon: Star,
      title: 'Average Rating Given',
      value: '4.8',
      description: 'You rate professionals highly'
    },
    {
      icon: Users,
      title: 'Professionals Worked With',
      value: '12',
      description: 'Diverse professional network'
    },
    {
      icon: TrendingUp,
      title: 'Booking Frequency',
      value: '2.1/month',
      description: 'Regular appointment schedule'
    },
    {
      icon: Award,
      title: 'Loyalty Status',
      value: 'Gold',
      description: 'Premium member benefits'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {stat.title}
                </h3>

                {/* Change indicator */}
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  stat.trend === 'attention' ? 'text-orange-600 dark:text-orange-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                  {stat.trend === 'attention' && <AlertTriangle className="h-4 w-4 mr-1" />}
                  <span>{stat.change}</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Your Appointment Journey</h3>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Track your progress and achievements in building professional relationships
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="text-center group">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {achievement.value}
                  </div>
                  <div className="text-white font-medium mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-blue-100 text-sm">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentStats;