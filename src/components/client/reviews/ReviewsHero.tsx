import React from 'react';
import { Star, MessageSquare, Award, TrendingUp, Edit, Search, Filter, Heart } from 'lucide-react';

const ReviewsHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-pink-950/30 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400 to-orange-600 rounded-full opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        
        {/* Floating review elements */}
        <div className="absolute top-20 right-20 animate-float animation-delay-1000">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">"Amazing service!"</p>
          </div>
        </div>
        <div className="absolute bottom-32 left-16 animate-float animation-delay-2000">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Top Rated</span>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-10 animate-float animation-delay-1500">
          <MessageSquare className="w-12 h-12 text-pink-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-8 border border-purple-200/50 dark:border-purple-700/50">
            <Star className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 animate-pulse" />
            <span className="text-purple-800 dark:text-purple-300 font-medium">Your Review Dashboard</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Share Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Experience</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Help others make informed decisions by sharing your honest reviews and experiences with professionals you've worked with.
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-500">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg animate-pulse-glow">
              <Edit className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Write a Review
            </button>
            
            <button className="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl">
              <Search className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              Browse Reviews
            </button>
          </div>

          {/* Search and filter bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl animate-fade-in-up animation-delay-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews by professional, service, or keyword..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsHero;