import React from 'react';
import { Calendar, Clock, Users, TrendingUp, CheckCircle, AlertCircle, XCircle, Plus, Settings, Bell, Filter, Search, Download, Share2, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Award, Heart, Star, Eye, Bookmark, BarChart3 } from 'lucide-react';

const CalendarStats: React.FC = () => {
  const quickStats = [
    { label: 'Today', value: '8', icon: Clock, color: 'from-blue-500 to-cyan-600' },
    { label: 'This Week', value: '34', icon: Calendar, color: 'from-green-500 to-emerald-600' },
    { label: 'Total', value: '1,247', icon: BarChart3, color: 'from-purple-500 to-pink-600' },
    { label: 'Rating', value: '4.9', icon: Star, color: 'from-yellow-500 to-orange-600' }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 hover:shadow-xl animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:rotate-12 hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalendarStats;