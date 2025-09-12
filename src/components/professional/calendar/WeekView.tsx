import React, { useState } from 'react';
import { Appointment } from '../../../types/calendar';
import { Clock, User, MapPin, Phone, Mail, Calendar, Star, Eye, Edit, MessageSquare, Video, Crown, Trophy, Medal, Flame, Sparkles, Zap, Target, Award, Heart, CheckCircle, AlertCircle, XCircle, Plus, Settings, Bell } from 'lucide-react';

interface WeekViewProps {
  currentDate: Date;
  appointments: Appointment[];
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, appointments = [] }) => {
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getAppointmentsForDayAndHour = (day: Date, hour: number) => {
    return appointments.filter(appointment => {
      const appointmentDay = appointment.startTime.toDateString();
      const dayString = day.toDateString();
      const appointmentHour = appointment.startTime.getHours();
      return appointmentDay === dayString && appointmentHour === hour;
    });
  };

  const isToday = (day: Date) => {
    return day.toDateString() === new Date().toDateString();
  };

  const getCurrentHour = () => {
    return new Date().getHours();
  };

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

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-8 gap-2">
          {/* Time Column Header */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Day Headers */}
          {weekDays.map((day, index) => {
            const dayAppointments = appointments.filter(apt => 
              apt.startTime.toDateString() === day.toDateString()
            );
            
            return (
              <div 
                key={day.toISOString()} 
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 text-center rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 group animate-in slide-in-from-top-4 duration-1000 ${
                  isToday(day) ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-blue-300 dark:border-blue-600' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex flex-col items-center ${isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  <span className="text-sm font-bold tracking-wide mb-2">{weekDayNames[index]}</span>
                  <div className={`text-lg font-bold transition-all duration-300 ${
                    isToday(day) 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-pulse transform scale-110' 
                      : 'w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110'
                  }`}>
                    {day.getDate()}
                  </div>
                  {dayAppointments.length > 0 && (
                    <div className="mt-2 flex items-center space-x-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse ${
                        dayAppointments.length > 3 ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                        dayAppointments.length > 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                        'bg-gradient-to-r from-green-500 to-emerald-600'
                      }`}>
                        {dayAppointments.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Time Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
        <div className="grid grid-cols-8 gap-1 p-2">
          {hours.map((hour) => {
            const currentHour = getCurrentHour();
            const isCurrentHour = isToday(weekDays[0]) && hour === currentHour;
            
            return (
              <React.Fragment key={hour}>
                {/* Time Column */}
                <div 
                  className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center justify-center min-h-[100px] transition-all duration-300 hover:shadow-xl hover:scale-105 group ${
                    isCurrentHour ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-blue-300 dark:border-blue-600' : ''
                  }`}
                  onMouseEnter={() => setHoveredHour(hour)}
                  onMouseLeave={() => setHoveredHour(null)}
                >
                  <div className={`text-lg font-bold transition-all duration-300 ${
                    isCurrentHour 
                      ? 'text-blue-600 dark:text-blue-400 scale-110' 
                      : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110'
                  }`}>
                    {hour.toString().padStart(2, '0')}:00
                  </div>
                  {isCurrentHour && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 animate-ping shadow-lg"></div>
                  )}
                  {hoveredHour === hour && (
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Plus className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                </div>
                
                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => {
                  const hourAppointments = getAppointmentsForDayAndHour(day, hour);
                  const isCurrentDay = isToday(day);
                  
                  return (
                    <div 
                      key={`${day.toISOString()}-${hour}`}
                      className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 min-h-[100px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 group relative overflow-hidden ${
                        isCurrentDay && isCurrentHour 
                          ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-blue-300 dark:border-blue-600' 
                          : 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:border-blue-200 dark:hover:border-blue-600 hover:scale-105'
                      }`}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 rounded-full -translate-y-8 translate-x-8"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-500 rounded-full translate-y-6 -translate-x-6"></div>
                      </div>

                      {hourAppointments.map((appointment, aptIndex) => (
                        <div
                          key={appointment.id}
                          className={`group/appointment p-3 rounded-xl text-xs font-medium mb-2 transform hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-l-4 relative overflow-hidden ${
                            selectedAppointment === appointment.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                          }`}
                          style={{ 
                            backgroundColor: appointment.color + '20',
                            borderLeftColor: appointment.color
                          }}
                          onClick={() => setSelectedAppointment(selectedAppointment === appointment.id ? null : appointment.id)}
                        >
                          {/* Appointment Background Gradient */}
                          <div 
                            className="absolute inset-0 opacity-0 group-hover/appointment:opacity-30 transition-opacity duration-300 rounded-xl"
                            style={{ background: `linear-gradient(135deg, ${appointment.color}30, ${appointment.color}60)` }}
                          ></div>
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${getStatusColor(appointment.status)}`}>
                                  {getStatusIcon(appointment.status)}
                                </div>
                                <span className="font-bold text-xs" style={{ color: appointment.color }}>
                                  {appointment.startTime.toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: false
                                  })}
                                </span>
                              </div>
                              <div className="opacity-0 group-hover/appointment:opacity-100 transition-opacity duration-300 flex space-x-1">
                                <button className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-all duration-200">
                                  <Eye className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                </button>
                                <button className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-all duration-200">
                                  <Edit className="w-3 h-3 text-green-600 dark:text-green-400" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="font-bold text-gray-800 dark:text-gray-200 truncate group-hover/appointment:text-gray-900 dark:group-hover/appointment:text-white mb-1 transition-colors duration-300">
                              {appointment.title}
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                <User className="w-2 h-2 text-white" />
                              </div>
                              <span className="truncate text-gray-600 dark:text-gray-400 group-hover/appointment:text-gray-700 dark:group-hover/appointment:text-gray-300 transition-colors duration-300">
                                {appointment.clientName}
                              </span>
                            </div>
                            
                            <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                              {appointment.service}
                            </div>
                            
                            {appointment.location && (
                              <div className="flex items-center space-x-1 mt-1">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-500 dark:text-gray-400 text-xs truncate">
                                  {appointment.location}
                                </span>
                              </div>
                            )}

                            {/* Quick Actions */}
                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-600/50 opacity-0 group-hover/appointment:opacity-100 transition-opacity duration-300">
                              <div className="flex space-x-1">
                                <button className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-all duration-200 hover:scale-110">
                                  <MessageSquare className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                </button>
                                <button className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-all duration-200 hover:scale-110">
                                  <Phone className="w-3 h-3 text-green-600 dark:text-green-400" />
                                </button>
                                <button className="p-1 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-md transition-all duration-200 hover:scale-110">
                                  <Video className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                </button>
                              </div>
                              <div className="text-xs font-bold" style={{ color: appointment.color }}>
                                ${appointment.price || 0}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {hourAppointments.length === 0 && (
                        <div className="flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-all duration-300 shadow-sm hover:shadow-lg">
                              <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                            </div>
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                              Disponible
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Current Time Indicator */}
      {weekDays.some(day => isToday(day)) && (
        <div 
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-600 shadow-lg z-10 animate-pulse"
          style={{ 
            top: `${((getCurrentHour() + new Date().getMinutes() / 60) / 24) * 100}%`,
            marginLeft: '8.5rem'
          }}
        >
          <div className="absolute -left-2 -top-2 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg animate-ping"></div>
          <div className="absolute -left-2 -top-2 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-lg"></div>
        </div>
      )}
    </div>
  );
};

export default WeekView;