import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, LoginCredentials, UserRole } from '../../types/auth';
import { obfuscateData, deobfuscateData, clearSensitiveData } from '../../utils/encryption';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock users for demonstration
  const mockUsers: Record<UserRole, User> = {
    professional: {
      id: 'prof-1',
      email: 'john@probooking.com',
      name: 'John Professional',
      role: 'professional',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      createdAt: new Date('2023-01-15'),
      lastLogin: new Date()
    },
    client: {
      id: 'client-1',
      email: 'sarah@email.com',
      name: 'Sarah Johnson',
      role: 'client',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      createdAt: new Date('2023-06-20'),
      lastLogin: new Date()
    },
    superadmin: {
      id: 'admin-1',
      email: 'admin@probooking.com',
      name: 'System Administrator',
      role: 'superadmin',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      createdAt: new Date('2022-01-01'),
      lastLogin: new Date()
    }
  };

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('pb_u');
    if (savedUser) {
      try {
        const userData = JSON.parse(deobfuscateData(savedUser));
        // Re-hydrate Date objects from localStorage
        if (userData.createdAt) {
          userData.createdAt = new Date(userData.createdAt);
        }
        if (userData.lastLogin) {
          userData.lastLogin = new Date(userData.lastLogin);
        }
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('pb_u');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      const mockUser = mockUsers[credentials.role];
      
      if (!mockUser) {
        throw new Error('Invalid user role');
      }

      // Simulate login validation
      if (credentials.email === mockUser.email) {
        const userWithLastLogin = {
          ...mockUser,
          lastLogin: new Date()
        };
        
        setUser(userWithLastLogin);
        setIsAuthenticated(true);
        localStorage.setItem('pb_u', obfuscateData(JSON.stringify(userWithLastLogin)));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('pb_u');
    clearSensitiveData();
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};