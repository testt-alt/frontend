import React from 'react';
import { User, CreditCard, Star, Calendar, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';

interface ModuleCardsProps {
  onNavigate?: (page: string) => void;
}

const ModuleCards: React.FC<ModuleCardsProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'professionals',
      icon: User,
      title: 'Find Professionals',
      description: 'Discover and connect with verified professionals across all industries and specialties.',
      features: ['Advanced search filters', 'Verified profiles', 'Real-time availability', 'Instant messaging'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10',
      delay: 0
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Handle all your payments securely with multiple payment options and transparent pricing.',
      features: ['Multiple payment methods', 'Secure transactions', 'Automatic invoicing', 'Payment history'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10',
      delay: 200
    },
    {
      id: 'reviews',
      icon: Star,
      title: 'Reviews & Ratings',
      description: 'Read authentic reviews and ratings from real clients to make informed decisions.',
      features: ['Verified reviews', 'Rating system', 'Detailed feedback', 'Photo reviews'],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10',
      delay: 400
    },
    {
      id: 'appointments',
      icon: Calendar,
      title: 'Appointment Management',
      description: 'Book, manage, and track all your appointments in one convenient location.',
      features: ['Real-time booking', 'Calendar integration', 'Reminders & notifications', 'Rescheduling options'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10',
      delay: 600
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">Platform Modules</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Powerful Features</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how each module works together to provide you with the ultimate professional booking experience
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${module.delay}ms` }}
              onClick={() => onNavigate && onNavigate(module.id)}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${module.color} rounded-3xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <module.icon className="h-10 w-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                  {module.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-500">
                  {module.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {module.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500"
                      style={{ animationDelay: `${module.delay + (featureIndex * 100)}ms` }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${module.color} rounded-full mr-3 group-hover:scale-150 transition-transform duration-500`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Explore button - appears on hover */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button 
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${module.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 group/btn`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate && onNavigate(module.id);
                    }}
                  >
                    <span>Explore Module</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-800">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 text-blue-400 mr-4" />
                <Clock className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Secure, Fast, and Reliable
              </h3>
              <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
                All modules work seamlessly together with enterprise-grade security, 
                lightning-fast performance, and 99.9% uptime guarantee
              </p>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">256-bit</div>
                  <div className="text-gray-400">SSL Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">&lt;2s</div>
                  <div className="text-gray-400">Average Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-gray-400">Uptime Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleCards;