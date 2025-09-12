import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfileAvailabilityProps {
  professionalId: number;
  onNavigate?: (page: string) => void;
}

const ProfileAvailability: React.FC<ProfileAvailabilityProps> = ({ professionalId, onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<string>('video');
  const [currentWeek, setCurrentWeek] = useState(0);

  // Mock availability data
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

  const availabilityData = {
    '2024-12-25': {
      available: true,
      slots: ['09:00', '10:30', '14:00', '15:30', '16:30']
    },
    '2024-12-26': {
      available: true,
      slots: ['09:00', '11:00', '14:00', '16:00']
    },
    '2024-12-27': {
      available: true,
      slots: ['10:00', '11:30', '15:00', '16:30']
    },
    '2024-12-28': {
      available: false,
      slots: []
    },
    '2024-12-29': {
      available: true,
      slots: ['09:30', '11:00', '14:30', '16:00']
    },
    '2024-12-30': {
      available: true,
      slots: ['09:00', '10:30', '13:00', '15:30']
    },
    '2024-12-31': {
      available: false,
      slots: []
    }
  };

  const consultationTypes = [
    {
      id: 'video',
      name: 'Video Call',
      icon: Video,
      duration: '45-60 min',
      price: '$200',
      description: 'Secure video consultation from the comfort of your home'
    },
    {
      id: 'phone',
      name: 'Phone Call',
      icon: Phone,
      duration: '30-45 min',
      price: '$150',
      description: 'Professional consultation via phone call'
    },
    {
      id: 'inperson',
      name: 'In-Person',
      icon: MapPin,
      duration: '60-90 min',
      price: '$250',
      description: 'Face-to-face consultation at our medical facility'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

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
    return date < today;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    } else if (direction === 'next') {
      setCurrentWeek(currentWeek + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = formatDate(date);
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && consultationType) {
      // Handle booking logic here
      console.log('Booking:', { date: selectedDate, time: selectedTime, type: consultationType });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full mb-6">
            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-green-800 dark:text-green-300 font-medium">Book Appointment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Schedule Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Consultation</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose your preferred consultation type and select an available time slot
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Consultation Types */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              Consultation Type
            </h3>
            <div className="space-y-4">
              {consultationTypes.map((type, index) => (
                <div
                  key={type.id}
                  className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                    consultationType === type.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => setConsultationType(type.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      consultationType === type.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/20 group-hover:text-green-600'
                    }`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg mb-2 transition-colors ${
                        consultationType === type.id
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400'
                      }`}>
                        {type.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {type.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {type.duration}
                        </span>
                        <span className={`font-bold text-lg ${
                          consultationType === type.id
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {type.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  {consultationType === type.id && (
                    <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar and Time Slots */}
          <div className="lg:col-span-2">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Select Date & Time
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateWeek('prev')}
                  disabled={currentWeek === 0}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {currentWeek === 0 ? 'This Week' : `Week ${currentWeek + 1}`}
                </span>
                <button
                  onClick={() => navigateWeek('next')}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4 mb-8">
              {weekDates.map((date, index) => {
                const dateStr = formatDate(date);
                const availability = getDayAvailability(date);
                const isSelected = selectedDate === dateStr;
                const isPastDate = isPast(date);
                const isTodayDate = isToday(date);

                return (
                  <div
                    key={dateStr}
                    className={`group p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                      isPastDate
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-green-500 text-white shadow-lg'
                        : availability.available
                        ? 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 text-gray-900 dark:text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => !isPastDate && availability.available && handleDateSelect(date)}
                  >
                    <div className="text-sm font-medium mb-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${isTodayDate && !isSelected ? 'text-green-600' : ''}`}>
                      {date.getDate()}
                    </div>
                    <div className="text-xs mt-1">
                      {isPastDate ? (
                        'Past'
                      ) : availability.available ? (
                        `${availability.slots.length} slots`
                      ) : (
                        'Unavailable'
                      )}
                    </div>
                    {isTodayDate && (
                      <div className="text-xs text-green-600 font-medium mt-1">Today</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="animate-fade-in-up">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Available Times for {formatDisplayDate(new Date(selectedDate))}
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {availabilityData[selectedDate]?.slots.map((time, index) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                        selectedTime === time
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 text-gray-900 dark:text-white'
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
              </div>
            )}

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg animate-fade-in-up">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Booking Summary
                </h4>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDisplayDate(new Date(selectedDate))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Time:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {consultationTypes.find(t => t.id === consultationType)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {consultationTypes.find(t => t.id === consultationType)?.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {consultationTypes.find(t => t.id === consultationType)?.price}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('booking')}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <Calendar className="h-5 w-5 inline mr-2 group-hover:animate-bounce" />
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileAvailability;