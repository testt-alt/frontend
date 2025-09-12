import React from 'react';
import { ArrowRight, Play, Star, Users, CheckCircle } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-secondary-950/30 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400 to-secondary-600 rounded-full opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-400 to-accent-600 rounded-full opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-full opacity-10 dark:opacity-5 animate-spin-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero content */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full mb-8 border border-primary-200/50 dark:border-primary-700/50">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-primary-800 dark:text-primary-300 font-medium">Trusted by 50,000+ clients</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight animate-fade-in-up animation-delay-300">
            Book Your Perfect
            <span className="text-gradient animate-text-shimmer"> Professional</span>
            <br />
            in Minutes
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500">
            Connect with verified professionals across all industries. From healthcare to legal services, 
            find and book appointments with top-rated experts instantly.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-700">
            <button 
              onClick={() => onNavigate && onNavigate('booking')}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg animate-pulse-glow"
            >
              Book Appointment Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 group-hover:scale-125 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={() => onNavigate && onNavigate('professionals')}
              className="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
              Browse Professionals
            </button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-1000">
            <div className="flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-600 transition-colors">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Verified Professionals</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group animation-delay-300">
              <Users className="h-8 w-8 text-primary-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group animation-delay-500">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 transition-colors">4.9</div>
                <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;