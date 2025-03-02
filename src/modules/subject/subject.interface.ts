import mongoose from 'mongoose';

// Interface
export interface ISubject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  gradeLevel: string;
  category: mongoose.Types.ObjectId;
  image: string
};
