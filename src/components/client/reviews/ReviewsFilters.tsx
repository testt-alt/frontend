import React, { useState } from 'react';
import { Filter, Star, Calendar, User, ChevronDown, SlidersHorizontal, X, RefreshCw } from 'lucide-react';

const ReviewsFilters: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    rating: 0,
    dateRange: 'all',
    professional: 'all',
    category: 'all',
    sortBy: 'newest'
  });

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'legal', label: 'Legal' },
    { value: 'finance', label: 'Finance' },
    { value: 'therapy', label: 'Therapy' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'education', label: 'Education' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update active filters for visual feedback
    if (key === 'rating' && value > 0) {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('rating:')), `rating:${value}+ stars`]);
    } else if (key === 'dateRange' && value !== 'all') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('date:')), `date:${dateRangeOptions.find(o => o.value === value)?.label}`]);
    } else if (key === 'category' && value !== 'all') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('category:')), `category:${categoryOptions.find(o => o.value === value)?.label}`]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const [type] = filterToRemove.split(':');
    
    switch (type) {
      case 'rating':
        updateFilter('rating', 0);
        break;
      case 'date':
        updateFilter('dateRange', 'all');
        break;
      case 'category':
        updateFilter('category', 'all');
        break;
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  const clearAllFilters = () => {
    setFilters({
      rating: 0,
      dateRange: 'all',
      professional: 'all',
      category: 'all',
      sortBy: 'newest'
    });
    setActiveFilters([]);
  };

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Filter Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group"
              >
                <SlidersHorizontal className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                <span>Advanced Filters</span>
                {activeFilters.length > 0 && (
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              {/* Quick Rating Filter */}
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <select
                  value={filters.rating}
                  onChange={(e) => updateFilter('rating', parseInt(e.target.value))}
                  className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                >
                  {ratingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-lg"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mb-6 animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <div
                  key={filter}
                  className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-3 py-2 rounded-full text-sm font-medium animate-fade-in-up hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{filter.split(':')[1]}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-1 transition-colors group-hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium hover:scale-105 transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Clear all</span>
              </button>
            </div>
          </div>
        )}

        {/* Advanced Filters Panel */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Date Range Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Date Range
                </h3>
                <div className="space-y-2">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('dateRange', option.value)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.dateRange === option.value
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-pink-600" />
                  Category
                </h3>
                <div className="space-y-2">
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('category', option.value)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.category === option.value
                          ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Rating Distribution
                </h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${rating * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{rating * 2}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Showing 18 reviews
            </span>
            {activeFilters.length > 0 && (
              <span className="text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} applied
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsFilters;