import React, { useState } from 'react';
import { Search, MapPin, Filter, X, ChevronDown, Star, DollarSign, Clock, Calendar, Users, Award, Zap, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface FilterState {
  searchTerm: string;
  location: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  availability: string;
  experience: string;
  consultationType: string[];
  languages: string[];
  sortBy: string;
}

const SearchFilters: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    location: '',
    category: 'all',
    priceRange: [0, 500],
    rating: 0,
    availability: 'any',
    experience: 'any',
    consultationType: [],
    languages: [],
    sortBy: 'rating'
  });

  const categories = [
    { value: 'all', label: 'All Categories', icon: Users },
    { value: 'healthcare', label: 'Healthcare', icon: Award },
    { value: 'legal', label: 'Legal', icon: Users },
    { value: 'finance', label: 'Finance', icon: DollarSign },
    { value: 'therapy', label: 'Therapy', icon: Users },
    { value: 'consulting', label: 'Consulting', icon: Users },
    { value: 'education', label: 'Education', icon: Users }
  ];

  const availabilityOptions = [
    { value: 'any', label: 'Any Time' },
    { value: 'now', label: 'Available Now' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'week', label: 'This Week' }
  ];

  const experienceOptions = [
    { value: 'any', label: 'Any Experience' },
    { value: '1-5', label: '1-5 Years' },
    { value: '5-10', label: '5-10 Years' },
    { value: '10-15', label: '10-15 Years' },
    { value: '15+', label: '15+ Years' }
  ];

  const consultationTypes = [
    { value: 'video', label: 'Video Call', icon: '📹' },
    { value: 'phone', label: 'Phone Call', icon: '📞' },
    { value: 'inperson', label: 'In Person', icon: '🏢' },
    { value: 'chat', label: 'Chat', icon: '💬' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'portuguese', label: 'Portuguese' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated', icon: Star },
    { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { value: 'availability', label: 'Availability', icon: Clock },
    { value: 'experience', label: 'Most Experienced', icon: Award },
    { value: 'reviews', label: 'Most Reviews', icon: Users }
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update active filters for visual feedback
    if (key === 'category' && value !== 'all') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('category:')), `category:${value}`]);
    } else if (key === 'rating' && value > 0) {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('rating:')), `rating:${value}+`]);
    } else if (key === 'availability' && value !== 'any') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('availability:')), `availability:${value}`]);
    } else if (key === 'experience' && value !== 'any') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('experience:')), `experience:${value}`]);
    }
  };

  const toggleConsultationType = (type: string) => {
    const newTypes = filters.consultationType.includes(type)
      ? filters.consultationType.filter(t => t !== type)
      : [...filters.consultationType, type];
    
    updateFilter('consultationType', newTypes);
    
    if (newTypes.length > 0) {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('consultation:')), `consultation:${newTypes.length} types`]);
    } else {
      setActiveFilters(prev => prev.filter(f => !f.startsWith('consultation:')));
    }
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...filters.languages, language];
    
    updateFilter('languages', newLanguages);
    
    if (newLanguages.length > 0) {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('languages:')), `languages:${newLanguages.length} selected`]);
    } else {
      setActiveFilters(prev => prev.filter(f => !f.startsWith('languages:')));
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const [type] = filterToRemove.split(':');
    
    switch (type) {
      case 'category':
        updateFilter('category', 'all');
        break;
      case 'rating':
        updateFilter('rating', 0);
        break;
      case 'availability':
        updateFilter('availability', 'any');
        break;
      case 'experience':
        updateFilter('experience', 'any');
        break;
      case 'consultation':
        updateFilter('consultationType', []);
        break;
      case 'languages':
        updateFilter('languages', []);
        break;
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      location: '',
      category: 'all',
      priceRange: [0, 500],
      rating: 0,
      availability: 'any',
      experience: 'any',
      consultationType: [],
      languages: [],
      sortBy: 'rating'
    });
    setActiveFilters([]);
  };

  const getResultsCount = () => {
    // Simulated results count based on filters
    let baseCount = 1247;
    if (filters.category !== 'all') baseCount = Math.floor(baseCount * 0.3);
    if (filters.rating > 0) baseCount = Math.floor(baseCount * 0.7);
    if (filters.availability !== 'any') baseCount = Math.floor(baseCount * 0.5);
    return Math.max(baseCount, 12);
  };

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search professionals, specialties, or services..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg hover:shadow-lg"
              />
            </div>

            {/* Location Input */}
            <div className="relative lg:w-64 group">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg hover:shadow-lg"
              />
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group"
            >
              <SlidersHorizontal className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              <span>Filters</span>
              {activeFilters.length > 0 && (
                <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Search Button */}
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group">
              <Search className="h-5 w-5 inline mr-2 group-hover:scale-110 transition-transform" />
              Search
            </button>
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
                  className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-2 rounded-full text-sm font-medium animate-fade-in-up hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{filter.split(':')[1]}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-1 transition-colors group-hover:scale-110"
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
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Category Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Category
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => updateFilter('category', category.value)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.category === category.value
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating & Price */}
              <div className="space-y-6">
                {/* Rating Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Minimum Rating
                  </h3>
                  <div className="flex space-x-2">
                    {[0, 3, 4, 4.5, 4.8].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => updateFilter('rating', rating)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                          filters.rating === rating
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{rating === 0 ? 'Any' : `${rating}+`}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">$0</span>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={filters.priceRange[1]}
                        onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">$500+</span>
                    </div>
                    <div className="text-center">
                      <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                        Up to ${filters.priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability & Experience */}
              <div className="space-y-6">
                {/* Availability */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-purple-600" />
                    Availability
                  </h3>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFilter('availability', option.value)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                          filters.availability === option.value
                            ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                    <Award className="h-5 w-5 mr-2 text-orange-600" />
                    Experience
                  </h3>
                  <div className="space-y-2">
                    {experienceOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFilter('experience', option.value)}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                          filters.experience === option.value
                            ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Types */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                <Zap className="h-5 w-5 mr-2 text-cyan-600" />
                Consultation Types
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {consultationTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => toggleConsultationType(type.value)}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      filters.consultationType.includes(type.value)
                        ? 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
                <Users className="h-5 w-5 mr-2 text-indigo-600" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((language) => (
                  <button
                    key={language.value}
                    onClick={() => toggleLanguage(language.value)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      filters.languages.includes(language.value)
                        ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {getResultsCount().toLocaleString()} professionals found
            </span>
            {activeFilters.length > 0 && (
              <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} applied
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg"
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
    </section>
  );
};

export default SearchFilters;