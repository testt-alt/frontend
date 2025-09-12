import React, { useState } from 'react';
import { Appointment } from '../../../types/calendar';
import { Clock, User, Phone, MapPin, Mail, Calendar as CalendarIcon, Star, Eye, Edit, MessageSquare, Video, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Award, Heart, CheckCircle, AlertCircle, XCircle, Plus, Settings, Bell, Camera, Share2, Bookmark } from 'lucide-react';

interface DayViewProps {
  currentDate: Date;
  appointments: Appointment[];
}

const DayView: React.FC<DayViewProps> = ({ currentDate, appointments = [] }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getAppointmentsForHour = (hour: number) => {
    return appointments.filter(appointment => {
      const appointmentDay = appointment.startTime.toDateString();
      const currentDay = currentDate.toDateString();
      const appointmentHour = appointment.startTime.getHours();
      return appointmentDay === currentDay && appointmentHour === hour;
    });
  };

  const isToday = currentDate.toDateString() === new Date().toDateString();
  const currentHour = new Date().getHours();

  const dayAppointments = appointments.filter(apt => 
    apt.startTime.toDateString() === currentDate.toDateString()
  );

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
        return <CheckCircle className="w-4 h-4 text-white" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-white" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-white" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-white" />;
      default:
        return <Clock className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Enhanced Day Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 group">
              <CalendarIcon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
              <div className="flex items-center space-x-4">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {dayAppointments.length} scheduled appointments
                </p>
                {isToday && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                    Today
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Day Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Appointments', value: dayAppointments.length.toString(), icon: CalendarIcon, color: 'from-blue-500 to-cyan-600' },
              { label: 'Hours', value: `${Math.round(dayAppointments.reduce((acc, apt) => acc + (apt.endTime.getTime() - apt.startTime.getTime()) / (1000 * 60 * 60), 0))}h`, icon: Clock, color: 'from-green-500 to-emerald-600' },
              { label: 'Revenue', value: `$${dayAppointments.reduce((acc, apt) => acc + (apt.price || 0), 0)}`, icon: Award, color: 'from-purple-500 to-pink-600' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 group animate-in slide-in-from-right-4 duration-1000"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Schedule */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-4">
        {hours.map((hour) => {
          const hourAppointments = getAppointmentsForHour(hour);
          const isCurrentHour = isToday && hour === currentHour;

          return (
            <div 
              key={hour}
              className={`flex mb-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200/50 dark:border-gray-700/50 ${
                isCurrentHour 
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-blue-300 dark:border-blue-600 shadow-blue-200 dark:shadow-blue-800' 
                  : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20'
              }`}
              onMouseEnter={() => setHoveredHour(hour)}
              onMouseLeave={() => setHoveredHour(null)}
            >
              {/* Time Column */}
              <div className="w-32 p-6 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20">
                <div className={`text-xl font-bold transition-all duration-300 ${
                  isCurrentHour 
                    ? 'text-blue-600 dark:text-blue-400 scale-110' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110'
                }`}>
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {isCurrentHour && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 animate-ping shadow-lg"></div>
                )}
                {hoveredHour === hour && hourAppointments.length === 0 && (
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-110">
                      <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Appointments Column */}
              <div className="flex-1 p-6 min-h-[120px] relative">
                {hourAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {hourAppointments.map((appointment, index) => (
                      <div
                        key={appointment.id}
                        className={`group/appointment p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-l-4 hover:shadow-2xl relative overflow-hidden ${
                          selectedAppointment === appointment.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                        }`}
                        style={{ 
                          backgroundColor: appointment.color + '10',
                          borderLeftColor: appointment.color
                        }}
                        onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
                      >
                        {/* Background Pattern */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/appointment:opacity-20 transition-opacity duration-300 rounded-2xl"
                          style={{ background: `linear-gradient(135deg, ${appointment.color}20, ${appointment.color}40)` }}
                        ></div>

                        <div className="relative">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-4">
                              <div 
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover/appointment:rotate-12 group-hover/appointment:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: appointment.color }}
                              >
                                <Clock className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover/appointment:text-transparent group-hover/appointment:bg-gradient-to-r group-hover/appointment:from-blue-600 group-hover/appointment:to-purple-600 group-hover/appointment:bg-clip-text transition-all duration-300">
                                  {appointment.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">{appointment.service}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-500 dark:text-gray-400">4.9</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                appointment.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {appointment.status === 'confirmed' && <CheckCircle className="w-4 h-4" />}
                                {appointment.status === 'pending' && <AlertCircle className="w-4 h-4" />}
                                {appointment.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                                {appointment.status === 'cancelled' && <XCircle className="w-4 h-4" />}
                                <span className="capitalize">{appointment.status}</span>
                              </div>
                              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2 group-hover/appointment:scale-110 transition-transform duration-300">
                                ${appointment.price || 0}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300 mb-6">
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-300 hover:scale-105 group/item border border-blue-200/50 dark:border-blue-700/50">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Client</p>
                                  <p className="font-bold text-gray-900 dark:text-white text-lg">{appointment.clientName}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 hover:scale-105 group/item border border-purple-200/50 dark:border-purple-700/50">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                                  <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">Duration</p>
                                  <p className="font-bold text-gray-900 dark:text-white text-lg">
                                    {appointment.startTime.toLocaleTimeString('es-ES', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })} - {appointment.endTime.toLocaleTimeString('es-ES', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300 hover:scale-105 group/item border border-green-200/50 dark:border-green-700/50">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                                  <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-xs text-green-600 dark:text-green-400 font-bold">Service</p>
                                  <p className="font-bold text-gray-900 dark:text-white text-lg">{appointment.service}</p>
                                </div>
                              </div>

                              {appointment.clientPhone && (
                                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all duration-300 hover:scale-105 group/item border border-orange-200/50 dark:border-orange-700/50">
                                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                                    <Phone className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">Phone</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{appointment.clientPhone}</p>
                                  </div>
                                </div>
                              )}

                              {appointment.clientEmail && (
                                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-all duration-300 hover:scale-105 group/item border border-indigo-200/50 dark:border-indigo-700/50">
                                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Email</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{appointment.clientEmail}</p>
                                  </div>
                                </div>
                              )}
                              
                              {appointment.location && (
                                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl hover:from-pink-100 hover:to-rose-100 dark:hover:from-pink-900/30 dark:hover:to-rose-900/30 transition-all duration-300 hover:scale-105 group/item border border-pink-200/50 dark:border-pink-700/50">
                                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-transform duration-300">
                                    <MapPin className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-pink-600 dark:text-pink-400 font-bold">Location</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{appointment.location}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4 mb-6 border-l-4 border-yellow-400 shadow-lg">
                              <div className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400 mb-1">Notes</p>
                                  <p className="text-sm text-yellow-800 dark:text-yellow-200">{appointment.notes}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex space-x-3">
                              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-105 font-medium shadow-sm hover:shadow-md">
                                <Eye className="w-4 h-4" />
                                <span>View Details</span>
                              </button>
                              <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-300 hover:scale-105 font-medium shadow-sm hover:shadow-md">
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105 font-medium shadow-sm hover:shadow-md">
                                <MessageSquare className="w-4 h-4" />
                                <span>Message</span>
                              </button>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-110">
                                <Heart className="w-5 h-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110">
                                <Bookmark className="w-5 h-5" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 hover:scale-110">
                                <Share2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
                        <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
                      <span className="text-lg font-bold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">Available Time</span>
                      <p className="text-sm mt-1 group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors duration-300">Click to schedule an appointment</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Time Indicator */}
      {isToday && (
        <div 
          className="absolute left-32 right-4 h-1 bg-gradient-to-r from-red-500 to-pink-600 shadow-lg z-10 rounded-full"
          style={{ 
            top: `${((currentHour + new Date().getMinutes() / 60) / 24) * 100}%`,
            marginTop: '8rem'
          }}
        >
          <div className="absolute -left-2 -top-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg animate-ping"></div>
          <div className="absolute -left-2 -top-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg"></div>
          <div className="absolute -right-2 -top-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default DayView;