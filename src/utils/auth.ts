import { UserRole } from '../types/auth';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'professional':
      return 'Professional';
    case 'client':
      return 'Client';
    case 'superadmin':
      return 'Super Administrator';
    default:
      return 'User';
  }
};

export const getRolePermissions = (role: UserRole): string[] => {
  switch (role) {
    case 'professional':
      return [
        'manage_appointments',
        'manage_services',
        'view_analytics',
        'manage_profile',
        'respond_to_reviews'
      ];
    case 'client':
      return [
        'book_appointments',
        'view_appointments',
        'leave_reviews',
        'manage_profile'
      ];
    case 'superadmin':
      return [
        'manage_all_users',
        'view_system_analytics',
        'manage_system_settings',
        'access_all_data',
        'moderate_content'
      ];
    default:
      return [];
  }
};

export const canAccessModule = (userRole: UserRole, module: string): boolean => {
  const permissions = getRolePermissions(userRole);
  
  const modulePermissions: Record<string, string[]> = {
    'My Profile': ['manage_profile'],
    'My Services': ['manage_services'],
    'My Calendar': ['manage_appointments'],
    'My Appointments': ['manage_appointments', 'view_appointments'],
    'My Reviews': ['respond_to_reviews', 'leave_reviews'],
    'My Subscription': ['manage_profile'],
    'Book Service': ['book_appointments'],
    'Overview': ['view_system_analytics'],
    'User Management': ['manage_all_users'],
    'Analytics': ['view_system_analytics'],
    'System Settings': ['manage_system_settings']
  };

  const requiredPermissions = modulePermissions[module] || [];
  return requiredPermissions.some(permission => permissions.includes(permission));
};