import React, { useState } from 'react';
import { Crown, Rocket, Diamond, Check, Star, Zap, Shield, Users, Calendar, Award, TrendingUp, BarChart3, Activity, Clock, Target, Heart, Eye, Bookmark, Sparkles, Trophy, Medal, Flame, Gift, CheckCircle, AlertCircle, Info, Lightbulb, Plus, Minus, Settings, Bell, Share2, DollarSign, Percent, X } from 'lucide-react';

interface PaymentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  taxId?: string;
  selectedPlan: string;
  billingCycle: 'monthly' | 'yearly';
  addOns: string[];
  promoCode?: string;
  agreeToTerms: boolean;
  subscribeToNewsletter: boolean;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface PlanSelectionProps {
  paymentData: PaymentData;
  updatePaymentData: (updates: Partial<PaymentData>) => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ paymentData, updatePaymentData }) => {
  const [showComparison, setShowComparison] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState(paymentData.promoCode || '');
  const [promoApplied, setPromoApplied] = useState(false);

  const plans = [
    {
      id: 'starter',
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
        'Basic calendar management',
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
      id: 'professional',
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
      id: 'enterprise',
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

  const addOns = [
    {
      id: 'sms-notifications',
      name: 'SMS Notifications',
      description: 'Send SMS reminders to clients',
      monthlyPrice: 5,
      yearlyPrice: 50,
      icon: Bell,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'advanced-analytics',
      name: 'Advanced Analytics',
      description: 'Detailed business insights and reports',
      monthlyPrice: 10,
      yearlyPrice: 100,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 priority customer support',
      monthlyPrice: 15,
      yearlyPrice: 150,
      icon: Award,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'custom-branding',
      name: 'Custom Branding',
      description: 'White-label your booking pages',
      monthlyPrice: 20,
      yearlyPrice: 200,
      icon: Sparkles,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return paymentData.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getOriginalPrice = (plan: typeof plans[0]) => {
    return paymentData.billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (paymentData.billingCycle === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      return monthlyCost - yearlyCost;
    }
    return 0;
  };

  const getDiscount = (plan: typeof plans[0]) => {
    const price = getPrice(plan);
    const originalPrice = getOriginalPrice(plan);
    if (originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  };

  const handlePlanSelect = (planId: string) => {
    updatePaymentData({ selectedPlan: planId });
  };

  const handleAddOnToggle = (addOnId: string) => {
    const currentAddOns = paymentData.addOns || [];
    const newAddOns = currentAddOns.includes(addOnId)
      ? currentAddOns.filter(id => id !== addOnId)
      : [...currentAddOns, addOnId];
    updatePaymentData({ addOns: newAddOns });
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCodeInput.toLowerCase() === 'save20') {
      setPromoApplied(true);
      updatePaymentData({ promoCode: promoCodeInput });
    }
  };

  const calculateTotal = () => {
    const selectedPlan = plans.find(p => p.id === paymentData.selectedPlan);
    if (!selectedPlan) return 0;

    let total = getPrice(selectedPlan);
    
    // Add add-ons
    paymentData.addOns?.forEach(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      if (addOn) {
        total += paymentData.billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
      }
    });

    // Apply promo discount
    if (promoApplied) {
      total = total * 0.8; // 20% discount
    }

    return total;
  };

  return (
    <div className="space-y-8">
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center animate-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updatePaymentData({ billingCycle: 'monthly' })}
              className={`px-8 py-4 rounded-xl transition-all duration-300 font-bold ${
                paymentData.billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => updatePaymentData({ billingCycle: 'yearly' })}
              className={`px-8 py-4 rounded-xl transition-all duration-300 font-bold relative ${
                paymentData.billingCycle === 'yearly'
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

      {/* Plans */}
      <div className="space-y-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const price = getPrice(plan);
          const originalPrice = getOriginalPrice(plan);
          const savings = getSavings(plan);
          const discount = getDiscount(plan);
          const isSelected = paymentData.selectedPlan === plan.id;
          
          return (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000 ${
                isSelected
                  ? 'border-purple-500 dark:border-purple-400 ring-4 ring-purple-200 dark:ring-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30'
                  : plan.popular
                    ? 'border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-500'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
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
                          {isSelected && (
                            <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                              ✅ Selected
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
                        /{paymentData.billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                      {originalPrice > price && (
                        <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                          ${originalPrice}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold animate-bounce shadow-lg">
                          {discount}% OFF
                        </span>
                      )}
                      {savings > 0 && (
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
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
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full lg:w-auto px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                          : `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl`
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <span>Select Plan</span>
                          <Crown className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-ons */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <label className="text-lg font-bold text-gray-900 dark:text-white">Add-ons (Optional)</label>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {paymentData.addOns?.length || 0} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map((addOn, index) => {
            const Icon = addOn.icon;
            const isSelected = paymentData.addOns?.includes(addOn.id) || false;
            const price = paymentData.billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
            
            return (
              <button
                key={addOn.id}
                onClick={() => handleAddOnToggle(addOn.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${addOn.color} text-white shadow-xl`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                      isSelected 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : `bg-gradient-to-r ${addOn.color}`
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {addOn.name}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      ${price}
                    </div>
                    <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      /{paymentData.billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {addOn.description}
                </p>
                {isSelected && (
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm font-bold text-white">Added</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Promo Code */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Percent className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Promo Code</label>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
              placeholder="Enter promo code"
              disabled={promoApplied}
              className={`w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                promoApplied 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            />
            {promoApplied && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            )}
          </div>
          <button
            onClick={applyPromoCode}
            disabled={!promoCodeInput || promoApplied}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </button>
        </div>

        {promoApplied && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-700 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-bold text-green-800 dark:text-green-300">Promo Code Applied!</h4>
                <p className="text-sm text-green-700 dark:text-green-200">You saved 20% on your subscription</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>
        </div>
        
        <div className="space-y-3">
          {/* Selected Plan */}
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <span className="font-medium text-gray-900 dark:text-white">
              {plans.find(p => p.id === paymentData.selectedPlan)?.name} Plan
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${getPrice(plans.find(p => p.id === paymentData.selectedPlan)!)}
            </span>
          </div>

          {/* Add-ons */}
          {paymentData.addOns?.map(addOnId => {
            const addOn = addOns.find(a => a.id === addOnId);
            if (!addOn) return null;
            const price = paymentData.billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
            
            return (
              <div key={addOnId} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span className="font-medium text-gray-900 dark:text-white">{addOn.name}</span>
                <span className="font-bold text-gray-900 dark:text-white">${price}</span>
              </div>
            );
          })}

          {/* Promo Discount */}
          {promoApplied && (
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
              <span className="font-medium text-green-800 dark:text-green-300">Promo Discount (20%)</span>
              <span className="font-bold text-green-800 dark:text-green-300">
                -${(calculateTotal() / 0.8 * 0.2).toFixed(2)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Total:</span>
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-right mt-1">
              Billed {paymentData.billingCycle}
            </p>
          </div>
        </div>
      </div>

      {/* Plan Comparison Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
        >
          <Eye className="w-5 h-5" />
          <span>{showComparison ? 'Hide' : 'Show'} Detailed Comparison</span>
        </button>
      </div>

      {/* Detailed Comparison */}
      {showComparison && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-in slide-in-from-top-2 duration-500">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Plan Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white">Feature</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="text-center py-4 px-6">
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white font-bold`}>
                        <plan.icon className="w-4 h-4" />
                        <span>{plan.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'Appointments per month',
                  'Calendar management',
                  'Payment processing',
                  'Analytics & reporting',
                  'Custom branding',
                  'API access',
                  'Priority support'
                ].map((feature, index) => (
                  <tr key={feature} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{feature}</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="py-4 px-6 text-center">
                        {plan.features.some(f => f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])) ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSelection;