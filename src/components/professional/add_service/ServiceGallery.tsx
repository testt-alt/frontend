import React, { useState } from 'react';
import { Camera, Upload, Image, Video, Trash2, Eye, Star, Heart, Bookmark, Share2, Plus, X, CheckCircle, AlertCircle, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Award, Gift, Rocket, Diamond, Palette, Brush, Scissors, Wand2, BarChart3 } from 'lucide-react';

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

interface ServiceGalleryProps {
  serviceData: ServiceData;
  updateServiceData: (updates: Partial<ServiceData>) => void;
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ serviceData, updateServiceData }) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showStockPhotos, setShowStockPhotos] = useState(true);

  // Professional stock photos for different service categories
  const stockPhotos = {
    haircut: [
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    color: [
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    treatment: [
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    styling: [
      'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    grooming: [
      'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    consultation: [
      'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400'
    ]
  };

  const currentStockPhotos = stockPhotos[serviceData.category as keyof typeof stockPhotos] || stockPhotos.haircut;

  const addImage = (imageUrl: string) => {
    if (!serviceData.images.includes(imageUrl)) {
      updateServiceData({ images: [...serviceData.images, imageUrl] });
    }
  };

  const removeImage = (imageUrl: string) => {
    updateServiceData({ images: serviceData.images.filter(img => img !== imageUrl) });
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...serviceData.images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    updateServiceData({ images: newImages });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    // Handle file drop logic here
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <label className="text-lg font-bold text-gray-900 dark:text-white">Service Gallery</label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowStockPhotos(!showStockPhotos)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                showStockPhotos 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Stock Photos
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {serviceData.images.length}/8 images
            </span>
          </div>
        </div>

        {/* Drag & Drop Upload */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 hover:scale-105 group ${
            draggedOver
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 scale-105'
              : 'border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
          }`}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 ${
                draggedOver 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-purple-500 group-hover:to-pink-600'
              }`}>
                <Upload className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Upload Service Photos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your images here, or click to browse
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold">
                Choose Files
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Photos */}
      {showStockPhotos && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Image className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Professional Stock Photos</h3>
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">
              Free to use
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentStockPhotos.map((photo, index) => {
              const isSelected = serviceData.images.includes(photo);
              
              return (
                <div
                  key={photo}
                  className="relative group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl ${
                    isSelected 
                      ? 'border-purple-500 ring-4 ring-purple-200 dark:ring-purple-800 scale-105' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}>
                    <img
                      src={photo}
                      alt={`Stock photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedImage(photo)}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => isSelected ? removeImage(photo) : addImage(photo)}
                          className={`p-3 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 ${
                            isSelected 
                              ? 'bg-red-500/80 text-white hover:bg-red-600/80' 
                              : 'bg-purple-500/80 text-white hover:bg-purple-600/80'
                          }`}
                        >
                          {isSelected ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Images */}
      {serviceData.images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Selected Images</h3>
            </div>
            <button
              onClick={() => updateServiceData({ images: [] })}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 hover:scale-105 text-sm font-bold"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceData.images.map((image, index) => (
              <div
                key={image}
                className="relative group animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-green-200 dark:border-green-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <img
                    src={image}
                    alt={`Service image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Controls */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeImage(image)}
                        className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full text-white hover:bg-red-600/80 transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Image Order */}
                  <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>

                  {/* Primary Image Indicator */}
                  {index === 0 && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      Primary
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Gallery Tips</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: Camera,
              title: 'High Quality',
              tip: 'Use high-resolution images (at least 1080p) for best results',
              color: 'text-blue-500'
            },
            {
              icon: Star,
              title: 'Show Results',
              tip: 'Include before/after photos to showcase your skills',
              color: 'text-yellow-500'
            },
            {
              icon: Palette,
              title: 'Good Lighting',
              tip: 'Natural lighting shows true colors and details',
              color: 'text-purple-500'
            },
            {
              icon: Target,
              title: 'Multiple Angles',
              tip: 'Show different angles and perspectives of your work',
              color: 'text-green-500'
            },
            {
              icon: Crown,
              title: 'Professional Setup',
              tip: 'Clean, professional background enhances credibility',
              color: 'text-orange-500'
            },
            {
              icon: Heart,
              title: 'Client Consent',
              tip: 'Always get permission before using client photos',
              color: 'text-red-500'
            }
          ].map((tip, index) => (
            <div 
              key={index}
              className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
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

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-90 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Image Preview</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Position {serviceData.images.indexOf(selectedImage) + 1} of {serviceData.images.length}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 hover:scale-110">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Stats */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Gallery Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Images Added', value: serviceData.images.length.toString(), icon: Image, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Recommended', value: '3-5', icon: Target, color: 'text-green-600 dark:text-green-400' },
            { label: 'Max Allowed', value: '8', icon: Crown, color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Completion', value: `${Math.min(Math.round((serviceData.images.length / 5) * 100), 100)}%`, icon: CheckCircle, color: 'text-orange-600 dark:text-orange-400' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} />
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGallery;