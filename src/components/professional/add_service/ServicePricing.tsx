import React, { useState } from 'react';
import { DollarSign, TrendingUp, Target, Award, Sparkles, Crown, Trophy, Medal, Flame, Zap, Heart, Star, Eye, Bookmark, Gift, Rocket, Diamond, Plus, Minus, CheckCircle, AlertCircle, Info, Calculator, BarChart3, Users, Calendar, Clock, Percent, Tag } from 'lucide-react';

interface ServiceData {
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  originalPrice?: number;
  images: string[];
  tags: string[];
  isActive: boolean;
  isPremium: boolean;
  isPopular: boolean;
  requirements?: string;
  aftercare?: string;
  cancellationPolicy?: string;
}

interface ServicePricingProps {
  serviceData: ServiceData;
  updateServiceData: (updates: Partial<ServiceData>) => void;
}

const ServicePricing: React.FC<ServicePricingProps> = ({ serviceData, updateServiceData }) => {
  const [showPricingTips, setShowPricingTips] = useState(false);
  const [selectedPricingStrategy, setSelectedPricingStrategy] = useState('competitive');

  const pricingStrategies = [
    {
      id: 'competitive',
      name: 'Competitive Pricing',
      description: 'Match or slightly undercut market rates',
      icon: Target,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      multiplier: 1.0,
      tips: ['Research competitor prices', 'Position as value option', 'Good for new services']
    },
    {
      id: 'premium',
      name: 'Premium Pricing',
      description: 'Higher prices for superior quality',
      icon: Crown,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      multiplier: 1.3,
      tips: ['Emphasize quality and expertise', 'Include premium features', 'Target quality-conscious clients']
    },
    {
      id: 'value',
      name: 'Value Pricing',
      description: 'Affordable rates to attract volume',
      icon: Heart,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      multiplier: 0.8,
      tips: ['Focus on accessibility', 'Build client base', 'Increase booking frequency']
    },
    {
      id: 'luxury',
      name: 'Luxury Pricing',
      description: 'Exclusive high-end positioning',
      icon: Diamond,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      multiplier: 1.5,
      tips: ['Exceptional service quality', 'Exclusive experience', 'Limited availability']
    }
  ];

  const marketRates = {
    haircut: { min: 25, max: 85, average: 55 },
    color: { min: 80, max: 200, average: 140 },
    treatment: { min: 60, max: 180, average: 120 },
    styling: { min: 40, max: 120, average: 80 },
    grooming: { min: 20, max: 60, average: 40 },
    consultation: { min: 30, max: 80, average: 55 }
  };

  const currentMarketRate = marketRates[serviceData.category as keyof typeof marketRates] || marketRates.haircut;
  const selectedStrategy = pricingStrategies.find(s => s.id === selectedPricingStrategy);
  const suggestedPrice = Math.round(currentMarketRate.average * (selectedStrategy?.multiplier || 1));

  const handlePriceChange = (price: number) => {
    updateServiceData({ price: Math.max(0, price) });
  };

  const handleOriginalPriceChange = (originalPrice: number) => {
    updateServiceData({ originalPrice: Math.max(0, originalPrice) });
  };

  const applySuggestedPrice = () => {
    handlePriceChange(suggestedPrice);
  };

  const calculateDiscount = () => {
    if (serviceData.originalPrice && serviceData.originalPrice > serviceData.price) {
      return Math.round(((serviceData.originalPrice - serviceData.price) / serviceData.originalPrice) * 100);
    }
    return 0;
  };

  const getPricePosition = () => {
    const price = serviceData.price;
    if (price <= currentMarketRate.min) return { label: 'Budget', color: 'text-green-600 dark:text-green-400' };
    if (price <= currentMarketRate.average) return { label: 'Competitive', color: 'text-blue-600 dark:text-blue-400' };
    if (price <= currentMarketRate.max) return { label: 'Premium', color: 'text-purple-600 dark:text-purple-400' };
    return { label: 'Luxury', color: 'text-yellow-600 dark:text-yellow-400' };
  };

  const pricePosition = getPricePosition();
  const discount = calculateDiscount();

  return (
    <div className="space-y-8">
      {/* Pricing Strategy Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
            <label className="text-lg font-bold text-gray-900 dark:text-white">Pricing Strategy</label>
          </div>
          <button
            onClick={() => setShowPricingTips(!showPricingTips)}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-all duration-300 hover:scale-105"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">Pricing Tips</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingStrategies.map((strategy, index) => {
            const Icon = strategy.icon;
            const isSelected = selectedPricingStrategy === strategy.id;
            
            return (
              <button
                key={strategy.id}
                onClick={() => setSelectedPricingStrategy(strategy.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${strategy.color} text-white shadow-2xl scale-105`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                    isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-r ${strategy.color}`
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {strategy.name}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {strategy.description}
                </p>
                <div className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  ${Math.round(currentMarketRate.average * strategy.multiplier)}
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

        {/* Pricing Tips */}
        {showPricingTips && selectedStrategy && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200/50 dark:border-yellow-700/50 animate-in slide-in-from-top-2 duration-300">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              {selectedStrategy.name} Tips
            </h4>
            <div className="space-y-2">
              {selectedStrategy.tips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Price */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <label className="text-lg font-bold text-gray-900 dark:text-white">Service Price *</label>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-3xl font-bold text-gray-400 dark:text-gray-500">$</div>
            <input
              type="number"
              value={serviceData.price}
              onChange={(e) => handlePriceChange(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
              className="w-full pl-16 pr-6 py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-3xl font-bold text-center shadow-lg hover:shadow-xl focus:scale-105"
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${pricePosition.color} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg`}>
                {pricePosition.label}
              </span>
            </div>
          </div>

          {/* Quick Price Adjustments */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handlePriceChange(serviceData.price - 5)}
              className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-110"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="flex space-x-2">
              {[-10, -5, +5, +10].map((adjustment) => (
                <button
                  key={adjustment}
                  onClick={() => handlePriceChange(serviceData.price + adjustment)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
                    adjustment > 0 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                  }`}
                >
                  {adjustment > 0 ? '+' : ''}${adjustment}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePriceChange(serviceData.price + 5)}
              className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-110"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Suggested Price */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-gray-900 dark:text-white">Suggested Price</h4>
              </div>
              <button
                onClick={applySuggestedPrice}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-sm font-bold"
              >
                Apply
              </button>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              ${suggestedPrice}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on {selectedStrategy?.name.toLowerCase()} strategy for {serviceData.category} services
            </p>
          </div>
        </div>

        {/* Original Price & Discounts */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Percent className="w-4 h-4 text-white" />
            </div>
            <label className="text-lg font-bold text-gray-900 dark:text-white">Original Price (Optional)</label>
          </div>
          
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-400 dark:text-gray-500">$</div>
            <input
              type="number"
              value={serviceData.originalPrice || ''}
              onChange={(e) => handleOriginalPriceChange(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full pl-16 pr-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-2xl font-bold text-center shadow-lg hover:shadow-xl focus:scale-105"
            />
            {discount > 0 && (
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse shadow-lg">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>

          {discount > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-red-200/50 dark:border-red-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <Tag className="w-6 h-6 text-red-600 dark:text-red-400" />
                <h4 className="font-bold text-red-800 dark:text-red-300">Discount Preview</h4>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-500 dark:text-gray-400 line-through">
                  ${serviceData.originalPrice}
                </span>
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                  ${serviceData.price}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                  Save ${(serviceData.originalPrice || 0) - serviceData.price}
                </span>
              </div>
            </div>
          )}

          {/* Market Analysis */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-gray-900 dark:text-white">Market Analysis</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Market Range</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  ${currentMarketRate.min} - ${currentMarketRate.max}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Price</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  ${currentMarketRate.average}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Your Position</span>
                <span className={`font-bold ${pricePosition.color}`}>
                  {pricePosition.label}
                </span>
              </div>
              
              {/* Price Range Visualization */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="absolute top-0 h-3 bg-gradient-to-r from-green-500 to-red-500 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div 
                  className="absolute top-0 w-3 h-3 bg-white border-2 border-blue-500 rounded-full transform -translate-y-0 shadow-lg"
                  style={{ 
                    left: `${Math.min(Math.max(((serviceData.price - currentMarketRate.min) / (currentMarketRate.max - currentMarketRate.min)) * 100, 0), 100)}%`,
                    transform: 'translateX(-50%)'
                  }}
                ></div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>${currentMarketRate.min}</span>
                  <span>${currentMarketRate.average}</span>
                  <span>${currentMarketRate.max}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Projections */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-500">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Projections</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { period: 'Weekly', bookings: 5, revenue: serviceData.price * 5 },
            { period: 'Monthly', bookings: 20, revenue: serviceData.price * 20 },
            { period: 'Yearly', bookings: 240, revenue: serviceData.price * 240 }
          ].map((projection, index) => (
            <div 
              key={projection.period}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{projection.period}</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Estimated bookings</span>
                  <span className="font-bold text-gray-900 dark:text-white">{projection.bookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Projected revenue</span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${projection.revenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pricing Summary</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${serviceData.price}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Price</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${currentMarketRate.average}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Market Average</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className={`text-2xl font-bold ${pricePosition.color}`}>{pricePosition.label}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Position</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${Math.round(serviceData.price / serviceData.duration * 60)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Per Hour</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePricing;