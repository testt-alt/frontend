import React, { useState } from 'react';
import { Edit, MapPin, Globe, Phone, Mail, Calendar, Clock, Award, Star, Heart, Users, TrendingUp, Briefcase, GraduationCap, AlignCenterVertical as Certificate, BookOpen, Target, Zap, Crown, Trophy, Medal, Sparkles, Camera, Video, Mic, Palette, Scissors, Brush, Wand2 } from 'lucide-react';

const ProfileAbout: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const personalInfo = {
    bio: "Passionate hair stylist with over 8 years of experience in creating stunning looks that enhance natural beauty. Specialized in modern cuts, color treatments, and styling for special occasions. I believe in building lasting relationships with my clients and helping them feel confident and beautiful.",
    location: "123 Beauty Street, New York, NY 10001",
    website: "www.johnprofessional.com",
    phone: "+1 (555) 123-4567",
    email: "john@probooking.com",
    joinDate: "March 2016",
    languages: ["English", "Spanish", "French"]
  };

  const skills = [
    { name: 'Hair Cutting', level: 95, icon: Scissors, color: 'from-blue-500 to-cyan-600' },
    { name: 'Color Treatment', level: 92, icon: Palette, color: 'from-purple-500 to-pink-600' },
    { name: 'Hair Styling', level: 88, icon: Brush, color: 'from-green-500 to-emerald-600' },
    { name: 'Bridal Hair', level: 85, icon: Crown, color: 'from-yellow-500 to-orange-600' },
    { name: 'Beard Grooming', level: 90, icon: Wand2, color: 'from-red-500 to-pink-600' },
    { name: 'Hair Extensions', level: 78, icon: Sparkles, color: 'from-indigo-500 to-purple-600' },
    { name: 'Keratin Treatment', level: 82, icon: Zap, color: 'from-orange-500 to-red-600' },
    { name: 'Hair Consultation', level: 96, icon: Users, color: 'from-teal-500 to-cyan-600' }
  ];

  const experience = [
    {
      title: 'Senior Hair Stylist',
      company: 'Luxe Beauty Salon',
      period: '2020 - Present',
      description: 'Leading stylist specializing in premium cuts and color treatments for high-end clientele. Mentoring junior stylists and developing new service offerings.',
      icon: Briefcase,
      color: 'from-blue-500 to-purple-600',
      achievements: ['Increased salon revenue by 35%', 'Trained 12 junior stylists', 'Developed signature color technique']
    },
    {
      title: 'Hair Stylist',
      company: 'Urban Style Studio',
      period: '2018 - 2020',
      description: 'Provided comprehensive hair services including cuts, colors, and styling. Built strong client relationships and maintained high satisfaction ratings.',
      icon: Scissors,
      color: 'from-green-500 to-emerald-600',
      achievements: ['Maintained 4.9+ rating', 'Served 500+ clients', 'Specialized in modern cuts']
    },
    {
      title: 'Junior Stylist',
      company: 'Beauty First Salon',
      period: '2016 - 2018',
      description: 'Started career learning fundamental techniques and building client base. Focused on perfecting cutting and basic coloring skills.',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-600',
      achievements: ['Completed advanced training', 'Built loyal client base', 'Earned promotion in 18 months']
    }
  ];

  const certifications = [
    {
      name: 'Advanced Color Theory Certification',
      issuer: 'Aveda Institute',
      date: '2023',
      icon: Certificate,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Master Cutting Techniques',
      issuer: 'Vidal Sassoon Academy',
      date: '2022',
      icon: Award,
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Bridal Hair Specialist',
      issuer: 'International Beauty Academy',
      date: '2021',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      name: 'Keratin Treatment Expert',
      issuer: 'Brazilian Blowout Certification',
      date: '2020',
      icon: Zap,
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const services = [
    { name: 'Premium Hair Cut', price: '$85', duration: '90 min', popular: true },
    { name: 'Full Color Treatment', price: '$150', duration: '3 hours', popular: true },
    { name: 'Highlights & Lowlights', price: '$120', duration: '2.5 hours', popular: false },
    { name: 'Bridal Hair Package', price: '$300', duration: '4 hours', popular: true },
    { name: 'Beard Trim & Style', price: '$35', duration: '45 min', popular: false },
    { name: 'Keratin Treatment', price: '$200', duration: '3.5 hours', popular: false }
  ];

  const portfolio = [
    { 
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Modern Bob Cut',
      category: 'Hair Cut',
      likes: 45
    },
    { 
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Balayage Highlights',
      category: 'Color',
      likes: 62
    },
    { 
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Bridal Updo',
      category: 'Styling',
      likes: 78
    },
    { 
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Pixie Cut',
      category: 'Hair Cut',
      likes: 34
    }
  ];

  return (
    <div className="space-y-8">
      {/* About Me Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Me</h2>
              <p className="text-gray-600 dark:text-gray-400">Professional background and expertise</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300 hover:scale-105"
          >
            <Edit className="w-4 h-4" />
            <span className="font-medium">Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
              {personalInfo.bio}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{personalInfo.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group">
                <Globe className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{personalInfo.website}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group">
                <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{personalInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group">
                <Mail className="w-5 h-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{personalInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Joined {personalInfo.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Languages: {personalInfo.languages.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Usually responds in 2 hours</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {['Hair Cutting', 'Color Treatment', 'Bridal Hair', 'Styling'].map((specialty, index) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 animate-in slide-in-from-bottom-4 duration-1000"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills & Expertise</h2>
              <p className="text-gray-600 dark:text-gray-400">Professional competencies and skill levels</p>
            </div>
          </div>
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300 hover:scale-105"
          >
            {showAllSkills ? 'Show Less' : 'Show All'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.slice(0, showAllSkills ? skills.length : 6).map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-bottom-4 duration-1000"
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000 delay-400">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h2>
              <p className="text-gray-600 dark:text-gray-400">Professional journey and career highlights</p>
            </div>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-l-0 last:pb-0 group animate-in slide-in-from-left-4 duration-1000"
                  style={{ animationDelay: `${index * 200 + 500}ms` }}
                >
                  <div className={`absolute -left-6 top-0 w-12 h-12 rounded-xl bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {exp.title}
                      </h3>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-400">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h2>
              <p className="text-gray-600 dark:text-gray-400">Professional credentials and qualifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-right-4 duration-1000"
                  style={{ animationDelay: `${index * 150 + 500}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cert.color} flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{cert.date}</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse group-hover:animate-spin" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services & Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Services */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-left-4 duration-1000 delay-600">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
              <p className="text-gray-600 dark:text-gray-400">Professional services and pricing</p>
            </div>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 group animate-in slide-in-from-left-4 duration-1000"
                style={{ animationDelay: `${index * 100 + 700}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {service.name}
                    </h3>
                    {service.popular && (
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-3xl transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 delay-600">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h2>
              <p className="text-gray-600 dark:text-gray-400">Recent work and creations</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {portfolio.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer animate-in slide-in-from-right-4 duration-1000"
                style={{ animationDelay: `${index * 150 + 700}ms` }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-sm">{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;