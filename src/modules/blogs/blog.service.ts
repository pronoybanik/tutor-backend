import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.module';
import { IBlogs } from './blog.interface';
import { BlogsModel } from './blog.module';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createBlogsIntoDB = async (payload: IBlogs, user: JwtPayload) => {

  console.log("prient", { payload, user });

  const authorValidation = await User.findOne({
    _id: user.userId,
  });

  if (!authorValidation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author ID not found');
  }

  payload.author = user.userId;

  const result = await BlogsModel.create(payload);
  return result;
};


const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const blogsSearchableFields = ['title', 'content', 'author._id'];

  let searchTerm = '';

  if (query?.search) {
    searchTerm = query?.search as string;
  }

  const searchQuery = BlogsModel.find({
    $or: blogsSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];
  excludeFields.forEach((el) => delete queryObj[el]);

  if (query?.filter) {
    queryObj['author._id'] = query.filter;
  }

  console.log({ query, queryObj });

  const filterQuery = searchQuery.find(queryObj).populate('author');

  const sortBy = query?.sortBy ? (query.sortBy as string) : 'createdAt';
  const sortOrder = query?.sortOrder === 'asc' ? 1 : -1;

  const sortOptions: { [key: string]: 1 | -1 } = { [sortBy]: sortOrder };

  const sortedBlogs = await filterQuery.sort(sortOptions);

  return sortedBlogs;
};

const updateBlogsIntoDB = async (id: string, payload: IBlogs) => {
  const result = await BlogsModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.FORBIDDEN, 'Blog not found');
  }
  return result;
};

const deleteBlogsIntoDB = async (id: string) => {
  const result = await BlogsModel.deleteOne({ _id: id });
  return result;
};

const getSingleBlogIntoDB = async (id: string) => {
  const result = await BlogsModel.findById(id).populate("author");
  return result;
};

export const BlogsServices = {
  createBlogsIntoDB,
  getAllBlogsFromDB,
  updateBlogsIntoDB,
  deleteBlogsIntoDB,
  getSingleBlogIntoDB
};
