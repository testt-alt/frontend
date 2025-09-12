import React from 'react';
import { User, Settings, Calendar, Clock, Star, CreditCard, ArrowRight, Sparkles, TrendingUp, Shield, BarChart3, Scissors, MessageCircle } from 'lucide-react';
import { useApp } from '../../../contexts/AppContext';

interface ProfessionalModulesProps {
  onModuleClick?: (page: string) => void;
}

const ProfessionalModules: React.FC<ProfessionalModulesProps> = ({ onModuleClick }) => {
  const appContext = useApp();
  const setCurrentModule = appContext?.setCurrentModule;

  const modules = [
    {
      icon: User,
      title: 'My Profile',
      moduleName: 'My Profile',
      description: 'Manage your personal and professional information',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      features: ['Personal information', 'Certifications', 'Work schedules']
    },
    {
      icon: Scissors,
      title: 'My Services',
      moduleName: 'My Services',
      description: 'Manage your services and pricing',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      features: ['Service catalog', 'Dynamic pricing', 'Categorization']
    },
    {
      icon: Calendar,
      title: 'My Calendar',
      moduleName: 'My Calendar',
      description: 'Visualize and organize your schedule',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      features: ['Monthly/weekly view', 'Synchronization', 'Reminders']
    },
    {
      icon: Clock,
      title: 'My Appointments',
      moduleName: 'My Appointments',
      description: 'Manage all your appointments and clients',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      features: ['Complete management', 'Appointment status', 'Detailed history']
    },
    {
      icon: MessageCircle,
      title: 'My Reviews',
      moduleName: 'My Reviews',
      description: 'Monitor your client satisfaction',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      features: ['Ratings', 'Comments', 'Trend analysis']
    },
    {
      icon: CreditCard,
      title: 'My Subscription',
      moduleName: 'My Subscription',
      description: 'Manage your plan and billing',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      features: ['Flexible plans', 'Billing', 'Premium support']
    }
  ];

  const handleModuleClick = (module: typeof modules[0]) => {
    setCurrentModule?.(module.moduleName);
    if (onModuleClick) {
      onModuleClick(module.moduleName);
    }
  };

  return (
    <section id="modules" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Professional Modules</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need in one place
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the professional tools that will help you manage your practice efficiently and grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div
                key={module.title}
                onClick={() => handleModuleClick(module)}
                className={`group bg-gradient-to-br ${module.bgColor} rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom-4 duration-1000 cursor-pointer`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                  {module.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {module.description}
                </p>

                <div className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-600/50">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleClick(module);
                    }}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${module.color} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 opacity-0 group-hover:opacity-100`}
                  >
                    Explore Module
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: TrendingUp,
              title: 'Advanced Analytics',
              description: 'Get detailed insights about your business',
              color: 'from-green-500 to-emerald-600'
            },
            {
              icon: Shield,
              title: 'Premium Security',
              description: 'Your data protected with enterprise-level encryption',
              color: 'from-blue-500 to-cyan-600'
            },
            {
              icon: Sparkles,
              title: 'Constant Updates',
              description: 'New features every month at no additional cost',
              color: 'from-purple-500 to-pink-600'
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${(index + 6) * 150}ms` }}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalModules;