import mongoose from 'mongoose';

// Interface
export interface IBooking extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: mongoose.Types.ObjectId;
  date: Date;
  duration: number;
  price: number;
  status: 'pending' | 'completed' | 'canceled';
}
