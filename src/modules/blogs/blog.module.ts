import mongoose, { Schema } from 'mongoose';
import { IBlogs } from './blog.interface';

const BlogPostSchema: Schema = new Schema<IBlogs>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogsModel = mongoose.model<IBlogs>('Blogs', BlogPostSchema);
