import React, { useState } from 'react';
import { Filter, Calendar, DollarSign, CreditCard, ChevronDown, X, RefreshCw, SlidersHorizontal } from 'lucide-react';

const PaymentsFilters: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    amountRange: [0, 1000],
    paymentMethod: 'all',
    status: 'all',
    professional: 'all',
    sortBy: 'newest'
  });

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const paymentMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'visa', label: 'Visa ****1234' },
    { value: 'mastercard', label: 'Mastercard ****5678' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Amount' },
    { value: 'lowest', label: 'Lowest Amount' },
    { value: 'professional', label: 'By Professional' }
  ];

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update active filters for visual feedback
    if (key === 'dateRange' && value !== 'all') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('date:')), `date:${dateRangeOptions.find(o => o.value === value)?.label}`]);
    } else if (key === 'paymentMethod' && value !== 'all') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('method:')), `method:${paymentMethodOptions.find(o => o.value === value)?.label}`]);
    } else if (key === 'status' && value !== 'all') {
      setActiveFilters(prev => [...prev.filter(f => !f.startsWith('status:')), `status:${statusOptions.find(o => o.value === value)?.label}`]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const [type] = filterToRemove.split(':');
    
    switch (type) {
      case 'date':
        updateFilter('dateRange', 'all');
        break;
      case 'method':
        updateFilter('paymentMethod', 'all');
        break;
      case 'status':
        updateFilter('status', 'all');
        break;
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: 'all',
      amountRange: [0, 1000],
      paymentMethod: 'all',
      status: 'all',
      professional: 'all',
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
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg group"
              >
                <SlidersHorizontal className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                <span>Advanced Filters</span>
                {activeFilters.length > 0 && (
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    {activeFilters.length}
                  </span>
                )}
              </button>

              {/* Quick Amount Filter */}
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value)}
                  className="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                >
                  {statusOptions.map((option) => (
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
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 hover:shadow-lg"
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
                  className="flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 px-3 py-2 rounded-full text-sm font-medium animate-fade-in-up hover:bg-emerald-200 dark:hover:bg-emerald-900/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span>{filter.split(':')[1]}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-full p-1 transition-colors group-hover:scale-110"
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
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Date Range Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                  Date Range
                </h3>
                <div className="space-y-2">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('dateRange', option.value)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.dateRange === option.value
                          ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-teal-600" />
                  Payment Method
                </h3>
                <div className="space-y-2">
                  {paymentMethodOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('paymentMethod', option.value)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.paymentMethod === option.value
                          ? 'bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-cyan-600" />
                  Amount Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">$0</span>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.amountRange[1]}
                      onChange={(e) => updateFilter('amountRange', [0, parseInt(e.target.value)])}
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">$1000+</span>
                  </div>
                  <div className="text-center">
                    <span className="bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                      Up to ${filters.amountRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-purple-600" />
                  Status
                </h3>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFilter('status', option.value)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        filters.status === option.value
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'
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
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Showing 18 payments
            </span>
            {activeFilters.length > 0 && (
              <span className="text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} applied
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsFilters;