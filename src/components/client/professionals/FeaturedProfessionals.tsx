import React, { useState } from 'react';
import { Star, Award, Clock, MapPin, Video, Phone, ChevronLeft, ChevronRight, Calendar, Heart, CheckCircle } from 'lucide-react';

interface FeaturedProfessionalsProps {
  onNavigate?: (page: string) => void;
}

const FeaturedProfessionals: React.FC<FeaturedProfessionalsProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const featuredProfessionals = [
    {
      id: 1,
      name: 'Dr. Alexandra Chen',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviews: 456,
      price: '$200',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
      badge: 'Top Rated',
      availability: 'Available Today',
      responseTime: '< 15 min',
      consultationType: ['Video', 'In-Person'],
      specializations: ['Heart Surgery', 'Preventive Cardiology', 'Cardiac Imaging'],
      experience: '18+ years',
      featured: true,
      description: 'Leading cardiologist with expertise in minimally invasive procedures and preventive care.'
    },
    {
      id: 2,
      name: 'James Rodriguez',
      specialty: 'Corporate Lawyer',
      rating: 4.8,
      reviews: 342,
      price: '$300',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
      badge: 'Expert',
      availability: 'Available Now',
      responseTime: '< 10 min',
      consultationType: ['Video', 'Phone', 'In-Person'],
      specializations: ['Contract Law', 'Business Formation', 'Mergers & Acquisitions'],
      experience: '15+ years',
      featured: true,
      description: 'Experienced corporate attorney specializing in business law and startup legal services.'
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      specialty: 'Clinical Psychologist',
      rating: 4.9,
      reviews: 523,
      price: '$150',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
      badge: 'Most Booked',
      availability: 'Available Tomorrow',
      responseTime: '< 30 min',
      consultationType: ['Video', 'Phone'],
      specializations: ['Anxiety Disorders', 'Depression', 'Trauma Therapy'],
      experience: '12+ years',
      featured: true,
      description: 'Compassionate therapist helping clients overcome anxiety, depression, and trauma.'
    },
    {
      id: 4,
      name: 'Michael Thompson',
      specialty: 'Financial Advisor',
      rating: 4.7,
      reviews: 289,
      price: '$180',
      location: 'Miami, FL',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop&crop=face',
      badge: 'Rising Star',
      availability: 'Available Today',
      responseTime: '< 1 hour',
      consultationType: ['Video', 'In-Person'],
      specializations: ['Investment Planning', 'Retirement', 'Tax Strategy'],
      experience: '10+ years',
      featured: true,
      description: 'Strategic financial advisor focused on long-term wealth building and retirement planning.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredProfessionals.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredProfessionals.length / 2)) % Math.ceil(featuredProfessionals.length / 2));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Top Rated': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Expert': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Most Booked': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'Rising Star': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('Now')) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
    if (availability.includes('Today')) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full mb-6">
            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">Featured Professionals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600"> Top Rated </span>
            Professionals
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Handpicked professionals with exceptional ratings and proven track records
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 group"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mx-auto" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 group"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mx-auto" />
          </button>

          {/* Professionals carousel */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(featuredProfessionals.length / 2) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 px-16">
                    {featuredProfessionals.slice(slideIndex * 2, slideIndex * 2 + 2).map((professional, index) => (
                      <div
                        key={professional.id}
                        className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                      >
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Featured badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          FEATURED
                        </div>

                        <div className="relative z-10">
                          {/* Professional header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <img
                                  src={professional.image}
                                  alt={professional.name}
                                  className="h-20 w-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-500 shadow-lg"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                                  <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                {/* Online indicator */}
                                <div className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                              </div>
                              <div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {professional.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">
                                  {professional.specialty}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                  {professional.experience} • {professional.location}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleFavorite(professional.id)}
                              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                            >
                              <Heart
                                className={`h-6 w-6 transition-all duration-300 ${
                                  favorites.includes(professional.id)
                                    ? 'text-red-500 fill-current'
                                    : 'text-gray-400 hover:text-red-500'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {professional.description}
                          </p>

                          {/* Rating and badge */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < Math.floor(professional.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {professional.rating} ({professional.reviews} reviews)
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(professional.badge)}`}>
                              {professional.badge}
                            </span>
                          </div>

                          {/* Specializations */}
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                              {professional.specializations.slice(0, 3).map((spec, specIndex) => (
                                <span
                                  key={specIndex}
                                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
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

                          {/* Price and response time */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Responds in {professional.responseTime}
                              </span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {professional.price}
                            </span>
                          </div>

                          {/* Action buttons */}
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => onNavigate && onNavigate('booking')}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                            >
                              <Calendar className="h-4 w-4 inline mr-2 group-hover/btn:animate-bounce" />
                              Book Now
                            </button>
                            <button className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                              <button 
                                onClick={() => onNavigate && onNavigate('profile')}
                                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105"
                              >
                                View Profile
                              </button>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(featuredProfessionals.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Want to Become a Featured Professional?</h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Join our elite network of top-rated professionals and get featured to thousands of potential clients
              </p>
              <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Apply to Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;