import React, { useState } from 'react';
import { Scissors, Clock, Tag, FileText, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Award, Heart, Star, Eye, Bookmark, Gift, Rocket, Diamond, Plus, Minus, CheckCircle, AlertCircle, Info, Lightbulb, Palette, Brush, Wand2, Users, Settings, X } from 'lucide-react';

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

interface ServiceFormProps {
  serviceData: ServiceData;
  updateServiceData: (updates: Partial<ServiceData>) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ serviceData, updateServiceData }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const categories = [
    { 
      value: 'haircut', 
      label: 'Hair Cut & Styling', 
      icon: Scissors, 
      color: 'from-blue-500 to-cyan-600',
      description: 'Professional cutting and styling services'
    },
    { 
      value: 'color', 
      label: 'Color Treatment', 
      icon: Palette, 
      color: 'from-purple-500 to-pink-600',
      description: 'Hair coloring, highlights, and color correction'
    },
    { 
      value: 'treatment', 
      label: 'Hair Treatment', 
      icon: Sparkles, 
      color: 'from-green-500 to-emerald-600',
      description: 'Deep conditioning, keratin, and repair treatments'
    },
    { 
      value: 'styling', 
      label: 'Special Styling', 
      icon: Crown, 
      color: 'from-yellow-500 to-orange-600',
      description: 'Bridal, event, and special occasion styling'
    },
    { 
      value: 'grooming', 
      label: 'Men\'s Grooming', 
      icon: Wand2, 
      color: 'from-indigo-500 to-purple-600',
      description: 'Beard trimming, men\'s cuts, and grooming'
    },
    { 
      value: 'consultation', 
      label: 'Consultation', 
      icon: Users, 
      color: 'from-pink-500 to-rose-600',
      description: 'Hair analysis and styling consultation'
    }
  ];

  const suggestedTags = [
    'Popular', 'Premium', 'Quick Service', 'Trending', 'New', 'Signature',
    'Luxury', 'Express', 'Transformation', 'Natural', 'Modern', 'Classic',
    'Bridal', 'Special Event', 'Color Expert', 'Precision Cut', 'Styling',
    'Treatment', 'Consultation', 'Men\'s Grooming', 'Women\'s Cut', 'Unisex'
  ];

  const durationPresets = [
    { value: 30, label: '30 min', description: 'Quick service' },
    { value: 45, label: '45 min', description: 'Standard service' },
    { value: 60, label: '1 hour', description: 'Regular appointment' },
    { value: 90, label: '1.5 hours', description: 'Extended service' },
    { value: 120, label: '2 hours', description: 'Comprehensive treatment' },
    { value: 180, label: '3 hours', description: 'Full transformation' },
    { value: 240, label: '4 hours', description: 'Premium package' }
  ];

  const validateField = (field: string, value: any) => {
    const errors: Record<string, string> = {};
    
    switch (field) {
      case 'name':
        if (!value || value.trim().length < 3) {
          errors.name = 'Service name must be at least 3 characters';
        }
        break;
      case 'description':
        if (!value || value.trim().length < 10) {
          errors.description = 'Description must be at least 10 characters';
        }
        break;
      case 'duration':
        if (!value || value < 15) {
          errors.duration = 'Duration must be at least 15 minutes';
        }
        break;
    }
    
    setValidationErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof ServiceData, value: any) => {
    updateServiceData({ [field]: value });
    validateField(field, value);
  };

  const addTag = (tag: string) => {
    if (!serviceData.tags.includes(tag)) {
      updateServiceData({ tags: [...serviceData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    updateServiceData({ tags: serviceData.tags.filter(t => t !== tag) });
  };

  const selectedCategory = categories.find(cat => cat.value === serviceData.category);

  return (
    <div className="space-y-8">
      {/* Service Name */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <Scissors className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Service Name *</label>
        </div>
        <div className="relative">
          <input
            type="text"
            value={serviceData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            placeholder="e.g., Premium Hair Cut & Style"
            className={`w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 text-lg font-medium ${
              validationErrors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : focusedField === 'name'
                  ? 'border-blue-500 shadow-blue-200 dark:shadow-blue-800'
                  : 'border-gray-200 dark:border-gray-600'
            }`}
          />
          {focusedField === 'name' && (
            <div className="absolute -bottom-2 left-6 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
              Make it catchy and descriptive!
            </div>
          )}
        </div>
        {validationErrors.name && (
          <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-4 h-4" />
            <span>{validationErrors.name}</span>
          </p>
        )}
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Service Category *</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = serviceData.category === category.value;
            
            return (
              <button
                key={category.value}
                onClick={() => handleInputChange('category', category.value)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group animate-in slide-in-from-bottom-4 duration-1000 ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${category.color} text-white shadow-2xl scale-105`
                    : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                    isSelected 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : `bg-gradient-to-r ${category.color}`
                  }`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {category.label}
                    </h3>
                  </div>
                </div>
                <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {category.description}
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

      {/* Description */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Service Description *</label>
        </div>
        <div className="relative">
          <textarea
            value={serviceData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            placeholder="Describe your service in detail. What makes it special? What can clients expect?"
            rows={6}
            className={`w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg hover:shadow-xl focus:scale-105 resize-none ${
              validationErrors.description 
                ? 'border-red-500 focus:ring-red-500' 
                : focusedField === 'description'
                  ? 'border-green-500 shadow-green-200 dark:shadow-green-800'
                  : 'border-gray-200 dark:border-gray-600'
            }`}
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-400 dark:text-gray-500">
            {serviceData.description.length}/500
          </div>
          {focusedField === 'description' && (
            <div className="absolute -bottom-2 left-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-in slide-in-from-bottom-2 duration-300">
              Be detailed and engaging!
            </div>
          )}
        </div>
        {validationErrors.description && (
          <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-4 h-4" />
            <span>{validationErrors.description}</span>
          </p>
        )}
      </div>

      {/* Duration Selection */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Service Duration *</label>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {durationPresets.map((preset, index) => (
            <button
              key={preset.value}
              onClick={() => handleInputChange('duration', preset.value)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-center group animate-in slide-in-from-bottom-4 duration-1000 ${
                serviceData.duration === preset.value
                  ? 'border-transparent bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-lg font-bold mb-1">
                {preset.label}
              </div>
              <div className={`text-xs ${
                serviceData.duration === preset.value ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {preset.description}
              </div>
            </button>
          ))}
        </div>
        
        {/* Custom Duration Input */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom:</span>
          <input
            type="number"
            value={serviceData.duration}
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
            min="15"
            max="480"
            className="w-24 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-center font-bold"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">minutes</span>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Service Tags</label>
        </div>
        
        {/* Selected Tags */}
        {serviceData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
            {serviceData.tags.map((tag, index) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:bg-white/20 rounded-full p-1 transition-all duration-200 hover:scale-110"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Suggested Tags */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
            Suggested tags:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.filter(tag => !serviceData.tags.includes(tag)).slice(0, 12).map((tag, index) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-105 text-sm font-medium animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-4 h-4 text-white" />
          </div>
          <label className="text-lg font-bold text-gray-900 dark:text-white">Service Options</label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              key: 'isActive',
              label: 'Active Service',
              description: 'Service is available for booking',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-600'
            },
            {
              key: 'isPremium',
              label: 'Premium Service',
              description: 'Mark as premium offering',
              icon: Crown,
              color: 'from-yellow-500 to-orange-600'
            },
            {
              key: 'isPopular',
              label: 'Popular Service',
              description: 'Highlight as trending',
              icon: Flame,
              color: 'from-red-500 to-pink-600'
            }
          ].map((option, index) => {
            const Icon = option.icon;
            const isEnabled = serviceData[option.key as keyof ServiceData] as boolean;
            
            return (
              <button
                key={option.key}
                onClick={() => handleInputChange(option.key as keyof ServiceData, !isEnabled)}
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

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            key: 'requirements',
            label: 'Requirements',
            placeholder: 'Any special requirements or preparations needed...',
            icon: Info,
            color: 'from-blue-500 to-cyan-600'
          },
          {
            key: 'aftercare',
            label: 'Aftercare Instructions',
            placeholder: 'Post-service care instructions for clients...',
            icon: Heart,
            color: 'from-green-500 to-emerald-600'
          },
          {
            key: 'cancellationPolicy',
            label: 'Cancellation Policy',
            placeholder: 'Your cancellation and rescheduling policy...',
            icon: AlertCircle,
            color: 'from-orange-500 to-red-600'
          }
        ].map((field, index) => {
          const Icon = field.icon;
          
          return (
            <div 
              key={field.key}
              className="space-y-3 animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 bg-gradient-to-r ${field.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <label className="text-sm font-bold text-gray-900 dark:text-white">{field.label}</label>
              </div>
              <textarea
                value={serviceData[field.key as keyof ServiceData] as string || ''}
                onChange={(e) => handleInputChange(field.key as keyof ServiceData, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm resize-none hover:shadow-lg focus:scale-105"
              />
            </div>
          );
        })}
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
            { label: 'Name', valid: serviceData.name.length >= 3, icon: Scissors },
            { label: 'Description', valid: serviceData.description.length >= 10, icon: FileText },
            { label: 'Category', valid: !!serviceData.category, icon: Tag },
            { label: 'Duration', valid: serviceData.duration >= 15, icon: Clock }
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

export default ServiceForm;