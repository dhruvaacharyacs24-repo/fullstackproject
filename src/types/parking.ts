export type UserRole = 'student' | 'admin' | 'valet';

export type SlotStatus = 'available' | 'reserved' | 'occupied';

export type Priority = 'faculty' | 'final_year' | 'event_organizer' | 'normal';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  priority?: Priority;
}

export interface ParkingSlot {
  id: string;
  label: string;
  status: SlotStatus;
  zone: string;
  row: number;
  column: number;
  reservedBy?: string;
  vehicleNumber?: string;
  reservedAt?: Date;
  eventId?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  totalSlots: number;
  bookedSlots: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  eventId: string;
  vehicleNumber: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: 'pending' | 'confirmed' | 'parked' | 'collected' | 'fined';
  fine?: number;
}

export interface ValetAssignment {
  id: string;
  valetId: string;
  bookingId: string;
  slotId: string;
  status: 'assigned' | 'parking' | 'parked' | 'retrieving' | 'retrieved';
  assignedAt: Date;
}
