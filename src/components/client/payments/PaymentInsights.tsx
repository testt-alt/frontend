import React from 'react';
import { TrendingUp, DollarSign, Calendar, Award, BarChart3, PieChart, Target, Zap } from 'lucide-react';

const PaymentInsights: React.FC = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Spending Trend',
      value: '+15%',
      description: 'Your spending on professional services has increased by 15% this quarter',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10'
    },
    {
      icon: Calendar,
      title: 'Peak Booking Days',
      value: 'Tue & Thu',
      description: 'You tend to book most appointments on Tuesdays and Thursdays',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10'
    },
    {
      icon: Award,
      title: 'Most Invested Category',
      value: 'Healthcare',
      description: '45% of your spending goes to healthcare professionals',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10'
    },
    {
      icon: Target,
      title: 'Budget Efficiency',
      value: '92%',
      description: 'You\'re staying within your professional services budget',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10'
    }
  ];

  const categoryBreakdown = [
    { category: 'Healthcare', amount: 1102, percentage: 45, color: 'bg-emerald-500' },
    { category: 'Legal', amount: 735, percentage: 30, color: 'bg-blue-500' },
    { category: 'Finance', amount: 368, percentage: 15, color: 'bg-purple-500' },
    { category: 'Education', amount: 245, percentage: 10, color: 'bg-orange-500' }
  ];

  const monthlyComparison = [
    { month: 'Oct', current: 380, previous: 320 },
    { month: 'Nov', current: 450, previous: 380 },
    { month: 'Dec', current: 520, previous: 450 }
  ];

  const recommendations = [
    {
      icon: Zap,
      title: 'Optimize Your Schedule',
      description: 'Book multiple appointments on the same day to save on travel time and costs',
      action: 'View Available Slots'
    },
    {
      icon: DollarSign,
      title: 'Budget Alert',
      description: 'You\'re approaching your monthly budget limit. Consider reviewing upcoming appointments',
      action: 'Manage Budget'
    },
    {
      icon: Award,
      title: 'Loyalty Rewards',
      description: 'You\'re eligible for a 5% discount on your next healthcare appointment',
      action: 'Claim Reward'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Payment
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understand your spending patterns and get personalized recommendations
          </p>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {insights.map((insight, index) => (
            <div
              key={insight.title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${insight.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${insight.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <insight.icon className="h-8 w-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {insight.value}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {insight.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Category Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Spending by Category</h3>
                <p className="text-gray-600 dark:text-gray-400">Where your money goes</p>
              </div>
              <PieChart className="h-8 w-8 text-emerald-600" />
            </div>
            
            <div className="space-y-4">
              {categoryBreakdown.map((category, index) => (
                <div key={category.category} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{category.category}</span>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 dark:text-white">${category.amount}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{category.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${category.color} rounded-full transition-all duration-1000 group-hover:scale-105`}
                      style={{ 
                        width: `${category.percentage}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Monthly Comparison</h3>
                <p className="text-gray-600 dark:text-gray-400">Current vs Previous Quarter</p>
              </div>
              <BarChart3 className="h-8 w-8 text-teal-600" />
            </div>
            
            <div className="space-y-6">
              {monthlyComparison.map((month, index) => (
                <div key={month.month} className="group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900 dark:text-white">{month.month}</span>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
                        <div className="font-bold text-emerald-600">${month.current}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Previous</div>
                        <div className="font-bold text-gray-400">${month.previous}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(month.current / 600) * 100}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gray-400 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(month.previous / 600) * 100}%`,
                          animationDelay: `${index * 200 + 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Personalized Recommendations</h3>
              <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                Based on your payment patterns, here are some suggestions to optimize your experience
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {recommendations.map((rec, index) => (
                <div key={rec.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <rec.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 text-center">{rec.title}</h4>
                  <p className="text-emerald-100 text-sm mb-4 text-center">{rec.description}</p>
                  <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105">
                    {rec.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentInsights;