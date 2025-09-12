import React from 'react';
import { Edit, Calendar, Clock, User, CreditCard, FileText, CheckCircle, ArrowLeft, ArrowRight, Shield, Star } from 'lucide-react';
import { BookingData } from './BookingPage';

interface BookingSummaryProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onComplete: () => void;
  onPrev: () => void;
  onGoToStep: (step: number) => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ 
  data, 
  onUpdate, 
  onComplete, 
  onPrev, 
  onGoToStep 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCardDisplay = (cardId: string) => {
    const cards = {
      'card1': 'Visa ****1234',
      'card2': 'Mastercard ****5678'
    };
    return cards[cardId as keyof typeof cards] || 'Selected Card';
  };

  const totalAmount = data.service ? data.service.price + 8 : 0; // Including fees

  const summaryItems = [
    {
      title: 'Service & Professional',
      icon: User,
      content: data.service ? (
        <div className="space-y-2">
          <p className="font-semibold text-gray-900 dark:text-white">{data.service.name}</p>
          <p className="text-gray-600 dark:text-gray-400">with {data.service.professional.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{data.service.professional.specialty}</p>
        </div>
      ) : null,
      editStep: 1,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Date & Time',
      icon: Calendar,
      content: data.dateTime ? (
        <div className="space-y-2">
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatDate(data.dateTime.date)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">at {data.dateTime.time}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Duration: {data.service?.duration}
          </p>
        </div>
      ) : null,
      editStep: 2,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Details & Notes',
      icon: FileText,
      content: data.notes ? (
        <div className="space-y-2">
          <p className="font-semibold text-gray-900 dark:text-white">{data.notes.reason}</p>
          {data.notes.additionalInfo && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {data.notes.additionalInfo.substring(0, 100)}
              {data.notes.additionalInfo.length > 100 ? '...' : ''}
            </p>
          )}
          {data.notes.preferences.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {data.notes.preferences.length} preference{data.notes.preferences.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      ) : null,
      editStep: 3,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Payment Method',
      icon: CreditCard,
      content: data.payment ? (
        <div className="space-y-2">
          <p className="font-semibold text-gray-900 dark:text-white">
            {data.payment.method === 'card' ? getCardDisplay(data.payment.cardId || '') : 'Bank Transfer'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Secure payment processing</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Protected by 256-bit encryption</p>
        </div>
      ) : null,
      editStep: 4,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Review &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Confirm</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please review all details before confirming your appointment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Summary Details */}
          <div className="lg:col-span-2 space-y-8">
            {summaryItems.map((item, index) => (
              <div
                key={item.title}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                          {item.title}
                        </h3>
                        {item.content}
                      </div>
                    </div>
                    <button
                      onClick={() => onGoToStep(item.editStep)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all duration-300 hover:scale-105 group/edit"
                    >
                      <Edit className="h-4 w-4 group-hover/edit:rotate-12 transition-transform duration-300" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Terms and Conditions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-800">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                  required
                />
                <div>
                  <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    By booking this appointment, you agree to our cancellation policy and payment terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Final Summary Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white animate-fade-in-up animation-delay-300">
              <h3 className="text-xl font-bold mb-6">Booking Summary</h3>
              
              {data.service && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={data.service.professional.image}
                      alt={data.service.professional.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-white/50"
                    />
                    <div>
                      <p className="font-semibold">{data.service.professional.name}</p>
                      <p className="text-indigo-100 text-sm">{data.service.professional.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-indigo-100">Service</span>
                      <span className="font-semibold">${data.service.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-100">Fees</span>
                      <span className="font-semibold">$8</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-2">
                      <span>Total</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-500">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Why Book With Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Verified professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secure payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">24/7 support</span>
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
            Back to Payment
          </button>

          <button
            onClick={onComplete}
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg group animate-pulse-glow"
          >
            <CheckCircle className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
            <span>Confirm Booking</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingSummary;