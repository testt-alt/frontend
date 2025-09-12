import React, { useState } from 'react';
import { GraduationCap, Award, MapPin, Calendar, Clock, Users, Star, TrendingUp, BookOpen, Briefcase, Heart, Shield } from 'lucide-react';

interface ProfileDetailsProps {
  professionalId: number;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ professionalId }) => {
  const [activeTab, setActiveTab] = useState('experience');

  // Mock data
  const professional = {
    education: [
      {
        degree: 'Doctor of Medicine (MD)',
        institution: 'Harvard Medical School',
        year: '2006',
        description: 'Graduated Magna Cum Laude with specialization in Cardiovascular Medicine'
      },
      {
        degree: 'Bachelor of Science in Biology',
        institution: 'Stanford University',
        year: '2002',
        description: 'Pre-medical track with honors in Molecular Biology'
      }
    ],
    experience: [
      {
        position: 'Senior Cardiac Surgeon',
        institution: 'NewYork-Presbyterian Hospital',
        period: '2015 - Present',
        description: 'Leading cardiac surgery department with over 500 successful procedures annually'
      },
      {
        position: 'Interventional Cardiologist',
        institution: 'Mount Sinai Hospital',
        period: '2010 - 2015',
        description: 'Specialized in minimally invasive cardiac procedures and emergency interventions'
      },
      {
        position: 'Cardiology Fellow',
        institution: 'Mayo Clinic',
        period: '2008 - 2010',
        description: 'Advanced fellowship in interventional cardiology and cardiac imaging'
      }
    ],
    certifications: [
      {
        name: 'Board Certified Cardiologist',
        issuer: 'American Board of Internal Medicine',
        year: '2008',
        status: 'Active'
      },
      {
        name: 'Fellow of American Heart Association',
        issuer: 'American Heart Association',
        year: '2012',
        status: 'Active'
      },
      {
        name: 'Interventional Cardiology Specialist',
        issuer: 'Society for Cardiovascular Angiography',
        year: '2010',
        status: 'Active'
      }
    ],
    specializations: [
      'Cardiac Surgery',
      'Interventional Cardiology',
      'Preventive Cardiology',
      'Cardiac Imaging',
      'Heart Failure Management',
      'Arrhythmia Treatment'
    ],
    achievements: [
      {
        title: 'Top Doctor Award',
        year: '2023',
        description: 'Recognized as one of the top cardiologists in New York'
      },
      {
        title: 'Excellence in Patient Care',
        year: '2022',
        description: 'Outstanding patient satisfaction scores and clinical outcomes'
      },
      {
        title: 'Research Publication Award',
        year: '2021',
        description: 'Published groundbreaking research in cardiac intervention techniques'
      }
    ],
    stats: [
      { icon: Users, label: 'Patients Treated', value: '2,500+', color: 'from-blue-500 to-cyan-500' },
      { icon: Calendar, label: 'Years of Experience', value: '18+', color: 'from-purple-500 to-pink-500' },
      { icon: Award, label: 'Success Rate', value: '98%', color: 'from-green-500 to-emerald-500' },
      { icon: Star, label: 'Patient Rating', value: '4.9/5', color: 'from-yellow-500 to-orange-500' }
    ]
  };

  const tabs = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'specializations', label: 'Specializations', icon: Heart }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {professional.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8 py-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'experience' && (
              <div className="space-y-8 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Experience</h3>
                {professional.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {exp.position}
                        </h4>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{exp.institution}</span>
                          <span className="text-gray-500 dark:text-gray-400">{exp.period}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-8 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Educational Background</h3>
                {professional.education.map((edu, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-800 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {edu.degree}
                        </h4>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">{edu.institution}</span>
                          <span className="text-gray-500 dark:text-gray-400">{edu.year}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="space-y-8 animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Certifications & Licenses</h3>
                {professional.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-green-50 to-white dark:from-green-900/10 dark:to-gray-800 rounded-2xl p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {cert.name}
                          </h4>
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-green-600 dark:text-green-400 font-semibold">{cert.issuer}</span>
                            <span className="text-gray-500 dark:text-gray-400">{cert.year}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specializations' && (
              <div className="animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Areas of Specialization</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {professional.specializations.map((spec, index) => (
                    <div
                      key={spec}
                      className="group bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {spec}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="mt-12">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Achievements</h4>
                  <div className="space-y-4">
                    {professional.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-xl border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                            {achievement.title}
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                        <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                          {achievement.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;