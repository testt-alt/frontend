import React, { useState } from 'react';
import { Star, Heart, CheckCircle, Calendar, Clock, MapPin, Grid, List, Award, MessageCircle, Video, Phone, Zap, TrendingUp } from 'lucide-react';

interface ProfessionalsListProps {
  onNavigate?: (page: string) => void;
}

const ProfessionalsList: React.FC<ProfessionalsListProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const professionals = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviews: 342,
      price: '$180',
      availability: 'Available Today',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      verified: true,
      responseTime: '< 30 min',
      experience: '15+ years',
      nextAvailable: 'Today 2:00 PM',
      specializations: ['Heart Surgery', 'Preventive Cardiology'],
      badges: ['Top Rated', 'Quick Response'],
      consultationType: ['Video', 'In-Person'],
      languages: ['English', 'Spanish'],
      yearsActive: 15
    },
    {
      id: 2,
      name: 'James Rodriguez',
      specialty: 'Corporate Lawyer',
      rating: 4.8,
      reviews: 289,
      price: '$250',
      availability: 'Available Now',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      verified: true,
      responseTime: '< 15 min',
      experience: '12+ years',
      nextAvailable: 'Now',
      specializations: ['Contract Law', 'Business Formation'],
      badges: ['Expert', 'Available Now'],
      consultationType: ['Video', 'Phone', 'In-Person'],
      languages: ['English', 'Portuguese'],
      yearsActive: 12
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      specialty: 'Clinical Psychologist',
      rating: 4.9,
      reviews: 456,
      price: '$120',
      availability: 'Available Tomorrow',
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      verified: true,
      responseTime: '< 1 hour',
      experience: '10+ years',
      nextAvailable: 'Tomorrow 10:00 AM',
      specializations: ['Anxiety Disorders', 'Depression'],
      badges: ['Certified', 'Most Booked'],
      consultationType: ['Video', 'Phone'],
      languages: ['English', 'Mandarin'],
      yearsActive: 10
    },
    {
      id: 4,
      name: 'Michael Thompson',
      specialty: 'Financial Advisor',
      rating: 4.7,
      reviews: 234,
      price: '$140',
      availability: 'Available Today',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      verified: true,
      responseTime: '< 2 hours',
      experience: '8+ years',
      nextAvailable: 'Today 4:00 PM',
      specializations: ['Investment Planning', 'Retirement'],
      badges: ['Verified', 'Rising Star'],
      consultationType: ['Video', 'In-Person'],
      languages: ['English'],
      yearsActive: 8
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      specialty: 'Business Consultant',
      rating: 4.8,
      reviews: 198,
      price: '$200',
      availability: 'Available This Week',
      location: 'Miami, FL',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      verified: true,
      responseTime: '< 3 hours',
      experience: '14+ years',
      nextAvailable: 'Wednesday 2:00 PM',
      specializations: ['Strategy Development', 'Digital Transformation'],
      badges: ['Top Performer', 'Industry Expert'],
      consultationType: ['Video', 'Phone', 'In-Person'],
      languages: ['English', 'French'],
      yearsActive: 14
    },
    {
      id: 6,
      name: 'Prof. David Kim',
      specialty: 'Math Tutor',
      rating: 4.9,
      reviews: 312,
      price: '$85',
      availability: 'Available Tomorrow',
      location: 'Seattle, WA',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      verified: true,
      responseTime: '< 1 hour',
      experience: '20+ years',
      nextAvailable: 'Tomorrow 3:00 PM',
      specializations: ['Calculus', 'Statistics'],
      badges: ['Academic Excellence', 'Student Favorite'],
      consultationType: ['Video', 'In-Person'],
      languages: ['English', 'Korean'],
      yearsActive: 20
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Now')) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    if (availability.includes('Today')) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    if (availability.includes('Tomorrow')) return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
    return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'Video': return Video;
      case 'Phone': return Phone;
      default: return MapPin;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Top Rated': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Expert': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Available Now': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Quick Response': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Most Booked': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'Certified': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      'Verified': 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
      'Rising Star': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'Top Performer': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      'Industry Expert': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
      'Academic Excellence': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
      'Student Favorite': 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick stats bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">98%</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Match Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">24/7</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Support</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">500+</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily Bookings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">4.9</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Header with controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Available Professionals
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {professionals.length} professionals found
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 shadow-md'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 shadow-md'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Professionals grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {professionals.map((professional, index) => (
            <div
              key={professional.id}
              className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up ${
                viewMode === 'list' ? 'flex items-center space-x-6' : ''
              } relative overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Professional image and basic info */}
              <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'} relative z-10`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className={`rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-300 ${
                          viewMode === 'list' ? 'h-16 w-16' : 'h-20 w-20'
                        }`}
                      />
                      {professional.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {/* Online status indicator */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {professional.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {professional.specialty}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {professional.experience} • {professional.location}
                      </p>
                      {/* Languages */}
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">Languages:</span>
                        {professional.languages.map((lang, langIndex) => (
                          <span key={langIndex} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded mr-1">{lang}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {viewMode === 'grid' && (
                    <button
                      onClick={() => toggleFavorite(professional.id)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        className={`h-5 w-5 transition-all duration-300 ${
                          favorites.includes(professional.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>

              <div className={`${viewMode === 'list' ? 'flex-1' : ''} relative z-10`}>
                {/* Professional details */}
                {/* Rating and price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(professional.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {professional.rating} ({professional.reviews})
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {professional.price}
                  </span>
                </div>

                {/* Badges */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professional.badges.map((badge, badgeIndex) => (
                      <span key={badgeIndex} className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {professional.specializations.map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultation types */}
                <div className="mb-4">
                  <div className="flex items-center space-x-3">
                    {professional.consultationType.map((type, typeIndex) => {
                      const Icon = getConsultationIcon(type);
                      return (
                        <div key={typeIndex} className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                          <Icon className="h-3 w-3" />
                          <span>{type}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Availability and response time */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {professional.responseTime}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(professional.availability)}`}>
                    {professional.availability}
                  </span>
                </div>

                {/* Action buttons */}
                <div className={`flex ${viewMode === 'list' ? 'space-x-3' : 'space-x-3'}`}>
                  <button 
                    onClick={() => onNavigate && onNavigate('booking')}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Calendar className="h-4 w-4 inline mr-2 group-hover:animate-bounce" />
                    Book Now
                  </button>
                  <button className="px-4 py-3 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                    <MessageCircle className="h-4 w-4 inline mr-2" />
                    Message
                  </button>
                  <button className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                    <button 
                      onClick={() => onNavigate && onNavigate('profile')}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      Profile
                    </button>
                  </button>
                  {viewMode === 'list' && (
                    <button
                      onClick={() => toggleFavorite(professional.id)}
                      className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        className={`h-5 w-5 transition-all duration-300 ${
                          favorites.includes(professional.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      />
                    </button>
                  )}
                </div>
                
                {/* Quick stats for list view */}
                {viewMode === 'list' && (
                  <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                    <span>👥 {professional.reviews} clients</span>
                    <span>⏱️ {professional.yearsActive} years active</span>
                    <span>📅 Next: {professional.nextAvailable}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced load more section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Didn't find what you're looking for?</h3>
              <p className="text-blue-100 mb-6">We have thousands more professionals ready to help you</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Load More Professionals
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                  Refine Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsList;