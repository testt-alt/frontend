import React from 'react';
import { TrendingUp, Users, Calendar, Star, Award, Clock, Heart, Eye, ThumbsUp, MessageCircle, Share2, Bookmark, Target, Zap, Crown, Trophy, Medal, Flame, Diamond, Gift, Rocket, Sparkles, BarChart3, PieChart, Activity, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const ProfileStats: React.FC = () => {
  const mainStats = [
    {
      title: 'Total Revenue',
      value: '$47,250',
      change: '+23%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      description: 'This month'
    },
    {
      title: 'Active Clients',
      value: '342',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      description: 'Regular customers'
    },
    {
      title: 'Appointments',
      value: '1,247',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
      description: 'Total completed'
    },
    {
      title: 'Average Rating',
      value: '4.9',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      description: 'Out of 5 stars'
    }
  ];

  const performanceMetrics = [
    {
      label: 'Booking Rate',
      value: '94%',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      progress: 94
    },
    {
      label: 'Client Retention',
      value: '87%',
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      progress: 87
    },
    {
      label: 'Response Time',
      value: '2.3h',
      icon: Clock,
      color: 'from-blue-500 to-cyan-600',
      progress: 85
    },
    {
      label: 'Satisfaction',
      value: '98%',
      icon: ThumbsUp,
      color: 'from-purple-500 to-violet-600',
      progress: 98
    }
  ];

  const achievements = [
    {
      title: 'Top Professional',
      description: 'Ranked in top 1% of professionals',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      earned: '2024-01-15',
      rarity: 'Legendary'
    },
    {
      title: 'Master Stylist',
      description: 'Completed 1000+ appointments',
      icon: Trophy,
      color: 'from-blue-500 to-purple-600',
      earned: '2023-12-20',
      rarity: 'Epic'
    },
    {
      title: 'Client Favorite',
      description: 'Maintained 4.9+ rating for 6 months',
      icon: Medal,
      color: 'from-green-500 to-emerald-600',
      earned: '2023-11-10',
      rarity: 'Rare'
    },
    {
      title: 'Trending Expert',
      description: 'Most booked stylist this month',
      icon: Flame,
      color: 'from-red-500 to-pink-600',
      earned: '2024-01-01',
      rarity: 'Epic'
    },
    {
      title: 'Innovation Leader',
      description: 'Introduced 5+ new services',
      icon: Rocket,
      color: 'from-indigo-500 to-purple-600',
      earned: '2023-10-05',
      rarity: 'Rare'
    },
    {
      title: 'Community Builder',
      description: 'Referred 50+ new clients',
      icon: Gift,
      color: 'from-pink-500 to-rose-600',
      earned: '2023-09-15',
      rarity: 'Common'
    }
  ];

  const recentActivity = [
    {
      type: 'review',
      title: 'Received 5-star review',
      client: 'Sarah Johnson',
      time: '2 hours ago',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      type: 'appointment',
      title: 'Completed appointment',
      client: 'Mike Chen',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      type: 'booking',
      title: 'New booking received',
      client: 'Emma Wilson',
      time: '6 hours ago',
      icon: Calendar,
      color: 'text-blue-500'
    },
    {
      type: 'achievement',
      title: 'Earned new badge',
      client: 'Top Performer',
      time: '1 day ago',
      icon: Award,
      color: 'text-purple-500'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'from-yellow-400 to-orange-500';
      case 'Epic': return 'from-purple-500 to-pink-600';
      case 'Rare': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                  <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text">
                {stat.value}
              </div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{stat.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Metrics</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your professional growth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 100 + 700}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {metric.value}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{metric.label}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000 delay-800">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
              <p className="text-gray-600 dark:text-gray-400">Your professional milestones</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.title}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-left-4 duration-1000"
                  style={{ animationDelay: `${index * 100 + 900}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                    <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {achievement.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-sm`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Earned: {new Date(achievement.earned).toLocaleDateString()}</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse group-hover:animate-spin" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-800">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              <p className="text-gray-600 dark:text-gray-400">Latest updates and interactions</p>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-right-4 duration-1000"
                  style={{ animationDelay: `${index * 100 + 900}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${activity.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.client}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;