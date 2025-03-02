import mongoose, { Schema } from 'mongoose';
import { ICategory } from './category.interface';

// Schema
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
