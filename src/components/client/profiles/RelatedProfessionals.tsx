import React, { useState } from 'react';
import { Star, Calendar, MapPin, Video, Phone, Heart, Award, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface RelatedProfessionalsProps {
  professionalId: number;
  onNavigate?: (page: string) => void;
}

const RelatedProfessionals: React.FC<RelatedProfessionalsProps> = ({ professionalId, onNavigate }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Mock related professionals data
  const relatedProfessionals = [
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      specialty: 'Cardiac Surgeon',
      rating: 4.8,
      reviews: 342,
      price: '$220',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      availability: 'Available Tomorrow',
      responseTime: '< 20 min',
      specializations: ['Heart Surgery', 'Valve Replacement'],
      badges: ['Top Rated', 'Expert'],
      consultationType: ['Video', 'In-Person'],
      matchPercentage: 95
    },
    {
      id: 3,
      name: 'Dr. Jennifer Walsh',
      specialty: 'Interventional Cardiologist',
      rating: 4.9,
      reviews: 289,
      price: '$190',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      availability: 'Available Today',
      responseTime: '< 15 min',
      specializations: ['Cardiac Catheterization', 'Angioplasty'],
      badges: ['Quick Response', 'Verified'],
      consultationType: ['Video', 'Phone', 'In-Person'],
      matchPercentage: 92
    },
    {
      id: 4,
      name: 'Dr. Robert Chen',
      specialty: 'Preventive Cardiologist',
      rating: 4.7,
      reviews: 198,
      price: '$160',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      availability: 'Available This Week',
      responseTime: '< 1 hour',
      specializations: ['Risk Assessment', 'Lifestyle Medicine'],
      badges: ['Preventive Care', 'Wellness Expert'],
      consultationType: ['Video', 'In-Person'],
      matchPercentage: 88
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
    if (availability.includes('Today')) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    if (availability.includes('Tomorrow')) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Top Rated': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Expert': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Quick Response': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Verified': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Preventive Care': 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
      'Wellness Expert': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full mb-6">
            <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="text-indigo-800 dark:text-indigo-300 font-medium">Related Professionals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Similar
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Specialists</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover other highly-rated cardiac specialists in your area with similar expertise
          </p>
        </div>

        {/* Related Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProfessionals.map((professional, index) => (
            <div
              key={professional.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Match percentage badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {professional.matchPercentage}% Match
              </div>

              <div className="relative z-10">
                {/* Professional Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="h-20 w-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all duration-500 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {professional.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {professional.specialty}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {professional.location}
                      </p>
                    </div>
                  </div>
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
                </div>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-6">
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
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {professional.price}
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {professional.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {professional.specializations.map((spec, specIndex) => (
                      <span
                        key={specIndex}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultation types and availability */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {professional.consultationType.map((type, typeIndex) => {
                      const Icon = type === 'Video' ? Video : type === 'Phone' ? Phone : MapPin;
                      return (
                        <div key={typeIndex} className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                          <Icon className="h-3 w-3" />
                          <span>{type}</span>
                        </div>
                      );
                    })}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(professional.availability)}`}>
                    {professional.availability}
                  </span>
                </div>

                {/* Response time */}
                <div className="flex items-center space-x-2 mb-8">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Responds in {professional.responseTime}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button 
                    onClick={() => onNavigate && onNavigate('booking')}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                  >
                    <Calendar className="h-4 w-4 inline mr-2 group-hover/btn:animate-bounce" />
                    Book Now
                  </button>
                  <button className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                    View Profile
                  </button>
                </div>

                {/* Similarity indicator */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Similarity to Dr. Chen:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${professional.matchPercentage}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {professional.matchPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why These Professionals Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden animate-fade-in-up">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Why These Recommendations?
              </h3>
              <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
                Our AI-powered matching system considers specialization, location, patient reviews, and treatment approaches to find the best alternatives
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Similar Expertise</h4>
                <p className="text-indigo-100 text-sm">
                  Professionals with comparable specializations and experience levels
                </p>
              </div>
              
              <div className="text-center group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Same Location</h4>
                <p className="text-indigo-100 text-sm">
                  Conveniently located professionals in your area
                </p>
              </div>
              
              <div className="text-center group">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">High Ratings</h4>
                <p className="text-indigo-100 text-sm">
                  Top-rated professionals with excellent patient satisfaction
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group">
                <span>Explore All Cardiologists</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProfessionals;