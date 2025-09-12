import React from 'react';
import { Plus, Search, Calendar, Clock, Star, MessageCircle, Settings, Download, Bell, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
  const quickActions = [
    {
      icon: Plus,
      title: 'Book New Appointment',
      description: 'Find and schedule with a professional',
      color: 'from-blue-600 to-purple-600',
      hoverColor: 'from-blue-700 to-purple-700',
      action: 'book'
    },
    {
      icon: Search,
      title: 'Find Professionals',
      description: 'Browse our network of experts',
      color: 'from-green-600 to-emerald-600',
      hoverColor: 'from-green-700 to-emerald-700',
      action: 'search'
    },
    {
      icon: Calendar,
      title: 'View Calendar',
      description: 'See all appointments in calendar view',
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'from-purple-700 to-pink-700',
      action: 'calendar'
    },
    {
      icon: Star,
      title: 'Leave Reviews',
      description: 'Rate your recent appointments',
      color: 'from-yellow-600 to-orange-600',
      hoverColor: 'from-yellow-700 to-orange-700',
      action: 'reviews'
    }
  ];

  const managementActions = [
    {
      icon: Bell,
      title: 'Notification Settings',
      description: 'Manage your appointment reminders'
    },
    {
      icon: Download,
      title: 'Export History',
      description: 'Download your appointment records'
    },
    {
      icon: MessageCircle,
      title: 'Message Center',
      description: 'Chat with your professionals'
    },
    {
      icon: Settings,
      title: 'Preferences',
      description: 'Customize your booking experience'
    }
  ];

  const stats = [
    {
      icon: Users,
      label: 'Professionals Worked With',
      value: '12',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Calendar,
      label: 'Total Appointments',
      value: '24',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Star,
      label: 'Average Rating Given',
      value: '4.8',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: Clock,
      label: 'Hours of Consultations',
      value: '18.5',
      color: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Quick
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Actions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage your appointments efficiently
          </p>
        </div>

        {/* Main quick actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {quickActions.map((action, index) => (
            <div
              key={action.title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-fade-in-up cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${action.color} rounded-3xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <action.icon className="h-10 w-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {action.description}
                </p>

                {/* Hover button */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 mt-6">
                  <button className={`px-6 py-3 bg-gradient-to-r ${action.color} hover:${action.hoverColor} text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}>
                    Get Started
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Management section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-16 animate-fade-in-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Account Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your preferences and settings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementActions.map((action, index) => (
              <button
                key={action.title}
                className="group flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-left"
              >
                <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  <action.icon className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats overview */}
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
                Track your progress and see how you're building valuable professional relationships
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Book Your Next Appointment?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Connect with top professionals and continue building your network of trusted experts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group">
                  <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  Book New Appointment
                </button>
                <button className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Professionals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;