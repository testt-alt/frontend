import React, { useState } from 'react';
import { Edit, Eye, Star, Clock, DollarSign, MapPin, Calendar, User, CreditCard, CheckCircle, AlertCircle, Shield, Award, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Heart, Bookmark, Share2, Plus, Minus, Info, Lightbulb, Camera, Video, Mic, Settings, Bell, Gift, Rocket, Diamond, BarChart3, Activity, TrendingUp, Users, Phone, Mail, Building, Globe, Lock, Percent } from 'lucide-react';

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

interface OrderSummaryProps {
  paymentData: PaymentData;
  updatePaymentData: (updates: Partial<PaymentData>) => void;
  onEditStep: (step: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ paymentData, updatePaymentData, onEditStep }) => {
  const [showFullCardNumber, setShowFullCardNumber] = useState(false);
  const [confirmationChecks, setConfirmationChecks] = useState({
    reviewedOrder: false,
    confirmedPayment: false,
    understoodTerms: false
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 9,
      yearlyPrice: 90,
      originalMonthlyPrice: 15,
      originalYearlyPrice: 150,
      icon: Rocket,
      color: 'from-blue-500 to-cyan-600',
      features: ['Up to 50 appointments/month', 'Basic calendar', 'Email notifications', 'Client profiles', 'Mobile app access', 'Basic support']
    },
    {
      id: 'professional',
      name: 'Professional',
      monthlyPrice: 29,
      yearlyPrice: 290,
      originalMonthlyPrice: 39,
      originalYearlyPrice: 390,
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      features: ['Unlimited appointments', 'Advanced calendar', 'Client communication', 'Analytics & reporting', 'Custom booking page', 'Payment processing', 'Review management', 'Priority support', 'API access', 'Team collaboration']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: 79,
      yearlyPrice: 790,
      originalMonthlyPrice: 99,
      originalYearlyPrice: 990,
      icon: Diamond,
      color: 'from-yellow-500 to-orange-600',
      features: ['Everything in Professional', 'Multi-location support', 'Advanced integrations', 'White-label solution', 'Custom workflows', 'Dedicated account manager', 'Advanced security', 'Custom reporting', 'SLA guarantee', '24/7 phone support']
    }
  ];

  const addOns = [
    { id: 'sms-notifications', name: 'SMS Notifications', monthlyPrice: 5, yearlyPrice: 50, icon: Bell },
    { id: 'advanced-analytics', name: 'Advanced Analytics', monthlyPrice: 10, yearlyPrice: 100, icon: BarChart3 },
    { id: 'priority-support', name: 'Priority Support', monthlyPrice: 15, yearlyPrice: 150, icon: Award },
    { id: 'custom-branding', name: 'Custom Branding', monthlyPrice: 20, yearlyPrice: 200, icon: Sparkles }
  ];

  const selectedPlan = plans.find(p => p.id === paymentData.selectedPlan);
  const selectedAddOns = addOns.filter(addOn => paymentData.addOns?.includes(addOn.id));

  const getPrice = (plan: typeof plans[0]) => {
    return paymentData.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getOriginalPrice = (plan: typeof plans[0]) => {
    return paymentData.billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
  };

  const calculateSubtotal = () => {
    if (!selectedPlan) return 0;
    
    let total = getPrice(selectedPlan);
    
    selectedAddOns.forEach(addOn => {
      total += paymentData.billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
    });
    
    return total;
  };

  const calculateDiscount = () => {
    if (!selectedPlan) return 0;
    
    const originalPrice = getOriginalPrice(selectedPlan);
    const currentPrice = getPrice(selectedPlan);
    let discount = originalPrice - currentPrice;
    
    // Add promo code discount
    if (paymentData.promoCode) {
      discount += calculateSubtotal() * 0.2; // 20% promo discount
    }
    
    return discount;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount;
  };

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length < 4) return cardNumber;
    return `•••• •••• •••• ${cleaned.slice(-4)}`;
  };

  const handleConfirmationCheck = (key: keyof typeof confirmationChecks) => {
    setConfirmationChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecksCompleted = Object.values(confirmationChecks).every(Boolean);

  return (
    <div className="space-y-8">
      {/* Order Review Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 group">
          <Eye className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Review Your Order</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Please review all details before completing your payment
        </p>
      </div>

      {/* User Information Summary */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Account Information</h3>
              <p className="text-gray-600 dark:text-gray-400">Your personal and billing details</p>
            </div>
          </div>
          <button
            onClick={() => onEditStep(1)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <Edit className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">Full Name</p>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  {paymentData.firstName} {paymentData.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50">
              <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-bold">Email</p>
                <p className="font-bold text-gray-900 dark:text-white">{paymentData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
              <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-bold">Phone</p>
                <p className="font-bold text-gray-900 dark:text-white">{paymentData.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {paymentData.company && (
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200/50 dark:border-orange-700/50">
                <Building className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-bold">Company</p>
                  <p className="font-bold text-gray-900 dark:text-white">{paymentData.company}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50">
              <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">Billing Address</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {paymentData.billingAddress.street}, {paymentData.billingAddress.city}, {paymentData.billingAddress.state} {paymentData.billingAddress.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Summary */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Plan</h3>
              <p className="text-gray-600 dark:text-gray-400">Your selected plan and add-ons</p>
            </div>
          </div>
          <button
            onClick={() => onEditStep(2)}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <Edit className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        {selectedPlan && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedPlan.color} flex items-center justify-center shadow-lg`}>
                <selectedPlan.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPlan.name} Plan</h4>
                <p className="text-purple-600 dark:text-purple-400 font-medium">
                  Billed {paymentData.billingCycle} • {selectedPlan.features.length} features included
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${getPrice(selectedPlan)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  /{paymentData.billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedPlan.features.slice(0, 6).map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
              {selectedPlan.features.length > 6 && (
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    +{selectedPlan.features.length - 6} more features
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add-ons */}
        {selectedAddOns.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Add-ons:</h4>
            {selectedAddOns.map((addOn, index) => {
              const Icon = addOn.icon;
              const price = paymentData.billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
              
              return (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-right-4 duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{addOn.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">${price}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Information Summary */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000 delay-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Information</h3>
              <p className="text-gray-600 dark:text-gray-400">Your payment method and billing details</p>
            </div>
          </div>
          <button
            onClick={() => onEditStep(3)}
            className="flex items-center space-x-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <Edit className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h4 className="font-bold text-gray-900 dark:text-white">Payment Card</h4>
              </div>
              <button
                onClick={() => setShowFullCardNumber(!showFullCardNumber)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {showFullCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                {showFullCardNumber ? paymentData.cardNumber : maskCardNumber(paymentData.cardNumber)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expires: {paymentData.expiryDate}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {paymentData.cardholderName}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">Billing Address</h4>
            </div>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>{paymentData.billingAddress.street}</p>
              <p>{paymentData.billingAddress.city}, {paymentData.billingAddress.state} {paymentData.billingAddress.zipCode}</p>
              <p>{paymentData.billingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Order Total</h3>
            <p className="text-gray-600 dark:text-gray-400">Breakdown of charges</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Plan Cost */}
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Crown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {selectedPlan?.name} Plan ({paymentData.billingCycle})
              </span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              ${selectedPlan ? getPrice(selectedPlan) : 0}
            </span>
          </div>

          {/* Add-ons */}
          {selectedAddOns.map((addOn, index) => {
            const Icon = addOn.icon;
            const price = paymentData.billingCycle === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
            
            return (
              <div key={addOn.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-white">{addOn.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">${price}</span>
              </div>
            );
          })}

          {/* Subtotal */}
          <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-600 rounded-2xl">
            <span className="font-medium text-gray-900 dark:text-white">Subtotal</span>
            <span className="font-bold text-gray-900 dark:text-white">${calculateSubtotal()}</span>
          </div>

          {/* Discounts */}
          {calculateDiscount() > 0 && (
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-700">
              <div className="flex items-center space-x-2">
                <Percent className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-800 dark:text-green-300">
                  Discounts {paymentData.promoCode && `(${paymentData.promoCode})`}
                </span>
              </div>
              <span className="font-bold text-green-800 dark:text-green-300">
                -${calculateDiscount().toFixed(2)}
              </span>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl border-2 border-emerald-200 dark:border-emerald-700">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Total Amount</span>
              <div className="text-right">
                <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${calculateTotal().toFixed(2)}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Billed {paymentData.billingCycle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Confirmation Checks */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Final Confirmation</h3>
            <p className="text-gray-600 dark:text-gray-400">Please confirm before proceeding</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              key: 'reviewedOrder',
              label: 'I have reviewed my order details',
              description: 'All information is correct and complete',
              icon: Eye,
              color: 'from-blue-500 to-cyan-600'
            },
            {
              key: 'confirmedPayment',
              label: 'I confirm the payment amount',
              description: `Total: $${calculateTotal().toFixed(2)} ${paymentData.billingCycle}`,
              icon: DollarSign,
              color: 'from-green-500 to-emerald-600'
            },
            {
              key: 'understoodTerms',
              label: 'I understand the terms and conditions',
              description: 'Including cancellation and refund policies',
              icon: Shield,
              color: 'from-purple-500 to-pink-600'
            }
          ].map((check, index) => {
            const Icon = check.icon;
            const isChecked = confirmationChecks[check.key as keyof typeof confirmationChecks];
            
            return (
              <button
                key={check.key}
                onClick={() => handleConfirmationCheck(check.key as keyof typeof confirmationChecks)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isChecked
                    ? `border-transparent bg-gradient-to-br ${check.color} text-white shadow-xl`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                    isChecked 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-r ${check.color}`
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${isChecked ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {check.label}
                    </h4>
                  </div>
                </div>
                <p className={`text-sm ${isChecked ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {check.description}
                </p>
                {isChecked && (
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm font-bold text-white">Confirmed</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Ready to Pay Indicator */}
        <div className={`mt-6 p-4 rounded-2xl border-2 transition-all duration-500 ${
          allChecksCompleted
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 animate-pulse'
            : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
        }`}>
          <div className="flex items-center space-x-3">
            {allChecksCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 animate-bounce" />
            ) : (
              <AlertCircle className="w-6 h-6 text-gray-400" />
            )}
            <div>
              <h4 className={`font-bold ${allChecksCompleted ? 'text-green-800 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {allChecksCompleted ? 'Ready to Process Payment' : 'Please complete all confirmations'}
              </h4>
              <p className={`text-sm ${allChecksCompleted ? 'text-green-700 dark:text-green-200' : 'text-gray-500 dark:text-gray-500'}`}>
                {allChecksCompleted 
                  ? 'All confirmations completed. You can now proceed with payment.'
                  : 'Please check all boxes above to proceed with payment.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50 animate-in slide-in-from-bottom-4 duration-1000 delay-800">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security & Privacy</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Lock,
              title: 'Secure Payment',
              description: 'Your payment is processed securely using industry-standard encryption',
              color: 'text-green-500'
            },
            {
              icon: Shield,
              title: 'Privacy Protected',
              description: 'We never share your personal information with third parties',
              color: 'text-blue-500'
            },
            {
              icon: Award,
              title: 'Money-Back Guarantee',
              description: '30-day money-back guarantee if you\'re not satisfied',
              color: 'text-purple-500'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 100 + 900}ms` }}
            >
              <feature.icon className={`w-5 h-5 ${feature.color} mt-1 group-hover:scale-110 transition-transform duration-300`} />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;