import { Types } from 'mongoose';

export type IBlogs = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};
