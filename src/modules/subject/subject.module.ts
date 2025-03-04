import mongoose, { Schema } from 'mongoose';
import { ISubject } from './subject.interface';

// Schema
const SubjectSchema = new Schema<ISubject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    hourly: { type: Number, required: true },
    image: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    dateTimes: {
      type: [String],
      default: [],
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
);

export const Subject = mongoose.model<ISubject>('Subject', SubjectSchema);
