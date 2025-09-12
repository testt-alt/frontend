import React, { useState } from 'react';
import { Calendar, User, Shield, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Crown, Star, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { UserRole, LoginCredentials } from '../../types/auth';
import { validateEmail, validatePassword } from '../../utils/auth';

const LoginScreen: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('professional');
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'professional'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{email?: string; password?: string}>({});

  const userTypes = [
    {
      role: 'professional' as UserRole,
      title: 'Professional',
      subtitle: 'Manage your practice',
      description: 'Manage appointments, clients and professional services',
      icon: User,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      demoEmail: 'john@probooking.com',
      features: ['Appointment management', 'Service control', 'Business analytics']
    },
    {
      role: 'client' as UserRole,
      title: 'Client',
      subtitle: 'Book services',
      description: 'Find and book appointments with professionals',
      icon: Calendar,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      demoEmail: 'sarah@email.com',
      features: ['Book appointments', 'View history', 'Leave reviews']
    },
    {
      role: 'superadmin' as UserRole,
      title: 'Super Admin',
      subtitle: 'Manage the system',
      description: 'Full control of platform and users',
      icon: Shield,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      demoEmail: 'admin@probooking.com',
      features: ['User management', 'System analytics', 'Global configuration']
    }
  ];

  const selectedUserType = userTypes.find(type => type.role === selectedRole)!;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCredentials(prev => ({
      ...prev,
      role,
      email: userTypes.find(type => type.role === role)?.demoEmail || ''
    }));
    clearError();
    setValidationErrors({});
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    
    // Clear validation errors when user starts typing
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    if (error) {
      clearError();
    }
  };

  const validateForm = (): boolean => {
    const errors: {email?: string; password?: string} = {};
    
    if (!validateEmail(credentials.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!validatePassword(credentials.password)) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(credentials);
    } catch (err) {
      // Error is handled by the AuthContext
    }
  };

  const fillDemoCredentials = () => {
    setCredentials(prev => ({
      ...prev,
      email: selectedUserType.demoEmail,
      password: 'password123'
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-indigo-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 group">
              <Calendar className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ProBooking
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Professional Management Platform
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Select your account type to continue
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* User Type Selection */}
          <div className="space-y-6 animate-in slide-in-from-left-4 duration-1000 delay-200">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              User Type
            </h3>
            
            <div className="space-y-4">
              {userTypes.map((userType, index) => {
                const Icon = userType.icon;
                const isSelected = selectedRole === userType.role;
                
                return (
                  <button
                    key={userType.role}
                    onClick={() => handleRoleSelect(userType.role)}
                    className={`w-full p-6 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left group animate-in slide-in-from-left-4 duration-1000 ${
                      isSelected
                        ? `border-transparent bg-gradient-to-br ${userType.color} text-white shadow-2xl`
                        : `border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl`
                    }`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ${
                        isSelected 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : `bg-gradient-to-r ${userType.color}`
                      }`}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-white'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {userType.title}
                          </h4>
                          {isSelected && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-5 h-5 text-yellow-300 fill-current animate-pulse" />
                              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                            </div>
                          )}
                        </div>
                        <p className={`text-sm font-medium mb-3 ${isSelected ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                          {userType.subtitle}
                        </p>
                        <p className={`text-sm mb-4 leading-relaxed ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                          {userType.description}
                        </p>
                        
                        <div className="space-y-2">
                          {userType.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                isSelected 
                                  ? 'bg-white/60' 
                                  : `bg-gradient-to-r ${userType.color}`
                              }`}></div>
                              <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <div className="animate-in slide-in-from-right-4 duration-1000 delay-400">
            <div className={`bg-gradient-to-br ${selectedUserType.bgColor} backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500`}>
              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${selectedUserType.color} flex items-center justify-center shadow-lg hover:rotate-12 hover:scale-110 transition-transform duration-300 group`}>
                  <selectedUserType.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Sign In as {selectedUserType.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedUserType.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={credentials.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                        validationErrors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-top-2 duration-300">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                        validationErrors.password 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-top-2 duration-300">
                      {validationErrors.password}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      {error}
                    </p>
                  </div>
                )}

                {/* Demo Credentials Button */}
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 text-sm font-medium"
                >
                  Use demo credentials
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 bg-gradient-to-r ${selectedUserType.color} text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Info */}
              <div className="mt-6 p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Demo Credentials</span>
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p><strong>Email:</strong> {selectedUserType.demoEmail}</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 ProBooking. Professional appointment management platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;