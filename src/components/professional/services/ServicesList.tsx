import React, { useState } from 'react';
import { Scissors, Clock, DollarSign, Star, Users, TrendingUp, Edit, Trash2, Eye, MoreVertical, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Award, Heart, Bookmark, Share2, CheckCircle, AlertCircle, XCircle, Calendar, Phone, Mail, MapPin, Plus } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  originalPrice?: number;
  rating: number;
  totalBookings: number;
  isActive: boolean;
  isPopular?: boolean;
  isPremium?: boolean;
  isNew?: boolean;
  image?: string;
  tags?: string[];
}

const ServicesList: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const services: Service[] = [
    {
      id: '1',
      name: 'Premium Hair Cut & Style',
      description: 'Professional hair cutting and styling service with consultation and personalized recommendations.',
      category: 'haircut',
      duration: 90,
      price: 85,
      originalPrice: 100,
      rating: 4.9,
      totalBookings: 342,
      isActive: true,
      isPopular: true,
      isPremium: true,
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Popular', 'Premium', 'Consultation']
    },
    {
      id: '2',
      name: 'Full Color Treatment',
      description: 'Complete hair coloring service including highlights, lowlights, and color correction.',
      category: 'color',
      duration: 180,
      price: 150,
      originalPrice: 180,
      rating: 4.8,
      totalBookings: 198,
      isActive: true,
      isPopular: true,
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Color Expert', 'Transformation']
    },
    {
      id: '3',
      name: 'Bridal Hair Package',
      description: 'Complete bridal hair styling including trial session and wedding day service.',
      category: 'special',
      duration: 240,
      price: 300,
      rating: 5.0,
      totalBookings: 45,
      isActive: true,
      isPremium: true,
      image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Bridal', 'Special Event', 'Trial Included']
    },
    {
      id: '4',
      name: 'Beard Trim & Style',
      description: 'Professional beard trimming and styling service for the modern gentleman.',
      category: 'haircut',
      duration: 45,
      price: 35,
      rating: 4.7,
      totalBookings: 156,
      isActive: true,
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Quick Service', 'Grooming']
    },
    {
      id: '5',
      name: 'Keratin Treatment',
      description: 'Professional keratin treatment for smooth, frizz-free hair that lasts months.',
      category: 'treatment',
      duration: 210,
      price: 200,
      rating: 4.6,
      totalBookings: 89,
      isActive: true,
      isPremium: true,
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Long-lasting', 'Treatment']
    },
    {
      id: '6',
      name: 'Express Blowout',
      description: 'Quick professional blowout for special occasions or everyday glamour.',
      category: 'styling',
      duration: 30,
      price: 45,
      rating: 4.5,
      totalBookings: 267,
      isActive: true,
      isNew: true,
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Quick', 'New Service', 'Express']
    }
  ];

  const handleAddService = () => {
    window.location.hash = 'add-service';
  };
  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 transition-all duration-300 ${
              star <= rating 
                ? 'text-yellow-400 fill-current animate-pulse' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services List</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your service offerings</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAddService}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold"
          >
            <Plus className="w-5 h-5" />
            <span>Add Service</span>
          </button>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000 ${
              selectedService === service.id ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
          >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {service.isPopular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg animate-pulse">
                    <Flame className="w-3 h-3 mr-1" />
                    Popular
                  </span>
                )}
                {service.isPremium && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                )}
                {service.isNew && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg animate-bounce">
                    <Sparkles className="w-3 h-3 mr-1" />
                    New
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="absolute top-4 right-4">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(service.isActive)}`}>
                  {getStatusIcon(service.isActive)}
                  <span>{service.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              {/* Price */}
              <div className="absolute bottom-4 right-4 text-right">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  ${service.price}
                </div>
                {service.originalPrice && service.originalPrice > service.price && (
                  <div className="text-lg text-white/70 line-through">
                    ${service.originalPrice}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title and Rating */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {service.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(service.rating)}
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                      {service.rating} ({service.totalBookings} bookings)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-300 group/stat">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover/stat:rotate-12 group-hover/stat:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Duration</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatDuration(service.duration)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300 group/stat">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover/stat:rotate-12 group-hover/stat:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Bookings</p>
                    <p className="font-bold text-gray-900 dark:text-white">{service.totalBookings}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {service.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <Calendar className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Book</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Bookmark className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <MoreVertical className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Scissors className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No services found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Try adjusting your search criteria or create a new service to get started.
          </p>
          <button 
            onClick={handleAddService}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Scissors className="w-5 h-5" />
            <span className="font-bold">Create New Service</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicesList;