import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, Star, TrendingUp, CheckCircle, AlertCircle, XCircle, Eye, Edit, MessageSquare, Video, MoreVertical, Heart, Bookmark, Share2, Award, Zap, Crown, Trophy, Medal, Sparkles, Target, Gift, Rocket } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  clientName: string;
  clientAvatar: string;
  clientEmail?: string;
  clientPhone?: string;
  startTime: Date;
  endTime: Date;
  service: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  location?: string;
  isVip?: boolean;
  rating?: number;
  isRecurring?: boolean;
}

const AppointmentList: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Sample appointments data with enhanced properties
  const sampleAppointments: Appointment[] = [
    {
      id: '1',
      title: 'Premium Hair Cut & Style',
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      clientEmail: 'sarah@email.com',
      clientPhone: '+1-555-0123',
      startTime: new Date(2025, 0, 20, 10, 0),
      endTime: new Date(2025, 0, 20, 11, 30),
      service: 'Hair Cut & Style',
      status: 'confirmed',
      price: 85,
      notes: 'Client prefers layered cut with face-framing highlights',
      location: 'Salon Main Floor',
      isVip: true,
      rating: 5,
      isRecurring: true
    },
    {
      id: '2',
      title: 'Full Color Treatment',
      clientName: 'Michael Chen',
      clientAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      clientEmail: 'michael@email.com',
      clientPhone: '+1-555-0124',
      startTime: new Date(2025, 0, 20, 14, 0),
      endTime: new Date(2025, 0, 20, 17, 0),
      service: 'Color Treatment',
      status: 'pending',
      price: 150,
      notes: 'First time client, consultation needed',
      location: 'Color Station 2',
      isVip: false,
      isRecurring: false
    },
    {
      id: '3',
      title: 'Bridal Hair Package',
      clientName: 'Emma Rodriguez',
      clientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      clientEmail: 'emma@email.com',
      startTime: new Date(2025, 0, 21, 9, 0),
      endTime: new Date(2025, 0, 21, 13, 0),
      service: 'Bridal Package',
      status: 'completed',
      price: 300,
      notes: 'Wedding on Saturday, trial completed',
      location: 'Private Suite',
      isVip: true,
      rating: 5,
      isRecurring: false
    },
    {
      id: '4',
      title: 'Beard Trim & Style',
      clientName: 'David Wilson',
      clientAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      clientPhone: '+1-555-0126',
      startTime: new Date(2025, 0, 21, 15, 30),
      endTime: new Date(2025, 0, 21, 16, 15),
      service: 'Beard Styling',
      status: 'confirmed',
      price: 35,
      notes: 'Regular client, usual style',
      location: 'Grooming Station',
      isVip: false,
      rating: 4,
      isRecurring: true
    },
    {
      id: '5',
      title: 'Keratin Treatment',
      clientName: 'Lisa Thompson',
      clientAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      clientEmail: 'lisa@email.com',
      clientPhone: '+1-555-0127',
      startTime: new Date(2025, 0, 22, 11, 0),
      endTime: new Date(2025, 0, 22, 14, 30),
      service: 'Keratin Treatment',
      status: 'cancelled',
      price: 200,
      notes: 'Rescheduled due to client emergency',
      location: 'Treatment Room',
      isVip: false,
      isRecurring: false
    }
  ];

  const filteredAppointments = sampleAppointments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments List</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your scheduled appointments</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Appointments */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {sampleAppointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000 ${
              selectedAppointment === appointment.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
          >
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${
              appointment.status === 'confirmed' ? 'from-green-500 to-emerald-600' :
              appointment.status === 'pending' ? 'from-yellow-500 to-orange-600' :
              appointment.status === 'completed' ? 'from-blue-500 to-cyan-600' :
              'from-red-500 to-pink-600'
            } text-white relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={appointment.clientAvatar}
                      alt={appointment.clientName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    {appointment.isVip && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Crown className="w-3 h-3 text-yellow-900" />
                      </div>
                    )}
                    {appointment.isRecurring && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <Rocket className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">
                      {appointment.title}
                    </h3>
                    <p className="text-white/80 font-medium">{appointment.clientName}</p>
                    {appointment.rating && (
                      <div className="flex items-center space-x-1 mt-2">
                        {renderStars(appointment.rating)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm`}>
                    {getStatusIcon(appointment.status)}
                    <span className="capitalize">{appointment.status}</span>
                  </div>
                  <div className="text-2xl font-bold mt-2 group-hover:scale-110 transition-transform duration-300">
                    ${appointment.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Time and Date */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 group/item">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-bold text-gray-900 dark:text-white">{formatDate(appointment.startTime)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 group/item">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service and Location */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50">
                  <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400 animate-pulse" />
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Service</p>
                    <p className="font-bold text-gray-900 dark:text-white">{appointment.service}</p>
                  </div>
                </div>
                
                {appointment.location && (
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200/50 dark:border-orange-700/50">
                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-xs text-orange-600 dark:text-orange-400">Location</p>
                      <p className="font-bold text-gray-900 dark:text-white">{appointment.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              {(appointment.clientEmail || appointment.clientPhone) && (
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {appointment.clientEmail && (
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>{appointment.clientEmail}</span>
                    </div>
                  )}
                  {appointment.clientPhone && (
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>{appointment.clientPhone}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {appointment.notes && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 mb-6 border-l-4 border-yellow-400">
                  <div className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 mb-1">Notes</p>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">{appointment.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Video className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Bookmark className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <MoreVertical className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sampleAppointments.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No appointments found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Try adjusting your search criteria or create a new appointment to get started.
          </p>
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Calendar className="w-5 h-5" />
            <span className="font-bold">Schedule New Appointment</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;