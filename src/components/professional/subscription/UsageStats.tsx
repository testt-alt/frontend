import React from 'react';
import { Calendar, Users, DollarSign, Activity, TrendingUp, BarChart3, Clock, CheckCircle, Zap, Target, Award, Heart, Star, Eye, Bookmark, Sparkles, Crown, Trophy, Medal, Flame, Gift, Rocket, Diamond } from 'lucide-react';

interface UsageStatsProps {
  usageStats: {
    appointmentsThisMonth: number;
    appointmentLimit: string;
    storageUsed: number;
    storageLimit: number;
    clientsManaged: number;
    revenueProcessed: number;
    apiCalls: number;
    apiLimit: number;
  };
}

const UsageStats: React.FC<UsageStatsProps> = ({ usageStats }) => {
  const stats = [
    {
      label: 'Appointments',
      value: usageStats.appointmentsThisMonth.toString(),
      limit: usageStats.appointmentLimit,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      progress: 100,
      description: 'This month'
    },
    {
      label: 'Active Clients',
      value: usageStats.clientsManaged.toString(),
      limit: 'Unlimited',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      progress: 100,
      description: 'Total managed'
    },
    {
      label: 'Revenue',
      value: `$${usageStats.revenueProcessed.toLocaleString()}`,
      limit: 'This month',
      icon: DollarSign,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
      progress: 100,
      description: 'Processed'
    },
    {
      label: 'Storage',
      value: `${usageStats.storageUsed}GB`,
      limit: `${usageStats.storageLimit}GB`,
      icon: Activity,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      progress: (usageStats.storageUsed / usageStats.storageLimit) * 100,
      description: 'Used space'
    },
    {
      label: 'API Calls',
      value: usageStats.apiCalls.toLocaleString(),
      limit: `${usageStats.apiLimit.toLocaleString()} limit`,
      icon: Zap,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      progress: (usageStats.apiCalls / usageStats.apiLimit) * 100,
      description: 'This month'
    },
    {
      label: 'Efficiency',
      value: '94%',
      limit: 'Optimal',
      icon: Target,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
      progress: 94,
      description: 'Performance'
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'from-red-500 to-pink-600';
    if (progress >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-green-500 to-emerald-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 animate-in slide-in-from-left-4 duration-1000">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Usage Statistics</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor your subscription usage and limits</p>
        </div>
      </div>

      {/* Usage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const progressColor = getProgressColor(stat.progress);
          
          return (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 border border-white/20 dark:border-gray-600/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000 backdrop-blur-sm`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                  <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.limit}
                  </div>
                </div>
              </div>
              
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{stat.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{stat.description}</p>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out relative overflow-hidden shadow-inner`}
                  style={{ width: `${Math.min(stat.progress, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 dark:bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {stat.progress.toFixed(1)}% used
                </span>
                {stat.progress >= 90 && (
                  <span className="text-xs font-bold text-red-600 dark:text-red-300 animate-pulse bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                    ⚠️ Near limit
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Insights */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-900">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Usage Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">Optimize your subscription usage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Optimal Usage</h4>
                <p className="text-sm text-green-600 dark:text-green-300">You're using your plan efficiently</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your current usage patterns show excellent optimization of your Professional plan features.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Growth Trend</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">+23% increase this month</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your business is growing! Consider upgrading to Enterprise for advanced features.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Recommendations</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">Maximize your plan benefits</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enable auto-renewal to get exclusive discounts and never miss important features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageStats;