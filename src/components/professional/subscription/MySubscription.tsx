import React, { useState } from 'react';
import { Crown, Star, Zap, Shield, Download, TrendingUp, Award, Users, Calendar, Clock } from 'lucide-react';
import SubscriptionHeader from './SubscriptionHeader';
import CurrentPlan from './CurrentPlan';
import SubscriptionPlans from './SubscriptionPlans';
import UsageStats from './UsageStats';
import BillingHistory from './BillingHistory';

const MySubscription: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'usage' | 'billing'>('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Current plan data
  const currentPlan = {
    name: 'Professional',
    price: billingCycle === 'monthly' ? 29 : 290,
    billingCycle,
    nextBilling: new Date('2025-01-15'),
    features: [
      'Unlimited appointments',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access'
    ],
    status: 'active'
  };

  // Usage stats data
  const usageStats = {
    appointmentsThisMonth: 847,
    appointmentLimit: 'Unlimited',
    storageUsed: 2.3,
    storageLimit: 10,
    clientsManaged: 1247,
    revenueProcessed: 15420,
    apiCalls: 15420,
    apiLimit: 50000
  };

  // Format date utility
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleTabChange = (tab: 'overview' | 'plans' | 'usage' | 'billing') => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 300);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'plans', label: 'Plans', icon: Crown },
    { id: 'usage', label: 'Usage', icon: Zap },
    { id: 'billing', label: 'Billing', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden transition-colors duration-500">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300 rounded-full opacity-20 dark:opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 transform rotate-12 scale-150"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 transform -rotate-12 scale-150"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Crown className="w-16 h-16 text-purple-600 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
            My Subscription
          </h1>
          <p className="text-gray-600 text-lg">Manage your premium membership and billing</p>
        </div>

        {/* Status Banner */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:from-purple-600 dark:via-pink-600 dark:to-red-600 rounded-2xl p-6 mb-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 dark:bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 dark:border-white/20 shadow-lg hover:scale-110 transition-transform duration-300">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Pro Plan Active</h3>
                <p className="text-white/80 dark:text-white/90">Premium features unlocked</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$29/month</div>
              <div className="text-white/80 dark:text-white/90">Next billing: Jan 15, 2025</div>
            </div>
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Award, label: 'Premium Member', value: '2 Years', color: 'from-yellow-400 to-orange-500' },
            { icon: Users, label: 'Total Clients', value: '1,247', color: 'from-blue-400 to-purple-500' },
            { icon: Calendar, label: 'Appointments', value: '3,892', color: 'from-green-400 to-teal-500' },
            { icon: Clock, label: 'Hours Saved', value: '156h', color: 'from-pink-400 to-red-500' }
          ].map((badge, index) => (
            <div
              key={badge.label}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up border border-gray-100 dark:border-gray-700 group"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-xl flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                <badge.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1 group-hover:scale-105 transition-transform duration-300">{badge.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{badge.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg mb-8 animate-slide-up border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500" style={{ animationDelay: '0.6s' }}>
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-all duration-300 hover:scale-105 group ${
                  activeTab === tab.id
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <SubscriptionHeader />
                  <CurrentPlan currentPlan={currentPlan} formatDate={formatDate} />
                  
                  {/* Premium Features Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-slide-up border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                      <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400 mr-2 animate-pulse" />
                      Premium Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { icon: Shield, title: 'Advanced Security', desc: 'Enhanced protection for your data' },
                        { icon: Users, title: 'Unlimited Clients', desc: 'No limits on client management' },
                        { icon: Calendar, title: 'Priority Booking', desc: 'Get booked first in search results' },
                        { icon: TrendingUp, title: 'Analytics Pro', desc: 'Advanced insights and reporting' },
                        { icon: Download, title: 'Data Export', desc: 'Export all your business data' },
                        { icon: Award, title: 'VIP Support', desc: '24/7 priority customer support' }
                      ].map((feature, index) => (
                        <div
                          key={feature.title}
                          className="flex items-start space-x-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'plans' && (
                <SubscriptionPlans 
                  billingCycle={billingCycle}
                  setBillingCycle={setBillingCycle}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  currentPlan={currentPlan}
                />
              )}

              {activeTab === 'usage' && <UsageStats usageStats={usageStats} />}

              {activeTab === 'billing' && <BillingHistory billingCycle={billingCycle} />}
            </>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-bounce">
          <Crown className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 dark:bg-red-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default MySubscription;