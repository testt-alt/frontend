import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Plus, Filter, Search } from 'lucide-react';

const AppointmentsHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/30 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        
        {/* Floating calendar icons */}
        <div className="absolute top-20 right-20 animate-float animation-delay-1000">
          <Calendar className="w-12 h-12 text-blue-400 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float animation-delay-2000">
          <Clock className="w-10 h-10 text-purple-400 opacity-60" />
        </div>
        <div className="absolute top-1/2 right-10 animate-float animation-delay-1500">
          <CheckCircle className="w-8 h-8 text-green-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-8 border border-blue-200/50 dark:border-blue-700/50">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">Your Appointment Dashboard</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Manage Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Appointments</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Keep track of all your scheduled appointments, manage your calendar, and never miss an important meeting with your professionals.
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-500">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg animate-pulse-glow">
              <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              Book New Appointment
            </button>
            
            <button className="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl">
              <Search className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              Find Professionals
            </button>
          </div>

          {/* Search and filter bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl animate-fade-in-up animation-delay-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments by professional, date, or type..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsHero;