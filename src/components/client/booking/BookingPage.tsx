import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import BookingSteps from './BookingSteps';
import ServiceSelection from './ServiceSelection';
import DateTimeSelection from './DateTimeSelection';
import NotesAndDetails from './NotesAndDetails';
import PaymentInformation from './PaymentInformation';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';
import CancelConfirmationModal from './CancelConfirmationModal';

export interface BookingData {
  service?: {
    id: number;
    name: string;
    price: number;
    duration: string;
    professional: {
      id: number;
      name: string;
      specialty: string;
      image: string;
    };
  };
  dateTime?: {
    date: string;
    time: string;
    timezone: string;
  };
  notes?: {
    reason: string;
    additionalInfo: string;
    preferences: string[];
  };
  payment?: {
    method: string;
    cardId?: string;
    billingAddress?: any;
  };
  contactInfo?: {
    email: string;
    phone: string;
    emergencyContact?: string;
  };
}

interface BookingPageProps {
  onNavigate?: (page: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    { id: 1, name: 'Service', title: 'Select Service' },
    { id: 2, name: 'Date & Time', title: 'Choose Date & Time' },
    { id: 3, name: 'Details', title: 'Add Details' },
    { id: 4, name: 'Payment', title: 'Payment Information' },
    { id: 5, name: 'Summary', title: 'Review & Confirm' },
    { id: 6, name: 'Confirmation', title: 'Booking Confirmed' }
  ];

  // Save booking progress to localStorage
  useEffect(() => {
    const savedBooking = localStorage.getItem('bookingProgress');
    if (savedBooking) {
      const { step, data } = JSON.parse(savedBooking);
      setCurrentStep(step);
      setBookingData(data);
    }
  }, []);

  useEffect(() => {
    if (currentStep < 6) {
      localStorage.setItem('bookingProgress', JSON.stringify({
        step: currentStep,
        data: bookingData
      }));
    }
  }, [currentStep, bookingData]);

  const updateBookingData = (stepData: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    localStorage.removeItem('bookingProgress');
    setBookingData({});
    setCurrentStep(1);
    setShowCancelModal(false);
    if (onNavigate) {
      onNavigate('home');
    }
  };

  const handleComplete = () => {
    localStorage.removeItem('bookingProgress');
    setIsCompleted(true);
    setCurrentStep(6);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            data={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            data={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <NotesAndDetails
            data={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <PaymentInformation
            data={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <BookingSummary
            data={bookingData}
            onUpdate={updateBookingData}
            onComplete={handleComplete}
            onPrev={prevStep}
            onGoToStep={goToStep}
          />
        );
      case 6:
        return (
          <BookingConfirmation
            data={bookingData}
            onNavigate={onNavigate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500 pt-20">
      {/* Header with steps and cancel button */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <BookingSteps
                steps={steps}
                currentStep={currentStep}
                completedSteps={currentStep - 1}
                onStepClick={goToStep}
              />
            </div>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>Cancel Booking</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative">
        {renderCurrentStep()}
      </div>

      {/* Cancel Confirmation Modal */}
      <CancelConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
      />
    </div>
  );
};

export default BookingPage;