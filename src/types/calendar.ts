export interface Appointment {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  color?: string;
  location?: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description?: string;
  color?: string;
}

export interface CalendarView {
  type: 'day' | 'week' | 'month';
  date: Date;
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: Date;
  service: string;
}