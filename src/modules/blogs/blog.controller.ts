import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { BlogsServices } from './blog.service';
import httpStatus from 'http-status';

const createBlogs = catchAsync(async (req, res, next) => {
  const data = req.body;
  const user = req.user as JwtPayload
  const result = await BlogsServices.createBlogsIntoDB(data, user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res, next) => {
  const result = await BlogsServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blogs are retrieved successfully',
    data: result,
  });
});

const updateBlogs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogsServices.updateBlogsIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteBlogs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogsServices.deleteBlogsIntoDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogsServices.getSingleBlogIntoDB(id);

  sendResponse(res, {
    success: true,
    message: 'get single blog successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const blogsControllers = {
  createBlogs,
  getAllBlogs,
  updateBlogs,
  deleteBlogs,
  getSingleBlog,
};
