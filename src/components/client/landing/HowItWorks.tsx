import React from 'react';
import { Search, UserCheck, Calendar, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search & Discover',
      description: 'Browse through thousands of verified professionals across all industries and specialties.',
      details: ['Advanced search filters', 'Verified professional profiles', 'Real-time availability'],
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      delay: 0
    },
    {
      icon: UserCheck,
      title: 'Choose Your Professional',
      description: 'Select the perfect professional based on their expertise, reviews, and availability.',
      details: ['Detailed professional profiles', 'Verified credentials', 'Client testimonials'],
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      delay: 200
    },
    {
      icon: Calendar,
      title: 'Book Instantly',
      description: 'Schedule your appointment with just a few clicks. Choose your preferred time and date.',
      details: ['One-click booking', 'Instant confirmation', 'Flexible scheduling'],
      color: 'from-green-500 to-teal-500',
      bgGradient: 'from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20',
      delay: 400
    },
    {
      icon: CheckCircle,
      title: 'Meet & Review',
      description: 'Attend your appointment and share your experience to help other clients.',
      details: ['Multiple meeting options', 'Secure payments', 'Share your experience'],
      color: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      delay: 600
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 transition-all duration-500 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-green-200 to-teal-200 dark:from-green-800/20 dark:to-teal-800/20 rounded-full opacity-20 animate-blob"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">How It Works</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Book Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Appointment </span>
            <br />in 4 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our streamlined process makes it easy to find and book appointments with top professionals
          </p>
        </div>

        {/* Steps */}
        <div className="relative z-10">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-300 via-purple-300 via-green-300 to-orange-300 dark:from-blue-700 dark:via-purple-700 dark:via-green-700 dark:to-orange-700 transform -translate-y-1/2 rounded-full opacity-60"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative animate-fade-in-up group"
                style={{ animationDelay: `${step.delay}ms` }}
              >
                {/* Step card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 border border-gray-200 dark:border-gray-700 relative overflow-hidden h-full">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-r from-white to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center font-bold text-lg text-gray-600 dark:text-gray-300 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg border-2 border-gray-200 dark:border-gray-600">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  {/* Details list */}
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-500"
                      >
                        <div className={`w-3 h-3 bg-gradient-to-r ${step.color} rounded-full mr-4 group-hover:scale-150 transition-transform duration-500 shadow-sm`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Connection arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 group-hover:scale-125 group-hover:rotate-90 transition-all duration-500">
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-500" />
                      </div>
                    </div>
                  )}

                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-tr from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-20 animate-fade-in-up animation-delay-800 relative z-10">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied clients who have found their perfect professional match
              </p>
              <button className="px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl text-lg">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;