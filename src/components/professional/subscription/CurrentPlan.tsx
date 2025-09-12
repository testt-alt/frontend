import React from 'react';
import { Crown, CheckCircle, Star, Award, Zap, Shield, Users, Calendar, TrendingUp, BarChart3, Activity, Clock, Target, Heart, Eye, Bookmark, Sparkles, Trophy, Medal, Flame, Gift, Rocket, Diamond, Settings, Download, Bell } from 'lucide-react';

interface CurrentPlanProps {
  currentPlan: {
    name: string;
    price: number;
    billingCycle: 'monthly' | 'yearly';
    nextBilling: string;
    status: string;
    features: string[];
  };
  formatDate: (dateString: string) => string;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({ currentPlan, formatDate }) => {
  const planIcons = {
    'Starter': Rocket,
    'Professional': Crown,
    'Enterprise': Diamond
  };

  const planColors = {
    'Starter': 'from-blue-500 to-cyan-600',
    'Professional': 'from-purple-500 to-pink-600',
    'Enterprise': 'from-yellow-500 to-orange-600'
  };

  const PlanIcon = planIcons[currentPlan.name as keyof typeof planIcons] || Crown;
  const planColor = planColors[currentPlan.name as keyof typeof planColors] || 'from-purple-500 to-pink-600';

  const planBenefits = [
    { icon: CheckCircle, label: 'Unlimited appointments', description: 'No booking limits' },
    { icon: Star, label: 'Priority support', description: '24/7 assistance' },
    { icon: Shield, label: 'Advanced security', description: 'Enterprise-grade protection' },
    { icon: Zap, label: 'Real-time sync', description: 'Instant updates' }
  ];

  const quickStats = [
    { label: 'Plan Status', value: currentPlan.status, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
    { label: 'Billing Cycle', value: currentPlan.billingCycle, icon: Calendar, color: 'from-blue-500 to-cyan-600' },
    { label: 'Next Billing', value: formatDate(currentPlan.nextBilling), icon: Clock, color: 'from-purple-500 to-pink-600' },
    { label: 'Auto-renewal', value: 'Enabled', icon: Zap, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Current Plan Overview */}
      <div className="relative bg-gradient-to-br from-purple-500 via-pink-600 to-red-500 dark:from-purple-600 dark:via-pink-700 dark:to-red-600 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-top-4 duration-1000">
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-white/20 dark:bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 dark:border-white/20 shadow-2xl hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 hover:scale-110 hover:rotate-12 group">
                  <PlanIcon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">{currentPlan.name} Plan</h2>
                  <div className="flex items-center space-x-3">
                    <span className="bg-white/20 dark:bg-black/30 px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/20">
                      {currentPlan.status === 'active' ? '✅ Active' : '❌ Inactive'}
                    </span>
                    <span className="bg-green-500/20 dark:bg-green-400/20 px-4 py-2 rounded-full text-sm font-medium text-green-200 dark:text-green-100 backdrop-blur-sm animate-pulse border border-green-300/30">
                      💎 Premium Features
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-white mb-2 animate-in slide-in-from-left-4 duration-1000 delay-200">
                  ${currentPlan.price}
                  <span className="text-xl text-purple-100 dark:text-purple-200">/{currentPlan.billingCycle}</span>
                </div>
                <p className="text-purple-100 dark:text-purple-200 text-lg">
                  Next billing: {formatDate(currentPlan.nextBilling)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentPlan.features.slice(0, 4).map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-white/20 dark:bg-black/30 px-4 py-2 rounded-full text-sm text-white backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-1000 border border-white/20"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    {feature}
                  </span>
                ))}
                <span className="bg-white/20 dark:bg-black/30 px-4 py-2 rounded-full text-sm text-white backdrop-blur-sm border border-white/20">
                  +{currentPlan.features.length - 4} more
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button className="group flex items-center space-x-3 px-8 py-4 bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-2xl hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-in slide-in-from-right-4 duration-1000 text-white border border-white/20">
                <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-bold text-lg">Manage Plan</span>
              </button>
              <button className="group flex items-center space-x-3 px-8 py-4 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-2xl hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 animate-in slide-in-from-right-4 duration-1000 delay-200 text-white border border-white/20">
                <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold">Download Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Benefits */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Plan Benefits</h3>
            <p className="text-gray-600 dark:text-gray-400">What's included in your subscription</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 150 + 700}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                    {benefit.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse group-hover:animate-spin" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 150 + 800}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                  <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text">
                    {stat.value}
                  </div>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentPlan;