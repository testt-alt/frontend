export const APP_CONFIG = {
  name: 'ProBooking',
  version: '1.0.0',
  description: 'Professional appointment management platform',
  supportEmail: 'support@probooking.com',
  websiteUrl: 'https://probooking.com'
};

export const ROUTES = {
  LOGIN: '/login',
  PROFESSIONAL_DASHBOARD: '/professional',
  CLIENT_DASHBOARD: '/client',
  SUPERADMIN_DASHBOARD: '/admin'
};

export const STORAGE_KEYS = {
  USER: 'probooking_user',
  THEME: 'probooking_theme',
  PREFERENCES: 'probooking_preferences'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update'
  },
  APPOINTMENTS: {
    LIST: '/api/appointments',
    CREATE: '/api/appointments',
    UPDATE: '/api/appointments/:id',
    DELETE: '/api/appointments/:id'
  }
};

export const USER_ROLES = {
  PROFESSIONAL: 'professional',
  CLIENT: 'client',
  SUPERADMIN: 'superadmin'
} as const;

export const APPOINTMENT_STATUSES = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;