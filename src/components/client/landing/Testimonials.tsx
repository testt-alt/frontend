import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Award } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      role: 'Marketing Director',
      company: 'TechCorp Inc.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'ProBooking completely transformed how I find and work with professionals. I found an amazing business consultant who helped increase our revenue by 40%. The platform is intuitive and the quality of professionals is outstanding.',
      service: 'Business Consulting',
      date: 'December 2024',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      company: 'StartupXYZ',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'As someone who values efficiency, ProBooking is a game-changer. I booked a financial advisor in minutes, and the entire process was seamless. The professional was exactly what I needed, and the results speak for themselves.',
      service: 'Financial Planning',
      date: 'November 2024',
      verified: true
    },
    {
      id: 3,
      name: 'Sarah Thompson',
      role: 'Small Business Owner',
      company: 'Thompson Designs',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'I was struggling with legal issues for my business until I found ProBooking. The lawyer I connected with was professional, knowledgeable, and helped me resolve everything quickly. Highly recommend this platform!',
      service: 'Legal Consultation',
      date: 'October 2024',
      verified: true
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Freelance Designer',
      company: 'Independent',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The therapist I found through ProBooking has been life-changing. The booking process was simple, and I love how I can read reviews and choose based on specialties. This platform truly cares about matching clients with the right professionals.',
      service: 'Therapy Session',
      date: 'September 2024',
      verified: true
    },
    {
      id: 5,
      name: 'Emily Johnson',
      role: 'College Student',
      company: 'University of California',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Finding a math tutor through ProBooking was the best decision I made this semester. The platform made it easy to find someone within my budget, and my grades have improved dramatically. Thank you ProBooking!',
      service: 'Math Tutoring',
      date: 'August 2024',
      verified: true
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-800 transition-all duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full mb-6">
            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">Client Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied clients who have found their perfect professional match
          </p>
        </div>

        {/* Main testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden animate-fade-in-up">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-yellow-100 dark:from-pink-900/20 dark:to-yellow-900/20 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative z-10">
              {/* Quote icon */}
              <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 opacity-50" />
              
              {/* Testimonial text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                "{current.text}"
              </blockquote>
              
              {/* Client info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                    />
                    {current.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {current.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {current.role} at {current.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {current.service} • {current.date}
                    </p>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Verified Review
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 group"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mx-auto" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 group"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mx-auto" />
          </button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentTestimonial
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Auto-play control */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
              isAutoPlaying
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Play className={`h-4 w-4 ${isAutoPlaying ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;