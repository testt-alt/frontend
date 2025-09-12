import React, { useState } from 'react';
import { CreditCard, Plus, Edit, Trash2, Shield, CheckCircle, AlertCircle, Star } from 'lucide-react';

const PaymentMethods: React.FC = () => {
  const [showAddMethod, setShowAddMethod] = useState(false);

  const paymentMethods = [
    {
      id: 1,
      type: 'visa',
      last4: '1234',
      expiryMonth: '12',
      expiryYear: '2027',
      holderName: 'John Doe',
      isDefault: true,
      isExpired: false,
      brand: 'Visa',
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '5678',
      expiryMonth: '08',
      expiryYear: '2026',
      holderName: 'John Doe',
      isDefault: false,
      isExpired: false,
      brand: 'Mastercard',
      color: 'from-red-600 to-red-800'
    },
    {
      id: 3,
      type: 'amex',
      last4: '9012',
      expiryMonth: '03',
      expiryYear: '2025',
      holderName: 'John Doe',
      isDefault: false,
      isExpired: true,
      brand: 'American Express',
      color: 'from-green-600 to-green-800'
    }
  ];

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

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Payment
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> Methods</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Manage your saved payment methods and add new ones for seamless transactions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {paymentMethods.map((method, index) => (
                <div
                  key={method.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/5 dark:to-teal-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        {/* Card Visual */}
                        <div className={`w-20 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-white text-2xl">{getCardIcon(method.type)}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {method.brand} •••• {method.last4}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            {method.holderName}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <div className="flex items-center space-x-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-xs font-medium">Default</span>
                          </div>
                        )}
                        {method.isExpired && (
                          <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Expired</span>
                          </div>
                        )}
                        {!method.isExpired && !method.isDefault && (
                          <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">Active</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        {!method.isDefault && !method.isExpired && (
                          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-900/30 transition-all duration-300 hover:scale-105">
                            <Star className="h-4 w-4" />
                            <span className="text-sm font-medium">Set as Default</span>
                          </button>
                        )}
                        
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
                          <Edit className="h-4 w-4" />
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>

                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-105">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Method Button */}
              <button
                onClick={() => setShowAddMethod(true)}
                className="w-full group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 animate-fade-in-up"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Add New Payment Method
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add a credit card, debit card, or bank account
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Security & Info Sidebar */}
          <div className="space-y-8">
            {/* Security Info */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative z-10">
                <Shield className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold mb-4">Secure & Protected</h3>
                <ul className="space-y-3 text-emerald-100">
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
                    <span className="text-sm">24/7 monitoring</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Transactions</span>
                  <span className="font-bold text-gray-900 dark:text-white">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="font-bold text-green-600 dark:text-green-400">94.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Amount</span>
                  <span className="font-bold text-gray-900 dark:text-white">$136</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Most Used Method</span>
                  <span className="font-bold text-gray-900 dark:text-white">Visa ••••1234</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-700 dark:text-gray-300">Update Billing Info</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
                  <Shield className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700 dark:text-gray-300">Security Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-gray-700 dark:text-gray-300">Report Issue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;