import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Star, 
  CreditCard, 
  User, 
  Settings,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Search,
  Home,
  Scissors
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useApp } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/auth/AuthContext';

interface ProfessionalNavbarProps {
  onLogoClick?: () => void;
  showBackToLanding?: boolean;
  isLandingPage?: boolean;
}

const ProfessionalNavbar: React.FC<ProfessionalNavbarProps> = ({ onLogoClick, showBackToLanding = false, isLandingPage = false }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const appContext = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: 'home', icon: Home },
    { name: 'My Profile', href: 'My Profile', icon: User },
    { name: 'My Services', href: 'My Services', icon: Scissors },
    { name: 'My Calendar', href: 'My Calendar', icon: Calendar },
    { name: 'My Appointments', href: 'My Appointments', icon: Clock },
    { name: 'My Reviews', href: 'My Reviews', icon: Star },
    { name: 'My Subscription', href: 'My Subscription', icon: CreditCard }
  ];

  const notifications = [
    { id: 1, title: 'New Appointment', message: 'Sarah Johnson booked a hair cut for tomorrow at 2:00 PM', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment Received', message: 'Payment of $85 has been successfully processed', time: '1 hour ago', unread: true },
    { id: 3, title: 'Review Received', message: 'Michael Chen left a 5-star review for your service', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const currentModule = appContext?.currentModule || 'home';
  const setCurrentModule = appContext?.setCurrentModule;

  const handleModuleChange = (moduleName: string) => {
    if (moduleName === 'home') {
      // Handle home navigation
      if (setCurrentModule) {
        setCurrentModule('home');
      }
      if (onLogoClick) {
        onLogoClick();
      }
    } else {
      // For non-home modules, always set the module first
      if (setCurrentModule) {
        setCurrentModule(moduleName);
      }
      // If we're on landing page, we need to trigger navigation away from landing
      if (isLandingPage && onLogoClick) {
        // Call onLogoClick to trigger the parent to switch away from landing mode
        onLogoClick();
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  const getUserDisplayInfo = () => {
    if (!user) return { initials: 'U', name: 'User', role: 'Guest' };
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      initials,
      name: user.name,
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1)
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button 
              onClick={onLogoClick}
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl p-2 -m-2"
            >
              <div className="relative">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                <div className="absolute inset-0 bg-blue-600/20 rounded-full scale-0 group-hover:scale-200 transition-transform duration-700 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProBooking
              </span>
            </button>
          </div>

          {/* Navigation Items - Only show on larger screens and when not on landing page */}
          {!isLandingPage && (
            <div className="hidden xl:block flex-1 max-w-4xl mx-8">
              <div className="flex items-center justify-center space-x-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.href === 'home' ? currentModule === 'home' : currentModule === item.href;
                  
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleModuleChange(item.href)}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg hover:scale-105 group ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-white/60 dark:bg-gray-800/60 shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <Icon className="h-4 w-4 inline mr-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="hidden lg:inline">{item.name}</span>
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right side items */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Search Button - Hidden on small screens */}
            <button className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md group backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
              <Search className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:rotate-12 duration-300" />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors hidden xl:inline">Search</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 hover:shadow-md group border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
              >
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:animate-bounce" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 animate-in slide-in-from-top-2 duration-200 z-50 backdrop-blur-xl">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-blue-50 dark:bg-blue-900/10' : ''
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
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
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
              className="p-2 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 hover:shadow-md group border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-700" />
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 hover:scale-105 hover:shadow-md group border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-white dark:ring-gray-700 group-hover:ring-blue-400 transition-all duration-300">
                  <span className="text-white font-medium text-sm">{userInfo.initials}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userInfo.role}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 animate-in slide-in-from-top-2 duration-200 z-50 backdrop-blur-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium">{userInfo.initials}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{userInfo.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        handleModuleChange('My Profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && !isLandingPage && (
          <div className="xl:hidden mt-4 pb-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === 'home' ? currentModule === 'home' : currentModule === item.href;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => handleModuleChange(item.href)}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-white/60 dark:bg-gray-800/60'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ProfessionalNavbar;