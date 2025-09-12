import React, { useState } from 'react';
import { FileText, MessageSquare, Heart, ArrowLeft, ArrowRight, User, Phone, Mail, AlertCircle } from 'lucide-react';
import { BookingData } from './BookingPage';

interface NotesAndDetailsProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const NotesAndDetails: React.FC<NotesAndDetailsProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const [reason, setReason] = useState(data.notes?.reason || '');
  const [additionalInfo, setAdditionalInfo] = useState(data.notes?.additionalInfo || '');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(data.notes?.preferences || []);
  const [contactInfo, setContactInfo] = useState({
    email: data.contactInfo?.email || '',
    phone: data.contactInfo?.phone || '',
    emergencyContact: data.contactInfo?.emergencyContact || ''
  });

  const reasonOptions = [
    'Initial consultation',
    'Follow-up appointment',
    'Second opinion',
    'Routine check-up',
    'Urgent consultation',
    'Preventive care',
    'Treatment planning',
    'Other'
  ];

  const preferenceOptions = [
    'Morning appointments preferred',
    'Afternoon appointments preferred',
    'Flexible with timing',
    'Prefer video consultation',
    'Prefer phone consultation',
    'Prefer in-person meeting',
    'Need interpreter services',
    'Wheelchair accessible required',
    'Parking assistance needed',
    'First-time patient'
  ];

  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleContinue = () => {
    onUpdate({
      notes: {
        reason,
        additionalInfo,
        preferences: selectedPreferences
      },
      contactInfo
    });
    onNext();
  };

  const isFormValid = reason && contactInfo.email && contactInfo.phone;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Add
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Details</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help us prepare for your appointment with additional information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reason for Appointment */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl">
                  <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Reason for Appointment
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reasonOptions.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => setReason(option)}
                    className={`p-4 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                      reason === option
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                  <User className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contact Information
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Emergency Contact (Optional)
                  </label>
                  <input
                    type="text"
                    value={contactInfo.emergencyContact}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Emergency contact name and phone"
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Additional Information
                </h3>
              </div>
              
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Please share any additional information that might help the professional prepare for your appointment..."
                rows={6}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none"
              />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {additionalInfo.length}/500 characters
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/20 rounded-xl">
                  <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Preferences & Accommodations
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {preferenceOptions.map((preference, index) => (
                  <button
                    key={preference}
                    onClick={() => togglePreference(preference)}
                    className={`p-4 rounded-xl text-sm font-medium text-left transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                      selectedPreferences.includes(preference)
                        ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300 border-2 border-pink-500'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900/10 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {preference}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Appointment Summary */}
            {data.service && data.dateTime && (
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white animate-fade-in-up animation-delay-300">
                <h3 className="text-xl font-bold mb-6">Appointment Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-indigo-100 text-sm">Service</p>
                    <p className="font-semibold">{data.service.name}</p>
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">Professional</p>
                    <p className="font-semibold">{data.service.professional.name}</p>
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">Date & Time</p>
                    <p className="font-semibold">
                      {new Date(data.dateTime.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {data.dateTime.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">Duration</p>
                    <p className="font-semibold">{data.service.duration}</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-indigo-100 text-sm">Total</p>
                    <p className="text-2xl font-bold">${data.service.price}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Helpful Tips
                </h3>
              </div>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Be specific about your concerns or goals</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Mention any relevant medical history or documents</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Include any accessibility needs or preferences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">Double-check your contact information</span>
                </li>
              </ul>
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
            Back to Date & Time
          </button>

          <button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100 group"
          >
            <span>Continue to Payment</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotesAndDetails;