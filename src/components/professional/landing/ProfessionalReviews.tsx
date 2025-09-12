import React from 'react';
import { Star, Quote, User, Calendar, TrendingUp, Award, Heart, Sparkles } from 'lucide-react';

const ProfessionalReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Maria Gonzalez',
      role: 'Professional Stylist',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: 'ProBooking has completely transformed my business. Appointment management is incredibly easy and my clients are delighted with the booking system.',
      date: '2024-01-15',
      service: 'Professional Plan'
    },
    {
      id: 2,
      name: 'Carlos Rivera',
      role: 'Physiotherapist',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: 'The Google Calendar integration and automatic notifications have saved me hours of administrative work. Highly recommended.',
      date: '2024-01-10',
      service: 'Plan Enterprise'
    },
    {
      id: 3,
      name: 'Ana Martinez',
      role: 'Beauty Consultant',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: 'The review system and client management allows me to maintain a close relationship with each one. My business has grown 40% since using ProBooking.',
      date: '2024-01-08',
      service: 'Professional Plan'
    },
    {
      id: 4,
      name: 'Roberto Lopez',
      role: 'Dentist',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: 'The automatic reminder functionality has significantly reduced patient no-shows. An indispensable tool.',
      date: '2024-01-05',
      service: 'Professional Plan'
    },
    {
      id: 5,
      name: 'Laura Sanchez',
      role: 'Therapeutic Massage Therapist',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: 'The interface is intuitive and elegant. My clients always comment on how professional my online booking system looks.',
      date: '2024-01-03',
      service: 'Plan Starter'
    },
    {
      id: 6,
      name: 'Diego Fernandez',
      role: 'Personal Trainer',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      comment: 'The reports and analytics help me understand my business better. I can see trends and optimize my schedules to maximize revenue.',
      date: '2024-01-01',
      service: 'Plan Enterprise'
    }
  ];

  const stats = [
    { icon: Star, label: 'Average Rating', value: '4.9/5', color: 'from-yellow-500 to-orange-600' },
    { icon: User, label: 'Active Professionals', value: '12,000+', color: 'from-blue-500 to-cyan-600' },
    { icon: Calendar, label: 'Appointments Managed', value: '2.5M+', color: 'from-green-500 to-emerald-600' },
    { icon: TrendingUp, label: 'Monthly Growth', value: '+25%', color: 'from-purple-500 to-pink-600' }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Real Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What our professionals say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Thousands of professionals trust ProBooking to manage their businesses and grow their professional practice.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Content */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-medium">
                "{review.comment}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {review.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {review.role}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                      {review.service}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="w-8 h-8 text-yellow-300" />
                <Heart className="w-8 h-8 text-pink-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join thousands of successful professionals
              </h3>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your free trial today and discover why ProBooking is the #1 choice for professionals who want to grow their business.
              </p>
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalReviews;