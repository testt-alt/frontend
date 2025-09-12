import React, { useState } from 'react';
import { Clock, Download, CheckCircle, AlertCircle, XCircle, CreditCard, Calendar, DollarSign, Eye, Filter, Search, TrendingUp, BarChart3, Activity, Award, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Heart, Star, Bookmark, Gift, Rocket, Diamond } from 'lucide-react';

interface BillingHistoryProps {
  billingCycle: 'monthly' | 'yearly';
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ billingCycle }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: billingCycle === 'monthly' ? 29 : 290,
      status: 'paid',
      invoice: 'INV-2024-001',
      description: `Professional Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
      paymentMethod: 'Visa ****4242',
      downloadUrl: '#'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: billingCycle === 'monthly' ? 29 : 290,
      status: 'paid',
      invoice: 'INV-2023-012',
      description: `Professional Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
      paymentMethod: 'Visa ****4242',
      downloadUrl: '#'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: billingCycle === 'monthly' ? 29 : 290,
      status: 'paid',
      invoice: 'INV-2023-011',
      description: `Professional Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
      paymentMethod: 'Visa ****4242',
      downloadUrl: '#'
    },
    {
      id: 4,
      date: '2023-10-15',
      amount: billingCycle === 'monthly' ? 29 : 290,
      status: 'paid',
      invoice: 'INV-2023-010',
      description: `Professional Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
      paymentMethod: 'Visa ****4242',
      downloadUrl: '#'
    },
    {
      id: 5,
      date: '2023-09-15',
      amount: billingCycle === 'monthly' ? 29 : 290,
      status: 'pending',
      invoice: 'INV-2023-009',
      description: `Professional Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}`,
      paymentMethod: 'Visa ****4242',
      downloadUrl: '#'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredHistory = billingHistory.filter(invoice => 
    filterStatus === 'all' || invoice.status === filterStatus
  );

  const displayedHistory = showAllHistory ? filteredHistory : filteredHistory.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Billing History */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000">
        <div className="p-6 border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Billing History</h3>
                <p className="text-gray-600 dark:text-gray-400">View and download your invoices</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-500 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-300 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <button 
                onClick={() => setShowAllHistory(!showAllHistory)}
                className="text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 text-sm font-bold hover:scale-105 transition-all duration-300 px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl shadow-sm hover:shadow-md"
              >
                {showAllHistory ? 'Show Less' : 'View All'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {displayedHistory.map((invoice, index) => (
            <div 
              key={invoice.id} 
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/70 transition-all duration-300 hover:scale-105 transform group animate-in slide-in-from-right-4 duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 ${
                    invoice.status === 'paid' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                      : invoice.status === 'pending'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                        : 'bg-gradient-to-r from-red-500 to-pink-600'
                  }`}>
                    {getStatusIcon(invoice.status)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300">
                        ${invoice.amount}
                      </p>
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span className="capitalize">{invoice.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {formatDate(invoice.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-3 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/70 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-600/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-300 mb-1">Description</p>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.description}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-300 mb-1">Invoice</p>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.invoice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-300 mb-1">Payment Method</p>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700/70 dark:to-purple-900/30 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Total Paid This Year</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ${billingHistory.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)}
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage your billing information</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-2xl hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Add Card</span>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Primary Card */}
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/70 dark:to-blue-900/30 rounded-2xl hover:from-gray-100 hover:to-blue-100 dark:hover:from-gray-600/80 dark:hover:to-blue-900/40 transition-all duration-300 hover:scale-105 group border-2 border-blue-200 dark:border-blue-700">
              <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <CreditCard className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300">
                    •••• •••• •••• 4242
                  </p>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    Primary
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-300">
                  <span>Expires 12/25</span>
                  <span>•</span>
                  <span>Visa</span>
                  <span>•</span>
                  <span>Auto-renewal enabled</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200 text-sm font-bold hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-300 hover:scale-105">
                  Edit
                </button>
                <button className="px-4 py-2 text-red-600 dark:text-red-300 hover:text-red-700 dark:hover:text-red-200 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300 hover:scale-105">
                  Remove
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl border border-green-200/50 dark:border-green-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-1">Secure Payment</h4>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    Your payment information is encrypted and secure. We use industry-standard security measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-600 p-8 hover:shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-400">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Billing Summary</h3>
            <p className="text-gray-600 dark:text-gray-400">Your subscription overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Total Spent</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">This year</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
              ${billingHistory.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Savings</h4>
                <p className="text-sm text-green-600 dark:text-green-400">With yearly billing</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
              ${billingCycle === 'yearly' ? '58' : '0'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-600/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Next Billing</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">Upcoming charge</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
              Feb 15
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;