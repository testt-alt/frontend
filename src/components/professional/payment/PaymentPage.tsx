import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Save, X, CreditCard, User, FileText, CheckCircle, AlertCircle, Shield, Lock, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Award, Heart, Star, Eye, Bookmark, Gift, Rocket, Diamond, Calendar, DollarSign, Settings, Bell, Share2, Plus, Minus, Info, Lightbulb, Camera, Video, Mic, BarChart3 } from 'lucide-react';
import UserInformation from './UserInformation';
import PaymentInformation from './PaymentInformation';
import PlanSelection from './PlanSelection';
import OrderSummary from './OrderSummary';
import PaymentConfirmation from './PaymentConfirmation';

interface PaymentData {
  // User Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  taxId?: string;
  
  // Payment Information
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
  
  // Plan Selection
  selectedPlan: string;
  billingCycle: 'monthly' | 'yearly';
  addOns: string[];
  
  // Additional
  promoCode?: string;
  agreeToTerms: boolean;
  subscribeToNewsletter: boolean;
}

interface PaymentPageProps {
  onBack: () => void;
  onComplete: (paymentData: PaymentData) => void;
  initialPlan?: string;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack, onComplete, initialPlan = 'professional' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    taxId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    selectedPlan: initialPlan,
    billingCycle: 'monthly',
    addOns: [],
    promoCode: '',
    agreeToTerms: false,
    subscribeToNewsletter: true
  });

  const steps = [
    { 
      id: 1, 
      title: 'User Info', 
      description: 'Personal and business details',
      icon: User, 
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    { 
      id: 2, 
      title: 'Plan Selection', 
      description: 'Choose your subscription plan',
      icon: Crown, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
    },
    { 
      id: 3, 
      title: 'Payment Info', 
      description: 'Billing and payment details',
      icon: CreditCard, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    { 
      id: 4, 
      title: 'Review & Pay', 
      description: 'Confirm your order',
      icon: CheckCircle, 
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
    },
    { 
      id: 5, 
      title: 'Confirmation', 
      description: 'Payment successful',
      icon: Trophy, 
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    }
  ];

  // Save progress to localStorage
  useEffect(() => {
    const progressData = {
      currentStep,
      paymentData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('probooking_payment_progress', JSON.stringify(progressData));
  }, [currentStep, paymentData]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('probooking_payment_progress');
    if (savedProgress) {
      try {
        const { currentStep: savedStep, paymentData: savedData, timestamp } = JSON.parse(savedProgress);
        const timeDiff = new Date().getTime() - new Date(timestamp).getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // Only restore if less than 24 hours old
        if (hoursDiff < 24) {
          setCurrentStep(savedStep);
          setPaymentData(savedData);
        } else {
          localStorage.removeItem('probooking_payment_progress');
        }
      } catch (error) {
        localStorage.removeItem('probooking_payment_progress');
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || stepId === currentStep + 1) {
      setCurrentStep(stepId);
    }
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    localStorage.removeItem('probooking_payment_progress');
    setShowCancelDialog(false);
    onBack();
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      localStorage.removeItem('probooking_payment_progress');
      setCurrentStep(5); // Go to confirmation step
      setTimeout(() => {
        onComplete(paymentData);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentData = (updates: Partial<PaymentData>) => {
    setPaymentData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserInformation 
            paymentData={paymentData} 
            updatePaymentData={updatePaymentData}
          />
        );
      case 2:
        return (
          <PlanSelection 
            paymentData={paymentData} 
            updatePaymentData={updatePaymentData}
          />
        );
      case 3:
        return (
          <PaymentInformation 
            paymentData={paymentData} 
            updatePaymentData={updatePaymentData}
          />
        );
      case 4:
        return (
          <OrderSummary 
            paymentData={paymentData} 
            updatePaymentData={updatePaymentData}
            onEditStep={setCurrentStep}
          />
        );
      case 5:
        return (
          <PaymentConfirmation 
            paymentData={paymentData}
          />
        );
      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length - 1;
  const isConfirmationStep = currentStep === steps.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 transition-colors duration-300 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-cyan-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-top-4 duration-1000 mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleCancel}
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                  >
                    <ArrowLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Secure Payment</h1>
                    <p className="text-emerald-100 text-lg">Complete your subscription upgrade</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Shield className="w-5 h-5 text-green-300 animate-pulse" />
                    <span className="text-white font-bold">SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Lock className="w-5 h-5 text-blue-300" />
                    <span className="text-white font-medium">256-bit Encryption</span>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  const isAccessible = step.id <= currentStep || step.id === currentStep + 1;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => isAccessible && handleStepClick(step.id)}
                          disabled={!isAccessible}
                          className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 group relative overflow-hidden ${
                            isActive
                              ? 'bg-white/30 backdrop-blur-sm border-2 border-white/50 shadow-2xl scale-110'
                              : isCompleted
                                ? 'bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-lg hover:bg-white/30 cursor-pointer'
                                : isAccessible
                                  ? 'bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 cursor-pointer'
                                  : 'bg-white/5 backdrop-blur-sm border-2 border-white/10 cursor-not-allowed opacity-50'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-10 h-10 text-green-300 group-hover:scale-110 transition-transform duration-300" />
                          ) : (
                            <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                          )}
                          {isActive && (
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-2xl"></div>
                          )}
                        </button>
                        <div className="mt-4 text-center">
                          <p className={`text-sm font-bold transition-all duration-300 ${
                            isActive ? 'text-white scale-110' : 'text-white/80'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-white/60 mt-1">{step.description}</p>
                        </div>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className={`w-24 h-1 mx-4 rounded-full transition-all duration-500 ${
                          currentStep > step.id 
                            ? 'bg-white/50 shadow-lg' 
                            : 'bg-white/20'
                        }`}>
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ${
                              currentStep > step.id ? 'w-full' : 'w-0'
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Step Content */}
            <div className="lg:col-span-3">
              <div className={`bg-gradient-to-br ${currentStepData.bgColor} backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000`}>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentStepData.color} flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300`}>
                      <currentStepData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Step {currentStep}: {currentStepData.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {currentStepData.description}
                      </p>
                    </div>
                  </div>

                  {renderStepContent()}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Summary */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                    <span className="font-bold text-gray-900 dark:text-white capitalize">{paymentData.selectedPlan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Billing:</span>
                    <span className="font-bold text-gray-900 dark:text-white capitalize">{paymentData.billingCycle}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                      <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        ${paymentData.billingCycle === 'monthly' ? '29' : '290'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: Lock,
                      title: 'SSL Encryption',
                      description: 'Your data is protected with 256-bit SSL encryption',
                      color: 'text-green-500'
                    },
                    {
                      icon: Shield,
                      title: 'PCI Compliant',
                      description: 'We meet the highest security standards',
                      color: 'text-blue-500'
                    },
                    {
                      icon: CheckCircle,
                      title: 'Secure Storage',
                      description: 'Payment info is never stored on our servers',
                      color: 'text-purple-500'
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group"
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

              {/* Progress Stats */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-400">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Progress</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round((currentStep / steps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { label: 'Steps', value: `${currentStep}/${steps.length}` },
                      { label: 'Time', value: '~3 min' }
                    ].map((stat, index) => (
                      <div key={stat.label} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {!isConfirmationStep && (
            <div className="flex items-center justify-between bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  currentStep === 1
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    Step {currentStep} of {steps.length}
                  </span>
                </div>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-105 font-medium"
                >
                  Cancel
                </button>
              </div>

              {isLastStep ? (
                <button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="font-bold">Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span className="font-bold">Complete Payment</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <span className="font-bold">Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Cancel Payment?</h3>
                  <p className="text-gray-600 dark:text-gray-400">Are you sure you want to cancel this payment process?</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 mb-6 border border-yellow-200 dark:border-yellow-700">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Your progress will be saved and you can continue later within 24 hours.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-medium"
                >
                  Continue Payment
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;