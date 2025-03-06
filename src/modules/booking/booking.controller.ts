import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await BookingServices.createBookingIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getTutorBookingRequest = catchAsync(async (req, res, next) => {
  const { userId } = req.user as JwtPayload;
  const result = await BookingServices.getTutorBookingRequestFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking are retrieved successfully',
    data: result,
  });
});

const getStudentBookingRequest = catchAsync(async (req, res, next) => {
  const { userId } = req.user as JwtPayload;
  const result = await BookingServices.getStudentBookingRequestFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking are retrieved successfully',
    data: result,
  });
});

const updateBookingRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await BookingServices.updateBookingRequestIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Booking updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingIntoDB(id);

  sendResponse(res, {
    success: true,
    message: 'Booking deleted successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// const getSingleBlog = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await BlogsServices.getSingleBlogIntoDB(id);

//   sendResponse(res, {
//     success: true,
//     message: 'get single blog successfully',
//     statusCode: httpStatus.OK,
//     data: result,
//   });
// });

export const BookingControllers = {
  createBooking,
  getTutorBookingRequest,
  updateBookingRequest,
  getStudentBookingRequest,
  deleteBooking,
  //   getSingleBlog,
};
