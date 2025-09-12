import React from 'react';
import { Clock, Calendar, MapPin, Video, Phone, Bell, AlertCircle, CheckCircle } from 'lucide-react';

const UpcomingReminders: React.FC = () => {
  const upcomingAppointments = [
    {
      id: 1,
      professional: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:00 PM',
      timeUntil: 'In 3 hours',
      type: 'Video Call',
      location: 'Online',
      avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      status: 'confirmed',
      duration: '45 min',
      priority: 'high',
      notes: 'Bring recent test results'
    },
    {
      id: 2,
      professional: 'James Rodriguez',
      specialty: 'Corporate Lawyer',
      date: 'Tomorrow',
      time: '10:00 AM',
      timeUntil: 'In 1 day',
      type: 'In Person',
      location: 'Downtown Office',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      status: 'confirmed',
      duration: '60 min',
      priority: 'medium',
      notes: 'Contract review meeting'
    },
    {
      id: 3,
      professional: 'Dr. Emily Chen',
      specialty: 'Clinical Psychologist',
      date: 'Dec 28',
      time: '3:30 PM',
      timeUntil: 'In 3 days',
      type: 'Phone Call',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      status: 'pending',
      duration: '50 min',
      priority: 'low',
      notes: 'Follow-up session'
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
      default:
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full mb-6">
            <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2 animate-pulse" />
            <span className="text-orange-800 dark:text-orange-300 font-medium">Upcoming Reminders</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Don't Miss Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Appointments</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay on top of your schedule with smart reminders and notifications
          </p>
        </div>

        {/* Upcoming appointments */}
        <div className="space-y-6">
          {upcomingAppointments.map((appointment, index) => {
            const TypeIcon = getTypeIcon(appointment.type);
            
            return (
              <div
                key={appointment.id}
                className={`group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border-l-4 ${getPriorityColor(appointment.priority)} animate-fade-in-up relative overflow-hidden`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    {/* Left side - Appointment info */}
                    <div className="flex items-start space-x-6 mb-6 lg:mb-0">
                      {/* Professional avatar */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={appointment.avatar}
                          alt={appointment.professional}
                          className="h-20 w-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-500 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* Appointment details */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {appointment.professional}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)} capitalize`}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                          {appointment.specialty}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {appointment.date} at {appointment.time}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {appointment.timeUntil}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                              <TypeIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {appointment.type}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {appointment.location}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                              <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Duration: {appointment.duration}
                              </p>
                            </div>
                          </div>

                          {appointment.notes && (
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
                                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  Note: {appointment.notes}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex flex-col space-y-3 lg:ml-6">
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Join Meeting
                      </button>
                      <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                        Reschedule
                      </button>
                      <button className="px-6 py-3 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 font-medium rounded-xl transition-all duration-300 hover:scale-105">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Priority indicator */}
                <div className="absolute top-4 right-4">
                  {appointment.priority === 'high' && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                  {appointment.priority === 'medium' && (
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification settings */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10 text-center">
            <Bell className="h-12 w-12 text-white mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Never Miss an Appointment Again
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get personalized reminders via email, SMS, or push notifications. Customize your reminder preferences to stay perfectly organized.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Manage Notifications
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingReminders;