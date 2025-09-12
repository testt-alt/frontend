import React, { useState } from 'react';
import { Search, Filter, Scissors, Calendar, DollarSign, Star, TrendingUp, Eye, Settings, Download, Share2, Bell, Sparkles, Zap, Target, Award, BarChart3, Activity } from 'lucide-react';

const ServicesFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [duration, setDuration] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: Eye, color: 'from-gray-500 to-gray-600' },
    { value: 'haircut', label: 'Hair Cut', icon: Scissors, color: 'from-blue-500 to-cyan-600' },
    { value: 'color', label: 'Color Treatment', icon: Sparkles, color: 'from-purple-500 to-pink-600' },
    { value: 'styling', label: 'Hair Styling', icon: Star, color: 'from-yellow-500 to-orange-600' },
    { value: 'treatment', label: 'Treatments', icon: Zap, color: 'from-green-500 to-emerald-600' },
    { value: 'special', label: 'Special Events', icon: Award, color: 'from-red-500 to-pink-600' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: TrendingUp },
    { value: 'popular', label: 'Most Popular', icon: Star },
    { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { value: 'rating', label: 'Highest Rated', icon: Star }
  ];

  const quickFilters = [
    { label: 'Popular', value: 'popular', color: 'from-blue-500 to-cyan-600' },
    { label: 'Premium', value: 'premium', color: 'from-purple-500 to-violet-600' },
    { label: 'Quick Service', value: 'quick', color: 'from-green-500 to-emerald-600' },
    { label: 'New', value: 'new', color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Search & Filter Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Find and organize your service offerings</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              showAdvancedFilters 
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Advanced</span>
          </button>
          
          <div className="flex space-x-2">
            <button className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 hover:rotate-12">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 hover:rotate-12">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 hover:rotate-12 relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Search */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse group-focus-within:animate-spin">
            <Search className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search services, categories, prices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-inner hover:shadow-lg focus:scale-105 font-medium"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/20 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white shadow-inner hover:shadow-lg focus:scale-105 font-medium appearance-none cursor-pointer"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700 dark:to-green-900/20 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white shadow-inner hover:shadow-lg focus:scale-105 font-medium appearance-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-yellow-500 animate-pulse" />
          Quick Filters:
        </span>
        {quickFilters.map((filter, index) => (
          <button
            key={filter.value}
            onClick={() => setPriceRange(filter.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-4 duration-1000 ${
              priceRange === filter.value
                ? `bg-gradient-to-r ${filter.color} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/20 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            Advanced Filters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Prices</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="200+">$200+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Durations</option>
                <option value="0-30">0-30 minutes</option>
                <option value="30-60">30-60 minutes</option>
                <option value="60-120">1-2 hours</option>
                <option value="120+">2+ hours</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300">
                <option value="all">All Services</option>
                <option value="active">Active Only</option>
                <option value="popular">Most Popular</option>
                <option value="new">Recently Added</option>
                <option value="premium">Premium Services</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 font-medium">
              Reset Filters
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-600/50">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">12</span> active services with <span className="font-bold text-yellow-600 dark:text-yellow-400">4.9★</span> average rating
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: <span className="font-medium">30 seconds ago</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServicesFilters;