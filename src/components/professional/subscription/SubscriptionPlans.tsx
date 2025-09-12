import React, { useState } from 'react';
import { Check, Crown, Zap, Shield, TrendingUp, Users, Calendar, Star, Award, Gift, Target, BarChart3, Activity, Clock, CheckCircle, ArrowRight, Plus, Minus, RefreshCw, DollarSign, Rocket, Diamond, Trophy, Medal, Flame, ThumbsUp, Eye, Share2, Bookmark, Sparkles, Heart } from 'lucide-react';

interface SubscriptionPlansProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  currentPlan: {
    name: string;
    price: number;
    billingCycle: 'monthly' | 'yearly';
    nextBilling: string;
    status: string;
    features: string[];
  };
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  billingCycle,
  setBillingCycle,
  selectedPlan,
  setSelectedPlan,
  currentPlan
}) => {
  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 9,
      yearlyPrice: 90,
      originalMonthlyPrice: 15,
      originalYearlyPrice: 150,
      popular: false,
      description: 'Perfect for getting started',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      features: [
        'Up to 50 appointments/month',
        'Basic calendar',
        'Email notifications',
        'Client profiles',
        'Mobile app access',
        'Basic support'
      ],
      limitations: [
        'Limited customization',
        'Basic analytics only',
        'No payment processing'
      ]
    },
    {
      name: 'Professional',
      monthlyPrice: 29,
      yearlyPrice: 290,
      originalMonthlyPrice: 39,
      originalYearlyPrice: 390,
      popular: true,
      description: 'Most popular for growing businesses',
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      features: [
        'Unlimited appointments',
        'Advanced calendar management',
        'Client communication tools',
        'Analytics & reporting',
        'Custom booking page',
        'Payment processing',
        'Review management',
        'Priority support',
        'API access',
        'Team collaboration'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      monthlyPrice: 79,
      yearlyPrice: 790,
      originalMonthlyPrice: 99,
      originalYearlyPrice: 990,
      popular: false,
      description: 'For large teams and businesses',
      icon: Diamond,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      features: [
        'Everything in Professional',
        'Multi-location support',
        'Advanced integrations',
        'White-label solution',
        'Custom workflows',
        'Dedicated account manager',
        'Advanced security',
        'Custom reporting',
        'SLA guarantee',
        '24/7 phone support'
      ],
      limitations: []
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getOriginalPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingCycle === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      return monthlyCost - yearlyCost;
    }
    return 0;
  };

  return (
    <div className="space-y-8">
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-400">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-bold relative ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center animate-in slide-in-from-left-4 duration-1000 delay-600">
          <Sparkles className="w-8 h-8 mr-3 text-purple-600 dark:text-purple-400 animate-pulse" />
          Available Plans
        </h2>
        
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const price = getPrice(plan);
          const originalPrice = getOriginalPrice(plan);
          const savings = getSavings(plan);
          
          return (
            <div 
              key={index} 
              className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-left-4 duration-1000 ${
                plan.name === currentPlan.name 
                  ? 'border-purple-500 dark:border-purple-400 ring-4 ring-purple-200 dark:ring-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30' 
                  : plan.popular 
                    ? 'border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-500' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              style={{ animationDelay: `${index * 200 + 700}ms` }}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                        <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                            {plan.name}
                          </h3>
                          {plan.popular && (
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                              🔥 Most Popular
                            </span>
                          )}
                          {plan.name === currentPlan.name && (
                            <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              ✅ Current Plan
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">{plan.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline space-x-3 mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                        ${price}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                      {originalPrice > price && (
                        <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                          ${originalPrice}
                        </span>
                      )}
                      {savings > 0 && (
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold animate-bounce shadow-lg">
                          Save ${savings}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex} 
                          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/70 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600/80 transition-all duration-300 hover:scale-105 group/feature border border-gray-200/50 dark:border-gray-600/50"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3">Limitations:</h4>
                        <div className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <div 
                              key={limitIndex} 
                              className="flex items-center space-x-3 p-2 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200/50 dark:border-red-700/50"
                            >
                              <Minus className="w-4 h-4 text-red-500 flex-shrink-0" />
                              <span className="text-sm text-red-700 dark:text-red-300">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="lg:ml-8 mt-6 lg:mt-0">
                    {plan.name === currentPlan.name ? (
                      <button className="w-full lg:w-auto bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 text-white px-8 py-4 rounded-2xl font-bold cursor-not-allowed opacity-75 shadow-lg">
                        Current Plan
                      </button>
                    ) : (
                      <button className={`w-full lg:w-auto bg-gradient-to-r ${plan.color} text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 group/btn shadow-lg`}>
                        <span>{price > currentPlan.price ? 'Upgrade' : 'Downgrade'}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;