import React, { useState } from 'react';
import { Search, Star, Clock, DollarSign, Video, Phone, MapPin, Filter, ChevronRight, Award, Users, CheckCircle, Check } from 'lucide-react';
import { BookingData } from './BookingPage';

interface ServiceSelectionProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ data, onUpdate, onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(data.service?.id || null);

  const categories = [
    { id: 'all', name: 'All Services', icon: Users },
    { id: 'healthcare', name: 'Healthcare', icon: Award },
    { id: 'legal', name: 'Legal', icon: CheckCircle },
    { id: 'finance', name: 'Finance', icon: DollarSign },
    { id: 'therapy', name: 'Therapy', icon: Users },
    { id: 'consulting', name: 'Consulting', icon: Users }
  ];

  const professionals = [
    {
      id: 1,
      name: 'Dr. Alexandra Chen',
      specialty: 'Cardiologist',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      rating: 4.9,
      reviews: 456,
      services: [
        {
          id: 1,
          name: 'Comprehensive Cardiac Consultation',
          description: 'Complete cardiovascular assessment with personalized treatment plan',
          duration: '60 minutes',
          price: 200,
          type: 'consultation',
          category: 'healthcare',
          consultationTypes: ['Video', 'In-Person'],
          features: ['ECG included', 'Treatment plan', 'Follow-up included']
        },
        {
          id: 2,
          name: 'Cardiac Surgery Consultation',
          description: 'Specialized consultation for surgical intervention planning',
          duration: '90 minutes',
          price: 350,
          type: 'surgery',
          category: 'healthcare',
          consultationTypes: ['In-Person'],
          features: ['Surgical assessment', 'Risk evaluation', 'Recovery planning']
        }
      ]
    },
    {
      id: 2,
      name: 'James Rodriguez',
      specialty: 'Corporate Lawyer',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      rating: 4.8,
      reviews: 342,
      services: [
        {
          id: 3,
          name: 'Business Legal Consultation',
          description: 'Comprehensive legal advice for business matters and contracts',
          duration: '60 minutes',
          price: 250,
          type: 'consultation',
          category: 'legal',
          consultationTypes: ['Video', 'Phone', 'In-Person'],
          features: ['Contract review', 'Legal strategy', 'Documentation']
        },
        {
          id: 4,
          name: 'Contract Review Service',
          description: 'Detailed review and analysis of business contracts',
          duration: '45 minutes',
          price: 180,
          type: 'review',
          category: 'legal',
          consultationTypes: ['Video', 'Phone'],
          features: ['Clause analysis', 'Risk assessment', 'Recommendations']
        }
      ]
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      specialty: 'Clinical Psychologist',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      rating: 4.9,
      reviews: 523,
      services: [
        {
          id: 5,
          name: 'Individual Therapy Session',
          description: 'One-on-one therapy session for anxiety, depression, and personal growth',
          duration: '50 minutes',
          price: 120,
          type: 'therapy',
          category: 'therapy',
          consultationTypes: ['Video', 'Phone'],
          features: ['Personalized approach', 'Homework assignments', 'Progress tracking']
        }
      ]
    }
  ];

  // Flatten all services with professional info
  const allServices = professionals.flatMap(professional =>
    professional.services.map(service => ({
      ...service,
      professional: {
        id: professional.id,
        name: professional.name,
        specialty: professional.specialty,
        image: professional.image,
        rating: professional.rating,
        reviews: professional.reviews
      }
    }))
  );

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.professional.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceSelect = (service: any) => {
    setSelectedService(service.id);
    onUpdate({ service });
  };

  const handleContinue = () => {
    if (selectedService) {
      onNext();
    }
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'Video': return Video;
      case 'Phone': return Phone;
      default: return MapPin;
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Service</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select the professional service that best fits your needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-12 animate-fade-in-up animation-delay-300">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services or professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-lg"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className={`group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border-2 cursor-pointer animate-fade-in-up relative overflow-hidden ${
                selectedService === service.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-2xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleServiceSelect(service)}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Selection indicator */}
              {selectedService === service.id && (
                <div className="absolute top-4 right-4 bg-indigo-600 rounded-full p-2 animate-bounce-in">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}

              <div className="relative z-10">
                {/* Professional Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={service.professional.image}
                    alt={service.professional.name}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all duration-500 shadow-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {service.professional.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {service.professional.specialty}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(service.professional.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {service.professional.rating} ({service.professional.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Service Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl">
                      <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Duration</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{service.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                      <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Price</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">${service.price}</p>
                    </div>
                  </div>
                </div>

                {/* Consultation Types */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Available consultation types:</p>
                  <div className="flex space-x-3">
                    {service.consultationTypes.map((type, typeIndex) => {
                      const Icon = getConsultationIcon(type);
                      return (
                        <div key={typeIndex} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handleServiceSelect(service)}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedService === service.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {selectedService === service.id ? 'Selected' : 'Select Service'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedService && (
          <div className="text-center animate-fade-in-up">
            <button
              onClick={handleContinue}
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg group"
            >
              <span>Continue to Date & Time</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700">
              <Search className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No services found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Try adjusting your search terms or category filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceSelection;