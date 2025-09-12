import React from 'react';
import { CreditCard, DollarSign, Receipt, TrendingUp, Download, Search, Filter, Shield, Zap, Award } from 'lucide-react';

const PaymentsHero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/30 overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400 to-cyan-600 rounded-full opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        
        {/* Floating payment elements */}
        <div className="absolute top-20 right-20 animate-float animation-delay-1000">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">$180.00</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Payment Successful</p>
          </div>
        </div>
        <div className="absolute bottom-32 left-16 animate-float animation-delay-2000">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Secure</span>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-10 animate-float animation-delay-1500">
          <Receipt className="w-12 h-12 text-cyan-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full mb-8 border border-emerald-200/50 dark:border-emerald-700/50">
            <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 animate-pulse" />
            <span className="text-emerald-800 dark:text-emerald-300 font-medium">Payment Management Center</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Track Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> Payments</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Monitor all your payments to professionals, download receipts, and manage your payment methods securely in one place.
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-500">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg animate-pulse-glow">
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce transition-transform duration-300" />
              Download Receipts
            </button>
            
            <button className="group inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-xl">
              <CreditCard className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform duration-300" />
              Manage Payment Methods
            </button>
          </div>

          {/* Search and filter bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-xl animate-fade-in-up animation-delay-700">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payments by professional, amount, or date..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
                <button className="flex items-center space-x-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-300 hover:scale-105">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">256-bit</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">SSL Encryption</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Zap className="h-8 w-8 text-teal-600 dark:text-teal-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">Instant</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Processing</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <Award className="h-8 w-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">PCI</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Compliant</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 border border-white/20 dark:border-gray-700/20">
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsHero;