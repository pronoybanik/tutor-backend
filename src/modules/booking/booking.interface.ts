import mongoose from 'mongoose';

// Interface
export interface IBooking extends Document {
  studentId: mongoose.Types.ObjectId;
  tutorId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  date: Date;
  duration: number;
  price: number;
  status: 'pending' | 'completed' | 'canceled';
}
