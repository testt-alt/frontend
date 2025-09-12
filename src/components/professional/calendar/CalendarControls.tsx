import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Grid3X3, Columns, Square, Filter, Search, Bell, Settings, Download, Share2, Star, TrendingUp, Users, Clock, Award, Zap, BarChart3, Sparkles, Crown, Trophy, Flame, Rocket, Medal, Eye, Target, Heart, Bookmark, Gift, Diamond } from 'lucide-react';

const CalendarControls: React.FC = () => {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const formatDateHeader = () => {
    switch (currentView) {
      case 'day':
        return currentDate.toLocaleDateString('es-ES', { 
          weekday: 'long',
          day: 'numeric',
          month: 'long', 
          year: 'numeric' 
        });
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
      case 'month':
        return currentDate.toLocaleDateString('es-ES', { 
          month: 'long', 
          year: 'numeric' 
        });
    }
  };

  const getViewIcon = (view: string) => {
    switch (view) {
      case 'day': return Square;
      case 'week': return Columns;
      case 'month': return Grid3X3;
      default: return Grid3X3;
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Controls */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-200 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
                <button
                  onClick={() => navigateDate('prev')}
                  className="p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                </button>
                
                <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold text-center min-w-[280px]">
                    {formatDateHeader()}
                  </h3>
                </div>
                
                <button
                  onClick={() => navigateDate('next')}
                  className="p-3 hover:bg-white dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>

              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
              >
                Today
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-2 shadow-inner">
                {['day', 'week', 'month'].map((view) => {
                  const Icon = getViewIcon(view);
                  const isActive = currentView === view;
                  return (
                    <button
                      key={view}
                      onClick={() => setCurrentView(view as any)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-bold capitalize">
                        {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 group shadow-lg ${
                    showFilters 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Filter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
                <button className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 hover:rotate-12">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 animate-in slide-in-from-top-2 duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar citas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <select className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                  <option value="all">All statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                
                <select className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300">
                  <option value="all">All services</option>
                  <option value="haircut">Hair Cut</option>
                  <option value="color">Color Treatment</option>
                  <option value="styling">Styling</option>
                </select>
                
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarControls;