import mongoose from 'mongoose';

// Interface
export interface ISubject extends Document {
  name: string;
  gradeLevel: string;
  category: mongoose.Types.ObjectId;
}
