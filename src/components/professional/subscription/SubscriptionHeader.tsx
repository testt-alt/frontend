import React from 'react';
import { CreditCard, Clock, Users, TrendingUp, CheckCircle, AlertCircle, XCircle, Plus, Settings, Bell, Filter, Search, Download, Share2, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Award, Heart, Star, Eye, Bookmark, DollarSign, Calendar, BarChart3 } from 'lucide-react';

const SubscriptionHeader: React.FC = () => {
  const stats = [
    {
      label: 'Current Plan',
      value: 'Professional',
      change: 'Active subscription',
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      trend: 'up'
    },
    {
      label: 'Monthly Cost',
      value: '$29',
      change: 'Save 20% yearly',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      trend: 'up'
    },
    {
      label: 'Usage This Month',
      value: '94%',
      change: 'Optimal usage',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      trend: 'up'
    },
    {
      label: 'Next Billing',
      value: 'Feb 15',
      change: '12 days remaining',
      icon: Calendar,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      trend: 'up'
    }
  ];

  const achievements = [
    { icon: Crown, label: 'Premium Member', color: 'from-yellow-500 to-orange-600', description: 'Professional plan active' },
    { icon: Trophy, label: 'Loyal Customer', color: 'from-blue-500 to-purple-600', description: '12+ months subscribed' },
    { icon: Medal, label: 'Power User', color: 'from-green-500 to-emerald-600', description: 'High usage metrics' },
    { icon: Flame, label: 'Early Adopter', color: 'from-red-500 to-pink-600', description: 'Beta features enabled' }
  ];

  const quickActions = [
    { icon: Plus, label: 'Upgrade Plan', color: 'from-blue-500 to-cyan-600' },
    { icon: Settings, label: 'Billing Settings', color: 'from-green-500 to-emerald-600' },
    { icon: BarChart3, label: 'Usage Analytics', color: 'from-purple-500 to-pink-600' },
    { icon: Bell, label: 'Notifications', color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-purple-500 via-pink-600 to-red-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-top-4 duration-1000">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white dark:bg-gray-200 rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white dark:bg-gray-200 rounded-full translate-x-40 translate-y-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white dark:bg-gray-200 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 dark:bg-gray-200/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-yellow-300/40 dark:bg-yellow-200/50 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-pink-300/30 dark:bg-pink-200/40 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300/40 dark:bg-blue-200/50 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 dark:bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 dark:border-white/20 shadow-2xl hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 hover:scale-110 hover:rotate-12 group">
              <CreditCard className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 animate-in slide-in-from-left-4 duration-1000 text-white">My Subscription</h1>
              <p className="text-purple-100 dark:text-purple-200 text-lg animate-in slide-in-from-left-4 duration-1000 delay-200">Manage your plan and billing preferences</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2 bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 animate-in slide-in-from-left-4 duration-1000 delay-300 border border-white/20">
                  <Crown className="w-4 h-4 text-yellow-300 dark:text-yellow-200" />
                  <span className="font-semibold text-white">Premium Member</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 animate-in slide-in-from-left-4 duration-1000 delay-500 border border-white/20">
                  <Zap className="w-4 h-4 text-green-300 dark:text-green-200" />
                  <span className="font-semibold text-white">Auto-renewal Active</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => window.location.hash = 'payment'}
              className="group flex items-center space-x-3 px-8 py-4 bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-2xl hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-in slide-in-from-right-4 duration-1000 text-white border border-white/20"
            >
              <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-bold text-lg">Manage Subscription</span>
            </button>
            <div className="flex space-x-2">
              {quickActions.slice(1).map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className={`p-3 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 hover:rotate-12 group animate-in slide-in-from-right-4 duration-1000 border border-white/20`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-4 mb-8">
          {achievements.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className={`flex items-center space-x-3 px-6 py-3 bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group animate-in slide-in-from-bottom-4 duration-1000 border border-white/20`}
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-sm text-white">{badge.label}</span>
                  <p className="text-xs text-white/80">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000`}
                style={{ animationDelay: `${index * 150 + 800}ms` }}
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
                <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-purple-100 dark:text-purple-200 mb-1">{stat.label}</p>
                <p className="text-xs text-purple-200 dark:text-purple-300">{stat.change}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHeader;