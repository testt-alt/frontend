import React from 'react';
import { Calendar, Clock, MapPin, Video, Phone, User, ArrowRight } from 'lucide-react';

interface UpcomingAppointmentsProps {
  onNavigate?: (page: string) => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ onNavigate }) => {
  const appointments = [
    {
      id: 1,
      professional: 'Dr. Emily Davis',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:00 PM',
      type: 'Video Call',
      location: 'Online',
      avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      status: 'confirmed',
      duration: '30 min'
    },
    {
      id: 2,
      professional: 'James Wilson',
      specialty: 'Corporate Lawyer',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'In Person',
      location: 'Downtown Office',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      status: 'confirmed',
      duration: '60 min'
    },
    {
      id: 3,
      professional: 'Sarah Johnson',
      specialty: 'Financial Advisor',
      date: 'Dec 28',
      time: '3:30 PM',
      type: 'Phone Call',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      status: 'pending',
      duration: '45 min'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return Video;
      case 'Phone Call':
        return Phone;
      default:
        return MapPin;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mb-6">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-blue-800 dark:text-blue-300 font-medium">Your Schedule</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Appointments</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay organized with your scheduled appointments and never miss an important meeting
          </p>
        </div>

        {/* Appointments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((appointment, index) => {
            const TypeIcon = getTypeIcon(appointment.type);
            
            return (
              <div
                key={appointment.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  {/* Status badge */}
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)} capitalize`}>
                      {appointment.status}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{appointment.date}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.time}</p>
                    </div>
                  </div>

                  {/* Professional info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={appointment.avatar}
                        alt={appointment.professional}
                        className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-500"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {appointment.professional}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {appointment.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Appointment details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                        <TypeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.type}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                        <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Duration</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg group/btn">
                      <span className="flex items-center justify-center">
                        Join Meeting
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                    <button className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-500 hover:scale-105">
                      Details
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-800">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need to Schedule More Appointments?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Browse our network of verified professionals and book your next appointment instantly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onNavigate && onNavigate('professionals')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-500 hover:scale-105"
                >
                  <User className="mr-2 h-5 w-5" />
                  Browse Professionals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingAppointments;