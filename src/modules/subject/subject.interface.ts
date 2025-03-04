import mongoose from 'mongoose';

// Interface
export interface ISubject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  hourly: number;
  dateTimes: string[];
  gradeLevel: string;
  category: mongoose.Types.ObjectId;
  image: string;
}
