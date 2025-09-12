import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, Star, Filter, Grid, List, ChevronDown, Search, MoreHorizontal, Edit, Trash2, MessageCircle } from 'lucide-react';

const AppointmentsList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const appointments = [
    {
      id: 1,
      professional: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      date: '2024-12-25',
      time: '2:00 PM',
      type: 'Video Call',
      location: 'Online',
      status: 'completed',
      duration: '45 min',
      rating: 5,
      cost: '$180',
      avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      notes: 'Regular checkup - everything looks good',
      canReview: true,
      canRebook: true
    },
    {
      id: 2,
      professional: 'James Rodriguez',
      specialty: 'Corporate Lawyer',
      date: '2024-12-26',
      time: '10:00 AM',
      type: 'In Person',
      location: 'Downtown Office',
      status: 'upcoming',
      duration: '60 min',
      cost: '$250',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      notes: 'Contract review meeting',
      canReview: false,
      canRebook: true
    },
    {
      id: 3,
      professional: 'Dr. Emily Chen',
      specialty: 'Clinical Psychologist',
      date: '2024-12-28',
      time: '3:30 PM',
      type: 'Phone Call',
      location: 'Remote',
      status: 'pending',
      duration: '50 min',
      cost: '$120',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      notes: 'Follow-up therapy session',
      canReview: false,
      canRebook: true
    },
    {
      id: 4,
      professional: 'Michael Thompson',
      specialty: 'Financial Advisor',
      date: '2024-12-20',
      time: '4:00 PM',
      type: 'Video Call',
      location: 'Online',
      status: 'completed',
      duration: '30 min',
      rating: 4,
      cost: '$140',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      notes: 'Investment portfolio review',
      canReview: true,
      canRebook: true
    },
    {
      id: 5,
      professional: 'Lisa Anderson',
      specialty: 'Business Consultant',
      date: '2024-12-15',
      time: '2:00 PM',
      type: 'In Person',
      location: 'Miami Office',
      status: 'cancelled',
      duration: '45 min',
      cost: '$200',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      notes: 'Strategy consultation - rescheduled',
      canReview: false,
      canRebook: true
    },
    {
      id: 6,
      professional: 'Prof. David Kim',
      specialty: 'Math Tutor',
      date: '2024-12-22',
      time: '6:00 PM',
      type: 'Video Call',
      location: 'Online',
      status: 'completed',
      duration: '60 min',
      rating: 5,
      cost: '$85',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      notes: 'Calculus tutoring session',
      canReview: true,
      canRebook: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return Video;
      case 'Phone Call':
        return Phone;
      default:
        return MapPin;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'professional':
        return a.professional.localeCompare(b.professional);
      case 'cost':
        return parseInt(b.cost.replace('$', '')) - parseInt(a.cost.replace('$', ''));
      default:
        return 0;
    }
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Appointment
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> History</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Review all your past and upcoming appointments in one place
          </p>
        </div>

        {/* Filters and controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up animation-delay-300">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Status filter */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  <option value="date">Sort by Date</option>
                  <option value="professional">Sort by Professional</option>
                  <option value="cost">Sort by Cost</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 shadow-md'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 shadow-md'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {sortedAppointments.length} of {appointments.length} appointments
          </p>
        </div>

        {/* Appointments grid/list */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {sortedAppointments.map((appointment, index) => {
            const TypeIcon = getTypeIcon(appointment.type);
            
            return (
              <div
                key={appointment.id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up ${
                  viewMode === 'list' ? 'flex items-center space-x-6' : ''
                } relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Professional image and basic info */}
                <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'} relative z-10`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={appointment.avatar}
                          alt={appointment.professional}
                          className={`rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-300 ${
                            viewMode === 'list' ? 'h-16 w-16' : 'h-20 w-20'
                          }`}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {appointment.professional}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="relative">
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                          <MoreHorizontal className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`${viewMode === 'list' ? 'flex-1' : ''} relative z-10`}>
                  {/* Status and date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)} capitalize`}>
                      {appointment.status}
                    </span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {appointment.cost}
                    </span>
                  </div>

                  {/* Appointment details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(appointment.date)} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                        <TypeIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {appointment.type}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                        <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Duration: {appointment.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating (for completed appointments) */}
                  {appointment.status === 'completed' && appointment.rating && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Your rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < appointment.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {appointment.notes && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                        {appointment.notes}
                      </p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className={`flex ${viewMode === 'list' ? 'space-x-3' : 'flex-col space-y-2'}`}>
                    {appointment.canRebook && (
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm">
                        Book Again
                      </button>
                    )}
                    
                    {appointment.canReview && (
                      <button className="flex-1 bg-yellow-100 dark:bg-yellow-900/20 hover:bg-yellow-200 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm">
                        <Star className="h-4 w-4 inline mr-1" />
                        Review
                      </button>
                    )}
                    
                    <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm">
                      <MessageCircle className="h-4 w-4 inline mr-1" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {sortedAppointments.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <Calendar className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No appointments found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Try adjusting your filters or book your first appointment
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Book New Appointment
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppointmentsList;