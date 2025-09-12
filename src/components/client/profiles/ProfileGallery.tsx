import React, { useState } from 'react';
import { Camera, Play, Award, Users, Heart, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProfileGalleryProps {
  professionalId: number;
}

const ProfileGallery: React.FC<ProfileGalleryProps> = ({ professionalId }) => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      url: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      title: 'Modern Cardiac Surgery Suite',
      description: 'State-of-the-art surgical facility with advanced cardiac monitoring systems',
      category: 'facility'
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.pexels.com/photos/4021773/pexels-photo-4021773.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/4021773/pexels-photo-4021773.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      title: 'Patient Consultation Room',
      description: 'Comfortable and private consultation space for patient discussions',
      category: 'facility'
    },
    {
      id: 3,
      type: 'video',
      url: 'https://example.com/video1.mp4',
      thumbnail: 'https://images.pexels.com/photos/4021777/pexels-photo-4021777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      title: 'Minimally Invasive Cardiac Procedure',
      description: 'Educational video showing advanced cardiac intervention techniques',
      category: 'procedure',
      duration: '5:32'
    },
    {
      id: 4,
      type: 'image',
      url: 'https://images.pexels.com/photos/4021776/pexels-photo-4021776.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/4021776/pexels-photo-4021776.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      title: 'Medical Team Collaboration',
      description: 'Working with a multidisciplinary team for comprehensive patient care',
      category: 'team'
    },
    {
      id: 5,
      type: 'image',
      url: 'https://images.pexels.com/photos/4021778/pexels-photo-4021778.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      thumbnail: 'https://images.pexels.com/photos/4021778/pexels-photo-4021778.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      title: 'Award Recognition Ceremony',
      description: 'Receiving the Excellence in Cardiac Care Award 2023',
      category: 'awards'
    },
    {
      id: 6,
      type: 'video',
      url: 'https://example.com/video2.mp4',
      thumbnail: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      title: 'Patient Success Story',
      description: 'Testimonial from a patient who underwent successful cardiac surgery',
      category: 'testimonials',
      duration: '3:45'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Media', icon: Camera },
    { id: 'facility', label: 'Facilities', icon: Heart },
    { id: 'procedure', label: 'Procedures', icon: Play },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'awards', label: 'Awards', icon: Award }
  ];

  const filteredMedia = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  const openModal = (id: number) => {
    setSelectedMedia(id);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (selectedMedia === null) return;
    
    const currentIndex = filteredMedia.findIndex(item => item.id === selectedMedia);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredMedia.length - 1;
    } else {
      newIndex = currentIndex < filteredMedia.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedMedia(filteredMedia[newIndex].id);
  };

  const selectedItem = selectedMedia ? mediaItems.find(item => item.id === selectedMedia) : null;

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full mb-6">
            <Camera className="h-5 w-5 text-pink-600 dark:text-pink-400 mr-2" />
            <span className="text-pink-800 dark:text-pink-300 font-medium">Professional Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Behind the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"> Scenes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our state-of-the-art facilities, advanced procedures, and the dedicated team behind exceptional cardiac care
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-300">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedia.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => openModal(item.id)}
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Media Type Indicator */}
                <div className="absolute top-4 right-4">
                  {item.type === 'video' ? (
                    <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      <Play className="h-4 w-4" />
                      <span className="text-sm">{item.duration}</span>
                    </div>
                  ) : (
                    <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full">
                      <Camera className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Expand Icon */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedMedia && selectedItem && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="relative max-w-6xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateMedia('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigateMedia('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Media Content */}
              <div className="aspect-video">
                {selectedItem.type === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">Video Player</p>
                      <p className="text-sm text-gray-400">Duration: {selectedItem.duration}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Media Info */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Experience World-Class Cardiac Care
              </h3>
              <p className="text-pink-100 mb-8 max-w-2xl mx-auto text-lg">
                Schedule a consultation to see our facilities and meet our team in person
              </p>
              <button className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Schedule Facility Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileGallery;