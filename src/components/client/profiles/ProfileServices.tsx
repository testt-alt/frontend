import React, { useState } from 'react';
import { Heart, Stethoscope, Activity, Shield, Clock, DollarSign, Calendar, CheckCircle, Star, Users, Award, Zap } from 'lucide-react';

interface ProfileServicesProps {
  professionalId: number;
  onNavigate?: (page: string) => void;
}

const ProfileServices: React.FC<ProfileServicesProps> = ({ professionalId, onNavigate }) => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Mock data
  const services = [
    {
      id: 1,
      name: 'Comprehensive Cardiac Consultation',
      description: 'Complete cardiovascular assessment including ECG, echocardiogram, and personalized treatment plan.',
      duration: '60 minutes',
      price: '$200',
      type: 'consultation',
      features: [
        'Detailed medical history review',
        'Physical examination',
        'ECG and basic cardiac tests',
        'Personalized treatment recommendations',
        'Follow-up care plan'
      ],
      availability: 'Available today',
      rating: 4.9,
      bookings: 156,
      icon: Stethoscope,
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10'
    },
    {
      id: 2,
      name: 'Cardiac Surgery Consultation',
      description: 'Specialized consultation for patients requiring cardiac surgical intervention.',
      duration: '90 minutes',
      price: '$350',
      type: 'surgery',
      features: [
        'Surgical risk assessment',
        'Pre-operative planning',
        'Minimally invasive options review',
        'Recovery timeline discussion',
        'Second opinion available'
      ],
      availability: 'Next week',
      rating: 5.0,
      bookings: 89,
      icon: Heart,
      color: 'from-red-600 to-pink-600',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10'
    },
    {
      id: 3,
      name: 'Preventive Cardiology Program',
      description: 'Comprehensive program focused on preventing heart disease and maintaining cardiovascular health.',
      duration: '45 minutes',
      price: '$150',
      type: 'prevention',
      features: [
        'Risk factor assessment',
        'Lifestyle modification plan',
        'Nutrition counseling',
        'Exercise prescription',
        'Regular monitoring schedule'
      ],
      availability: 'Available today',
      rating: 4.8,
      bookings: 234,
      icon: Shield,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10'
    },
    {
      id: 4,
      name: 'Emergency Cardiac Assessment',
      description: 'Urgent evaluation for patients experiencing cardiac symptoms or chest pain.',
      duration: '30 minutes',
      price: '$180',
      type: 'emergency',
      features: [
        'Immediate assessment',
        'Emergency ECG',
        'Rapid diagnostic testing',
        'Treatment recommendations',
        'Hospital referral if needed'
      ],
      availability: 'Available now',
      rating: 4.9,
      bookings: 67,
      icon: Activity,
      color: 'from-orange-600 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10'
    }
  ];

  const serviceStats = [
    { icon: Users, label: 'Total Patients', value: '2,500+', color: 'text-blue-600' },
    { icon: Star, label: 'Average Rating', value: '4.9', color: 'text-yellow-600' },
    { icon: Award, label: 'Success Rate', value: '98%', color: 'text-green-600' },
    { icon: Zap, label: 'Response Time', value: '< 15 min', color: 'text-purple-600' }
  ];

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes('now') || availability.includes('today')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full mb-6">
            <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="text-indigo-800 dark:text-indigo-300 font-medium">Professional Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Specialized
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Medical Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive cardiac care with personalized treatment plans and cutting-edge medical expertise
          </p>
        </div>

        {/* Service Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {serviceStats.map((stat, index) => (
            <div
              key={stat.label}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 bg-gradient-to-r ${service.color} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                        {service.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{service.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {service.bookings} bookings
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{service.price}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</div>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Availability */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(service.availability)}`}>
                    {service.availability}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>

                {/* Features (Expandable) */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  selectedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-3 animate-fade-in-up"
                          style={{ animationDelay: `${featureIndex * 100}ms` }}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button 
                    onClick={() => onNavigate && onNavigate('booking')}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                  >
                    <Calendar className="h-4 w-4 inline mr-2 group-hover/btn:animate-bounce" />
                    Book Now
                  </button>
                  <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                    Learn More
                  </button>
                </div>

                {/* Expand/Collapse Indicator */}
                <div className="text-center mt-4">
                  <button
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(selectedService === service.id ? null : service.id);
                    }}
                  >
                    {selectedService === service.id ? 'Show Less' : 'Show Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Need a Custom Treatment Plan?
              </h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
                Every patient is unique. Let's discuss your specific needs and create a personalized treatment approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onNavigate && onNavigate('booking')}
                  className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Schedule Consultation
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('booking')}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:scale-105"
                >
                  Contact Dr. Chen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileServices;