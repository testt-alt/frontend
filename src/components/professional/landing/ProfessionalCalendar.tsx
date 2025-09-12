import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';

const ProfessionalCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');

  const appointments = [
    {
      id: 1,
      time: '09:00',
      client: 'Maria Gonzalez',
      service: 'General Consultation',
      duration: '60 min',
      location: 'Office 1'
    },
    {
      id: 2,
      time: '11:30',
      client: 'Carlos Rivera',
      service: 'Routine Check-up',
      duration: '45 min',
      location: 'Office 2'
    },
    {
      id: 3,
      time: '14:00',
      client: 'Ana Martinez',
      service: 'Specialized Therapy',
      duration: '90 min',
      location: 'Therapy Room'
    },
    {
      id: 4,
      time: '16:30',
      client: 'Roberto Lopez',
      service: 'Follow-up Consultation',
      duration: '30 min',
      location: 'Office 1'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
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
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const hasAppointments = (date: Date) => {
    // Simulate some appointments on different days
    const day = date.getDate();
    return [5, 12, 18, 25].includes(day);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    if (viewMode === 'month') {
      navigateMonth(direction);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
      setSelectedDate(newDate);
    }
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <section id="calendar" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Calendar
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {viewMode === 'day' ? 'Appointment view for selected day' : 'Select a day of the month'} - Google Calendar Integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-1 flex">
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'day'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      viewMode === 'month'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateDate('prev')}
                  className="p-2 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                  {viewMode === 'day' 
                    ? formatDate(selectedDate)
                    : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  }
                </h3>
                
                <button
                  onClick={() => navigateDate('next')}
                  className="p-2 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {viewMode === 'day' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {selectedDate.getDate()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {appointments.length} scheduled appointments
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((date, index) => (
                      <div key={index} className="aspect-square">
                        {date ? (
                          <button
                            onClick={() => selectDate(date)}
                            className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 relative ${
                              isToday(date)
                                ? 'bg-blue-500 text-white shadow-md'
                                : isSameDay(date, selectedDate)
                                ? 'bg-purple-500 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
                            }`}
                          >
                            {date.getDate()}
                            {hasAppointments(date) && (
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
                            )}
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === 'day' && (
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Day Summary
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Total appointments:</span>
                      <span className="font-medium">{appointments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Busy time:</span>
                      <span className="font-medium">4.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next appointment:</span>
                      <span className="font-medium">09:00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            {viewMode === 'month' ? (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center">
                <CalendarIcon className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Select a day
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Click on any day in the calendar to see scheduled appointments for that date.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>With appointments</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-right-4 duration-700"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Clock className="h-8 w-8 text-white" />
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {appointment.time}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {appointment.duration}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium mb-2">
                            Confirmada
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {appointment.client}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {appointment.service}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {appointment.location}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                    View Full Calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalCalendar;