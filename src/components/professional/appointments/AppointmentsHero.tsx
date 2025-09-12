import React from 'react';
import { Calendar, Plus, Award, TrendingUp, Edit, Search, Filter, Heart, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Gift, Rocket, Diamond, Clock, Users, CheckCircle, Bell } from 'lucide-react';

const AppointmentsHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 dark:opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400 to-purple-600 rounded-full opacity-20 dark:opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating appointment elements */}
        <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Today: 8</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">appointments</p>
          </div>
        </div>
        <div className="absolute bottom-32 left-16 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">94% Success</span>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-10 animate-bounce" style={{ animationDelay: '2s' }}>
          <Clock className="w-12 h-12 text-indigo-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mb-8 border border-blue-200/50 dark:border-blue-700/50">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 animate-pulse" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">Your Appointment Center</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Manage Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Schedule</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Efficiently manage all your appointments, track client interactions, and optimize your schedule for maximum productivity.
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg">
              <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              New Appointment
            </button>
            
            <button className="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl">
              <Calendar className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              View Calendar
            </button>
          </div>

          {/* Search and filter bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-1000 delay-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments by client, service, or date..."
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