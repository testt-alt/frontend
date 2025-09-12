import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Heart, Share2, MessageCircle, Video, Phone, Award, CheckCircle, Users, TrendingUp, Shield } from 'lucide-react';

interface ProfileHeroProps {
  professionalId: number;
  onNavigate?: (page: string) => void;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ professionalId, onNavigate }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock data - would come from API
  const professional = {
    id: 1,
    name: 'Dr. Alexandra Chen',
    specialty: 'Cardiologist',
    title: 'Senior Cardiac Surgeon & Interventional Cardiologist',
    rating: 4.9,
    reviews: 456,
    experience: '18+ years',
    location: 'New York, NY',
    languages: ['English', 'Spanish', 'Mandarin'],
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop&crop=face',
    coverImage: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop',
    verified: true,
    responseTime: '< 15 min',
    consultationFee: '$200',
    availability: 'Available Today',
    totalPatients: '2,500+',
    successRate: '98%',
    badges: ['Top Rated', 'Quick Response', 'Verified Expert'],
    consultationTypes: ['Video Call', 'In-Person', 'Phone Call'],
    bio: 'Leading cardiologist with over 18 years of experience in cardiac surgery and interventional cardiology. Specialized in minimally invasive procedures and preventive cardiac care.',
    education: [
      'MD - Harvard Medical School',
      'Residency - Johns Hopkins Hospital',
      'Fellowship - Mayo Clinic'
    ],
    certifications: [
      'Board Certified Cardiologist',
      'American Heart Association Fellow',
      'Interventional Cardiology Specialist'
    ]
  };

  const stats = [
    { icon: Users, label: 'Patients Treated', value: professional.totalPatients, color: 'text-blue-600' },
    { icon: Star, label: 'Average Rating', value: professional.rating.toString(), color: 'text-yellow-600' },
    { icon: Award, label: 'Success Rate', value: professional.successRate, color: 'text-green-600' },
    { icon: Clock, label: 'Response Time', value: professional.responseTime, color: 'text-purple-600' }
  ];

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Cover Image */}
      <div className="absolute inset-0">
        <img
          src={professional.coverImage}
          alt="Professional background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-32 right-20 animate-float animation-delay-1000">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-white font-medium">Verified</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-20 animate-float animation-delay-2000">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">Top Rated</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Professional Info */}
          <div className="lg:col-span-2 animate-fade-in-up">
            {/* Professional Image and Basic Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
              <div className="relative group">
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="h-32 w-32 rounded-3xl object-cover ring-6 ring-white/50 shadow-2xl group-hover:scale-110 transition-all duration-500"
                />
                {professional.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 ring-4 ring-white/50">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                )}
                <div className="absolute -top-2 -left-2 bg-green-500 rounded-full p-2 ring-4 ring-white/50 animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {professional.badges.map((badge, index) => (
                    <span
                      key={badge}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-fade-in-up"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in-up animation-delay-300">
                  {professional.name}
                </h1>
                
                <h2 className="text-xl md:text-2xl text-blue-200 font-semibold mb-4 animate-fade-in-up animation-delay-500">
                  {professional.title}
                </h2>

                <div className="flex flex-wrap items-center gap-6 text-white/90 animate-fade-in-up animation-delay-700">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-green-400" />
                    <span>{professional.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(professional.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{professional.rating}</span>
                    <span className="text-white/70">({professional.reviews} reviews)</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2 mt-4 animate-fade-in-up animation-delay-1000">
                  <span className="text-white/70">Languages:</span>
                  {professional.languages.map((lang, index) => (
                    <span key={lang} className="px-2 py-1 bg-white/20 text-white text-sm rounded-lg">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 animate-fade-in-up animation-delay-1200">
              <h3 className="text-2xl font-bold text-white mb-4">About Dr. Chen</h3>
              <p className="text-white/90 leading-relaxed text-lg">
                {professional.bio}
              </p>
            </div>
          </div>

          {/* Right Column - Actions and Stats */}
          <div className="space-y-6 animate-fade-in-up animation-delay-500">
            {/* Action Buttons */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">{professional.consultationFee}</div>
                <div className="text-white/70">per consultation</div>
                <div className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  {professional.availability}
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => onNavigate && onNavigate('booking')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group"
                >
                  <Calendar className="h-5 w-5 inline mr-2 group-hover:animate-bounce" />
                  Book Appointment
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <button className="flex flex-col items-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 group">
                    <Video className="h-6 w-6 text-blue-400 mb-1 group-hover:scale-125 transition-transform" />
                    <span className="text-xs text-white">Video</span>
                  </button>
                  <button className="flex flex-col items-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 group">
                    <Phone className="h-6 w-6 text-green-400 mb-1 group-hover:scale-125 transition-transform" />
                    <span className="text-xs text-white">Call</span>
                  </button>
                  <button className="flex flex-col items-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105 group">
                    <MessageCircle className="h-6 w-6 text-purple-400 mb-1 group-hover:scale-125 transition-transform" />
                    <span className="text-xs text-white">Chat</span>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex-1 flex items-center justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Heart className={`h-5 w-5 mr-2 transition-all duration-300 ${isFavorite ? 'text-red-400 fill-current' : 'text-white'}`} />
                    <span className="text-white text-sm">Save</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                    <Share2 className="h-5 w-5 mr-2 text-white" />
                    <span className="text-white text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Professional Stats</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-xl">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <span className="text-white/90">{stat.label}</span>
                    </div>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-6 border border-green-400/30 animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Quick Response Guarantee</h4>
                  <p className="text-green-200 text-sm">Responds within {professional.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;