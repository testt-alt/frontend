import React, { useState } from 'react';
import { CreditCard, Shield, Lock, Plus, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { BookingData } from './BookingPage';

interface EyeOff {
  className: string;
}

const EyeOff: React.FC<EyeOff> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

interface Eye {
  className: string;
}

const Eye: React.FC<Eye> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

interface PaymentInformationProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({ data, onUpdate, onNext, onPrev }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(data.payment?.method || '');
  const [selectedCard, setSelectedCard] = useState(data.payment?.cardId || '');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    zipCode: ''
  });

  const savedCards = [
    {
      id: 'card1',
      type: 'visa',
      last4: '1234',
      expiry: '12/27',
      name: 'John Doe',
      isDefault: true
    },
    {
      id: 'card2',
      type: 'mastercard',
      last4: '5678',
      expiry: '08/26',
      name: 'John Doe',
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay securely with your credit or debit card',
      icon: CreditCard,
      popular: true
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer (processing may take 1-2 days)',
      icon: Shield,
      popular: false
    }
  ];

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    if (method === 'card' && savedCards.length > 0) {
      setSelectedCard(savedCards.find(card => card.isDefault)?.id || savedCards[0].id);
    }
  };

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      onUpdate({
        payment: {
          method: selectedPaymentMethod,
          cardId: selectedPaymentMethod === 'card' ? selectedCard : undefined
        }
      });
      onNext();
    }
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  const isFormValid = selectedPaymentMethod && (selectedPaymentMethod !== 'card' || selectedCard);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Payment
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Information</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose your preferred payment method for a secure transaction
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Select Payment Method
              </h3>
              
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div
                    key={method.id}
                    className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:scale-105 animate-fade-in-up ${
                      selectedPaymentMethod === method.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          selectedPaymentMethod === method.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600'
                        }`}>
                          <method.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-bold text-lg transition-colors ${
                              selectedPaymentMethod === method.id
                                ? 'text-indigo-700 dark:text-indigo-300'
                                : 'text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                            }`}>
                              {method.name}
                            </h4>
                            {method.popular && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-bold rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Cards (if card payment selected) */}
            {selectedPaymentMethod === 'card' && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Select Card
                  </h3>
                  <button
                    onClick={() => setShowAddCard(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm font-medium">Add New Card</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {savedCards.map((card, index) => (
                    <div
                      key={card.id}
                      className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 hover:scale-105 animate-fade-in-up ${
                        selectedCard === card.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                      onClick={() => setSelectedCard(card.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{getCardIcon(card.type)}</div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              •••• •••• •••• {card.last4}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {card.name} • Expires {card.expiry}
                            </p>
                            {card.isDefault && (
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Default</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {selectedCard === card.id && (
                          <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Card Form */}
            {showAddCard && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Add New Card
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newCard.number}
                      onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={newCard.cvv}
                        onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newCard.name}
                      onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowAddCard(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Security Info */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white animate-fade-in-up animation-delay-300">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8" />
                <h3 className="text-xl font-bold">Secure Payment</h3>
              </div>
              <ul className="space-y-3 text-green-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">256-bit SSL encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">PCI DSS compliant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Fraud protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Money-back guarantee</span>
                </li>
              </ul>
            </div>

            {/* Order Summary */}
            {data.service && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Service</span>
                    <span className="font-medium text-gray-900 dark:text-white">${data.service.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Platform Fee</span>
                    <span className="font-medium text-gray-900 dark:text-white">$5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Processing Fee</span>
                    <span className="font-medium text-gray-900 dark:text-white">$3</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        ${data.service.price + 8}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Protection */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-700">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Protection</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Your payment is protected until your appointment is completed. If you're not satisfied, 
                you can request a full refund within 24 hours of your appointment.
              </p>
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
            Back to Details
          </button>

          <button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100 group"
          >
            <span>Continue to Summary</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentInformation;