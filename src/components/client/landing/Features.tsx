import React from 'react';
import { Search, CreditCard, Star, Calendar, Clock, Shield, Smartphone, UserCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find the perfect professional with our advanced search and filtering system.',
      color: 'bg-blue-500',
      id: 'professionals'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Pay securely with multiple payment options and transparent pricing.',
      color: 'bg-green-500',
      id: 'payments'
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      description: 'Read authentic reviews from real clients to make informed decisions.',
      color: 'bg-yellow-500',
      id: 'reviews'
    },
    {
      icon: Calendar,
      title: 'Instant Booking',
      description: 'Book appointments instantly with real-time availability and confirmations.',
      color: 'bg-purple-500',
      id: 'appointments'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access professionals and book appointments anytime, anywhere.',
      color: 'bg-pink-500',
      id: 'realtime'
    },
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All professionals are thoroughly vetted and verified for your safety.',
      color: 'bg-indigo-500',
      id: 'security'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Book and manage appointments seamlessly on any device.',
      color: 'bg-teal-500',
      id: 'mobile'
    },
    {
      icon: UserCheck,
      title: 'Quality Guarantee',
      description: 'Satisfaction guaranteed or get your money back with our quality promise.',
      color: 'bg-orange-500',
      id: 'analytics'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> ProBooking?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the features that make ProBooking the preferred choice for booking professional services
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up border border-gray-200 dark:border-gray-700 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              id={feature.id}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;