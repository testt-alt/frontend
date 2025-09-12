import React, { useState } from 'react';
import { Eye, Star, Clock, DollarSign, MapPin, Calendar, User, Heart, Bookmark, Share2, MessageCircle, Phone, Mail, CheckCircle, Award, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Gift, Rocket, Diamond, ThumbsUp, Users, TrendingUp, BarChart3, Activity, Settings, Bell, Download, Edit, Trash2, Camera, AlertCircle } from 'lucide-react';

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

interface ServicePreviewProps {
  serviceData: ServiceData;
  updateServiceData: (updates: Partial<ServiceData>) => void;
}

const ServicePreview: React.FC<ServicePreviewProps> = ({ serviceData, updateServiceData }) => {
  const [viewMode, setViewMode] = useState<'client' | 'professional'>('client');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const mockReviews = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Amazing service! Exactly what I was looking for.',
      date: '2024-01-15'
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Professional and skilled. Highly recommend!',
      date: '2024-01-12'
    }
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const calculateDiscount = () => {
    if (serviceData.originalPrice && serviceData.originalPrice > serviceData.price) {
      return Math.round(((serviceData.originalPrice - serviceData.price) / serviceData.originalPrice) * 100);
    }
    return 0;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const discount = calculateDiscount();

  return (
    <div className="space-y-8">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Preview</h2>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
          <button
            onClick={() => setViewMode('client')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              viewMode === 'client'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Client View
          </button>
          <button
            onClick={() => setViewMode('professional')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              viewMode === 'professional'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Professional View
          </button>
        </div>
      </div>

      {viewMode === 'client' ? (
        /* Client View */
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000">
          {/* Service Image */}
          <div className="relative h-64 overflow-hidden">
            {serviceData.images.length > 0 ? (
              <img
                src={serviceData.images[0]}
                alt={serviceData.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No image selected</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {serviceData.isPremium && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Crown className="w-3 h-3" />
                  <span>Premium</span>
                </span>
              )}
              {serviceData.isPopular && (
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
                  <Flame className="w-3 h-3" />
                  <span>Popular</span>
                </span>
              )}
              {serviceData.tags.slice(0, 2).map((tag, index) => (
                <span key={tag} className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="absolute top-4 right-4 text-right">
              <div className="text-3xl font-bold text-white">${serviceData.price}</div>
              {discount > 0 && (
                <div className="text-lg text-white/70 line-through">${serviceData.originalPrice}</div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service Info */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {serviceData.name || 'Service Name'}
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(5)}
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-2">
                      4.9 (127 reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{formatDuration(serviceData.duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {showFullDescription 
                  ? (serviceData.description || 'Service description will appear here...')
                  : (serviceData.description || 'Service description will appear here...').substring(0, 150) + '...'
                }
              </p>
              {serviceData.description && serviceData.description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mt-2"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Tags */}
            {serviceData.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {serviceData.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-1000"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </button>
              <button className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Professional View */
        <div className="space-y-6">
          {/* Service Management Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {serviceData.name || 'New Service'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Professional service management</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-110">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-110">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-110">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Service Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Price', value: `$${serviceData.price}`, icon: DollarSign, color: 'from-green-500 to-emerald-600' },
                { label: 'Duration', value: formatDuration(serviceData.duration), icon: Clock, color: 'from-blue-500 to-cyan-600' },
                { label: 'Category', value: serviceData.category, icon: Target, color: 'from-purple-500 to-pink-600' },
                { label: 'Status', value: serviceData.isActive ? 'Active' : 'Inactive', icon: CheckCircle, color: 'from-orange-500 to-red-600' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {serviceData.requirements && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Requirements
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200">{serviceData.requirements}</p>
                </div>
              )}
              
              {serviceData.aftercare && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Aftercare
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-200">{serviceData.aftercare}</p>
                </div>
              )}
              
              {serviceData.cancellationPolicy && (
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-700/50">
                  <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Cancellation Policy
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-200">{serviceData.cancellationPolicy}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mock Reviews Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white fill-current" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Client Reviews</h3>
            <p className="text-gray-600 dark:text-gray-400">What clients are saying</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockReviews.map((review, index) => (
            <div 
              key={review.id}
              className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-right-4 duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <img
                src={review.avatar}
                alt={review.clientName}
                className="w-14 h-14 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white">{review.clientName}</h4>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">"{review.comment}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Checklist */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ready to Publish?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Service name added', completed: !!serviceData.name, required: true },
            { label: 'Description provided', completed: serviceData.description.length >= 10, required: true },
            { label: 'Category selected', completed: !!serviceData.category, required: true },
            { label: 'Duration set', completed: serviceData.duration > 0, required: true },
            { label: 'Price configured', completed: serviceData.price > 0, required: true },
            { label: 'Images added', completed: serviceData.images.length > 0, required: false },
            { label: 'Tags added', completed: serviceData.tags.length > 0, required: false },
            { label: 'Additional info', completed: !!(serviceData.requirements || serviceData.aftercare), required: false }
          ].map((item, index) => (
            <div 
              key={item.label}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                item.completed 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                  : item.required
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
              }`}
            >
              {item.completed ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{item.label}</span>
              {item.required && !item.completed && (
                <span className="text-xs bg-red-200 dark:bg-red-800 px-2 py-1 rounded-full">Required</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePreview;