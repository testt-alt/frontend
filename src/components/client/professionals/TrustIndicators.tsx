import React from 'react';
import { Shield, Award, Clock, Users, Star, CheckCircle, TrendingUp, Heart } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All professionals undergo thorough background checks and credential verification',
      stat: '100%',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'Money-back guarantee if you\'re not satisfied with your consultation',
      stat: '30-day',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Average response time under 2 hours for all professional inquiries',
      stat: '<2hrs',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Over 50,000 successful consultations completed this year',
      stat: '50K+',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10'
    }
  ];

  const testimonialStats = [
    { icon: Star, label: 'Average Rating', value: '4.9/5', color: 'text-yellow-600' },
    { icon: CheckCircle, label: 'Success Rate', value: '98%', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+45%', color: 'text-blue-600' },
    { icon: Heart, label: 'Client Satisfaction', value: '97%', color: 'text-red-600' }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main trust indicators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {indicators.map((indicator, index) => (
            <div
              key={indicator.title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${indicator.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${indicator.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <indicator.icon className="h-8 w-8 text-white" />
                </div>

                {/* Stat */}
                <div className={`text-3xl font-bold bg-gradient-to-r ${indicator.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {indicator.stat}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {indicator.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {indicator.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Trusted by Professionals and Clients Worldwide</h3>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Our platform connects you with the best professionals while ensuring quality, security, and satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {testimonialStats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-white group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;