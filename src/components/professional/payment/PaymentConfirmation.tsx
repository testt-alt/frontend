import React, { useEffect, useState } from 'react';
import { CheckCircle, Crown, Calendar, Mail, Download, Share2, Star, Award, Trophy, Medal, Flame, Sparkles, Zap, Target, Heart, Eye, Bookmark, Gift, Rocket, Diamond, Users, Clock, BarChart3, Activity, TrendingUp, Settings, Bell, ArrowRight, Home, CreditCard, Shield, Globe } from 'lucide-react';

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

interface PaymentConfirmationProps {
  paymentData: PaymentData;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ paymentData }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true);
    
    // Animate elements in sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1000);
    const timer3 = setTimeout(() => setAnimationStep(3), 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const plans = [
    { id: 'starter', name: 'Starter', icon: Rocket, color: 'from-blue-500 to-cyan-600' },
    { id: 'professional', name: 'Professional', icon: Crown, color: 'from-purple-500 to-pink-600' },
    { id: 'enterprise', name: 'Enterprise', icon: Diamond, color: 'from-yellow-500 to-orange-600' }
  ];

  const selectedPlan = plans.find(p => p.id === paymentData.selectedPlan);
  const transactionId = `TXN-${Date.now().toString().slice(-8)}`;
  const confirmationNumber = `CONF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Email',
      description: 'We\'ve sent a confirmation email with your receipt and account details',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Settings,
      title: 'Set Up Your Account',
      description: 'Complete your profile and customize your booking page',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Calendar,
      title: 'Start Booking',
      description: 'Begin accepting appointments and managing your schedule',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'Track Performance',
      description: 'Monitor your business growth with advanced analytics',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    {
      icon: Crown,
      title: 'Premium Features Unlocked',
      description: 'Access to all professional tools and features',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 customer support with faster response times',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Instant Activation',
      description: 'Your account is now active and ready to use',
      color: 'text-green-500'
    },
    {
      icon: Award,
      title: 'Money-Back Guarantee',
      description: '30-day satisfaction guarantee included',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-8 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
            />
          ))}
        </div>
      )}

      {/* Success Header */}
      <div className="text-center animate-in slide-in-from-top-4 duration-1000">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 group animate-bounce">
            <CheckCircle className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin shadow-lg">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Trophy className="h-5 w-5 text-white" />
          </div>
        </div>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Payment Successful!
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome to ProBooking {selectedPlan?.name}!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your subscription has been activated and you now have access to all premium features.
        </p>
      </div>

      {/* Transaction Details */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction Details</h3>
            <p className="text-gray-600 dark:text-gray-400">Your payment confirmation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-bold">Transaction ID</p>
                <p className="font-mono text-gray-900 dark:text-white font-bold">{transactionId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">Confirmation Number</p>
                <p className="font-mono text-gray-900 dark:text-white font-bold">{confirmationNumber}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-bold">Payment Date</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedPlan && (
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50">
                <selectedPlan.icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-bold">Plan</p>
                  <p className="font-bold text-gray-900 dark:text-white">{selectedPlan.name}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50">
              <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">Billing Cycle</p>
                <p className="font-bold text-gray-900 dark:text-white capitalize">{paymentData.billingCycle}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl border border-red-200/50 dark:border-red-700/50">
              <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 font-bold">Receipt Sent To</p>
                <p className="font-bold text-gray-900 dark:text-white">{paymentData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Unlocked */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000 delay-400">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Benefits Unlocked</h3>
            <p className="text-gray-600 dark:text-gray-400">You now have access to these premium features</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 150 + 500}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <Icon className={`w-8 h-8 ${benefit.color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse group-hover:animate-spin" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-600">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">What's Next?</h3>
            <p className="text-gray-600 dark:text-gray-400">Get started with your new subscription</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 200 + 700}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                  <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-1000 delay-800">
        <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group">
          <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-lg">Go to Dashboard</span>
        </button>
        
        <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group">
          <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-lg">Download Receipt</span>
        </button>
        
        <button className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group">
          <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-bold text-lg">Share Success</span>
        </button>
      </div>

      {/* Support Information */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50 animate-in slide-in-from-bottom-4 duration-1000 delay-1000">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Need Help Getting Started?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Bell,
              title: 'Live Chat Support',
              description: 'Get instant help from our support team',
              color: 'text-green-500'
            },
            {
              icon: Globe,
              title: 'Knowledge Base',
              description: 'Browse our comprehensive help articles',
              color: 'text-blue-500'
            },
            {
              icon: Users,
              title: 'Community Forum',
              description: 'Connect with other professionals',
              color: 'text-purple-500'
            }
          ].map((support, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 100 + 1100}ms` }}
            >
              <support.icon className={`w-5 h-5 ${support.color} mt-1 group-hover:scale-110 transition-transform duration-300`} />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{support.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{support.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Celebration Message */}
      <div className="text-center bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden animate-in slide-in-from-bottom-4 duration-1000 delay-1200">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-300" />
            <Heart className="w-8 h-8 text-pink-300" />
            <Star className="w-8 h-8 text-yellow-300 fill-current" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            🎉 Congratulations! 🎉
          </h3>
          <p className="text-lg text-emerald-100 mb-6 max-w-2xl mx-auto">
            You're now part of the ProBooking family! Start building your professional presence and grow your business with our powerful tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="font-bold">Instant Access</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="font-bold">30-Day Guarantee</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-blue-300" />
              <span className="font-bold">Premium Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;