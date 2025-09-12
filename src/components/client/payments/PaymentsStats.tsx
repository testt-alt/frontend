import React from 'react';
import { DollarSign, CreditCard, Receipt, TrendingUp, Calendar, Award, Zap, Shield } from 'lucide-react';

const PaymentsStats: React.FC = () => {
  const stats = [
    {
      icon: DollarSign,
      title: 'Total Spent',
      value: '$2,450',
      change: '+$320 this month',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10',
      trend: 'up'
    },
    {
      icon: Receipt,
      title: 'Total Payments',
      value: '18',
      change: '3 this month',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10',
      trend: 'up'
    },
    {
      icon: Calendar,
      title: 'Average per Month',
      value: '$408',
      change: 'Consistent spending',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10',
      trend: 'neutral'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      value: '3',
      change: '2 cards, 1 bank',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10',
      trend: 'neutral'
    }
  ];

  const monthlyData = [
    { month: 'Jan', amount: 280, payments: 2 },
    { month: 'Feb', amount: 420, payments: 3 },
    { month: 'Mar', amount: 380, payments: 3 },
    { month: 'Apr', amount: 520, payments: 4 },
    { month: 'May', amount: 450, payments: 3 },
    { month: 'Jun', amount: 400, payments: 3 }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Reliable Payer',
      description: 'Never missed a payment',
      earned: true
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All payments verified',
      earned: true
    },
    {
      icon: Zap,
      title: 'Quick Payer',
      description: 'Average payment time < 2 min',
      earned: true
    },
    {
      icon: TrendingUp,
      title: 'Growing Investment',
      description: '25% increase in professional services',
      earned: false
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {stat.title}
                </h3>

                {/* Change indicator */}
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                  <span>{stat.change}</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly spending chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-16 animate-fade-in-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Monthly Spending Overview</h3>
              <p className="text-gray-600 dark:text-gray-400">Track your payment patterns over time</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Payments</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="text-center group">
                <div className="mb-4 relative">
                  {/* Amount bar */}
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-32 w-8 mx-auto relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 group-hover:from-emerald-600 group-hover:to-emerald-500"
                      style={{ 
                        height: `${(data.amount / 600) * 100}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                  {/* Payments indicator */}
                  <div className="absolute -right-2 top-0">
                    <div className="w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{data.payments}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{data.month}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">${data.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements section */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Payment Achievements</h3>
              <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                Earn badges for responsible payment behavior and secure transactions
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="text-center group">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-white/20 shadow-lg' 
                        : 'bg-white/10 opacity-50'
                    }`}>
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className={`text-sm font-medium mb-1 ${achievement.earned ? 'text-white' : 'text-white/60'}`}>
                    {achievement.title}
                  </div>
                  <div className={`text-xs ${achievement.earned ? 'text-emerald-100' : 'text-white/40'}`}>
                    {achievement.description}
                  </div>
                  {achievement.earned && (
                    <div className="mt-2">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full mx-auto animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsStats;