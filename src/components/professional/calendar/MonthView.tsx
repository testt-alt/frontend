import React, { useState, useMemo } from 'react';
import { Appointment } from '../../../types/calendar';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, User, Star, Eye, Edit, MessageSquare, Video, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Award, Heart, CheckCircle, AlertCircle, XCircle, MapPin, Phone, Mail, Settings, Bell, Filter, Search, Download, Share2, Bookmark, ThumbsUp, Gift, Rocket, Diamond } from 'lucide-react';

interface MonthViewProps {
  currentDate: Date;
  appointments: Appointment[];
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, appointments = [] }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [viewMode, setViewMode] = useState<'calendar' | 'agenda'>('calendar');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }, [currentDate]);

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => 
      appointment.startTime.toDateString() === date.toDateString()
    );
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // Get status color for appointments
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-3 h-3 text-white" />;
      case 'pending':
        return <AlertCircle className="w-3 h-3 text-white" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-white" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3 text-white" />;
      default:
        return <Clock className="w-3 h-3 text-white" />;
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dayAppointments = getAppointmentsForDate(date);
    if (dayAppointments.length > 0) {
      setSelectedAppointment(dayAppointments[0]);
      setShowAppointmentDetails(true);
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get month statistics
  const monthStats = useMemo(() => {
    const monthAppointments = appointments.filter(apt => 
      apt.startTime.getMonth() === currentDate.getMonth() &&
      apt.startTime.getFullYear() === currentDate.getFullYear()
    );

    return {
      total: monthAppointments.length,
      confirmed: monthAppointments.filter(apt => apt.status === 'confirmed').length,
      pending: monthAppointments.filter(apt => apt.status === 'pending').length,
      completed: monthAppointments.filter(apt => apt.status === 'completed').length,
      revenue: monthAppointments.reduce((sum, apt) => sum + (apt.price || 0), 0)
    };
  }, [appointments, currentDate]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      {/* Enhanced Month Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-white p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-12 group">
                <Calendar className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <p className="text-blue-100 text-lg">
                  Complete monthly view of your professional schedule
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'calendar'
                      ? 'bg-white/30 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/20'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setViewMode('agenda')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'agenda'
                      ? 'bg-white/30 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/20'
                  }`}
                >
                  Agenda
                </button>
              </div>
            </div>
          </div>

          {/* Month Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Appointments', value: monthStats.total.toString(), icon: Calendar, color: 'bg-white/20' },
              { label: 'Confirmed', value: monthStats.confirmed.toString(), icon: CheckCircle, color: 'bg-green-500/30' },
              { label: 'Pending', value: monthStats.pending.toString(), icon: AlertCircle, color: 'bg-yellow-500/30' },
              { label: 'Completed', value: monthStats.completed.toString(), icon: Trophy, color: 'bg-blue-500/30' },
              { label: 'Revenue', value: `$${monthStats.revenue}`, icon: Award, color: 'bg-purple-500/30' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${stat.color} backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="flex-1 p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day, index) => (
              <div 
                key={day} 
                className="text-center py-4 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900/30 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-600/50 animate-in slide-in-from-top-4 duration-1000"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{day}</div>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 flex-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return (
                  <div 
                    key={`empty-${index}`} 
                    className="aspect-square bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/30 dark:border-gray-700/30"
                  />
                );
              }

              const dayAppointments = getAppointmentsForDate(date);
              const isCurrentDay = isToday(date);
              const isSelectedDay = isSelected(date);
              const isHovered = hoveredDate && date.toDateString() === hoveredDate.toDateString();

              return (
                <div
                  key={date.toISOString()}
                  className={`aspect-square p-2 rounded-2xl border-2 transition-all duration-300 cursor-pointer group relative overflow-hidden animate-in slide-in-from-bottom-4 duration-1000 ${
                    isCurrentDay
                      ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-800'
                      : isSelectedDay
                        ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-purple-400 dark:border-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-800'
                        : isHovered
                          ? 'bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900/30 border-blue-300 dark:border-blue-600 shadow-lg'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-blue-900/20'
                  } hover:scale-105 hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 20}ms` }}
                  onClick={() => handleDateClick(date)}
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {/* Background Gradient Animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Date Number */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-lg font-bold transition-all duration-300 ${
                        isCurrentDay 
                          ? 'text-blue-600 dark:text-blue-400 scale-110' 
                          : isSelectedDay
                            ? 'text-purple-600 dark:text-purple-400 scale-110'
                            : 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110'
                      }`}>
                        {date.getDate()}
                      </span>
                      
                      {/* Day Indicators */}
                      <div className="flex space-x-1">
                        {isCurrentDay && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping shadow-lg"></div>
                        )}
                        {dayAppointments.length > 0 && (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse ${
                            dayAppointments.length > 3 ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                            dayAppointments.length > 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                            'bg-gradient-to-r from-green-500 to-emerald-600'
                          }`}>
                            {dayAppointments.length}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Appointments Preview */}
                    <div className="flex-1 space-y-1">
                      {dayAppointments.slice(0, 3).map((appointment, aptIndex) => (
                        <div
                          key={appointment.id}
                          className={`p-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105 border-l-4 shadow-sm hover:shadow-md group/apt relative overflow-hidden ${getStatusColor(appointment.status)}/20 border-l-4`}
                          style={{ borderLeftColor: appointment.color || '#3B82F6' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAppointmentClick(appointment);
                          }}
                        >
                          {/* Appointment Background Gradient */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover/apt:opacity-30 transition-opacity duration-300 rounded-xl"
                            style={{ background: `linear-gradient(135deg, ${appointment.color || '#3B82F6'}20, ${appointment.color || '#3B82F6'}40)` }}
                          ></div>
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-gray-800 dark:text-gray-200 truncate group-hover/apt:text-gray-900 dark:group-hover/apt:text-white transition-colors duration-300">
                                {formatTime(appointment.startTime)}
                              </span>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${getStatusColor(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                              </div>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 truncate group-hover/apt:text-gray-700 dark:group-hover/apt:text-gray-300 transition-colors duration-300">
                              {appointment.title}
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-500 dark:text-gray-400 truncate text-xs">
                                {appointment.clientName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {dayAppointments.length > 3 && (
                        <div className="text-center py-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            +{dayAppointments.length - 3} más
                          </span>
                        </div>
                      )}
                      
                      {dayAppointments.length === 0 && (isHovered || isSelected) && (
                        <div className="flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-110 group/add">
                            <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/add:rotate-90 transition-transform duration-300" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Agenda View */
        <div className="flex-1 p-6">
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {appointments
              .filter(apt => 
                apt.startTime.getMonth() === currentDate.getMonth() &&
                apt.startTime.getFullYear() === currentDate.getFullYear()
              )
              .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
              .map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer animate-in slide-in-from-right-4 duration-1000"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: appointment.color || '#3B82F6' }}
                      >
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                          {appointment.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{appointment.clientName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {formatDate(appointment.startTime)} • {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {getStatusIcon(appointment.status)}
                        <span className="capitalize">{appointment.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showAppointmentDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-500">
            {/* Modal Header */}
            <div 
              className="p-8 text-white relative overflow-hidden rounded-t-3xl"
              style={{ background: `linear-gradient(135deg, ${selectedAppointment.color || '#3B82F6'}, ${selectedAppointment.color || '#3B82F6'}CC)` }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative flex items-start justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedAppointment.title}</h3>
                  <p className="text-white/90 text-lg">{selectedAppointment.service}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{formatDate(selectedAppointment.startTime)}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {formatTime(selectedAppointment.startTime)} - {formatTime(selectedAppointment.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowAppointmentDetails(false)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-90"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">Cliente</p>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">{selectedAppointment.clientName}</p>
                    </div>
                  </div>

                  {selectedAppointment.clientEmail && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-green-600 dark:text-green-400 font-bold">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.clientEmail}</p>
                      </div>
                    </div>
                  )}

                  {selectedAppointment.clientPhone && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-bold">Teléfono</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.clientPhone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200/50 dark:border-orange-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600 dark:text-orange-400 font-bold">Status</p>
                      <p className="font-bold text-gray-900 dark:text-white text-lg capitalize">{selectedAppointment.status}</p>
                    </div>
                  </div>

                  {selectedAppointment.location && (
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-700/50">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">Location</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 font-bold">Price</p>
                      <p className="font-bold text-gray-900 dark:text-white text-2xl">${selectedAppointment.price || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-2xl p-6 mb-8 border border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Notes</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                  <Eye className="w-5 h-5" />
                  <span>View Details</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                  <Edit className="w-5 h-5" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                  <MessageSquare className="w-5 h-5" />
                  <span>Message</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
                  <Video className="w-5 h-5" />
                  <span>Video Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-ping"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Cancelled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full shadow-lg"></div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthView;