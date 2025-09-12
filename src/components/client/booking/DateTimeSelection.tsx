import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { BookingData } from './BookingPage';

interface DateTimeSelectionProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const [selectedDate, setSelectedDate] = useState(data.dateTime?.date || '');
  const [selectedTime, setSelectedTime] = useState(data.dateTime?.time || '');
  const [selectedTimezone, setSelectedTimezone] = useState(data.dateTime?.timezone || 'America/New_York');
  const [currentWeek, setCurrentWeek] = useState(0);

  // Generate calendar dates
  const generateWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates(currentWeek);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Generate availability data dynamically based on current dates
  const generateAvailabilityData = () => {
    const availability: { [key: string]: { available: boolean; slots: string[] } } = {};
    const today = new Date();
    
    // Generate availability for the next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = formatDate(date);
      
      // Skip weekends for some variety
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      if (isWeekend) {
        availability[dateStr] = { available: false, slots: [] };
      } else {
        // Generate random available slots
        const slots = ['09:00', '10:30', '11:00', '14:00', '15:30', '16:00', '16:30'];
        const availableSlots = slots.filter(() => Math.random() > 0.3); // Random availability
        availability[dateStr] = { 
          available: availableSlots.length > 0, 
          slots: availableSlots 
        };
      }
    }
    
    return availability;
  };
  
  const availabilityData = generateAvailabilityData();

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' }
  ];

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDayAvailability = (date: Date) => {
    const dateStr = formatDate(date);
    return availabilityData[dateStr] || { available: false, slots: [] };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    } else if (direction === 'next') {
      setCurrentWeek(currentWeek + 1);
    }
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = formatDate(date);
    if (!isPast(date) && getDayAvailability(date).available) {
      setSelectedDate(dateStr);
      setSelectedTime('');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onUpdate({
        dateTime: {
          date: selectedDate,
          time: selectedTime,
          timezone: selectedTimezone
        }
      });
      onNext();
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Select
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Date & Time</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose your preferred appointment date and time
          </p>
          
          {/* Selected Service Info */}
          {data.service && (
            <div className="mt-8 inline-flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <img
                src={data.service.professional.image}
                alt={data.service.professional.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">{data.service.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  with {data.service.professional.name} • {data.service.duration} • ${data.service.price}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            {/* Calendar Header */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Select Date
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateWeek('prev')}
                    disabled={currentWeek === 0}
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 group"
                  >
                    <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <span className="text-gray-600 dark:text-gray-400 font-medium min-w-[100px] text-center">
                    {currentWeek === 0 ? 'This Week' : `Week ${currentWeek + 1}`}
                  </span>
                  <button
                    onClick={() => navigateWeek('next')}
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 group"
                  >
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-4">
                {weekDates.map((date, index) => {
                  const dateStr = formatDate(date);
                  const availability = getDayAvailability(date);
                  const isSelected = selectedDate === dateStr;
                  const isPastDate = isPast(date);
                  const isTodayDate = isToday(date);

                  return (
                    <div
                      key={dateStr}
                      className={`group p-4 rounded-2xl text-center cursor-pointer transition-all duration-500 hover:scale-110 animate-fade-in-up ${
                        isPastDate
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl scale-110'
                          : availability.available
                          ? 'bg-gray-50 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 text-gray-900 dark:text-white hover:shadow-xl'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => !isPastDate && availability.available && handleDateSelect(date)}
                    >
                      <div className="text-xs font-medium mb-1 opacity-75">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-xl font-bold ${isTodayDate && !isSelected ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                        {date.getDate()}
                      </div>
                      <div className="text-xs mt-1 opacity-75">
                        {isPastDate ? (
                          'Past'
                        ) : availability.available ? (
                          `${availability.slots.length} slots`
                        ) : (
                          'Unavailable'
                        )}
                      </div>
                      {isTodayDate && (
                        <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">Today</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Available Times for {formatDisplayDate(new Date(selectedDate))}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(availabilityData[selectedDate]?.slots || []).map((time, index) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={`p-4 rounded-xl font-medium transition-all duration-500 hover:scale-110 hover:shadow-lg animate-fade-in-up ${
                        selectedTime === time
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-110'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{time}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* No slots available message */}
                {availabilityData[selectedDate]?.slots.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No slots available
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Please select a different date
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Timezone Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                Timezone
              </h3>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Selection Summary */}
            {(selectedDate || selectedTime) && (
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white animate-fade-in-up animation-delay-500">
                <h3 className="text-xl font-bold mb-6">Your Selection</h3>
                <div className="space-y-4">
                  {selectedDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5" />
                      <span>{formatDisplayDate(new Date(selectedDate))}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5" />
                      <span>{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5" />
                    <span>{timezones.find(tz => tz.value === selectedTimezone)?.label}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Info */}
            {data.service && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Professional</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={data.service.professional.image}
                    alt={data.service.professional.name}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {data.service.professional.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {data.service.professional.specialty}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {data.service.duration} • ${data.service.price}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Selection Status */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-900">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Selection Status</h3>
              <div className="space-y-3">
                <div className={`flex items-center space-x-3 ${selectedDate ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedDate ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                    {selectedDate && <Clock className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium">Date Selected</span>
                </div>
                <div className={`flex items-center space-x-3 ${selectedTime ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTime ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                    {selectedTime && <Clock className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium">Time Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-16 animate-fade-in-up animation-delay-1000">
          <button
            onClick={onPrev}
            className="inline-flex items-center px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Services
          </button>

          {selectedDate && selectedTime && (
            <button
              onClick={handleContinue}
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg group"
            >
              <span>Continue to Details</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          )}
          
          {/* Helper text when selection is incomplete */}
          {(!selectedDate || !selectedTime) && (
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {!selectedDate ? 'Please select a date to continue' : 'Please select a time slot to continue'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DateTimeSelection;