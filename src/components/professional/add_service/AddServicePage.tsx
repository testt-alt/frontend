import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, X, Upload, Image, Palette, Scissors, Clock, DollarSign, Star, Users, Calendar, Award, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Heart, Eye, Bookmark, Gift, Rocket, Diamond, Camera, Video, Mic, Settings, Bell, Share2, Plus, Minus, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';
import ServiceForm from './ServiceForm';
import ServicePreview from './ServicePreview';
import ServiceGallery from './ServiceGallery';
import ServicePricing from './ServicePricing';

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

interface AddServicePageProps {
  onBack: () => void;
  onSave: (service: ServiceData) => void;
}

const AddServicePage: React.FC<AddServicePageProps> = ({ onBack, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState<ServiceData>({
    name: '',
    description: '',
    category: 'haircut',
    duration: 60,
    price: 0,
    images: [],
    tags: [],
    isActive: true,
    isPremium: false,
    isPopular: false
  });

  const steps = [
    { 
      id: 1, 
      title: 'Basic Info', 
      description: 'Service details and description',
      icon: Scissors, 
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    { 
      id: 2, 
      title: 'Pricing', 
      description: 'Set your service pricing',
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
    },
    { 
      id: 3, 
      title: 'Gallery', 
      description: 'Add photos and media',
      icon: Camera, 
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
    },
    { 
      id: 4, 
      title: 'Preview', 
      description: 'Review and publish',
      icon: Eye, 
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
    }
  ];

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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSave(serviceData);
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateServiceData = (updates: Partial<ServiceData>) => {
    setServiceData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceForm 
            serviceData={serviceData} 
            updateServiceData={updateServiceData}
          />
        );
      case 2:
        return (
          <ServicePricing 
            serviceData={serviceData} 
            updateServiceData={updateServiceData}
          />
        );
      case 3:
        return (
          <ServiceGallery 
            serviceData={serviceData} 
            updateServiceData={updateServiceData}
          />
        );
      case 4:
        return (
          <ServicePreview 
            serviceData={serviceData} 
            updateServiceData={updateServiceData}
          />
        );
      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-pink-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30 animate-bounce"
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
          <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-top-4 duration-1000 mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={onBack}
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                  >
                    <ArrowLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Create New Service</h1>
                    <p className="text-purple-100 text-lg">Design and launch your professional service offering</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    <span className="text-white font-bold">Service Builder</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Crown className="w-5 h-5 text-yellow-300" />
                    <span className="text-white font-medium">Premium Tools</span>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => setCurrentStep(step.id)}
                          className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 group relative overflow-hidden ${
                            isActive
                              ? 'bg-white/30 backdrop-blur-sm border-2 border-white/50 shadow-2xl scale-110'
                              : isCompleted
                                ? 'bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-lg hover:bg-white/30'
                                : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20'
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
              {/* Quick Preview */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Preview</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center overflow-hidden group">
                    {serviceData.images.length > 0 ? (
                      <img 
                        src={serviceData.images[0]} 
                        alt="Service preview"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">No image yet</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      {serviceData.name || 'Service Name'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {serviceData.description || 'Service description will appear here...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${serviceData.price || 0}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {serviceData.duration || 0} min
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips & Suggestions */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pro Tips</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: Sparkles,
                      title: 'High-Quality Photos',
                      tip: 'Use professional photos to showcase your work and attract more clients.',
                      color: 'text-purple-500'
                    },
                    {
                      icon: DollarSign,
                      title: 'Competitive Pricing',
                      tip: 'Research market rates to set competitive yet profitable prices.',
                      color: 'text-green-500'
                    },
                    {
                      icon: Star,
                      title: 'Detailed Descriptions',
                      tip: 'Clear descriptions help clients understand what they\'re booking.',
                      color: 'text-yellow-500'
                    }
                  ].map((tip, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group"
                    >
                      <tip.icon className={`w-5 h-5 ${tip.color} mt-1 group-hover:scale-110 transition-transform duration-300`} />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{tip.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{tip.tip}</p>
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
                      className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { label: 'Fields', value: `${Object.values(serviceData).filter(v => v !== '' && v !== 0 && v !== false).length}/10` },
                      { label: 'Images', value: serviceData.images.length.toString() }
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
              <div className="flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
            </div>

            {currentStep === steps.length ? (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="font-bold">Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span className="font-bold">Create Service</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="font-bold">Next Step</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;