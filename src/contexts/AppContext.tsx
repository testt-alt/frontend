import React, { createContext, useContext, useState } from 'react';
import { Appointment, Service, Review } from '../types/calendar';

interface AppContextType {
  currentModule: string;
  setCurrentModule: (module: string) => void;
  appointments: Appointment[];
  services: Service[];
  reviews: Review[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModule, setCurrentModule] = useState('home');
  
  // Sample data
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Hair Cut & Style',
      startTime: new Date(2025, 0, 20, 10, 0),
      endTime: new Date(2025, 0, 20, 11, 30),
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@email.com',
      clientPhone: '+1-555-0123',
      service: 'Hair Cut & Style',
      status: 'confirmed',
      color: '#3B82F6',
      location: 'Salon Main Floor'
    },
    {
      id: '2',
      title: 'Deep Conditioning Treatment',
      startTime: new Date(2025, 0, 20, 14, 0),
      endTime: new Date(2025, 0, 20, 15, 0),
      clientName: 'Maria Rodriguez',
      clientEmail: 'maria@email.com',
      service: 'Deep Conditioning',
      status: 'confirmed',
      color: '#8B5CF6'
    },
    {
      id: '3',
      title: 'Color & Highlights',
      startTime: new Date(2025, 0, 21, 9, 0),
      endTime: new Date(2025, 0, 21, 12, 0),
      clientName: 'Emma Wilson',
      service: 'Color Treatment',
      status: 'pending',
      color: '#10B981'
    }
  ]);

  const [services] = useState<Service[]>([
    { id: '1', name: 'Hair Cut & Style', duration: 90, price: 75, color: '#3B82F6' },
    { id: '2', name: 'Deep Conditioning', duration: 60, price: 50, color: '#8B5CF6' },
    { id: '3', name: 'Color & Highlights', duration: 180, price: 150, color: '#10B981' },
    { id: '4', name: 'Keratin Treatment', duration: 240, price: 200, color: '#F59E0B' }
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing service! My hair looks fantastic.',
      date: new Date(2025, 0, 15),
      service: 'Hair Cut & Style'
    },
    {
      id: '2',
      clientName: 'Maria Rodriguez',
      rating: 5,
      comment: 'Very professional and skilled. Highly recommend!',
      date: new Date(2025, 0, 12),
      service: 'Deep Conditioning'
    }
  ]);

  const addAppointment = (appointment: Appointment) => {
    // Implementation would add to appointments array
    console.log('Adding appointment:', appointment);
  };

  const updateAppointment = (id: string, appointment: Partial<Appointment>) => {
    // Implementation would update appointment
    console.log('Updating appointment:', id, appointment);
  };

  const deleteAppointment = (id: string) => {
    // Implementation would delete appointment
    console.log('Deleting appointment:', id);
  };

  return (
    <AppContext.Provider value={{
      currentModule,
      setCurrentModule,
      appointments,
      services,
      reviews,
      addAppointment,
      updateAppointment,
      deleteAppointment
    }}>
      {children}
    </AppContext.Provider>
  );
};