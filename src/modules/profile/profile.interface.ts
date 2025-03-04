import { Types } from 'mongoose';
import { UserRole } from '../user/user.interface';

export interface IReview {
  studentId: Types.ObjectId;
  comment: string;
  rating: number;
  createdAt?: Date;
}

export interface IAvailability {
  day: string; // Example: "Monday"
  startTime: string; // Example: "10:00 AM"
  endTime: string; // Example: "4:00 PM"
}

export interface IRates {
  hourlyRate: number;
  discount?: number; // Optional discount for bulk hours (percentage)
}

export interface IProfile {
  userId: Types.ObjectId;
  image?: string;
  bio?: string;
  subjects: string[];
  role: UserRole;
  experience?: number;
  rates: IRates;
  availability: IAvailability[];
  ratings?: number;
  reviews: IReview[];
  requestRole?: UserRole;
  isVerified?: boolean;
  callToAction?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
