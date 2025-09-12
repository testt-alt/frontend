import React from 'react';
import { Search, Users, Star, Award, MapPin, Filter, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';

const ProfessionalsHero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/30 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 dark:opacity-5 animate-float"></div>
        
        {/* Floating professional avatars */}
        <div className="absolute top-20 right-20 animate-float animation-delay-1000">
          <img src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face" 
               alt="Professional" className="w-16 h-16 rounded-full shadow-lg ring-4 ring-white/50 dark:ring-gray-700/50" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float animation-delay-2000">
          <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face" 
               alt="Professional" className="w-20 h-20 rounded-full shadow-lg ring-4 ring-white/50 dark:ring-gray-700/50" />
        </div>
        <div className="absolute top-1/2 right-10 animate-float animation-delay-1500">
          <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face" 
               alt="Professional" className="w-14 h-14 rounded-full shadow-lg ring-4 ring-white/50 dark:ring-gray-700/50" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero content */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-8 border border-blue-200/50 dark:border-blue-700/50">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">15,000+ Verified Professionals</span>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 ml-2" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Professional</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with top-rated professionals across all industries. Quality guaranteed with 24/7 support.
          </p>

          {/* Unified search bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search professionals or specialties..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
                <div className="relative lg:w-48">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Verified Professionals</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">15K+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Active Professionals</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform fill-current" />
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">4.9</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Average Rating</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">&lt;2h</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsHero;