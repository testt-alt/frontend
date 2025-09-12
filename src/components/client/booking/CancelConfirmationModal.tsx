import React from 'react';
import { AlertTriangle, X, ArrowLeft } from 'lucide-react';

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-gray-700 animate-bounce-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Cancel Booking?
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Are you sure you want to cancel your booking? All your progress will be lost and you'll need to start over.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm">
                  This action cannot be undone
                </h4>
                <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                  Your selected service, date, time, and other details will be cleared.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Continue Booking
            </button>
            
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;