import React, { useState } from 'react';
import { User, Building, Phone, Mail, MapPin, Globe, CheckCircle, AlertCircle, Info, Lightbulb, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Award, Heart, Star, Eye, Bookmark, Gift, Rocket, Diamond, Camera, Video, Mic, Settings, Bell, Share2, Plus, Minus, X, FileText } from 'lucide-react';

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

interface UserInformationProps {
  paymentData: PaymentData;
  updatePaymentData: (updates: Partial<PaymentData>) => void;
}

const UserInformation: React.FC<UserInformationProps> = ({ paymentData, updatePaymentData }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');

  const validateField = (field: string, value: any) => {
    const errors: Record<string, string> = {};
    
    switch (field) {
      case 'firstName':
        if (!value || value.trim().length < 2) {
          errors.firstName = 'First name must be at least 2 characters';
        }
        break;
      case 'lastName':
        if (!value || value.trim().length < 2) {
          errors.lastName = 'Last name must be at least 2 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!value || !phoneRegex.test(value.replace(/\s/g, ''))) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      case 'company':
        if (accountType === 'business' && (!value || value.trim().length < 2)) {
          errors.company = 'Company name is required for business accounts';
        }
        break;
    }
    
    setValidationErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof PaymentData, value: any) => {
    updatePaymentData({ [field]: value });
    validateField(field, value);
  };

  const handleAccountTypeChange = (type: 'personal' | 'business') => {
    setAccountType(type);
    if (type === 'personal') {
      updatePaymentData({ company: '', taxId: '' });
    }
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'MX', name: 'Mexico' },
    { code: 'BR', name: 'Brazil' }
  ];

  return (
    <div className="space-y-8">
      {/* Account Type Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Account Type</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: 'personal',
              title: 'Personal Account',
              description: 'For individual professionals',
              icon: User,
              color: 'from-blue-500 to-cyan-600',
              features: ['Individual billing', 'Personal support', 'Standard features']
            },
            {
              type: 'business',
              title: 'Business Account',
              description: 'For companies and teams',
              icon: Building,
              color: 'from-purple-500 to-pink-600',
              features: ['Company billing', 'Priority support', 'Advanced features']
            }
          ].map((option, index) => {
            const Icon = option.icon;
            const isSelected = accountType === option.type;
            
            return (
              <button
                key={option.type}
                onClick={() => handleAccountTypeChange(option.type as 'personal' | 'business')}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${option.color} text-white shadow-2xl scale-105`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                    isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-r ${option.color}`
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {option.title}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm mb-4 ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {option.description}
                </p>
                
                <div className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        isSelected 
                          ? 'bg-white/60' 
                          : `bg-gradient-to-r ${option.color}`
                      }`}></div>
                      <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
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

      {/* Personal Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              First Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={paymentData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                placeholder="John"
                className={`w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                  validationErrors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : focusedField === 'firstName'
                      ? 'border-blue-500 shadow-blue-200 dark:shadow-blue-800'
                      : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {focusedField === 'firstName' && (
                <div className="absolute -bottom-2 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                  Enter your first name
                </div>
              )}
            </div>
            {validationErrors.firstName && (
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.firstName}</span>
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Last Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={paymentData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Doe"
                className={`w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                  validationErrors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : focusedField === 'lastName'
                      ? 'border-blue-500 shadow-blue-200 dark:shadow-blue-800'
                      : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {focusedField === 'lastName' && (
                <div className="absolute -bottom-2 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                  Enter your last name
                </div>
              )}
            </div>
            {validationErrors.lastName && (
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.lastName}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={paymentData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="john@example.com"
                className={`w-full pl-10 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                  validationErrors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : focusedField === 'email'
                      ? 'border-green-500 shadow-green-200 dark:shadow-green-800'
                      : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {focusedField === 'email' && (
                <div className="absolute -bottom-2 left-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                  We'll send receipts here
                </div>
              )}
            </div>
            {validationErrors.email && (
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.email}</span>
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={paymentData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="+1 (555) 123-4567"
                className={`w-full pl-10 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                  validationErrors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : focusedField === 'phone'
                      ? 'border-purple-500 shadow-purple-200 dark:shadow-purple-800'
                      : 'border-gray-200 dark:border-gray-600'
                }`}
              />
              {focusedField === 'phone' && (
                <div className="absolute -bottom-2 left-10 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                  For account verification
                </div>
              )}
            </div>
            {validationErrors.phone && (
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.phone}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Business Information (if business account) */}
      {accountType === 'business' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building className="w-4 h-4 text-white" />
            </div>
            <label className="text-lg font-bold text-gray-900 dark:text-white">Business Information</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Company Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={paymentData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Company Inc."
                  className={`w-full pl-10 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                    validationErrors.company 
                      ? 'border-red-500 focus:ring-red-500' 
                      : focusedField === 'company'
                        ? 'border-purple-500 shadow-purple-200 dark:shadow-purple-800'
                        : 'border-gray-200 dark:border-gray-600'
                  }`}
                />
                {focusedField === 'company' && (
                  <div className="absolute -bottom-2 left-10 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                    Legal business name
                  </div>
                )}
              </div>
              {validationErrors.company && (
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.company}</span>
                </p>
              )}
            </div>

            {/* Tax ID */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Tax ID (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={paymentData.taxId || ''}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  onFocus={() => setFocusedField('taxId')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="12-3456789"
                  className={`w-full pl-10 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium ${
                    focusedField === 'taxId'
                      ? 'border-orange-500 shadow-orange-200 dark:shadow-orange-800'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                />
                {focusedField === 'taxId' && (
                  <div className="absolute -bottom-2 left-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
                    For business receipts
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Address */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Billing Address</label>
        </div>

        <div className="space-y-4">
          {/* Street Address */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Street Address *
            </label>
            <input
              type="text"
              value={paymentData.billingAddress.street}
              onChange={(e) => updatePaymentData({ 
                billingAddress: { ...paymentData.billingAddress, street: e.target.value }
              })}
              placeholder="123 Main Street"
              className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                City *
              </label>
              <input
                type="text"
                value={paymentData.billingAddress.city}
                onChange={(e) => updatePaymentData({ 
                  billingAddress: { ...paymentData.billingAddress, city: e.target.value }
                })}
                placeholder="New York"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105"
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                State *
              </label>
              <input
                type="text"
                value={paymentData.billingAddress.state}
                onChange={(e) => updatePaymentData({ 
                  billingAddress: { ...paymentData.billingAddress, state: e.target.value }
                })}
                placeholder="NY"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105"
              />
            </div>

            {/* ZIP Code */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                ZIP Code *
              </label>
              <input
                type="text"
                value={paymentData.billingAddress.zipCode}
                onChange={(e) => updatePaymentData({ 
                  billingAddress: { ...paymentData.billingAddress, zipCode: e.target.value }
                })}
                placeholder="10001"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Country *
              </label>
              <select
                value={paymentData.billingAddress.country}
                onChange={(e) => updatePaymentData({ 
                  billingAddress: { ...paymentData.billingAddress, country: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white shadow-lg hover:shadow-xl focus:scale-105"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Preferences</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              key: 'agreeToTerms',
              label: 'I agree to the Terms of Service',
              description: 'Required to proceed with payment',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-600',
              required: true
            },
            {
              key: 'subscribeToNewsletter',
              label: 'Subscribe to newsletter',
              description: 'Get updates and tips for your business',
              icon: Bell,
              color: 'from-blue-500 to-cyan-600',
              required: false
            }
          ].map((option, index) => {
            const Icon = option.icon;
            const isEnabled = paymentData[option.key as keyof PaymentData] as boolean;
            
            return (
              <button
                key={option.key}
                onClick={() => handleInputChange(option.key as keyof PaymentData, !isEnabled)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isEnabled
                    ? `border-transparent bg-gradient-to-br ${option.color} text-white shadow-xl`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                    isEnabled 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-r ${option.color}`
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isEnabled ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {option.label}
                      {option.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm ${isEnabled ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {option.description}
                </p>
                {isEnabled && (
                  <div className="mt-3 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm font-bold text-white">Enabled</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Validation Summary */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Form Status</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'First Name', valid: paymentData.firstName.length >= 2, icon: User },
            { label: 'Last Name', valid: paymentData.lastName.length >= 2, icon: User },
            { label: 'Email', valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email), icon: Mail },
            { label: 'Phone', valid: paymentData.phone.length >= 10, icon: Phone }
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

export default UserInformation;