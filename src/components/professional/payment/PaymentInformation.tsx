import React, { useState } from 'react';
import { CreditCard, Lock, Shield, Eye, EyeOff, CheckCircle, AlertCircle, Info, Lightbulb, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Award, Heart, Star, Bookmark, Gift, Rocket, Diamond, Calendar, DollarSign, Settings, Bell, Share2, Plus, Minus, X, MapPin, Globe } from 'lucide-react';

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

interface PaymentInformationProps {
  paymentData: PaymentData;
  updatePaymentData: (updates: Partial<PaymentData>) => void;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({ paymentData, updatePaymentData }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showCvv, setShowCvv] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [cardType, setCardType] = useState<string>('');

  const detectCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    if (number.startsWith('6')) return 'discover';
    return '';
  };

  const formatCardNumber = (value: string) => {
    const number = value.replace(/\s/g, '');
    const formatted = number.replace(/(.{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (number.length >= 2) {
      return `${number.substring(0, 2)}/${number.substring(2, 4)}`;
    }
    return number;
  };

  const validateField = (field: string, value: any) => {
    const errors: Record<string, string> = {};
    
    switch (field) {
      case 'cardNumber':
        const cleanNumber = value.replace(/\s/g, '');
        if (!cleanNumber || cleanNumber.length < 13 || cleanNumber.length > 19) {
          errors.cardNumber = 'Please enter a valid card number';
        }
        break;
      case 'expiryDate':
        const [month, year] = value.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
          errors.expiryDate = 'Please enter a valid expiry date';
        } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          errors.expiryDate = 'Card has expired';
        }
        break;
      case 'cvv':
        if (!value || value.length < 3 || value.length > 4) {
          errors.cvv = 'Please enter a valid CVV';
        }
        break;
      case 'cardholderName':
        if (!value || value.trim().length < 2) {
          errors.cardholderName = 'Please enter the cardholder name';
        }
        break;
    }
    
    setValidationErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentData, value: any) => {
    let processedValue = value;
    
    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
      setCardType(detectCardType(processedValue));
    } else if (field === 'expiryDate') {
      processedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    updatePaymentData({ [field]: processedValue });
    validateField(field, processedValue);
  };

  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return '💳 Visa';
      case 'mastercard':
        return '💳 Mastercard';
      case 'amex':
        return '💳 Amex';
      case 'discover':
        return '💳 Discover';
      default:
        return '💳';
    }
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-600',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Globe,
      color: 'from-yellow-500 to-orange-600',
      popular: false
    }
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  return (
    <div className="space-y-8">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Payment Method</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            const isSelected = selectedPaymentMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${method.color} text-white shadow-2xl scale-105`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                    isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-r ${method.color}`
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {method.name}
                    </h3>
                    {method.popular && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {method.description}
                </p>
                {isSelected && (
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm font-bold text-white">Selected</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedPaymentMethod === 'card' && (
        <>
          {/* Card Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <label className="text-lg font-bold text-gray-900 dark:text-white">Card Information</label>
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Card Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  onFocus={() => setFocusedField('cardNumber')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full pl-10 pr-16 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-mono text-lg ${
                    validationErrors.cardNumber 
                      ? 'border-red-500 focus:ring-red-500' 
                      : focusedField === 'cardNumber'
                        ? 'border-green-500 shadow-green-200 dark:shadow-green-800'
                        : 'border-gray-200 dark:border-gray-600'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-2xl">{getCardIcon()}</span>
                </div>
                {focusedField === 'cardNumber' && (
                  <div className="absolute -bottom-2 left-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                    Enter your card number
                  </div>
                )}
              </div>
              {validationErrors.cardNumber && (
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.cardNumber}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expiry Date */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                  Expiry Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    onFocus={() => setFocusedField('expiryDate')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full pl-10 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-mono text-lg ${
                      validationErrors.expiryDate 
                        ? 'border-red-500 focus:ring-red-500' 
                        : focusedField === 'expiryDate'
                          ? 'border-purple-500 shadow-purple-200 dark:shadow-purple-800'
                          : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {focusedField === 'expiryDate' && (
                    <div className="absolute -bottom-2 left-10 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                      MM/YY format
                    </div>
                  )}
                </div>
                {validationErrors.expiryDate && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.expiryDate}</span>
                  </p>
                )}
              </div>

              {/* CVV */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                  CVV *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showCvv ? 'text' : 'password'}
                    value={paymentData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    onFocus={() => setFocusedField('cvv')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full pl-10 pr-12 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-mono text-lg ${
                      validationErrors.cvv 
                        ? 'border-red-500 focus:ring-red-500' 
                        : focusedField === 'cvv'
                          ? 'border-orange-500 shadow-orange-200 dark:shadow-orange-800'
                          : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCvv(!showCvv)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    {showCvv ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {focusedField === 'cvv' && (
                    <div className="absolute -bottom-2 left-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                      3-4 digit security code
                    </div>
                  )}
                </div>
                {validationErrors.cvv && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="w-4 h-4" />
                    <span>{validationErrors.cvv}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Cardholder Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={paymentData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  onFocus={() => setFocusedField('cardholderName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                    validationErrors.cardholderName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : focusedField === 'cardholderName'
                        ? 'border-indigo-500 shadow-indigo-200 dark:shadow-indigo-800'
                        : 'border-gray-200 dark:border-gray-600'
                  }`}
                />
                {focusedField === 'cardholderName' && (
                  <div className="absolute -bottom-2 left-10 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                    Name as it appears on card
                  </div>
                )}
              </div>
              {validationErrors.cardholderName && (
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.cardholderName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400 animate-pulse" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security Features</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Lock,
                  title: 'SSL Encryption',
                  description: '256-bit security',
                  color: 'text-green-500'
                },
                {
                  icon: Shield,
                  title: 'PCI Compliant',
                  description: 'Industry standard',
                  color: 'text-blue-500'
                },
                {
                  icon: CheckCircle,
                  title: 'Secure Storage',
                  description: 'Never stored',
                  color: 'text-purple-500'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
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
        </>
      )}

      {selectedPaymentMethod === 'paypal' && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200/50 dark:border-yellow-700/50 text-center animate-in slide-in-from-bottom-4 duration-500">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 group">
            <Globe className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">PayPal Payment</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You'll be redirected to PayPal to complete your payment securely.
          </p>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-yellow-200/50 dark:border-yellow-700/50">
            <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-400">
              <Shield className="w-5 h-5" />
              <span className="font-bold">Secured by PayPal</span>
            </div>
          </div>
        </div>
      )}

      {/* Billing Address Same as User */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Billing Address</label>
        </div>

        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-gray-900 dark:text-white">
              Using address from user information
            </span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Street:</strong> {paymentData.billingAddress.street || 'Not provided'}</p>
              <p><strong>City:</strong> {paymentData.billingAddress.city || 'Not provided'}</p>
              <p><strong>State:</strong> {paymentData.billingAddress.state || 'Not provided'}</p>
              <p><strong>ZIP:</strong> {paymentData.billingAddress.zipCode || 'Not provided'}</p>
              <p><strong>Country:</strong> {paymentData.billingAddress.country || 'US'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Security Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Security</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: Lock,
              title: 'Encrypted Transmission',
              description: 'All payment data is encrypted using industry-standard SSL technology',
              color: 'text-green-500'
            },
            {
              icon: Shield,
              title: 'PCI DSS Compliant',
              description: 'We meet the highest security standards for payment processing',
              color: 'text-blue-500'
            },
            {
              icon: CheckCircle,
              title: 'No Storage',
              description: 'Your payment information is never stored on our servers',
              color: 'text-purple-500'
            },
            {
              icon: Award,
              title: 'Trusted Partners',
              description: 'We work with leading payment processors like Stripe',
              color: 'text-orange-500'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
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

      {/* Form Validation Summary */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Form Status</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Card Number', valid: paymentData.cardNumber.replace(/\s/g, '').length >= 13, icon: CreditCard },
            { label: 'Expiry Date', valid: paymentData.expiryDate.length === 5, icon: Calendar },
            { label: 'CVV', valid: paymentData.cvv.length >= 3, icon: Lock },
            { label: 'Cardholder', valid: paymentData.cardholderName.length >= 2, icon: Award }
          ].map((field, index) => (
            <div 
              key={field.label}
              className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                field.valid 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              }`}
            >
              <field.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{field.label}</span>
              {field.valid ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;