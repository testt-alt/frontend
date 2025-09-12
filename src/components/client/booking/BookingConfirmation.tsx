import React from 'react';
import { CheckCircle, Calendar, Clock, User, MapPin, Video, Phone, Download, Share2, MessageCircle, Star, Gift, Sparkles } from 'lucide-react';
import { BookingData } from './BookingPage';

interface BookingConfirmationProps {
  data: BookingData;
  onNavigate?: (page: string) => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ data, onNavigate }) => {
  const bookingId = 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getConsultationIcon = (type: string) => {
    // This would be determined based on the selected consultation type
    return Video; // Default to video for demo
  };

  const ConsultationIcon = getConsultationIcon('video');

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-8 animate-bounce-in shadow-2xl">
            <CheckCircle className="h-16 w-16 text-white animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Booking
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Confirmed!</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Your appointment has been successfully booked. You'll receive a confirmation email shortly.
          </p>

          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-6 py-3 rounded-full">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Booking ID: {bookingId}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Appointment Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Appointment Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Appointment Details
                  </h2>
                  <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">Confirmed</span>
                  </div>
                </div>

                {data.service && data.dateTime && (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Professional Info */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={data.service.professional.image}
                          alt={data.service.professional.name}
                          className="h-20 w-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {data.service.professional.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">
                            {data.service.professional.specialty}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">4.9</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-500">Date</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {formatDate(data.dateTime.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-500">Time</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {data.dateTime.time} ({data.dateTime.timezone})
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                            <ConsultationIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-500">Type</p>
                            <p className="font-semibold text-gray-900 dark:text-white">Video Consultation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          {data.service.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Duration: {data.service.duration}
                        </p>
                      </div>

                      {data.notes && (
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Reason</h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{data.notes.reason}</p>
                        </div>
                      )}

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Total Paid</span>
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ${data.service.price + 8}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What Happens Next?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Confirmation Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      You'll receive a detailed confirmation email with all appointment information
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Professional Preparation</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Your professional will review your information and prepare for the session
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Appointment Reminder</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We'll send you reminders 24 hours and 1 hour before your appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 p-4 bg-indigo-100 dark:bg-indigo-900/20 hover:bg-indigo-200 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl transition-all duration-300 hover:scale-105 group">
                  <Download className="h-5 w-5 group-hover:animate-bounce" />
                  <span className="font-medium">Download Confirmation</span>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl transition-all duration-300 hover:scale-105 group">
                  <Calendar className="h-5 w-5 group-hover:scale-125 transition-transform" />
                  <span className="font-medium">Add to Calendar</span>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl transition-all duration-300 hover:scale-105 group">
                  <MessageCircle className="h-5 w-5 group-hover:scale-125 transition-transform" />
                  <span className="font-medium">Message Professional</span>
                </button>

                <button className="w-full flex items-center space-x-3 p-4 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl transition-all duration-300 hover:scale-105 group">
                  <Share2 className="h-5 w-5 group-hover:scale-125 transition-transform" />
                  <span className="font-medium">Share Appointment</span>
                </button>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white animate-fade-in-up animation-delay-500">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="h-8 w-8" />
                <h3 className="text-xl font-bold">Special Offer!</h3>
              </div>
              <p className="text-yellow-100 mb-6">
                Book your next appointment within 30 days and get 10% off!
              </p>
              <button className="w-full bg-white text-orange-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                Claim Offer
              </button>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <button
                onClick={() => onNavigate && onNavigate('appointments')}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                View All Appointments
              </button>
              
              <button
                onClick={() => onNavigate && onNavigate('professionals')}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Book Another Appointment
              </button>
              
              <button
                onClick={() => onNavigate && onNavigate('home')}
                className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-700">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Thank You for Choosing ProBooking!
              </h3>
              <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
                We're committed to providing you with the best professional services experience. 
                If you have any questions, our support team is here to help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Support
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-105">
                  Rate Your Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmation;