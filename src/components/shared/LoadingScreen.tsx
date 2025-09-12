import React from 'react';
import { Calendar, Sparkles, Crown, Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center transition-colors duration-300 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-indigo-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="text-center relative z-10 max-w-lg mx-auto px-4">
        {/* Logo Animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-bounce hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 group">
            <Calendar className="h-16 w-16 text-white animate-pulse group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin shadow-lg">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Crown className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-in slide-in-from-bottom-4 duration-1000">
          ProBooking
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
          Preparing your professional space
        </h2>

        {/* Loading Animation */}
        <div className="space-y-8 mb-12">
          <div className="flex justify-center space-x-3">
            <div className="w-5 h-5 bg-blue-600 rounded-full animate-bounce shadow-lg"></div>
            <div className="w-5 h-5 bg-purple-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-5 h-5 bg-pink-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.3s' }}></div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-in slide-in-from-bottom-4 duration-1000 delay-600">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Loading dashboard</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Setting up your professional experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;