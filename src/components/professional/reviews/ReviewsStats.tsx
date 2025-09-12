import React from 'react';
import { Star, TrendingUp, Users, MessageCircle, Award, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Heart, ThumbsUp, Eye, CheckCircle, BarChart3, Activity, Gift, Rocket, Diamond } from 'lucide-react';

const ReviewsStats: React.FC = () => {
  const stats = [
    {
      label: 'Total Reviews',
      value: '127',
      change: '+12% this month',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      trend: 'up'
    },
    {
      label: 'Average Rating',
      value: '4.9',
      change: '+0.2 improvement',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      trend: 'up'
    },
    {
      label: 'Response Rate',
      value: '95%',
      change: 'Avg: 2 hours',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      trend: 'up'
    },
    {
      label: 'Helpful Votes',
      value: '342',
      change: 'Client satisfaction',
      icon: ThumbsUp,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      trend: 'up'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                    <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold bg-green-100/20 text-green-200`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.change.split(' ')[0]}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.change}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewsStats;