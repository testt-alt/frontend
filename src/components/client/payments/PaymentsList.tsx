import React, { useState } from 'react';
import { Download, Receipt, CreditCard, Calendar, User, CheckCircle, Clock, AlertCircle, XCircle, MoreHorizontal, RefreshCw, Eye } from 'lucide-react';

const PaymentsList: React.FC = () => {
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);

  const payments = [
    {
      id: 1,
      professional: {
        name: 'Dr. Sarah Mitchell',
        specialty: 'Cardiologist',
        image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      amount: 180.00,
      date: '2024-12-20',
      time: '2:30 PM',
      status: 'completed',
      paymentMethod: 'Visa ****1234',
      transactionId: 'TXN-2024-001',
      appointmentType: 'Video Consultation',
      duration: '45 min',
      receiptUrl: '#',
      canRefund: false
    },
    {
      id: 2,
      professional: {
        name: 'James Rodriguez',
        specialty: 'Corporate Lawyer',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      amount: 250.00,
      date: '2024-12-18',
      time: '10:15 AM',
      status: 'completed',
      paymentMethod: 'Mastercard ****5678',
      transactionId: 'TXN-2024-002',
      appointmentType: 'In-Person Meeting',
      duration: '60 min',
      receiptUrl: '#',
      canRefund: false
    },
    {
      id: 3,
      professional: {
        name: 'Dr. Emily Chen',
        specialty: 'Clinical Psychologist',
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      amount: 120.00,
      date: '2024-12-15',
      time: '3:45 PM',
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-2024-003',
      appointmentType: 'Phone Consultation',
      duration: '50 min',
      receiptUrl: '#',
      canRefund: true
    },
    {
      id: 4,
      professional: {
        name: 'Michael Thompson',
        specialty: 'Financial Advisor',
        image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      amount: 140.00,
      date: '2024-12-12',
      time: '4:20 PM',
      status: 'completed',
      paymentMethod: 'PayPal',
      transactionId: 'TXN-2024-004',
      appointmentType: 'Video Consultation',
      duration: '30 min',
      receiptUrl: '#',
      canRefund: false
    },
    {
      id: 5,
      professional: {
        name: 'Lisa Anderson',
        specialty: 'Business Consultant',
        image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      amount: 200.00,
      date: '2024-12-10',
      time: '2:00 PM',
      status: 'failed',
      paymentMethod: 'Visa ****1234',
      transactionId: 'TXN-2024-005',
      appointmentType: 'In-Person Meeting',
      duration: '45 min',
      receiptUrl: '#',
      canRefund: false
    },
    {
      id: 6,
      professional: {
        name: 'Prof. David Kim',
        specialty: 'Math Tutor',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      amount: 85.00,
      date: '2024-12-08',
      time: '6:00 PM',
      status: 'refunded',
      paymentMethod: 'Mastercard ****5678',
      transactionId: 'TXN-2024-006',
      appointmentType: 'Video Consultation',
      duration: '60 min',
      receiptUrl: '#',
      canRefund: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return XCircle;
      case 'refunded':
        return RefreshCw;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.includes('Visa') || method.includes('Mastercard')) {
      return '💳';
    } else if (method.includes('Bank')) {
      return '🏦';
    } else if (method.includes('PayPal')) {
      return '💰';
    }
    return '💳';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const togglePaymentSelection = (paymentId: number) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const downloadReceipt = (payment: any) => {
    // Simulate receipt download
    console.log('Downloading receipt for payment:', payment.transactionId);
  };

  const downloadBulkReceipts = () => {
    console.log('Downloading receipts for payments:', selectedPayments);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Payment
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> History</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              Complete record of all your payments to professionals
            </p>
          </div>
          
          {selectedPayments.length > 0 && (
            <button
              onClick={downloadBulkReceipts}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="h-5 w-5" />
              <span>Download {selectedPayments.length} Receipt{selectedPayments.length !== 1 ? 's' : ''}</span>
            </button>
          )}
        </div>

        {/* Payments List */}
        <div className="space-y-6">
          {payments.map((payment, index) => {
            const StatusIcon = getStatusIcon(payment.status);
            
            return (
              <div
                key={payment.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/5 dark:to-teal-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  {/* Payment Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => togglePaymentSelection(payment.id)}
                        className="w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="relative">
                        <img
                          src={payment.professional.image}
                          alt={payment.professional.name}
                          className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-emerald-200 dark:group-hover:ring-emerald-800 transition-all duration-500 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {payment.professional.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          {payment.professional.specialty}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {payment.appointmentType} • {payment.duration}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${payment.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {payment.transactionId}
                        </div>
                      </div>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                        <MoreHorizontal className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl">
                        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatDate(payment.date)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {payment.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900/20 rounded-xl">
                        <CreditCard className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          <span className="mr-2">{getPaymentMethodIcon(payment.paymentMethod)}</span>
                          {payment.paymentMethod}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${
                        payment.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' :
                        payment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                        payment.status === 'failed' ? 'bg-red-100 dark:bg-red-900/20' :
                        'bg-blue-100 dark:bg-blue-900/20'
                      }`}>
                        <StatusIcon className={`h-5 w-5 ${
                          payment.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                          payment.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                          payment.status === 'failed' ? 'text-red-600 dark:text-red-400' :
                          'text-blue-600 dark:text-blue-400'
                        }`} />
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)} capitalize`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                        <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Professional Service
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Consultation Fee
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => downloadReceipt(payment)}
                        className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-900/30 transition-all duration-300 hover:scale-105"
                      >
                        <Download className="h-4 w-4" />
                        <span className="text-sm font-medium">Download Receipt</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm font-medium">View Details</span>
                      </button>

                      {payment.canRefund && (
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-105">
                          <RefreshCw className="h-4 w-4" />
                          <span className="text-sm font-medium">Request Refund</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Receipt className="h-4 w-4" />
                      <span>Receipt Available</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Need Help with Payments?</h3>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                Our support team is here to help with any payment-related questions or issues
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Support
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsList;