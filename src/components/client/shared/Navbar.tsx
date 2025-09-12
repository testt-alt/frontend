import React, { useState, useEffect } from 'react';
import { Search, User, LogIn, Moon, Sun, Calendar, Menu, X, Bell, ChevronDown, Settings, LogOut, Home, Star, CreditCard } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/auth/AuthContext';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'home', icon: Home },
    { name: 'Professionals', href: 'professionals', icon: User },
    { name: 'Payments', href: 'payments', icon: CreditCard },
    { name: 'Appointments', href: 'appointments', icon: Calendar },
    { name: 'Reviews', href: 'reviews', icon: Star },
  ];

  const notifications = [
    { id: 1, title: 'Appointment Confirmed', message: 'Your appointment with Dr. Smith is confirmed for tomorrow at 2:00 PM', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment Processed', message: 'Payment of $150 has been successfully processed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Review Reminder', message: 'Please review your recent appointment with Sarah Johnson', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  const getUserDisplayInfo = () => {
    if (!user) return { initials: 'U', name: 'User' };
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      initials,
      name: user.name
    };
  };

  const userInfo = getUserDisplayInfo();

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <Calendar className="h-12 w-12 text-primary-600 dark:text-primary-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                <div className="absolute inset-0 bg-primary-600/20 rounded-full scale-0 group-hover:scale-200 transition-transform duration-700 animate-pulse"></div>
              </div>
              <span className="text-3xl font-bold text-gradient">
                ProBooking
              </span>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-xl hover:scale-110 group animate-fade-in-up ${
                    currentPage === item.href
                      ? 'text-primary-600 dark:text-primary-400 bg-white/60 dark:bg-gray-800/60'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className="h-4 w-4 inline mr-2 group-hover:scale-125 transition-transform duration-300" />
                  {item.name}
                  {/* Indicador activo */}
                  {currentPage === item.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full animate-fade-in-up"></div>
                  )}
                  {/* Indicador hover */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full w-0 group-hover:w-full transition-all duration-300 opacity-50"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-xl group backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors group-hover:rotate-12 duration-300" />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Search</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500 hover:scale-110 hover:shadow-xl group border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
              >
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors group-hover:animate-bounce" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 animate-fade-in-up z-50 backdrop-blur-xl">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500 hover:scale-110 hover:shadow-xl group border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-6 w-6 text-yellow-500 group-hover:rotate-180 group-hover:scale-125 transition-transform duration-700" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:rotate-180 group-hover:scale-125 transition-transform duration-700" />
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500 hover:scale-105 hover:shadow-xl group border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
              >
                <img
                  src={user?.avatar || "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face"}
                  alt={userInfo.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 group-hover:ring-blue-400 transition-all duration-300"
                />
                <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 animate-fade-in-up z-50 backdrop-blur-xl">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{userInfo.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <a
                      href="#profile"
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-500 ${
                    currentPage === item.href
                      ? 'text-primary-600 dark:text-primary-400 bg-white/60 dark:bg-gray-800/60'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;